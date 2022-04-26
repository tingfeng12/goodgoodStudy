// 2.手写题：
// 实现一个LazyMan，可以按照以下方式调用:
//     LazyMan(“Hank”)输出:
//     Hi! This is Hank!

//     LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
//     Hi! This is Hank!
//     //等待10秒..
//     Wake up after 10
//     Eat dinner~

//     LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
//     Hi This is Hank!
//     Eat dinner~
//     Eat supper~
//     LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//     //等待5秒
//     Wake up after 5
//     Hi This is Hank!
//     Eat supper

class _LazyMan {
    constructor(name) {
      this.tasks = [];  // tasks维护将要执行的操作
      const task = () => {
        console.log(`Hi! This is ${name}!`);
        this.next();  // 当前任务执行完毕后，继续执行下一个，后续task同理
      };
      this.tasks.push(task);
      setTimeout(()=>{
        this.next();
      }, 0);
    }
    next() {
      let task = this.tasks.shift();
      task && task();
    }
    sleepFirst(time) {  // 优先执行，需放置在队首
      this.sleep(time, true);
      return this;
    }
    sleep(time, first = false) {
      let task = () => {
        const DELAY = time * 1000;
        setTimeout(()=>{
          console.log(`Wake up after ${time}`);
          this.next();
        }, DELAY);
      };
      if(first) {
        this.tasks.unshift(task);
      } else {
        this.tasks.push(task);
      }
      return this;
    }
    eat(food) {
      let task = () => {
        console.log(`Eat ${food}~`);
        this.next();
      };
      this.tasks.push(task);
      return this;
    }
  }
  
  const LazyMan = (name) => {
    return new _LazyMan(name);
  }
  LazyMan('Hank').sleep(10).eat('dinner').sleepFirst(3)