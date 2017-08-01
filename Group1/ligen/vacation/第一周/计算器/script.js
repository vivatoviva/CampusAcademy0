/*
* @Author: Marte
* @Date:   2017-07-27 07:45:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-28 19:51:44
*/

'use strict';
//计算器实现原理:既然能够进行展示多组输出，可以通过点击=处理一段字符串，通过一段字符串进行计算的到最终结果
//中间有个AC和ce的转换（ce长点击可以拥有AC的功能）

//定义的全局变量
var sum = 0,   //的字符串的求得和
    mystr = "", //点击后形成的字符串
    timer = null,
    clearbtn = document.getElementById("clear"),
    equalbtn = document.getElementById("equal"),
    process = document.getElementById("process"),
    display = document.getElementById("display"); //结果显示的区域

//这个函数就是将点击之后结果变成一段字符串然后输入到显示去，通过更改mystr
function btnclick(){
    clearbtn.innerText = "CE"
    if(sum == mystr){
        var a = this.getAttribute("value")
        if(a != "×"&&a!="-"&&a!="+"&&a!="÷"){
            mystr = "";
        }
    }
    if(mytest(this.getAttribute("value")))mystr+=this.getAttribute("value")
    display.innerText = mystr
}
//给.str点击添加函数(闭包添加防止污染函数空间)
(function(){
    var btn = document.getElementsByClassName("str")
    for(var i = 0;i<btn.length;i++){
        (function(index){
            btn[index].onclick = btnclick;
        })(i)
    }
})()
//这个是功能点击按钮（ae、=）整合两个键的功能
function funclick(){
    if(this.getAttribute("value") == "clear"){
        if(this.innerText == "AC"){
            mystr = "";
            display.innerText = "";
            process.innerText = "";
        }else{
            //长时间点击为直接清零
           /* clearInterval(timer)
            timer = setInterval(function(){
                mystr = "";
                display.innerText = mystr;
            },5000)*/
            console.log(mystr.length);
            mystr = mystr.slice(0, -1);
            display.innerText = mystr;
            if(mystr.length == 0){
                clearbtn.innerText = "AC";
            }
        }
    }else {
        if(mytest("equal")){
            clearbtn.innerText = "AC"
            completion();  //完善mystr的函数（忘记加括号）添加进去
            compute();//将产生的字符串进行计算 保存在sum之中
            display.innerText = sum;
        }
    }
}
clearbtn.onclick = funclick;
equalbtn.onclick = funclick;
//将传进去的字符串进行计算返回结果
function compute(){
  //这个程序核心的地方
  var str = mystr.replace(/÷/g,"/");
  str = str.replace(/×/g,"*")
  str = str.replace(/%/g,"*0.01")
  var temp = str.match(/\d+(?=\()/g);
  if(temp){
    var b = temp.length
  for(var i = 0;i<b;i++){
    temp = str.match(/\S*[^*](?=\()/g)
    str = str.replace(temp[0],temp[0]+"*")
  }
  }
  sum = eval(str).toFixed(2)
  //eval()函数会将传入的字符串当做JavaScript代码进行  //执行
  process.innerText = "Ans=" + mystr;
  mystr = sum.toString();
}
//对每次输入进行检测确保输入最后得到的有效
function mytest(v){
    var laststr = mystr.substr(-1);
    if(laststr == "+"||laststr=="-"||laststr == "÷"||laststr == "×"||laststr == "("){
        if(v == "+"||v=="-"||v == "÷"||v == "×"||v == "equal"||v==")"){
            alert("不合法运算");
            return false
        }
    }
    return true
}
//对输入进去的字符串进行完整(点击=进行检测自东添加符号)
function completion(){
    //找出所有的（和所有的）那种不够添加那个
    var o = mystr.split("(").length,
        p = mystr.split(")").length;
    //（多的时候
    if(o>p){
        for(var i= 0;i<o-p;i++){
            mystr+=")"
        }
    }else{
        for(var i = 0;i<p-o;i++){
            mystr = "(" + mystr;
        }
    }
}
//添加键盘是事件
document.onkeydown = function(){
    console.log(event.keyCode);
    var k = event.keyCode;
    key(k);
}
function key(k){
    if(sum == mystr){
        if(k != "106"&&k!="109"&&k!="107"&&k!="111"){
            mystr = "";
            display.innerText = mystr
        }
    }
     if(event.shiftKey&&k == 57){
        if(mytest("("))mystr+="("
        display.innerText = mystr

    }else if(event.shiftKey&&k == 48){
        if(mytest(")"))mystr+=")"
        display.innerText = mystr
    }else if(k >= 48&&k<=57){
        clearbtn.innerText = "CE"
        mystr+=(k-48);
        display.innerText = mystr
    }
    if(k >= 96&&k<=105){
        clearbtn.innerText = "CE"
        mystr+=(k-96);
        display.innerText = mystr
    }
    if(k==107){
        if(mytest("+"))mystr+="+"
        display.innerText = mystr
    }
    if(k==109){
        if(mytest("-"))mystr+="-"
        display.innerText = mystr
    }
    if(k==106){
        if(mytest("×"))mystr+="×"
        display.innerText = mystr
    }
    if(k==111){
        if(mytest("÷"))mystr+="÷"
        display.innerText = mystr
    }
    if(k == 110){
        mystr+="."
        display.innerText = mystr;
    }

    if(k == 13){
        equalbtn.onclick()
    }
    if(k==8){
        clearbtn.onclick();
    }
}