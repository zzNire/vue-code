class Middleware{
    constructor(){
        this.subscribers = {};
    }

    subscribe(type,fn,context){
        var right_subscribe = this.subscribers[type] = this.subscribers[type] || [];
        right_subscribe.push({fn,context});
    }
    dispatch(type,...args){
        var fns = this.subscribers[type];
        fns.forEach(fn_des => {
        fn_des.fn.apply(fn_des.context,args)
        });
        
    }
}
var middleware = new Middleware();

class Player{
    constructor(type){
        this.type = type;
        this.count = 0;
        middleware.dispatch('addPlayer',this);
    }
    play(){
        this.count++;
        middleware.dispatch('play',this.type);
    }
}

class Gamer{
    constructor(){
        this.players = {};
        middleware.subscribe('addPlayer',this.addPlayer,this);
        middleware.subscribe('play',this.played,this);
        window.addEventListener('keypress',this.kepress.bind(this));

    }
    kepress(e){
        var player = this.players[e.which];
        player.play();
    }
    addPlayer(player){
        this.players[player.type] = player;
    }
    played(type){
        var players = this.players;
        var scores = {

        }
        Object.defineProperty(scores,'toString',{
            enumerable:false,
            value:function(){
                for(let key in this){
                    console.log(key +' : ' + this[key]);
                }
            }
        })
        for(let key in players){
            scores[key] = players[key].count;
        }
        middleware.dispatch('scoreupdate',scores);
    }
}

class ScoreBoard{
    constructor(){
        middleware.subscribe('scoreupdate',this.print,this);
    }
    print(scores){
        scores.toString();
    }
}

var board = new ScoreBoard();
var gamer = new Gamer();

var player = new Player(49);
var player = new Player(50);


