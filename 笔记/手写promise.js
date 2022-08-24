class MyPromise {
    constructor(executor) {
        this.state = 'pending' // 默认状态 pending  成功状态 fulfilled   失败状态  rejected   当一个 promise 的 state 更改为 fulfilled 或 rejected 后，不可以再次更改其 state
        // 当调用 resolve 时会改变 state 为 fulfilled 并且将接收的值赋值给 value
        this.value = null
        // 当调用 reject 时会改变 state 为 rejected 并且将接收到的拒因赋值给 reason
        this.reason = null

        this.callbacks = []

        const resolve = value => {
            if(this,state === 'pending'){
                this.state = 'fulfulled'
                this.value = value
                this.callbacks.forEach(callback => callback.fulfilled())
            }
        }

        const reject = reason => {
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
                this.callbacks.forEach(callback => callback.rejected())
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        // onFulfilled 和 onRejected 都是可选参数
        // 如果 onFulfilled 不是一个函数，就忽略它
        // 如果 onRejected 不是一个函数，就忽略它
        if(typeof onFulfilled !== 'function') onFulfilled = value => value
        if(typeof onRejected !== 'function') onRejected = reason => {throw reason}

        // 因为promise支持then的链式调用 所以返回值 是一个 promise对象
        // 使用的是 resolve  因为 promise 状态是不应该互相影响的。上一个 promise 只要不抛错，那么下一个 promise 就应该执行 onResolved 回调
        // 将 then 中调用 resolve 的地方统一改为到 resolvePromise 中进行处理
        let promise = new MyPromise((resolve, reject) => {
            // setTimeout 使代码异步执行 因为原生 Promise 中 promise.then() 括号内部的代码是异步执行的
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try {
                        this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                    } catch(error) {
                        reject(error)
                    }
                })
            }

            if(this.state === 'rejected'){
                setTimeout(() => {
                    try {
                        this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
                    } catch(error) {
                      reject(error)
                    }
                })
            }
            // 在 executor 中使用 setTimeout 延迟执行 resolve 或 reject，我们会发现执行 then 时，当前状态为 pending，因此我们还需要加入 pending 状态下的判断。
            if(this.state === 'pending') {
                this.callbacks.push({
                    fulfilled: () => {
                        setTimeout(() => {
                          try {
                            this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                          } catch(error) {
                              reject(error)
                          }
                        })
                      },
                    rejected: () => {
                        setTimeout(() => {
                          try {
                            this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
                          } catch(error) {
                              reject(error)
                          }
                        })
                    }
                })
            }
        })
        return promise
    }

    resolvePromise(promise, result, resolve, reject) {
        //  判断是否是循环引用
        if(promise === result) reject(new TypeError('Chaining cycle detected for promise'))
        // 如果传入的 result 是一个对象或者一个函数的话，令 then = result.then。
        if(result && typeof result === 'object' || typeof result === 'function') {
            let called
            try {
              let then = result.then
              //   判断 then 是否是一个函数，如果是就说明 result 是一个 promise 对象，那就调用 then 并且把 result 作为 this，
              //   然后在成功回调中继续调用 resolvePromise 并且把拿到的值作为新的 result 传入，其他不变
              if (typeof then === 'function') {
                then.call(result, value => {
                  if (called) return
                  called = true
                  this.resolvePromise(promise, value, resolve, reject)
                }, reason => {
                  if (called) return
                  called = true
                  reject(reason)
                })
              } else {
                // 如果 then 不是一个函数，那就说明 result 是一个函数或者是一个普通对象，那就直接 resolve。
                if (called) return
                called = true
                resolve(result)
              }
            } catch (error) {
              // 如果传入的 result 不是一个对象且不是一个函数，就直接 resolve 即可，同时这也是该递归的最终状态
              if (called) return
              called = true
              reject(error)
            }
        } else {
            resolve(result)
        }
    }

    all(promises) {
        return new Promise((resolve, reject) => {
          let result = []
          let count = 0
          let currentIndex = 0
          for (let promise of promises) {
            // 接收的 promises 不止可能是数组，还可能是 Map、Set 等，因此不能简单使用 forEach 来遍历
            // 输出顺序和完成顺序是不一样的，因此用一个 resultIndex 来记录当前的 index
            let resultIndex = currentIndex
            currentIndex += 1
            Promise.resolve(promise).then(value => {
              result[resultIndex] = value
              count += 1
              if (count === currentIndex) resolve(result)
            }, reason => {
              reject(reason)
            })
          }
          if (currentIndex === 0) resolve(result)
        })
    }

    race(promises) {
        return new Promise((resolve, reject) => {
          promises.forEach(promise => Promise.resolve(promise).then(resolve, reject))
        })
    }
}