/*
* @Author: Marte
* @Date:   2017-08-26 08:07:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-27 19:25:00
*/
/*banner区域实现*/
'use strict';
var wraper = document.getElementById('bannerWraper');

var page = wraper.getElementsByTagName('div');

//初始化设置，每一项的index和层叠顺序
for(var i =0,len = page.length;i<len;i++){

    page[i].index = i + 1;

    $(page[i]).css({"z-index" : len - page[i].index+1});

    if(i == 0){

        $(page[i]).fadeIn();

    }else{

        $(page[i]).fadeOut();

    }
}
function banner(){

    var index = 1; //当前显示第几张

    var timer = null;

    var dots = document.getElementById('bannerDot').getElementsByTagName('li');

    function set(){

     clearInterval(timer);

     timer = setInterval(function(){

                index++;

                if(index==4){

                    index=1;
                }

                pageDot();

                pagescroll();

              },5000)
    }
    function pagescroll(){

        for(var i =0,len = page.length;i<len;i++){

            if(index == page[i].index){

                $(page[i]).css({"z-index" : 4});

                $(page[i]).fadeOut().fadeIn(500);

            }else{

                $(page[i]).css({"z-index" : len-page[i].index+1});

                $(page[i]).fadeIn().fadeOut(500);

            }
        }
    }
    function pageDot(){

        $(dots).removeClass('banner-active');

        $(dots[index-1]).addClass('banner-active');

    }
    $(dots).click(function(event) {

        index = $(this).index()+1;

        pageDot();

        pagescroll();
    });
    $('.banner').mouseenter(function(event) {

        clearInterval(timer)

    }).mouseleave(function(event) {

        set();

    });

    set();
}
banner();