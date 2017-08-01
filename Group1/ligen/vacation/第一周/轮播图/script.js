/*
* @Author: Marte
* @Date:   2017-07-26 20:45:22
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-27 07:43:28
*/

'use strict';
var firstnode  = document.getElementsByClassName("first")[0].cloneNode(true),
    lastnode = document.getElementsByClassName("last")[0].cloneNode(true),
    box = document.getElementById("box");
    //添加轮播使用的过渡节点
    box.appendChild(firstnode);
    box.insertBefore(lastnode,document.getElementsByClassName("first")[0]);
var items = document.getElementsByClassName("items"),
    index = 1,
    timer = null,
    ul = document.createElement("ul"),
    lis = "<li class=\"active\"></li>";
    //动态添加状态点和点击按钮
    for(var i = 0;i<items.length-3;i++){
        lis += "<li ></li>";
    }
    ul.innerHTML = lis;
    document.getElementById("contain").appendChild(ul);
    //需要有两个函数，一个是将这个box左右变化然后传给一个动画函数
    function variety(event){
        console.log(index);
        if(index == items.length-2&&event.target.id == "rightbtn"){
            //向有进行切换的过渡事件
            box.style.left = 0;
            index = 1;
            anima(index);
            nav();
            return true;
        }
        if(index == 1&&event.target.id == "leftbtn"){
            //向左进行切换的过渡时间
            box.style.left = -(items.length - 1)*400 + "px";
            index = items.length - 2;
            anima(index);
            nav();
            return true;
        }
        if(event.target.id == "leftbtn"){
            index--;
            anima(index);
            nav();
        }else {
            index++;
            anima(index);
            nav();
        }
    }
    function anima(index){
        var target = -index*400;
        clearInterval(timer);
        timer = setInterval(function(){
            var now = box.offsetLeft,
                speed = Math.ceil((target-now)/20);
                if(speed == 0){
                    speed = Math.floor((target-now)/20)
                }


                if(now == target){
                    console.log("daole");
                    clearInterval(timer);
                }else {
                    console.log(speed);
                    box.style.left = now + speed  +"px"
                }
        },10)
    }
    //给两个按钮先添加事件
    var leftbtn = document.getElementById("leftbtn"),
        rightbtn = document.getElementById("rightbtn");
        leftbtn.onclick = function(){
            variety(event);
        }
        rightbtn.onclick = function(){
            variety(event);
        }
    //导航按钮进行切换的函数
    function nav(){
        var ul = document.getElementsByTagName("ul")[0],
            lis = ul.getElementsByTagName("li");
            for(var i = 0;i<lis.length;i++){
                lis[i].className = "";
            }
            lis[index-1].className = "active";
    }
    //导航点击切换的函数
    (function(){
        var ul = document.getElementsByTagName("ul")[0],
            lis = ul.getElementsByTagName("li");
            for(var i=0;i<lis.length;i++){
                (function(a){
                    lis[a].onclick = function(){
                        anima(a+1);
                        index = a+1;
                        nav();
                    }
                })(i)
            }
    })()