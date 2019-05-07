
async function get(){
    try{

    
    const es_namespace = await import('./modules/index.js');
    console.log(es_namespace)
}catch(e){
    console.log(e);
}
}

get();