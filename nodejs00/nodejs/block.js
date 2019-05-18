var fs=require('fs');
//非阻塞
/* console.log("1");
fs.readFile('mime.json',function(err,data){
    
    //console.log(data);
    console.log('2');
   
})
console.log("3"); */

//阻塞

function getMime(callback){

    //1
    fs.readFile('mime.json',function(err,data){
        //console.log(data.toString());

       // return data;//3
       callback(data);
    })
    //2
    //return '123';
}

getMime(function(result){
    console.log(result.toString());

});