var fs=require('fs');
//1.fs.stat 检测目录还是文件
/*fs.stat('html',function(err,stats){
    if(err){
        console.log(err);
        return false;
    }
    console.log('文件'+stats.isFile());
    console.log('目录：'+stats.isDirectory());

})*/

//2.fs.mkdir 创建目录
/*fs.mkdir('logs',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('成功创建目录：logs');
    }
    
});*/

//3.fs.writeFile 创建写文件
/*fs.writeFile('logs/hello.log','你好~\n',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('成功写入文件：hello.log');
    }
    
})*/

//4.fs.appendFile追加文件
/*fs.appendFile('logs/hello.log','hi~\n',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('成功写入文件：hello.log');
    }
    
});*/

//5.fs.readFile 读取文件
/*fs.readFile('logs/hello.log','utf8',(error,data)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
    }
}); */

//6.fs.readdir 读取目录
/* fs.readdir('logs',(error,data)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
    }
    
});  */

//7.file.rename 重命名
/* fs.rename('logs/hello.log','logs/greeting.log',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('重命名成功');
    }

}); */

//8.fs.rmdir 刪除目錄
/* fs.rmdir('html',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('成功刪除目錄：html')
    }
}) */

//9.fs.unlink 刪除文件
/*  fs.unlink('hai.txt',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('成功刪除文件：');
    }
});  */

/* fs.stat('upload',function(err,stats){
    if(err){
        fs.mkdir('logs',(error)=>{
            if(error){
                console.log(error);
                return false;
            }
            else{
                console.log('成功创建目录：upload');
            }
            
        });
        console.log(err);
        return false;
    }
    console.log('目录已存在');
    console.log('目录：'+stats.isDirectory());

}) */

