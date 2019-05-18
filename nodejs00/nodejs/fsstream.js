var fs=require('fs');
//10.fs.createReadStream 从文件流中读取数据
var fileReadStream=fs.createReadStream('input.txt');
/* var str='';
var count=0;
//保存数据
fileReadStream.on('data',(chunk)=>{
    
    str+=chunk;
    count++;
});
//读取完成
fileReadStream.on('end',(chunk)=>{
    console.log(count);
    console.log(str);
    //str+=chunk;
});
//读取失败
fileReadStream.on('error',(err)=>{
    console.log(err);
});  */

//11.fs.createWriteStream写入流
//var data="我是从数据库获取的数据，我要保存起来11\n";
var fileWriteStream=fs.createWriteStream('output.txt');
/* for(var i=0;i<100;i++){
    fileWriteStream.write(data,'utf8');
}

fileWriteStream.end();
fileWriteStream.on('finish',()=>{
    console.log('写入完成');
});
fileWriteStream.on('error',(err)=>{
    console.log(err.stack);
}); */
fileReadStream.pipe(fileWriteStream);
console.log("执行完毕");

