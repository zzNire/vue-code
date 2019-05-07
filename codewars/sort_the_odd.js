function sortArray(array) {
    // Return a sorted array.
    for(let i = 0;i <array.length;i++){
        if(array[i]%2===0) continue;
        var min = i;
        for(let j=i+1;j<array.length;j++){
            if(array[j]%2===0){
                continue
            }
            if(array[j]<array[min]){
                min = j;
            }
        }
        if(min !== i){
            [array[i],array[min]] = [array[min],array[i]];
        }
    }
    return array;
  }

  function sortArray(array){
      var odd = array.filter((x)=>x%2).sort((a,b)=>a-b);
      array = array.map((x)=> x%2 ? odd.shift():x );
      return array;
  }