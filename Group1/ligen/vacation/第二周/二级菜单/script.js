/*
* @Author: Marte
* @Date:   2017-08-02 10:46:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 16:11:43
*/

'use strict';
/*

实现这个效果，根据Html结构来说，li悬停之后打开对应的页面
当鼠标在对应页面，导航按钮是触发的
1. 当li添加鼠标移入事件
2. 给对用的页面添加移出事件（用来反馈事件）
 */
//给对应的节点
HTMLCollection.prototype.getnum = function(node){
 for(let i = 0,len =this.length;i<len;i++){
    if(this[i] == node){
        return i;
    }
 }
}
function movein(node,nodelist,pagelist){
    //清除其他节点的classname，将其他页面进行隐藏
    if(node.nodeName == 'LI'){
        node.className = 'active';
        pagelist[nodelist.getnum(node)].className+= ' target'
    }else {
        node.className +=" target"
        nodelist[pagelist.getnum(node)].className = 'active'
    }
}

function moveleave(node,nodelist,pagelist){
        if(node.nodeName == "LI"){
            node.className='';
            pagelist[nodelist.getnum(node)].className = pagelist[nodelist.getnum(node)].className.replace(' target','');
        }else{
            nodelist[pagelist.getnum(node)].className = '';
            node.className = node.className.replace(' target','')
        }
    }
window.onload = function(){

    var lis = document.getElementById('hover').getElementsByTagName('li'),
        pagelist = document.getElementsByClassName('page');
        //li的移入移出添加事件
        for(var i = 0,len = lis.length;i<len;i++){
            let j = i;
            lis[j].onmouseover = function(){
                movein(lis[j],lis,pagelist);
            }
            lis[j].onmouseout = function(){
                moveleave(lis[j],lis,pagelist);
            }
        }
        //page的移入移出添加事件
        for(var i = 0,len = pagelist.length;i<len;i++){
            let j = i;
            pagelist[j].onmouseenter = function(){
                movein(pagelist[j],lis,pagelist);
            }
            pagelist[j].onmouseleave = function(){
                moveleave(pagelist[j],lis,pagelist);
            }
        }
}