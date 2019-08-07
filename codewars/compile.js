function baseCompile(template,options){

}

function createCompilerCreator(baseCompile){
    return function createCompile(baseOptions){
        function compile(template,options){
            var mixoptions = fn(options,baseptions)
            baseCompile(template,mixoptions);
        }
        return createCompileFn(compile);
    }
    
}

function createCompileFn(compile){
    return function compileToFn(template,options,vm){
        var handleOptions = fn(options);
        compile(template,handleOptions);
    }
}


var createCompile = createCompilerCreator(baseCompile);
var createCompileFn = createCompile(baseOptions);

var compileToFn = createCompileFn(template,options,vm);

