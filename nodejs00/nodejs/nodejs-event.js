var fs=require('fs');
var events=require('events');
var EventEmitter=new events.EventEmitter();
function getMime(callback){

    //1
    fs.readFile('mime.json',function(err,data){
        //console.log(data.toString());

       // return data;//3
     EventEmitter.emit('data',data);
    })
    //2
    //return '123';
}

getMime();
EventEmitter.on('data',function(mime){
        console.log(mime.toString());
    });