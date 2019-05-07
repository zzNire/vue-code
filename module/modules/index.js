function partition(arr,start,end) {
  if(start > end) {
      return;
  }
  var i = start,
      j = end,
      part = arr[start];
  while(i != j) {
      while(j>i && arr[j] <= part) {
          j--;
      }
      while(i<j && arr[i] >= part) {
          i++;
      }
      if(i<j) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  }
  arr[start] = arr[i];
  arr[i] = part;
  return i;
    
}
function get(arr,k) {
  var i = 0,
      j = arr.length-1;
  k = k-1;
  while(i<=j) {
      let index = partition(arr,i,j);
      if(index == k) {
          return arr[index];
      }else if(index > k) {
          j = index - 1;
      }else {
          i = index + 1;
      }
  }
  return;
}