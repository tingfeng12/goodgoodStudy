// 柯里化
function curry(func) {
    //此处补全
    return function curried() {
        // arguments不是数组 通过[].slice.call转化为数组
        var args = [].slice.call(arguments),context = this;
        // 判断当前断参数长度与函数断参数长度  如果参数足够则执行函数 不够则继续进行递归
        return args.length >= func.length ?
            func.apply(context, args) :
            function () {
                var rest = [].slice.call(arguments)
                return curried.apply(context, args.concat(rest))
            }
    }
}
function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3)); // 6, still callable normally
console.log(curriedSum(1)(2, 3)); // 6, currying of 1st arg
console.log(curriedSum(1)(2)(3)); 

// 柯里化
// 柯里化是将一个多参数组拆封成一系列参上 每个拆封后的函数接受一个参数
// 柯里化函数返回的是一个函数 函数存储了this指针和传入的参数  利用arguments将所以的参数进行收集
// 柯里化的应用 
// 1参数复用-多次调用同一个函数且参数多数相同时
// 2提前返回-多次调用多次内部判读可以直接把第一次判断结果返回外部接受
// 3推迟计算/运行-避免重复执行函数等待需要结果时在进行执行

// 函数柯里化是否需要考虑this
// 我认为是有必要考虑this ，函数是执行时决定作用域链，柯里化考虑this可以保证柯里化的函数的this指针不变 原函数的作用域链不被改变
// 当柯里化的函数与作用域链无关时可以不考虑this 


// 考函数式编程，this的副作用 