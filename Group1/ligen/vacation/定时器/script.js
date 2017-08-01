/*
* @Author: Marte
* @Date:   2017-07-26 19:16:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-26 20:44:19
*/

'use strict';
var goBtn = document.getElementById("go"),
    stopBtn = document.getElementById("stop"),
    resetBtn = document.getElementById("reset"),
    h = document.getElementById("hourse"),
    m = document.getElementById("minte"),
    s = document.getElementById("second"),
    jieguo = document.getElementsByTagName("ol")[0],
//开始e计时可以制作一个定时器,定时器中间使用Data作为时间计时，用settimeout来制作更新
      a = 0,
      b = 0,
      c = 0,
      timer = null;
 goBtn.onclick = function(){
    clearInterval(timer)
        timer = setInterval(function(){
            jishi();
            h.innerText = mysort(a);
            m.innerText = mysort(b);
            s.innerText = mysort(c);
        },1000)
    }
stopBtn.onclick = function(){
    goBtn.innerText = "继续计时";
    clearInterval(timer);
    var li = document.createElement("li");
        li.innerHTML=document.getElementById("timeDisplay").innerHTML,
        console.log(jieguo);
        jieguo.appendChild(li);

}
resetBtn.onclick = function(){
    goBtn.innerText = "开始计时";
    jieguo.innerHTML = ""
    a = b = c = 0;
    h.innerText = mysort(a);
    m.innerText = mysort(b);
    s.innerText = mysort(c);
    clearInterval(timer);
}
    //用于计时的函数
    function jishi(){
        c++;
        if(c == 60){
            c=0;
            b++;
        }
        if(b == 60){
            b = 0;
            a++;
        }
        if(a==60){
            alert("超出计时器范围")
        }
    }
    //用于整理的函数
    function mysort(time){
        if(time>9){
            return time;
        }else {
            return "0" + time;
        }
    }