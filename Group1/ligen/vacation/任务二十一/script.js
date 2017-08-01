/*
* @Author: Marte
* @Date:   2017-07-08 15:23:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-28 15:38:30
*/

'use strict';
window.onload = function(){
        var hobbyData = [];//用于保存爱好数据
        var tagData = [];//用于保存tog数据
        var hobbydata = document.getElementsByTagName("textarea")[0],
            tagdata = document.getElementsByTagName("input")[0];

        var btn = document.getElementById("confirm"),
            hobbyUl = document.getElementById("hobbyBoxs"),
            tagUl = document.getElementById("tagBoxs");
        //为了删除某个属性，而定义的属性函数
        Array.prototype.indexof = function(val){
            for(var i = 0;i<this.length;i++){
                if(this[i] == val){
                    return i;
                }
                return -1;
            }
        }
            /*
             这个是内容更改调用函数，用于给mydata添加数据或者删除
             */
            //myData为更改对象 element为调用数据节点来源
        function modifyData(myData,element){
                var Reg = /([\u4e00-\u9fa5]|[a-zA-Z]|[0-9])+/g,
                    str = element.value.match(Reg),
                    i = 0;
                if(str!=null){
                   for(i = 0;i<str.length;i++){
                     if(Reg.test(str)&&myData.length<10){
                             myData.push(str[i]);
                     }else {
                        myData.shift();
                        myData.push(str[i])
                     }
                   }
               }
        }
        //更新dom操作
        //element为在哪个节点上进行更新
        function render(myData,element){
                element.innerHTML = "";//重新添加函数
                if(myData!=null){
                for(var i=0;i<myData.length;i++){
                    var li = document.createElement("li"),
                        text = document.createTextNode(myData[i]);
                        li.setAttribute("detail",myData[i]);
                        li.appendChild(text);
                        element.appendChild(li);
                }}
        }
        //定义的查询函数
        function sear(){
            var str = "\S*" + search.value + "\S*",
                Reg = new RegExp(str,"gi"),
                lis = ul.getElementsByTagName("li"),
                i = 0;
                for(i=0;i<lis.length;i++){
                    lis[i].style.background = "red";
                }
                for(i=0;i<lis.length;i++){
                    if(Reg.test(lis[i].innerText)){
                        lis[i].style.background = "black";
                    }
                }
        }
        //移进入到li，每次执行的事件执行函数
        function movein(){
            this.style.background = "red";
            this.innerHTML = "点击删除" + this.innerHTML;
        }
        //移出li，每次事件执行函数
        function moveout(){
            // alert(event.target.getAttribute("detail"));
            event.target.style.background = "#3399CC";
            event.target.style.cursor = "pointer";
            event.target.innerHTML = event.target.getAttribute("detail");
            //alert(event.target.getAttribute(detail));
        }
        //移入点击点击后执行的函数
        function del(myData){
            var index = myData.indexof(event.target.getAttribute("detail"));
            myData.splice(index,1);
            render(myData,tagUl);
            tianjia();
        }


        //开始按照要求添加事件
        btn.onclick = function(){
            modifyData(hobbyData,hobbydata);
            render(hobbyData,hobbyUl);
        }
        tagdata.onkeydown = keyDown;
        //遍历Dom给li添加事件
        function tianjia(){
            var lis = tagUl.getElementsByTagName("li"),
                i = 0;
            for(;i<lis.length;i++){
                    (function(i){
                        lis[i].onmouseenter = movein;
                        lis[i].onmouseout = moveout;
                        lis[i].onclick = function(){
                            del(tagData);
                        }
                    })(i)
                }
        }
        //键盘按下调用函数，用来判断按下去是不是指定几个键，如果是的话指定执行特定函数
        function keyDown() {
          var value= event.keyCode //得到点击键盘值
          var key = String.fromCharCode(event.keyCode)//将键盘值转化为符号
          console.log(value);
          if(value == 32|| value == 9||value == 13||value == 188){
            if(tagData!="null"){modifyData(tagData,tagdata);}
            render(tagData,tagUl);tagdata.value="";
            tianjia();
          }
     }
}