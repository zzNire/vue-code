function A (){
    var x = 1;
  return function(){
      console.log(x);
  }
  }

  A()();