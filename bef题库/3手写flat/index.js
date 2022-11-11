// Array.prototype.flat()可以用来扁平化数组。

// 你能够自己实现一个flat么？
// const arr = [1, [2], [3, [4]]];

// flat(arr) // [1, 2, 3, [4]]
// flat(arr, 1) // [1, 2, 3, [4]]
// flat(arr, 2) // [1, 2, 3, 4]
// 追问
// 能否不用递归而用迭代的方式实现？

// 思路 
// 第一步 遍历指定层级的数组   for循环 for...of  for...in  forEach  entries  keys  values  reduce  map
// 只要能遍历到数组的每一个元素的方法就都是可行的方案
// 第二步 判断遍历的对象是不是数组      instanceof    constructor    object.prototype.toString   isArray
// arr instanceof Array       arr.constructor === Array   object.prototype.toString.call(arr) === '[object Array]'  Array.isArray(arr)
// 第三步 数组展开  拓展运算符+concat  concat+apply  toString+split（不建议 js中不要频繁的操作字符串 如果数组是纯数字数组可行 其他情况会有问题）  
//  [].concat(...arr)     [].concat.apply([], arr);     arr2.toString().split(',').map(v=>parseInt(v))

// function flat(arr, num = 1){
//     if (num <= 0) return arr.slice()
//     return arr.reduce(
//         (pre, cur)=>
//             pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),[]
//     )
// }

// 不使用递归
function flat (arr, depth = 1) {
    const stack = arr.map(item => [item, depth])
    const res = []

    while( stack.length > 0){
        const [item , itemDepth] = stack.pop()
        // 先拿出最后一项元素
        if(Array.isArray(item) && itemDepth > 0){
            // 是数组的情况下并且需要解构  进行处理并加回到原数组
            stack.push(...item.map(i => [i, itemDepth - 1]))
        }else {
            // 因为是最后一项 所以从头部插入
            res.unshift(item)
        }
    }
    return res
}