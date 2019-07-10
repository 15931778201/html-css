// alert(123);
//添加submit事件
document.getElementById('contactForm').addEventListener("submit",submitForm);
function submitForm(e){
    e.preventDefault();
    // console.log(123);
    //获取input值
    var name=getInputVal('name');
    var company=getInputVal('company');
    var email=getInputVal('email');
    var phone=getInputVal('phone');
    var message=getInputVal('message');
    console.log(name);
}
function getInputVal(id){
    return document.getElementById(id).value;
}