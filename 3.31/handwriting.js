// 1.手写题：https://bigfrontend.dev/zh/problem/implement-Object.is
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  // your code here
  if( a===b){
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return a!==0 || b!==0 || 1/b === 1/a
  }else{
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return a !== a && b!==b
  }
}