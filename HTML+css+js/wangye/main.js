// 第二种滚动的实现
// $(".navbar a").on('click',function(e){
//     console.log(this.hash);
//     if(this.hash!=""){
//         e.preventDefault();
//         const hash=this.hash;

//         $('html,body').animate({
//             scrollTop:$(hash).offset().top
//         },
//            800
//         );


//     }
// });

//第三种实现
const scroll = new SmoothScroll(".navbar a[href*='#']", {
    speed: 200
});
console.log(1);