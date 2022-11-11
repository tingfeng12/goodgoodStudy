// https://bigfrontend.dev/zh/problem/implement-curry
// 柯里化(Currying) 在JavaScript是一个常用的技巧。

// 请实现一个curry()方法，接受一个function然后返回一个柯里化过后的function。

// demo
const join = (a, b, c) => {
    return `${a}_${b}_${c}`
 }
 
 const curriedJoin = curry(join)
 
 curriedJoin(1, 2, 3) // '1_2_3'
 
 curriedJoin(1)(2, 3) // '1_2_3'
 
 curriedJoin(1, 2)(3) // '1_2_3'

// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
// function curry(fn) {
// // your code here
// }
function curry(fn) {
    // your code here
    return function a(...args){
        if(args.length >= fn.length){
          return fn(...args)
        }else{
          return function (...arg){
            return a(...args,...arg)
          }
        }
    }
}
  
// https://javascript.info/currying-partials

// https://lodash.com/docs/4.17.15#curry   中文文档地址  https://www.lodashjs.com/docs/lodash.curry
  