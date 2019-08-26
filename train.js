

function getOwnPropertyDescriptors(obj) {
    var result = {};
    for(key of Object.getOwnPropertyNames(obj)){
        result[key] = Object.getOwnPropertyDescriptor(obj,key);
    }
    return result;
}