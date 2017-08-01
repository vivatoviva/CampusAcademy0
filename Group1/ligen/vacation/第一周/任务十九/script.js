/*
* @Author: Marte
* @Date:   2017-07-07 21:54:08
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-01 19:31:23
*/

'use strict';
window.onload = function(){
        var myData = [];//用于保存数据
        var data = document.getElementsByTagName("input")[0];
        //实现方法一，通过对myData进行数据更改，然后添加到html中（这个方法最符合题目要求）
        //实现方法二，通过输入点击的按钮，动态修改Dom内容
        var btns = document.getElementsByTagName("button"),
            i =0,
            ul = document.getElementById("boxs");
            /*
             这个每次点击按钮，调用的函数，用于给mydata添加数据
             任务十九：对添加函数进行更高要求
             */
        function modifyData(id){
                var Reg = /^[0]?[1-9][0-9][0]?$/g,
                    str = data.value.trim();
                    if(Reg.test(str)){
                        switch(id){
                            case "leftEnter" : myData.unshift(str);break;
                            case "leftDel" : myData.shift();break;
                            case "rightEnter" : myData.push(str);break;
                            case "rightDel" : myData.pop();break;
                        }

                    }else {
                        alert("输入不是数字");''
                }
        }
        //更新dom操作
        function render(){
            ul.innerHTML = "";//重新添加函数
                //开始数组中选择最大的数字
                var max = 0,
                    index = 0,
                    itemsWidth = Math.floor(1000/myData.length);
                    max =10;
                for(;index<myData.length;index++){
                        if(max<myData[index]){
                            max = Number(myData[index]);
                        }
                    }
                for(index = 0;index<myData.length;index++){
                     var li = document.createElement("li");

                        if(myData.length>28){
                            li.style.left = index * itemsWidth + "px";
                            li.style.width = itemsWidth + "px";
                        }else {
                            li.style.left = index*40+'px'
                            li.style.width = "40px"
                        }

                        li.style.height = Math.floor(((myData[index])/100)*500) + "px";
                        li.style.bottom = "0";
                        li.style.border = "1px solid #fff";
                        li.setAttribute("title",myData[index]);
                             if((myData[index]/100>=0.8)){
                                li.style.background = "black";
                              }
                              else if((myData[index]/100>=0.6)){
                                li.style.background = "purple";
                              }
                              else if((myData[index]/100>=0.4)){
                                li.style.background = "red";
                              }
                              else if((myData[index]/100>=0.2)){
                                li.style.background = "blue";
                              }
                              else {
                                li.style.background = "green";
                               }
                        ul.appendChild(li);
                        console.log(li);
                }

        }



        function paixu(){
            //对myData数据进行排序
            var temp = 0,
                index = 0,
                j = 0;
                for(;index<=myData.length;index++){
                    for(j = index+1;j<myData.length;j++){
                        if(Number(myData[index])>Number(myData[j])){
                            temp = myData[index];
                            myData[index] = myData[j];
                            myData[j] = temp;
                        }
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
            paixu();
            render();
        }
}