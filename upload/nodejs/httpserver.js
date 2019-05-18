
//1.引入http模块

var http=require('http');
var fs=require('fs');
var path=require("path");
//var mimeModel=require('./model/getmime.js');
var url=require('url');
var mimeModel=require('./model/getmimefromfile.js.js');
//console.log(mime.getMime('.css'));   //获取文件类型

//2.用http模块创建服务

    /*
     req获取url信息   （request）
     res 浏览器返回响应信息 （response）
     * */

http.createServer(function(req,res){


 // 发送 HTTP 头部
// HTTP 状态值: 200 : OK
//设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf-8

   // res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});

    var pathname=url.parse(req.url).pathname;
    console.log(pathname);
    if(pathname=='/'){
        //默认加载的首页
        pathname='/index.html';
    }
    	//获取文件的后缀名
	var extname=path.extname(pathname);
    if(pathname!='/favicon.ico'){
        //过滤请求
        //console.log(pathname);
        fs.readFile('static/'+pathname,function(err,data){

			if(err){  /*么有这个文件*/

                console.log('404');
                fs.readFile('static/404.html',function(err,data404){
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
				    res.write(data404);
				    res.end(); /*结束响应*/
                })
             
            }else{ /*返回这个文件*/
                //var mime=mimeModel.getMime(extname);  /*获取文件类型*/
                var mime=mimeModel.getMime(fs,extname);
                res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
				res.write(data);
				res.end(); /*结束响应*/
			}


		})



    }
   

}).listen(8001);
