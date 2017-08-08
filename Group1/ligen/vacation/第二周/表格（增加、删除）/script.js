/*
 * @Author: Marte
 * @Date:   2017-08-02 23:22:56
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-08-03 14:07:37
 */

'use strict';
//这个表格实现增加 删除功能
//指定位置增加，对应的有表格输入
//想要实现三个功能 （双击）修改td里面的文字，（右键）对表格进行操作


//首先实现双击进行修改对应表格内容

//双击执行事件，
function doubleClick() {
    //将前面的input输入框全部清除和对应的classname
    var td = document.getElementsByTagName('td');
    for (var i = 0, len = td.length; i < len; i++) {
        td[i].removeAttribute('class');
        var t = td[i].getElementsByTagName('input')[0];
        console.log(t);
        if (t) {
            console.log(t);
            td[i].innerHTML = t.value;
        } else {
            td[i].innerHTML = td[i].innerText;
        }
    } //将整个表格中的input清除
    this.str = this.innerText; //将当前内容进行保存，为以后使用
    this.className = 'active';
    this.innerHTML = '<input></input>'; //将里面变为指定内容
    var input = this.getElementsByTagName('input')[0];
    input.value = this.str;
    input.focus();
    input.onblur = inputLostFocus; //input添加失去焦点事件
}
//input添加失去焦点处理程序
function inputLostFocus() {
    var text = this.value;
    this.outerHTML = text;
}
//右击鼠标出现
function rightClick() {
    var self = this;
    window.menu.className = 'click';
    window.menu.style.top = event.clientY + 'px';
    window.menu.style.left = event.clientX + 'px';
    //menu中添加事件
    var li = window.menu.getElementsByTagName('li');
    li[0].onclick = function() {
        //changeForm.apply(self,true)
        changeForm.call(self, true)
    }
    li[1].onclick = function() {
        changeForm.call(self, false)
    }

}
//右击鼠标消失
window.onclick = function() {
        window.menu.removeAttribute('class');
    }
    //删除本行和添加一行功能
function changeForm(B) {
    if (B) {
        this.parentNode.removeChild(this);
    } else {
        var newtr = document.createElement('tr');
        newtr.innerHTML = '<td>类别</td><td>data</td><td>data</td><td>data</td><td>data</td>';
        this.parentNode.insertBefore(newtr, this.nextSibling);
        //本行添加事件
        var td = newtr.getElementsByTagName('td');
        for (var i = 0, len = td.length; i < len; i++) {
            td[i].ondblclick = doubleClick;
        }
        newtr.oncontextmenu = function() {
            rightClick.apply(this)
            return false;
        }
    }
}
window.onload = function() {
    var td = document.getElementsByTagName('td');
    var menu = document.getElementById('menu');
    for (var i = 0, len = td.length; i < len; i++) {
        td[i].ondblclick = doubleClick;
    }
    //表单右键添加功能
    var tr = document.getElementsByTagName('tr');
    for (i = 1, len = tr.length; i < len; i++) {
        tr[i].oncontextmenu = function() {
            rightClick.apply(this)
            return false;
        }
    }
    //第一行右边添加事件,防止表格为空
    td[0].onclick = function() {
            var tbody = document.getElementsByTagName('tbody');
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>类别</td><td>data</td><td>data</td><td>data</td><td>data</td>';
            tbody[0].appendChild(tr);
            var td = tr.getElementsByTagName('td');
            for (var i = 0, len = td.length; i < len; i++) {
                td[i].ondblclick = doubleClick;
            }
            tr.oncontextmenu = function() {
                rightClick.apply(this)
                return false;
            }
        }
        //禁止菜单的右击效果
    menu.oncontextmenu = function() {
        return false;
    }

}