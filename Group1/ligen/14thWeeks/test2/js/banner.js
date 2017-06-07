/*
* @Author: Marte
* @Date:   2017-06-03 13:41:10
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-07 14:12:55
*/

    window.onload = function() {
        var box = document.getElementsByClassName('box')[0],                         //要改变德样式
            contain = document.getElementsByClassName('banner')[0],
            imgs = box.getElementsByTagName('img'),                         //图片列表
            btnleft = document.getElementById('btn_left'),                  //左按钮
            btnright = document.getElementById('btn_right'),                //右按钮
            list = document.getElementById('btn').getElementsByTagName('li'),//下面的index；
            btn = document.getElementById('btn'),
            index = 1 ,                                                      //用于判断到第几张图片
            pos = 0,
            timer = null,
            width = 0;                                                     //存放定时器
            width = imgs[0].offsetWidth;
            box.style.left = -width + "px";  //线划过页面
            //先做一个判断第几张图片，做无缝滚动 1
            panduan = function (str){
                var dis = -imgs[0].offsetWidth;
                if(index==1&&str=="left"){
                        box.style.left = -dis*5 + "px";
                        index=5;
                        box.style.left = -width*index+"px";
                }else if(index == 4&&str == "right"){
                        box.style.left= 0+"px";
                        index=0;
                }
                //判断现在应该到第几个
                if(str=="left"){
                    index--;
                }else {
                    index++;
                }
            }
            //判断按钮2
            function btoon(){
                for(var i = 0;i<list.length;i++)
                {
                    list[i].className = "";
                }
                list[index-1].className="on";
            }
            //动画进行切换
            function anitim(target){
                var now = parseInt(box.style.left);
                if(target == now){
                    clearInterval(timer);
                }else{
                var speed = (target - now) / 10;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                speed = Math.round((target - now)/10);
                box.style.left = now+speed+"px";
                //if(speed == -1)alert(now+"和"+target+"速度："+speed);
                }
            }

        btn_left.onclick = function(){
            var str = "left";
            panduan(str);
            btoon();
            clearInterval(timer);
            timer = setInterval(function(){
                target = -imgs[0].offsetWidth*index;
                anitim(target);
            },20)
        }
        btn_right.onclick = function(){
            var str = "right";
            panduan(str);
            btoon();
            clearInterval(timer);
            timer = setInterval(function(){
                target = -imgs[0].offsetWidth*index;
                anitim(target);
            },20)
        }
        /*btn.onclick = function(){
            var tar = event.target;
            if(tar = list[0]){
                    alert("0")
            }
            if(tar = list[1]){
                    alert("1")
            }
            if(tar = list[2]){
                    alert("2")
            }
            if(tar = list[3]){
                    alert("3")
            }

        }*/
        for(var a = 0;a<list.length;a++){
            (function(a){
                list[a].onclick=function(){
                    index = a+1;
                    btoon();
                    clearInterval(timer);
                    timer = setInterval(function(){
                    target = -imgs[0].offsetWidth*index;
                    anitim(target);
                    },20)

                }
            })(a)
        }
        var aa = null;

         contain.onmouseout = function(){
             aa=setInterval(function(){
            btn_right.onclick();
             },3000);
         }
         contain.onmouseover = function(){
            clearInterval(aa);
         }
        window.onresize = function(){    //解决页面大小变化问题
            box.style.left = index*width+"px";
       }
        }
