// 2.算法题：https://leetcode-cn.com/problems/decode-string/
/**
 * @param {string} s
 * @return {string}
 */
// 版本1
var decodeString = function(s) {
    const reg = /(\d+)\[([a-z]+)\]/g
    while(s.includes('[')) s = s.replace(reg, ($, $1, $2) => $2.repeat($1))
    return s
};

// 版本2
var decodeString = function(s) {
    let strarr = []
    let numarr =[]
    let str =''
    let mul =0
    for(const char of s){
        if(char>='0'&&char<='9'){
            mul = mul*10 + char*1
        }else if(char=='['){
           numarr.push(mul)
           strarr.push(str)
           str = ''
           mul=0
        }else if(char==']'){
            str = strarr.pop()+str.repeat(numarr.pop())
        }else{
            str += char
        }
    }
    return str
};