/*
* @Author: Marte
* @Date:   2017-08-03 13:53:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 18:31:54
*/

'use strict';
//要做按钮显示浮层
//点击透明遮罩或者关闭按钮 关闭页面
//验证用户名不能为空或者汉字，密码不能为空并且只收为6位

function changName(node,name){
    if(name){node.className = name;}
    else{node.removeAttribute('class')}
}
//input的检测
//失去焦点
function lostFocus(){
    if(this.getAttribute('name') == 'password'){
        var tip = '请输入密码';
        var reg = /\b\d{1,6}\b/g;//6为数字密码
    }else{
          tip = '请输入手机或者邮箱'
          reg = /^[\u4e00-\u9fa5a-zA-Z]{1,6}$/g
    }
    var str = this.value.trim();
    if(str.length==0){
        this.removeAttribute('style')
        this.setAttribute('placeholder',tip)
        // this.style.Color = '#000';
        return;
    }
    if(str.search(reg)!=-1){
        this.removeAttribute('style');
    }else{
        this.style.boxShadow = '0px 0px 10px red'
    }
}
window.onload = function(){
    var login = document.getElementsByTagName('button')[0],//登录按钮
        close = document.getElementsByTagName('span')[0],//关闭按钮
        contain = document.getElementById('contain'),//容器
        input  =document.getElementsByTagName('input'),//

        box = document.getElementById('login');//小页面
        login.onclick = function(){
            box.className = 'anima';
            document.body.className = 'now';
            changName(contain,'open');
        }
        close.onclick = function(){
            box.className = 'closeanima'
            document.body.removeAttribute('class')
            changName(contain)
        }
        contain.addEventListener('click', function(){
            box.className = 'closeanima';
            document.body.removeAttribute('class')
            changName(contain);
        }, false)
        box.addEventListener('click',function(){
            event.stopPropagation();//用来阻止事件冒泡
        },false)
        //input添加失去焦点验证
        input[0].onblur = lostFocus;
        input[1].onblur = lostFocus;


}