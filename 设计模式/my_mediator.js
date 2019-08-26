class Mediator{
    constructor(){
        this.players = {};

    }
    update(){
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
        scores.toString();
    }
    kepress(e){
        var player = this.players[e.which];
        player.play();
    }
    init(keys){
        var players = this.players;
        keys.forEach(key => {
            players[key] = new Player(key);
        });
        window.addEventListener('keypress',this.kepress.bind(this));
    }
}

class Player{
    constructor(key){
        this.count = 0;
        this.key = key;
    }   
    play(){
        this.count++;
        this.mediator.update();
    }
}
var mediator = new Mediator();
mediator.init([49,48]);
Player.prototype.mediator = mediator;
