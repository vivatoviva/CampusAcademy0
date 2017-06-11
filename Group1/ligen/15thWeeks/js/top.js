/*
* @Author: Marte
* @Date:   2017-06-09 21:38:33
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-11 21:42:02
*/

'use strict';
window.onload = function(){
      var header = document.getElementsByTagName('header')[0],
          more = document.getElementById("hover_nav"),
          weichat = document.getElementById("hover_weichat");
          more.pos = 0;
          weichat.pos = 0;
          var cli = function(event,ele){            //ele 要控制的节点
                          if(ele.pos == 0){
                              ele.className = "hide animated bounceInDown";
                              ele.style.display = "inherit";
                              ele.pos++;
                          }
                          else {
                              ele.className = "hide animated bounceOutDown";
                              //more.style.display = "none";
                              ele.pos=0;
                          }
                      }
          header.addEventListener('click',function(event){
                   var id = event.target.id;
                   switch(id){
                    case "more":
                        if(weichat.pos != 0){cli(event,weichat)};
                            cli(event,more);
                          break;
                    case "btn_weichat":
                        if(more.pos != 0){cli(event,more)};
                          cli(event,weichat);
                          break;
                      case 'hover_weichat':
                          cli(event,weichat);
                          break;
                        case 'li1' :
                        case 'li2' :
                        case 'li3' :
                        case 'li4' :
                        if(weichat.pos != 0){cli(event,weichat)};
                            cli(event,more);
                          break;
                   }
          })


}