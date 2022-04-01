// 2.手写题：https://bigfrontend.dev/zh/problem/the-angle-between-hour-hand-and-minute-hand-of-a-clock
/**
 * @param {string} time
 * @returns {number} 
 */
function angle(time) {
  // your code here
  let h=time.split(':')[0]*1
  let m=time.split(':')[1]*1
  let hangle = h%12*30+m/2
  let mangle = m/60*360
  let anglenumber = hangle-mangle>180?Math.abs(360-hangle+mangle):Math.abs(hangle-mangle)
  return Math.ceil(Math.min(anglenumber,360-anglenumber))
}