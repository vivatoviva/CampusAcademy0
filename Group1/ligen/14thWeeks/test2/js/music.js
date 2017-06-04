/*
* @Author: Marte
* @Date:   2017-06-03 18:09:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-03 18:58:41
*/


    var music = document.getElementsByClassName('music')[0],
        lis = music.getElementsByTagName('li'),
        audio = document.getElementsByTagName('audio')[0],
        pos = 0;
                                   //pos =0代表已经关闭 反之 则代表已经打开音乐
        for(i=0;i<lis.length;i++){
            lis[i].pos = 0;
            if(i!=0&&i!=5)lis[i].className = "stop";
        }
        function qingchu(){
            for(i=0;i<lis.length;i++){
                if(i!=0&&i!=5)lis[i].className = "stop";
        }
        }
        qingchu();
        function play(){    //对音乐打开是否做判断
            qingchu();
            if(i!=0&&i!=5){
                if(this.pos==0){
                    this.className = "start";
                    this.pos++;
                    audio.play();
                }else{
                    this.pos--;
                    audio.pause();
                }
            }
        }
        for(i=0;i<lis.length;i++){

            if(i!=0&&i!=5){
                (function(i){
                    lis[i].onclick = play;
                })(i)
            }

        }

