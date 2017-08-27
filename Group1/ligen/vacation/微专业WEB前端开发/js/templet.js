/*
* @Author: Marte
* @Date:   2017-08-26 11:29:34
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-27 21:21:22
*/
/*完成三个模板的渲染*/
'use strict';

/*完成课程区域的渲染*/

//实现每次进入或刷新本页面，“热门推荐”模块中，

//接口返回20门课程数据，默认展示前10门课程，

//隔5秒更新一门课程，

//实现滚动更新热门课程的效果

/* 第一部分 右侧模板块*/

//首先得到模板
var rank= $('#rankTemplate').html();

var  rankTemplate = Handlebars.compile(rank);


//渲染插入

function Ajaxrank(){

    $.get("http://study.163.com/webDev/hotcouresByCategory.htm",function(data,textStatus){

        if(textStatus == 'success'){

            var a = JSON.parse(data);

            var lis =  rankTemplate(a);

            $('.course-rank ul').html(lis);

            updata();

        }else{
            alert("请求数据出错");
        }
    })

}

Ajaxrank();

//隔5秒更新一门课程，
function updata(){

    var timer;

    timer = setInterval(function(){
        $('.course-rank ul').animate({"top":"-68px"}, 1000,function(){

            $('.course-rank ul').css({"top":"0"})

            var temp = $('.course-rank li').eq(0).detach("");

                    $('.course-rank ul').append(temp);

        })


    },5000)
}
/*   课程展示     */
    var pageindex = 1,pagesize,pagetype = 20;

    var updot = true;

function AjaxLesson(pageindex,pagesize,pagetype){

       $.get("http://study.163.com/webDev/couresByCategory.htm",{

            "pageNo":pageindex,

            "psize":pagesize,

            "type":pagetype

        },function(data,textStatus){

            if(textStatus == "success"){

                var a = $.parseJSON(data);

                /*对数据进行填充*/

                templete(a)
            }

        })
}
/* 渲染第一个列表 */


$(".tab button").click(function(event) {

    /*pagetype*/

    $(".tab button").removeClass('lesson-active');

    $(this).addClass('lesson-active');

    if($(this).index()==1){

        if(pagetype != 20){

            updot = true;

        }

        pagetype = 20;

    }else{

        if(pagetype != 10){

            updot = true;

        }

        pagetype = 10;
    }
    /*pagesize*/
    getdata();


});

function getdata(){

 var width = $('body').outerWidth()+17;


    if(width>1204){
        if(pagesize != 20){

            pageindex = 1;


        }

       updot = true;

       pagesize = 20;

    }else{

        if(pagesize != 15){

            pageindex = 1;

        }
        updot = true;

        pagesize = 15;

    }

    AjaxLesson(pageindex,pagesize,pagetype);

}

$(".tab button").eq(0).click();

function templete(data){

    var lesson= $('#lessonTemplate').html();

    var  lessonTemplate = Handlebars.compile(lesson);


      Handlebars.registerHelper("zero",function(price){

               if(price==0){

                 return "免费";

               }else{

                 return price;

               }

             });

    /*将lis添加到列表中*/
    var lis =  lessonTemplate(data);

    $('.course-lesson-items').html(lis);


    /*下面添加点击按钮效果进行刷新效果*/

    if(updot){
        console.log("gengxin1anu");
        lessonDot(data);

    }
}

function lessonDot(data){
    var index = pageindex;

     /*渲染点击按钮和其他数据*/
    var str = "";

    for(var i = 1;i <= data.totalPage;i++){

       if(i == index){

        str += "<li class='page-active'>"+i+"</li>";

    }else{

        str += "<li>"+i+"</li>"

    }

    }

    $('.course-lesson-page ul').html(str);
    /*添加事件*/
    updot = false;

    var $lis  = $('.course-lesson-page li');

    var $btn = $('.course-lesson-page button');


    $lis.off().click(function(event) {

        index = pageindex = $(this).index() + 1;

        AjaxLesson(pageindex,pagesize,pagetype);

        $lis.removeClass('page-active');

        $lis.eq(index-1).addClass('page-active');

    });

    $btn.off().click(function(event) {

        if($(this).index() == 0){

             index--;
             if(index == 0){
                index = 1
             }

        }else{

            index++;

            if(index==$lis.length+1){

                index = $lis.length;

            }

        }

        pageindex = index;

        AjaxLesson(pageindex,pagesize,pagetype);

        $lis.removeClass('page-active');

        $lis.eq(index-1).addClass('page-active')

    });


}

$(window).resize(function(event) {

    debounce(function(){

       getdata();

},100)()

});
var i = 0;
/*节流函数*/
function debounce(func, delay) {

    i=0;

  return function(args) {

    var _this = this

    var _args = args

    clearTimeout(func.id)

    func.id = setTimeout(function() {

      if(i == 0){

        func.call(_this, _args);

        i++;

        console.log(i,"执行一次");

    }else{

    }
    }, delay)

 }
}