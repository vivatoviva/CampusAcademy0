/*
* @Author: Marte
* @Date:   2017-07-08 13:38:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-01 19:40:17
*/

'use strict';
window.onload = function(){
        var myData = [];//用于保存数据
        var data = document.getElementsByTagName("textarea")[0],
            search = document.getElementsByTagName("input")[0];
        //实现方法一，通过对myData进行数据更改，然后添加到html中（这个方法最符合题目要求）
        //实现方法二，通过输入点击的按钮，动态修改Dom内容
        var btns = document.getElementsByTagName("button"),
            i =0,
            ul = document.getElementById("boxs");
            /*
             这个每次点击按钮，调用的函数，用于给mydata添加数据
             */
        function modifyData(id){
               // var Reg = /([\u4e00-\u9fa5]|[a-zA-Z]|[0-9])+/g,
               var Reg = /[^\n|,|.|\t|\s|^]+/g,
                    str = data.value.match(Reg);
                    if(Reg.test(str)){
                        switch(id){
                            case "leftEnter" :
                                     for(var index in str){
                                        myData.unshift(str[index]);
                                     };break;
                            case "leftDel" : myData.shift();break;
                            case "rightEnter" :
                                     for(var index in str){
                                        myData.push(str[index]);
                                     };break;
                            case "rightDel" : myData.pop();break;
                        }

                    }else {
                        alert("输入不是数字")
                }
        }
        //更新dom操作
        function render(){
                ul.innerHTML = "";//重新添加函数
                for(i=0;i<myData.length;i++){
                    var li = document.createElement("li"),
                        text = document.createTextNode(myData[i]);
                        li.appendChild(text);
                        ul.appendChild(li);
                }
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
        for(i=0;i<4;i++){
            (function(){
                btns[i].onclick = function(){
                    modifyData(this.id);
                    console.log(myData);
                    render();
                }
            })(i)
        }
        btns[4].onclick = function(){
            sear();
        }

}