/*引入获取cookie的三个函数 点击不显示*/
function setCookie(name, value, iDay)
{
    var oDate=new Date();

    oDate.setDate(oDate.getDate()+iDay);

    document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
    var arr=document.cookie.split('; ');

    var i=0;

    for(i=0;i<arr.length;i++)
    {

        var arr2=arr[i].split('=');

        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }

    return '';
}
jQuery.support.cors = true;

function removeCookie(name)
{

    setCookie(name, '1', -1);

}
$(function(){
    //提醒的cookie设置为 remind
    function remind(){

        $(document.getElementById('remind')).click(function(event) {

            setCookie("remind",true,30);

            $('.remind').hide();

        });
    }

    remind();
})