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

document.que