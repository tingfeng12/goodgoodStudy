<!-- 原文 https://javascript.info/currying-partials -->

curry（函数柯里化）是一种处理函数的高级技术。它不仅在JavaScript中使用，也在其他语言中使用。

curry是一种函数转换，它将函数从f(a, b, c)的可调用转换为f(a)(b)(c)的可调用。

curry不会调用函数。只是变换了一下。

让我们先看一个例子，以便更好地理解我们在讨论什么，然后再看实际应用。

我们将创建一个辅助函数curry(f)，它对双参数f执行curry。换句话说，对于双参数f(a, b)， curry(f)将它转换为一个以f(a)(b)运行的函数:

function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3

如您所见，实现非常简单:它只有两个包装器。

curry(func)的结果是包装了 function(a)。
当它像curriedSum(1)那样被调用时，参数被保存在Lexical Environment中，并返回一个新的包装 function(b)。
然后使用2作为参数调用这个 包装之后的函数，并将调用传递给原始的和。

curry的更高级实现，例如_。从lodash库中的Curry返回一个包装器，该包装器允许正常和部分调用函数:
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially

为什么有柯里化 ，好处是什么？
为了理解这些好处，我们需要一个有价值的现实例子。

例如，我们有日志功能log(日期、重要性、消息)，它格式化和输出信息。在实际项目中，这类函数有很多有用的特性，比如通过网络发送日志，这里我们只使用alert:
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

柯里化操作后
log = _.curry(log);

在日志正常工作之后:
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)

也可以写成柯里化的形式
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

现在我们可以很容易地为当前日志创建一个方便的函数:
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message

现在logNow是第一个参数固定的log，换句话说就是“部分应用函数”或简称为“partial”。

我们可以更进一步，为当前调试日志创建一个方便的函数:
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

所以:

柯里化之后我们没有丢失任何东西:日志仍然正常调用。
我们可以很容易地生成部分函数，例如今天的日志。
实现先进的柯里化
如果你想深入了解细节，这里是我们上面可以使用的多参数函数的“高级”curry实现。

简洁的一个柯里化方法
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

测试用例

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying

新的柯里化看起来很复杂，但实际上很容易理解。

curry(func)调用的结果是包装的curry，看起来像这样:
// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};

当我们运行它时，有两个if执行分支:

如果传递的参数count与原函数的定义(func.length)相同或更多，则只需使用func.apply将调用传递给它。
否则，获取部分:我们还没有调用func。相反，将返回另一个包装器，该包装器将重新应用curry并提供先前的参数和新参数。
然后，如果我们再次调用它，我们要么得到一个新的部分(如果没有足够的参数)，要么最终得到结果。

只能是固定长度的方法
curry要求函数具有固定数量的参数。

一个函数使用剩余的参数 可以使用例如  f(...args)  柯里化不能这样做
（原文： A function that uses rest parameters, such as f(...args), can’t be curried this way.）

在柯里化中传入更多的参数
根据定义，curry应该将sum(a, b, c)转换为sum(a)(b)(c)。

但是，如前所述，在JavaScript中大多数curry的实现都是高级的:它们还保持了函数在多参数变体中的可调用性。

总结
curry变换使f(a,b,c)可调用为f(a)(b)(c)。JavaScript实现通常既保持函数正常可调用，又在参数计数不足时返回部分。

柯里化让我们很容易得到部分方法。正如我们在日志示例中所看到的，在对三个参数进行套用后，通用函数log(date, importance, message)在使用一个参数(如log(date))或两个参数(如log(date, importance))调用时，会给出部分结果。

