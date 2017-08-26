
    //我要完成 点击滑动跳转到对应的时间点，
    //拖动时间轴，
    //拖动时间轴的同事，右侧进行实时更新
    //拖动放手后会根据速度进行滑动一点距离


$(document).ready(function(){
    //点击对应收回
    var timer = null;//定时器
    //给隐藏的元素绑定隐藏显示
    $('.items').click(function(){
        $('.detail').stop().slideUp('slow')
        if(!$(this).find('.detail').is(":hidden")){
            $(this).children('.detail').stop().slideUp('slow')
        }else{
            $(this).children('.detail').stop().slideDown('solw');
        }
    })


    //首先将左侧面板和右侧时间进行绑定
    $('.year ul li').click(function(event) {
        event.stopPropagation();
        $(this).parent().children().removeClass('active')
        $(this).addClass("active");
        var str = ".year-" + $(this).html();
        var top = $(str).position().top;
        $('.box').stop().animate({"top":-top+"px"}, 1000)
        // $('.box').css({"top" : -top+"px"})
     });
    //将使用拖拽功能拖动元素
   /* $('.contain').bind('mousedown', function(event) {
        var lastY = event.pageY;
        var y;
        var speed;
        $('.contain').bind('mousemove', function(event) {
           // $('.detail').hide();
            y = event.pageY;
            if (lastY) {
                var top = $('.box').position().top;
                var a = top - (lastY - y) - 20;
                ($('.box').css({
                    "top": a + "px"
                }))
            }
            speed = lastY - y;
            lastY = event.pageY;
            i=0;
            guanlian();

        });
        var i;
        $('.contain').mouseup(function(event) {
           if(i==0){
                i++;move(speed);
            }///可能是mouseup触发两次
            $('.contain').unbind('mousemove')
        });
    });*/
//添加鼠标点击事件，默认捕获阶段实现
  $('.contain')[0].addEventListener('mousedown',function(event){
    event.stopPropagation();//阻止事件传递
       var lastY = event.pageY;
        var y;
        var speed;
        $('.contain').bind('mousemove', function(event) {
           $('.detail').hide('fast');
            y = event.pageY;
            if (lastY) {
                var top = $('.box').position().top;
                var a = top - (lastY - y) - 20;
                ($('.box').css({
                    "top": a + "px"
                }))
            }
            speed = lastY - y;
            lastY = event.pageY;
            i=0;
            $.fn.guanlian();

        });
        var i;
        $('.contain').mouseup(function(event) {
           if(i==0){
                i++;move(speed);
            }///可能是mouseup触发两次
            $('.contain').unbind('mousemove')
        });
  },true)

    //添加滚轮事件
    window.onmousewheel = function(){
        $('.detail').hide();
        if(event.wheelDelta>0){//向上滑动
            $('.active').prev().click();
        }else{
            $('.active').next().click();
        }
    }
    function move(speed){
            var top =  Math.round($('.box').position().top-20);
            var target =top+(-speed*30);
            clearInterval(timer);
            timer=setInterval(function(){
                var now = Math.round($('.box').position().top-20);//将变成css上面的top
                var speed = (target-now)>0 ? Math.ceil((target-now)/10):Math.floor((target-now)/10);
               // console.log(now,target,speed);
                if(now == target){
                    clearInterval(timer);
                    timer = null;
                    console.log(now);
                    if(now>0){
                        callback(0);
                    }
                    if(now<-3344){
                        callback(-3344)
                    }
                }else{
                    $('.box').css({"top" : now+speed+"px"})
                }
                $.fn.guanlian();
            },10)
    }
    //将超出部分进行修正
    function callback(target){
           clearInterval(timer);
            timer=setInterval(function(){
                var now = $('.box').position().top-20;//将变成css上面的top
                var speed = (target-now)>0 ? Math.ceil((target-now)/10):Math.floor((target-now)/10);
               // console.log(now,target,speed);
                if(now == target){
                    clearInterval(timer);
                    timer = null;
                }else{
                    //总能优化
                    //$('.box').css({"top" : now+speed+"px"})
                    $('.box')[0].style.top = now+speed+"px";
                }
                console.log(timer);
                $.fn.guanlian();
            },10)
             $.fn.guanlian();
    }
})
jQuery.fn.guanlian = function(){
            var top2017 = $('.year-2017').position().top;
            var top2016 = $('.year-2016').position().top;
            var top2015 = $('.year-2015').position().top;
            var top2014 = $('.year-2014').position().top;
            var top2013 = $('.year-2013').position().top;
            var top2012 = $('.year-2012').position().top;
            var top2011 = $('.year-2011').position().top;
            var top2010 = $('.year-2010').position().top;
            var now = -Math.round($('.box').position().top)+20;
            if(now>top2017){
                 $('ul li').removeClass('active');
                 $('ul li').eq(0).addClass('active');
            }
            if(now>top2016){
                 $('ul li').removeClass('active');
                 $('ul li').eq(1).addClass('active');
            }
            if(now>top2015){
                 $('ul li').removeClass('active');
                 $('ul li').eq(2).addClass('active');
            }
            if(now>top2014){
                 $('ul li').removeClass('active');
                 $('ul li').eq(3).addClass('active');
            }
            if(now>top2013){
                 $('ul li').removeClass('active');
                 $('ul li').eq(4).addClass('active');
            }
            if(now>top2012){
                 $('ul li').removeClass('active');
                 $('ul li').eq(5).addClass('active');
            }
            if(now>top2011){
                 $('ul li').removeClass('active');
                 $('ul li').eq(6).addClass('active');
            }
            if(now>top2010){
                 $('ul li').removeClass('active');
                 $('ul li').eq(7).addClass('active');
            }
            return this;
}