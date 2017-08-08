/*
 * @Author: Marte
 * @Date:   2017-08-04 07:07:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-08-09 00:14:48
 */
//设置一个Node.index用来存放当前位置，使用一个全局变量确定当前的展示区
//设置index通过对象中的Node.index判断他们的位置
'use strict';

function creatCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ('withCredentoals' in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != undefined) {
        //var xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var data = creatCORSRequest('get', "http://study.163.com/webDev/hotcouresByCategory.htm")
if (data) {
    data.onload = function() {
        if ((data.status >= 200 && data.status < 300) || data.status == 304) {
            //addnode(JSON.parse(data.responseText));
            change(JSON.parse(data.responseText));
        }
    }
    data.onerror = function() {
            alert('错误')
        }
        //data.overrideMimetype("text/xml");
    data.send(null);
}
//动态添加节点
function addnode(data) {
    for (var i = 1; i < data.length; i++) {
        let node = document.getElementsByClassName('card')[0].cloneNode(true);
        contain.appendChild(node);
    }
}
//改变节点中的数据
function change(data) {
    var name = document.getElementsByClassName('name'),
        autherdes = document.getElementsByClassName('autherdes'),
        classdes = document.getElementsByClassName('classdes'),
        bgimg = document.getElementsByClassName('bgimg'),
        starttime = document.getElementsByClassName('starttime'),
        lasttime = document.getElementsByClassName('lasttime');
    var timer = null; //定时器
    for (var i = 0, len = data.length; i < len; i++) {
        name[i].innerHTML = data[i]['provider'];
        //name[i].title = data[i]['providerDesc']
        if (data[i]['providerDesc'].length > 10) {
            autherdes[i].innerHTML = data[i]['providerDesc'].slice(0, 15) + "···";
            autherdes[i].style.cursor = 'pointer';
            autherdes[i].title = data[i]['providerDesc'];
        } else if (data[i]['providerDesc'].length > 0) {
            autherdes[i].innerHTML = data[i]['providerDesc'].slice(0, 20);
        } else {
            autherdes[i].innerHTML = '作者暂时没有评论';
        }

        classdes[i].innerHTML = data[i]['targetUser'].slice(0, 10);
        starttime[i].innerHTML = data[i]['firstPublishTime'].slice(0, 10);
        lasttime[i].innerHTML = data[i]['lastSubmtReviewTime'];
    }
    //动态加载图片
    i = 0;
    timer = setInterval(function() {
        let j = i;
        setTimeout(function() {
            bgimg[j].style.backgroundImage = "url('" + data[j]['bigPhotoUrl'] + "')";
        }, 200);
        if (j == data.length - 1) {
            clearInterval(timer);
        }
        i++;
    }, 100)


}


var contain = document.getElementById('contain');
var node = document.getElementsByClassName('card');
var width = node[1].offsetWidth;
//添加滚动轮播效果

//将图片标识化
for (var i = 0, len = node.length; i < len; i++) {
    node[i].index = i;
}
var index = 0; //当前视窗位置


function changeIndex() {
    var x, z, deg, difference; //改变的X,Y，和差距
    for (var i = 0; i < 20; i++) {
        if (node[i].index >= index) {
            node[i].index = node[i].index - index;
        } else if (node[i].index != 0) {
            node[i].index = 20 - index + node[i].index;
        } else {
            node[i].index = 20 - index;
        }
    }
    index = 0;
    for (var i = 0, len = node.length; i < len; i++) {
        difference = node[i].index - index; //判断是不是当前视窗位置
        if (difference == 0) {
            x = 500;
        } else if (difference == 1 || difference == 3) {
            x = 1000;
        } else if (difference == 17 || difference == 19) {
            x = 0;
        } else if (difference == 2) {
            x = 1250;
        } else if (difference > 3 && difference < 17) {
            x = 600;
        } else {
            x = -250;
        }
        if (difference == 0) {
            z = 0;
        } else if (difference == 2 || difference == 18) {
            z = -466;
        } else if (difference == 1 || difference == 19) {
            z = -115;
        } else if (difference == 3 || difference == 17) {
            z = -814;
        } else {
            z = -932;
            deg = 0;
        }
        if (difference == 0) {
            deg = 0
        } else if (difference == 1) {
            deg = 30;
        } else if (difference == 2) {
            deg = 80;
        } else if (difference == 3) {
            deg = 120;
        } else if (difference == 17) {
            deg = -120;
        } else if (difference == 18) {
            deg = -80;
        } else if (difference == 19) {
            deg = -30
        } else if (difference < 15) {
            deg = 180;
        } else {
            deg = -180;
        }
        node[i].style.transform = "translateZ(" + z + "px)" + "rotateY(" + deg + "deg)";
        node[i].style.left = x + "px";
        if (node.length - difference > 10) {
            node[i].style.zIndex = node.length - difference;
        } else {
            node[i].style.zIndex = node[i].index;
        }
    }
    for (var i = 0; i < 20; i++) {
        node[i].index = i;
    }
}
changeIndex();
for (var i = 0, len = node.length; i < len; i++) {
    (function(i) {
        node[i].onclick = function() {
            index = i;
            changeIndex();
        }
    })(i)
}