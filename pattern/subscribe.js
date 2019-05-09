/*
发布---订阅模式又叫观察者模式，它定义了对象间的一种一对多的关系，
让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，
所有依赖于它的对象都将得到通知。

1.支持简单的广播通信，当对象状态发生改变时，会自动通知已经订阅过的对象。
2.发布者与订阅者耦合性降低，发布者只管发布一条消息出去，
它不关心这条消息如何被订阅者使用，同时，订阅者只监听发布者的事件名，
只要发布者的事件名不变，它不管发布者如何改变；
*/

class player{
    constructor(){
        this.watcher = {};
    }

    push(type,...data){
        if(this.watcher[type] && this.watcher[type].length){
            this.watcher[type].forEach(callback => {
                callback.apply(this,data)
            });
        }
    }

    subscribe(type,callback){
        this.watcher[type] = this.watcher[type] || [];
        this.watcher[type].push(callback);
    }

    cancleSubscribe(type=null,callback=null){
        if(type&&callback){
            if(this.watcher[type]&&this.watcher[type].length){
                this.watcher[type].splice(this.watcher[type].findIndex((v)=>Object.is(v,callback)),1); // 同一个地址
            }
        }else if(type){
            if(this.watcher[type]&&this.watcher[type].length){
                this.watcher[type] = [];
            }
        }else if(!type && !callback){
            this.watcher = {};
        }
    }
}

var music_player = new player();
var play_callback = function(){
    console.log('play_callbcak');
}
var stop_callback = function(){
    console.log('stop_callbcak');
}
music_player.subscribe('play',play_callback);
music_player.subscribe('stop',stop_callback);

setTimeout(() => {
    music_player.push('play',1);
}, 1000);

setTimeout(() => {
    music_player.push('stop',1);
}, 3000);

document.getElementsByTagName('body')[0].addEventListener('click',()=>{
    music_player.push('play',1);
})

document.querySelector