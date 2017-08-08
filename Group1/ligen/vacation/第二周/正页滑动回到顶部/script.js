/*
* @Author: Marte
* @Date:   2017-08-02 17:14:43
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 22:50:41
*/

'use strict';
// window.onscroll = function(event){
//     alert(event.detail)
// }
// 通过event可以得到当前鼠标在contain中的位置
// 通过delta可以判断鼠标上下滑动
// deltaY上 -
// deltaY 下+
// 通过改top来改变位置

window.onload = function(){
var timer = null;//存放定时器
var contain = document.getElementById('contain');
var index = 0;
var node = document.getElementById('box');
var Dots = document.getElementById('dot').getElementsByTagName('a');
function changePosition(node,index,s){
        var target = -index*contain.offsetHeight;
        clearInterval(timer);
        var s = s||20;
        timer = setInterval(function(){
            var now = node.offsetTop,
                speed = Math.ceil((target-now)/s);
                if(speed == 0){
                    speed = Math.floor((target-now)/s)
                }
                if(now == target){
                    console.log("daole");
                    clearInterval(timer);
                }else {
                    node.style.top = now + speed  +"px"
                }},10)
}

function changeindex(B){
        if(B&&index<3){
            index++;
        }
        if(!B&&index>0){
            index--;
        }
        console.log(index);
        changeDot();
        changePosition(node,index)
}
function changeDot(){
    for(var i =0,len = Dots.length;i<len;i++){
        Dots[i].className ='';
    }
    Dots[index].className = 'now'
}
window.changeIndex = changeindex;
//})(window)

//函数节流
function debounce(func, delay) {
  return function(args) {
    var _this = this
    var _args = args
    clearTimeout(func.id)
    func.id = setTimeout(function() {
      func.call(_this, _args)
    }, delay)
 }
}
//节流之后的调用函数
var debounceIndex = debounce(changeIndex,300);
var Dats = document.getElementById('dot').getElementsByTagName('a');

    if('onmousewheel' in window){
            window.onmousewheel = function(){
        if(event.deltaY>0){
            debounceIndex(true)
        }
        if(event.deltaY<0){
            debounceIndex(false)
        }
    }
    }else{
        window.addEventListener('DOMMouseScroll',function(event){
                if(event.detail>0){
            debounceIndex(true)
        }
        if(event.detail<0){
            debounceIndex(false)
        }
        })
    }

    window.onmousewheel = function(){

        if(event.deltaY>0){
            debounceIndex(true)
        }
        if(event.deltaY<0){
            debounceIndex(false)
        }
    }

    for(var i = 0,len=Dots.length;i<len;i++){
        let j = i;
        Dots[j].onclick = function(){
            index = j;
            if(j == len-1){
                index = 0;
            }
            changeDot();
            changePosition(node,index,30)
        }
    }
    // Dots[Dots.length-1].onclick = Dots[1].onclick;
    // Dots[Dots.length-1].onclick = function(){
    //     index = 0;
    //     changeDot();
    //     changePosition(node,index,100);
    // }
}