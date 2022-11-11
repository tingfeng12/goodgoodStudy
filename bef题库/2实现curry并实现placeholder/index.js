// 该问题紧接着1. 实现curry()。

// 请实现一个支持placeholder的curry()，可以像这样使用。
const  join = (a, b, c) => {
    return `${a}_${b}_${c}`
 }
 
 const curriedJoin = curry(join)
 const _ = curry.placeholder
 
 curriedJoin(1, 2, 3) // '1_2_3'
 
 curriedJoin(_, 2)(1, 3) // '1_2_3'
 
 curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'


// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
    return function a(...args){
        const expectedArgLength = fn.length
        const isArgEnough = args.length >= expectedArgLength && args.slice(0,expectedArgLength).every(arg => arg !== curry.placeholder)
    
        if(isArgEnough){
          return fn(...args)
        }else{
          return function (...newArgs){
            const finalArgs = []
            let i =0;
            let j =0;
            while(i<args.length && j<newArgs.length){
                if(args[i] === curry.placeholder){
                    finalArgs.push(newArgs[j])
                    i++;
                    j++;
                }else{
                    finalArgs.push(args[i]);
                    i++;
                }
            }
            while (i<args.length){
                finalArgs.push(args[i]);
                i++;
            }
            while(j<newArgs.length){
                finalArgs.push(newArgs[j]);
                j++;
            }

            return a(...finalArgs)
          }
        }
    }
}

curry.placeholder = Symbol()
  
// https://cloud.tencent.com/developer/article/1684438