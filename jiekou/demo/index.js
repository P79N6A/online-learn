/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const SMSClient = require('./../index')
var express=require('express');
var cors=require('cors');
var app=express()
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/mydb"
app.use(cors())

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIIZFT9V9hJ4i5'
const secretAccessKey = '6YPgprMe2sxc0uN9RiFKHqdJiK8Qi2'

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

//短信回执报告
smsClient.receiveMsg(0, queueName).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
//      console.log(body)
    }
}, function (err) {
//  console.log(err)
})

//短信上行报告
smsClient.receiveMsg(1, queueName).then(function (res) {
    //消息体需要base64解码
    let {code, body}=res
    if (code === 200) {
        //处理消息体,messagebody
//      console.log(body)
    }
}, function (err) {
//  console.log(err)
})


//查询短信发送详情
smsClient.queryDetail({
    PhoneNumber: '1500000000',
    SendDate: '20170731',
    PageSize: '10',
    CurrentPage: "1"
}).then(function (res) {
    let {Code, SmsSendDetailDTOs}=res
    if (Code === 'OK') {
        //处理发送详情内容
//      console.log(SmsSendDetailDTOs)
    }
}, function (err) {
    //处理错误
//  console.log(err)
})

//发送短信
function send(phonenum,code){
	smsClient.sendSMS({
	    PhoneNumbers: phonenum,
	    SignName: 'girl商城',
	    TemplateCode: 'SMS_164511250',
	    TemplateParam: `{"code":${code}}`
	}).then(function (res) {
	    let {Code}=res
	    if (Code === 'OK') {
	        //处理返回参数
	//      console.log(res)
	    }
	}, function (err) {
	//  console.log(err)
	})
}

//验证码
var code=null;
function suiji(){
	code=Math.floor(Math.random()*10000);
	return code
}
//注册接口
app.get('/register',(req,res)=>{
	var id=req.query.id;//约定id判断当前执行发送短信还是注册功能
	var username=req.query.username;
	var phoneNum=req.query.phoneNum;
	
	
	if(id==0){
		console.log('发送验证码');
		suiji()
		console.log(code)
		send(phoneNum,code)
		res.json({msg:"发送成功"})
	}else{
		console.log('注册');
		var yzm=req.query.yzm;
		var password=req.query.password;
		
		if(yzm==code){
			mongodb.connect(db_str,(err,db)=>{
				db.collection('users',(err,coll)=>{
					coll.find({username:username}).toArray((err,data)=>{
						if (data.length>0) {
							res.json({code:0,msg:'用户名已存在'})
							db.close()
						}else{
							coll.find({phoneNum:phoneNum}).toArray((err,data1)=>{
								if(data1.length>0){
									res.json({code:1,msg:'该手机号已被占用'})
									db.close()
								}else{
									coll.insert({username:username,phoneNum:phoneNum,password:password},()=>{
										res.json({code:2,msg:'注册成功'})
										db.close()
									})
								}
							})
						}
					})
				})
			})
		}else{
			res.json({code:3,msg:"验证码错误"})
		}
	}
})
//验证用户名
app.get("/checkusername",(req,res)=>{
	var username=req.query.username;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("users",(err,coll)=>{
			coll.find({username:username}).toArray((err,data)=>{
				if(data.length>0){
					res.json({code:0,msg:"用户名已存在"})
					db.close()
				}else{
					res.json({code:1,msg:"ok"})
					db.close()
				}
			})
		})
	})
})
//验证手机号
app.get("/checkphone",(req,res)=>{
	var phoneNum=req.query.phoneNum;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("users",(err,coll)=>{
			coll.find({phoneNum:phoneNum}).toArray((err,data)=>{
				if(data.length>0){
					res.json({code:0,msg:"手机号已存在"})
					db.close()
				}else{
					res.json({code:1,msg:"ok"})
					db.close()
				}
			})
		})
	})
})
//用户登陆接口
app.get("/userlogin",(req,res)=>{
	var phoneNum=req.query.phoneNum;
	var password=req.query.password;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("users",(err,coll)=>{
			coll.find({phoneNum:phoneNum,password:password}).toArray((err,data)=>{
				if(data.length>0){
					res.json({code:1,msg:"登陆成功"})
					db.close();
				}else{
					res.json({code:0,msg:"用户名或密码错误"})
					db.close();
				}
			})
		})
	})
})
//查询用户信息
app.get("/usermessage",(req,res)=>{
	var phoneNum=req.query.phoneNum;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("users",(err,coll)=>{
			coll.find({phoneNum:phoneNum}).toArray((err,data)=>{
				if(data.length>0){
					res.send(data)
					db.close();
				}
			})
		})
	})
})
//修改密码
app.get("/updatepwd",(req,res)=>{
	var phoneNum=req.query.phoneNum;
	var password=req.query.password;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("users",(err,coll)=>{
			coll.update({phoneNum:phoneNum},{$set:{password:password}},()=>{
				res.send("修改成功");
				db.close();
			})
		})
	})
})
//管理员登陆接口
app.get("/adminlogin",(req,res)=>{
	var phoneNum=req.query.phoneNum;
	var password=req.query.password;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("manage",(err,coll)=>{
			coll.find({phoneNum:phoneNum,password:password}).toArray((err,data)=>{
				if(data.length>0){
					res.json({code:1,msg:"登陆成功"})
					db.close();
				}else{
					res.json({code:0,msg:"用户名或密码错误"})
					db.close();
				}
			})
		})
	})
})
//课程分类接口
app.get("/fenlei",(req,res)=>{
	mongodb.connect(db_str,(err,db)=>{
		db.collection("courses",(err,coll)=>{
			coll.find({}).toArray((err,data)=>{
				res.send(data);
				db.close();
			})
		})
	})
})
//课程分类中的列表
app.get("/lists",(req,res)=>{
	var fid=parseInt(req.query.fid);
	mongodb.connect(db_str,(err,db)=>{
		db.collection('courses',(err,coll)=>{
			coll.find({fid:fid}).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	})
})
//IT
app.get("/courselist1",(req,res)=>{
	res.header("Access-Control-Allow-Origin","*")
	mongodb.connect(db_str,(err,db)=>{
		db.collection("course",(err,coll)=>{
			coll.find({}).limit(8).skip(0).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	}) 
})
//生活
app.get("/courselist2",(req,res)=>{
	res.header("Access-Control-Allow-Origin","*")
	mongodb.connect(db_str,(err,db)=>{
		db.collection("course",(err,coll)=>{
			coll.find({}).limit(8).skip(8).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	}) 
})
//音乐
app.get("/courselist3",(req,res)=>{
	res.header("Access-Control-Allow-Origin","*")
	mongodb.connect(db_str,(err,db)=>{
		db.collection("course",(err,coll)=>{
			coll.find({}).limit(8).skip(16).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	}) 
})
//书法
app.get("/courselist4",(req,res)=>{
	res.header("Access-Control-Allow-Origin","*")
	mongodb.connect(db_str,(err,db)=>{
		db.collection("course",(err,coll)=>{
			coll.find({}).limit(8).skip(24).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	}) 
})
//摄影
app.get("/courselist5",(req,res)=>{
	res.header("Access-Control-Allow-Origin","*")
	mongodb.connect(db_str,(err,db)=>{
		db.collection("course",(err,coll)=>{
			coll.find({}).limit(8).skip(32).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	}) 
})
//详情接口
app.get('/detail',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('course',(err,coll)=>{
			coll.find({cid:id}).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	})	
})
//从列表到详情的详情接口
app.get('/detail1',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var fid=parseInt(req.query.fid)
	var sid=parseInt(req.query.sid)
	var cid=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('courses',(err,coll)=>{
			coll.find({fid:fid,"second.sid":sid}).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	})	
})
//课程购买支付接口
app.get('/pay',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('order',(err,coll)=>{
			coll.find({id:id}).toArray((err,data)=>{
				if(data.length>0){
					res.send('该课程已经购买过')
					db.close()
				}else{
					db.collection('course',(err,coll1)=>{
						coll1.find({cid:id}).toArray((err,data)=>{
							 var obj={
							 		id:data[0].cid,
							 		img:data[0].cimg,
							 		price:data[0].cprice,
							 		selected:data[0].selected,
							 		desc:data[0].cdesc,
							 		num:1
							 } 
							 coll.insert(obj,()=>{
							 	res.send('购买成功，请进入订单进行查看！')
								db.close()
							})	 
						})
					})
				}
			})
		})
	})	
})
//订单展示接口
app.get('/order',(req,res)=>{
	mongodb.connect(db_str,(err,db)=>{
		db.collection('order',(err,coll)=>{
			coll.find({}).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	})
})
//删除订单接口
app.get('/del-order',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('order',(err,coll)=>{
			coll.remove({id:id},()=>{
				res.send('删除成功')
				db.close()
			})
		})
	})
})
//添加购物车接口
app.get('/addCart',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('cart',(err,coll)=>{
			//先查询购物车是否有该产品，有的话数量累加
			coll.find({id:id}).toArray((err,data)=>{
				if(data.length>0){
					res.send('该课程已经添加过')
					db.close()
				}else{
					db.collection('course',(err,coll1)=>{
						coll1.find({cid:id}).toArray((err,data)=>{
							 var obj={
							 		id:data[0].cid,
							 		img:data[0].cimg,
							 		price:data[0].cprice,
							 		selected:data[0].selected,
							 		desc:data[0].cdesc,
							 		num:1
							 } 
							 coll.insert(obj,()=>{
							 	res.send('添加成功')
								db.close()
							})	 
						})
					})
				}
			})
		})
	})	
})
//查看购物车接口
app.get('/cartlist',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	mongodb.connect(db_str,(err,db)=>{
		db.collection('cart',(err,coll)=>{
			coll.find({}).toArray((err,data)=>{
				res.send(data)
				db.close()
			})
		})
	})
})
//删除购物车接口
app.get('/del-cart',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('cart',(err,coll)=>{
			coll.remove({id:id},()=>{
				res.send('删除成功')
				db.close()
			})
		})
	})
})
//课程收藏接口
app.get('/collect',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=parseInt(req.query.id)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('collect',(err,coll)=>{
			coll.find({id:id}).toArray((err,data)=>{
				if(data.length>0){
					res.send('已经收藏过了哦！')
					db.close()
				}else{
					db.collection('course',(err,coll1)=>{
						coll1.find({cid:id}).toArray((err,data)=>{
							 var obj={
							 		id:data[0].cid,
							 		img:data[0].cimg,
							 		price:data[0].cprice,
							 		desc:data[0].cdesc,
							 		num:1
							 } 
							 coll.insert(obj,()=>{
							 	res.send('收藏成功！')
								db.close()
							})	 
						})
					})
				}
			})
		})
	})	
})
//收藏查询
app.get('/collectlist',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	mongodb.connect(db_str,(err,db)=>{
		db.collection("collect",(err,coll)=>{
			coll.find({}).toArray((err,data)=>{
				res.send(data);
				db.close();
			})
		})
	})
})
//删除收藏
app.get('/del-collect',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	let id=parseInt(req.query.id);
	mongodb.connect(db_str,(err,db)=>{
		db.collection('collect',(err,coll)=>{
			coll.remove({id:id},()=>{
				res.send("删除成功");
				db.close();
			})
		})
	})
})
//课程评论
app.get('/add-evaluate',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=req.query.id;
	var username=req.query.username;
	var content=req.query.content;
	mongodb.connect(db_str,(err,db)=>{
		db.collection("evaluate",(err,coll)=>{
			coll.find({id:id}).toArray((err,data)=>{
				if(data.length>0){
					coll.update({id:id},{$push:{"eval":{username:username,content:content}}},()=>{
						res.send("发表成功")
						db.close();
					})
				}else{
					coll.insert({id:id,eval:[{username:username,content:content}]},()=>{
						res.send("发表成功")
						db.close();
					})
				}
				
			})
		})
	})
})
//查询课程评论
app.get('/evaluatelist',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var id=req.query.id;
	mongodb.connect(db_str,(err,db)=>{
		db.collection('evaluate',(err,coll)=>{
			coll.find({id:id}).toArray((err,data)=>{
				res.send(data)
				db.close();
			})
		})
	})
})
//管理员添加课程
app.get('/addCourse',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var fid=parseInt(req.query.fid);
	var sid=parseInt(req.query.sid);
	var cid=parseInt(req.query.cid);
	var cimg=req.query.cimg;
	var cdesc=req.query.cdesc;
	var cprice=req.query.cprice;
	var mid=parseInt(req.query.mid);
	var name=req.query.name;
	var video=req.query.video;
	console.log(fid,sid,cid,cdesc,cimg,cprice,mid,name,video)
	mongodb.connect(db_str,(err,db)=>{
		db.collection("courses",(err,coll)=>{
			coll.update({fid:fid,"second.sid":sid},{$push:{"second.$.course":{cid:cid,cimg:cimg,cdesc:cdesc,cprice:cprice,cvideo:video,mulu:[{mid:mid,name:name,video:video}]}}},{upsert:true,'new':true},(err,data)=>{
				res.send("添加成功")
				db.close();
			})
		})
	})
})
//删除课程接口
app.get('/delCourse',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	var fid=parseInt(req.query.fid)
	var sid=parseInt(req.query.sid)
	var cid=parseInt(req.query.cid)
	mongodb.connect(db_str,(err,db)=>{
		db.collection('courses',(err,coll)=>{
			coll.update({fid:fid,"second.sid":sid},{$pull:{"second.$.course":{cid:cid}}},{multi: true},(err,data)=>{
				res.send("删除成功");
				db.close();
			});
		})
	})
})
app.listen(3000)