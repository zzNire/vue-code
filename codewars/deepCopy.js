function deepCopy(obj, cache = []){
    if(typeof obj !== 'object' || obj === null){
        return obj
    }

    const hit = catch.filter(f=>f.original === obj)
    if(hit){
      return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};
    catch.push({
        original:obj,
        copy
    })

    Object.keys(obj).forEach(key=>{
        copy[key] = deepCopy(obj[key],catch);
    })
}