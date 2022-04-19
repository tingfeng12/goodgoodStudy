// 2.手写题：https://bigfrontend.dev/zh/problem/remove-characters
/**
 * @param {string} input
 * @returns string
 */
function removeChars(input) {
    // your code here
    input = input.split('b').join('')
    while(input.includes('ac')){
      input = input.split('ac').join('')
    }
    return input
  }
  