面试官：请描述下memo/useMemo/useCallback用法上的区别，你在工作中都用他们处理过什么业务场景？
你：___________________________
面试官：那么useMemo/useCallback源码实现上区别在哪？我们来看下你的编程能力，请手写下useCallback
你：___________________________

// https://note.youdao.com/web/#/file/E726142825754C218F6220C5B6A04BC5/note/BDAB2D61BE4A4AF9AEC750D5F55F90E8/
1. 定义区别：useXX是hook用法，memo是React顶层api（高阶组件）

2. 用法区别：useMemo会缓存第一个入参的返回值，当返回值为fn时，效果与useCallback相同。

3. 场景：在re-render频繁/有卡顿时，将开销大的计算memo，或将部分children包裹上，减少rerender的开销

资料
https://attardi.org/why-we-memo-all-the-things/
https://zh-hans.reactjs.org/docs/strict-mode.html
https://api-extractor.com/
