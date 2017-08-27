/*
* @Author: Marte
* @Date:   2017-08-26 10:29:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-27 20:59:30
*/
/*两个蒙版功能的实现*/
'use strict';

$(function(){
    /*单个jQ对象居中显示*/
    $.extend({
        "center" : function(obj){
            var width = $(window).width(),

                height = $(window).height();

            obj.css({
                "left" : width/2 - obj.width()/2 + $(window).scrollLeft() + "px",

                "top" : height/2 -obj.height()/2 + $(window).scrollTop()+ "px"
            });
        }
    });
    var $bg = $('.bg')
    /*播放碳层出现*/
    var playBtn = document.getElementById('play');

         $bg.click(function(event) {

                $(this).hide();

            });
    $(playBtn).click(function(event) {

        $bg.css({'height' : $('body').innerHeight() + "px"}).show().find('.bg-2').show();

        $.center($('.bg-2'));

        $('.bg-2').click(function(event) {

            if(event.target.nodeName == "IMG"){

                $('.bg').hide().find('.bg-2').hide();

                $('video').get(0).pause()

            }

            event.stopPropagation();
        });
    });


    /*登录判断*/
    if(getCookie('logoinSuc')&&getCookie('followSuc')){

        allFollow()

        }
    /* 登录弹出层设置*/
    var login = document.getElementById('login');

    var loginBtn = document.getElementsByTagName('button')[0];

    var $loginBtn = $(loginBtn);

    $loginBtn.click(function(event) {

        if(getCookie('loginSuc')){
                //成功登录的
                if(getCookie('followSuc')){

                   allFollow();

                }else{

                    Ajaxfollow();

                }

        }else{

           /*表单上按钮处理*/
            $bg.css({'height' : $('body').innerHeight() + "px"}).show();

            $.center($('.bg-1'));

            $('.bg-1').show().click(function(event) {

            if(event.target.nodeName == "IMG"){

                $bg.hide().find('.bg-1').hide();

            }
            event.stopPropagation();
            });

             /*登录表单进行处理*/
            $('.bg-1 button').click(function(event) {

                var name = hex_md5($('#name').val());

                var password = hex_md5($('#password').val());

                 /*设置请求登录*/

                Ajaxlogin(name,password);
                return false;

            });
        }

    });
    /*请求登录*/
    function Ajaxlogin(name,password){

        $.get("http://study.163.com/webDev/login.htm",{

            userName : name,

            password : password

        },function(data,textStatus){

            if(textStatus == "success"){

                if(data == 1){

                    $('.bg').hide().find('.bg-1').hide();

                    setCookie('loginSuc',"true", 30);

                    Ajaxfollow();

                }else{

                    alert('登录失败');

                }

            }

        })
    }
    /*请求关注*/
    function Ajaxfollow(){

        $.get("http://study.163.com/webDev/attention.htm",function(data,textStatus){

            if(textStatus == 'success'){
                if(data == 1){

                 setCookie('followSuc',"true", 30);

                 allFollow();

                }else{

                 alert('关注失败')

                 removeCookie("followSuc");

                }
            }
        })
    }

    function allFollow(){

        $('.btn').removeClass('follow').addClass('all-follow')

        .find('button').html("<span></span>已关注")

        .end().find('p').html("取消")



    }
    /*点击取消按钮*/

    $("#login p").click(function(event) {
        removeCookie('followSuc');
        $(".btn").removeClass('all-follow').addClass('follow')

         .find('button').html("<span></span>关注")

        .end().find('p').html("粉丝 51")

    });

})
