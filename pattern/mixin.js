/*
Mixin模式
多个对象合成一个新的对象，新对象具有各个组成成员的接口
*/
function mix(...mixins){
    class Mix{
      constructor(){
        for(let mix of mixins){
          copyProperties(this,new mix()); //拷贝实例属性
        }
      }
    }
    for(let mix of mixins){
      copyProperties(Mix,mix); // 拷贝静态属性
      copyProperties(Mix.prototype,mix.prototype); //拷贝原型属性
    }
    return Mix;
  }
  
  function copyProperties(target,source){
    for(let key of Reflect.ownKeys(source)){
      if(key!=='constructor' 
      && key!=='name'
      && key!=='prototype'){
        let desc = Object.getOwnPropertyDescriptor(source,ley);
        Object.defineProperty(target,key,desc);
      }
    }
  }