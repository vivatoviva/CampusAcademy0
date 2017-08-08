/*
 * @Author: Marte
 * @Date:   2017-08-02 22:21:59
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-08-02 22:59:41
 */

'use strict';
(function(window, undefined) {
    var timer = null; //存放定时器
    var contain; //为调用函数是获取对应的节点
    var index = 0; //用来记录现在的第几页
    var node;
    var Dots;
    //成员初始化
    var init = function() {
        contain = document.getElementById('contain');
        node = document.getElementById('box');
        Dots = document.getElementById('dot').getElementsByTagName('a');
    }

    function changePosition(node, index, s) {
        var target = -index * contain.offsetHeight;
        clearInterval(timer);
        var s = s || 20; //用来控制切换速度
        timer = setInterval(function() {
            var now = node.offsetTop,
                speed = Math.ceil((target - now) / s);
            if (speed == 0) {
                speed = Math.floor((target - now) / s)
            }
            if (now == target) {
                console.log("daole");
                clearInterval(timer);
            }
            node.style.top = now + speed + "px";
        }, 10)
    }

    function changeindex(B, i) {
        console.log();
        if (arguments.length == 2) {
            index = i;
        } else if (B && index < Dots.length - 2) {
            index++;
        } else if (!B && index > 0) {
            index--;
        }
        changeDot();
        changePosition(node, index)
    }

    function changeDot() {
        for (var i = 0, len = Dots.length; i < len; i++) {
            Dots[i].className = '';
        }
        Dots[index].className = 'now'
    }
    window.changeIndex = changeindex;
    window.init = init;
    window.changeindex = changeindex;
})(window)
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
var debounceIndex = debounce(changeIndex, 300);
window.onload = function() {
    var Dots = document.getElementById('dot').getElementsByTagName('a');
    init();//初始化模块中的值;
    if ('onmousewheel' in window) {
        window.onmousewheel = function() {
            if (event.deltaY > 0) {
                debounceIndex(true)
            }
            if (event.deltaY < 0) {
                debounceIndex(false)
            }
        }
    } else {
        window.addEventListener('DOMMouseScroll', function(event) {
            if (event.detail > 0) {
                debounceIndex(true)
            }
            if (event.detail < 0) {
                debounceIndex(false)
            }
        })
    }
    for (var i = 0, len = Dots.length; i < len; i++) {
        let j = i;
        Dots[j].onclick = function() {
            if (j == len - 1) {
                changeindex(true, 0);
                return;
            }
            changeindex(true, j)
        }
    }


}