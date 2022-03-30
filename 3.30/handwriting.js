// 1.编程题：https://bigfrontend.dev/zh/problem/implement-Promise-allSettled

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
    // your code here
    return new Promise((resolve,reject) =>{
      let len = promises.length
      let result = []
      if(len === 0){
          resolve([])
          return
        }
      function Result(i,data){
        result[i]=data
          // 全部处理完成
          if(i === len - 1){
            resolve(result)
            return
          }
      }
      
      promises.forEach((item,i) =>{
        Promise.resolve(promises[i]).then(value => {
            Result(i, {
              status: 'fulfilled',
              value
            })
          }).catch(reason => {
            Result(i, {
              status: 'rejected',
              reason
            })
          })
      })
    })
  }
  
  