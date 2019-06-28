//var pics=document.getElementById('pics');
function init(){
	setInterval("changImg()",3000);
}
var i=0;

function changImg(){
	i++;
	document.getElementById("img1").src = "img/banner(" + i + ").jpg";
	if(i==2){
		i=0;
	}
};