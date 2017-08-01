/*
* @Author: Marte
* @Date:   2017-07-26 14:13:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-26 17:17:31
*/

'use strict';
var btn = document.getElementsByTagName("ul")[0],
    index = 0;//用作判断第几次进入的常量
    function cli(){
        if(index%2 == 0){
            btnanimate();
        }else{
            btnanimate();
        }
        index++
        console.log(index);
    }
btn.onclick = cli;
var lis = document.getElementsByTagName("li"),
    text = document.getElementsByTagName("div")[0]
    //给其中的li点击添加事件
    for(var i = 0 ;i<lis.length;i++){
        (function(index){
            lis[index].onclick = function(){
                resetId();
                lis[index].id = "active"
                text.innerText  = lis[index].innerText;
            }
        })(i)
    }
    //重置其id的值
    function resetId(){
        for(i = 0;i<lis.length;i++){
            lis[i].id = "";
        }
    }
    //基本功能实现
    //添加动画
    //* 点击后箭头向上面进行动态变化
    //* 点击对ul之后，让每个li从右边出来（结合css进行实现）
    function btnanimate(){
        var timer = null
        if(index%2 == 0){
            btn.style.height = (lis.length+1) * 50 +"px"
            var a = 0;
            timer = setInterval(function(){
                lis[a++].className = "left"
                if(a == lis.length)clearInterval(timer)
            },100)
        }else {
            var a = lis.length-1;
            timer = setInterval(function(){
                if(a != -1){
                    lis[a--].className = "right"
                }
                 if(a==-1&&lis[0].offsetLeft==200){
                    clearInterval(timer)
                    btn.style.height = "50px"
                    console.log("xkl");
                }
            },100)
        }
    }