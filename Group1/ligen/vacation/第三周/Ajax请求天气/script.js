    /*
     * @Author: Marte
     * @Date:   2017-08-11 13:56:31
     * @Last Modified by:   Marte
     * @Last Modified time: 2017-08-12 15:51:21
     */

    'use strict';
//建立的Ajax请求，需要时调用，可以进行城市设置
    function Ajax(cityid) {
        $.get('http://weixin.jirengu.com/weather/now', {
            cityid: cityid
        }, function(data, textStatus) {
            if (textStatus == "success") {
                console.log(data);
                nowdata(data);
                cloneNode(data);
            }
        }, 'json');
    }
//初始化请求
    Ajax("WXH13WQT7XKN");

//渲染now里面的数据
    function nowdata(data) {
        //对城市名称和事件数据进行填充
        $('.ui-weather-city-now').html(data.weather[0].city_name);
        $('.ui-weather-lastupdata').html(data.weather[0].last_update);
        var codeImg = "//weixin.jirengu.com/images/weather/code/" + data.weather[0].now.code + ".png";
        var today = data.weather[0].today.suggestion;
        var data = data.weather[0].now;
        console.log(today.dressing.details);
        $('.ui-weather-now img').attr('src', "http:" + codeImg);
        $('.ui-weather-now').find('.ui-weather-temperature').html(data.temperature + "<sup>o</sup>C")
            .end()
            .find('.ui-weather-more').children('span').eq(0).html(data.text)
            .next().html(data.wind_direction + '风' + data.wind_scale + '级')
            .next().html("体感温度：" + data.feels_like);
        $('.ui-weather-suggestion-dressing').find('div').html(today.dressing.details)
        $('.ui-weather-suggestion-travel').find('div').html(today.travel.details)
    }
//给两个提示添加事件
    $('.ui-weather-suggestion-dressing-icon').hover(function() {
        $(this).next().stop().slideDown(500);
    }, function() {
        $(this).next().stop().slideUp(500);
    });
    $('.ui-weather-suggestion-travel-icon').hover(function() {
        $(this).next().stop().slideDown(500);
    }, function() {
        $(this).next().stop().slideUp(500);
    });
 //下面的表格数据进行克隆数据然后添加到表单中
    function cloneNode(data) {
        var data = data.weather[0].future;
        console.log(data);
        var mynode = document.getElementsByClassName('ui-weather-other-1')[0].cloneNode(true);
        $('.ui-weather-other').empty();
        for (var i = 1, len = data.length; i < len; i++) {
            let node = mynode.cloneNode(true);
            var codeImg = "//weixin.jirengu.com/images/weather/code/" + data[i].code1 + ".png";
            $(node).find('.ui-weather-other-img').css({
                "background-image": "url(http:" + codeImg + ")"
            });
            $(node).find('span').eq(0).html(data[i].date.split(5, 8))
                .next().html(data[i].text)
                .next().html(data[i].high + "/" + data[i].low)
                .next().html(data[i].wind);
            console.log(data[i].high + "/" + data[i].low);
            $('.ui-weather-other').append(node);
        }
        console.log($('.ui-weather-other:first-child')[0]);
        // $('.ui-weather-other').remove('.ui-weather-other:first-child')
    }
 //添加更新事件
    $('.ui-weather-btn-updata').bind('click', function(event) {
        Ajax("WQQ26T2V95BZ");
    });

//实现排序功能
    $('.ui-weather-others-btn').find('button').bind('click', function(event) {
        var arr = [],//记录数据的数组
            temp;
        switch ($(this).index()) {
            case 0:
                {
                    $('.ui-weather-other-temperature').each(function() {
                        arr.push($(this).html().split('/')[0])
                    });
                };
                break;
            case 1:
                {
                    $('.ui-weather-other-temperature').each(function() {
                        arr.push($(this).html().split('/')[0] - $(this).html().split('/')[1])
                    });
                };
                break;
            case 2:
                {
                    $('.ui-weather-other-time').each(function() {
                        arr.push($(this).html().split('-').toString())
                    })
                };
                break;
            case 3:
                {
                    $('.ui-weather-other-wind').each(function() {
                        arr.push(Number($(this).html()))
                    })
                };
                break;
        }
        //通过上面数组，按照一定的规则进行排序
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] < arr[j]) {
                    console.log(j);
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    var $i = $('.ui-weather-other-1').eq(i);
                    var $j = $('.ui-weather-other-1').eq(j);
                    var $temp = $('.ui-weather-other-1').eq(j - 1)
                    $j.insertBefore($i);
                    $i.insertAfter($temp)
                }
            }
        }
    });

//更改城市的点击事件
    $('.ui-weather-btn-city').find('button').click(function(event) {
        var text = window.prompt("请输入城市名称");
        var str = '';
        for (var i = 0; i < citydata.length; i++) {
            if (text == citydata[i][1]) {
                str = citydata[i][2]
            }
        }
        if (str == "") {
            alert("不好意思暂时没有这个城市")
        } else {
            Ajax(str);
        }
    });