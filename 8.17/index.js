// 面试官：看你的简历上有Vue3项目经验，你们是直接使用的Vue3还是基于Vue2升级的？为什么要进行升级，中间遇到最大的难点是什么。
// 你：______________________
// 面试官：嗯，你刚才也说了，Vue3的hook相对灵活。那么你简历上也有熟悉React,React的hook也很灵活。React hook vs Vue  hooks你能说下他们原理最大的区别是什么？
// 你：______________________
// 面试官：嗯? 那这里有个有趣的问题。你说了React的fiber，为什么Vue不这么做呢？
// 你：______________________
// 面试官：嗯嗯 那你们团队上是如何做技术选型的呢？你有参与其中么？遇到一些技术方案团队人员抗拒你们是怎么处理的呢？
// 你：______________________

// 第一道题考发现痛点的能力，第二道题考的原理，第三道题也是考原理的，第四道题看你分析问题的条理性


问题 1:
看你的简历上有Vue3项目经验，你们是直接使用的Vue3还是基于Vue2升级的？为什么要进行升级，中间遇到最大的难点是什么
回答：
我们是直接使用的 vue3，原因是新项目。为什么要用呢？主要从两部分说起
第一： 从开发体验上 
vue3 组件采用 compostion api 而不是 option api  的风格，更向函数式靠拢。开发更简洁，体验更直接
而其中的 hooks 更为灵活，不需要像以前一样需要写特定的生命周期并且方法还需要写在 method 中。
最重要的是更好的支持 ts，这样能够提升开发体验的同时更好的检查一些在静态中出现的问题。
第二点：从原理和性能上
 在核心数据更新上 为了解决 Object.definProprty  的数据劫持的所带来的数组下标和深层次对象的更新使用的问题，采用 proxy 代理的方式。 setup 函数包含的生命周期完全可以处理大部分场景并且原理上数据代理逻辑不再是存储到 this._data 和 this .props 上而是不同状态的数据存储到不同的属性中
绑定事件上为了解决每次触发都需要生成新的函数去 diff-->patch 更新，增加了 cacheHandlers 事件二次触发后会在缓存中读取
渲染能力上为了解决有些静态元素是否更新每次都会参与渲染的问题增加了 hoistStatic 静态提升能力，创建时机只会创建一次，在渲染的时候可以复用。
在 diff 算法上不再是全量的对比而是增加了静态标记 patchflag，解决了 2 时候不论静态数据还是动态数据一层一层比较问题
对于题目中的如果老项目进行升级的话，我认为对于业务和项目收益本身不大，不建议直接升级。如果领导对技术栈有要求也可以做到。不过再实施的时候需要注意以下几点
从业务角度和项目复杂度出发，将原有项目按照业务拆分组件单仓模式进行增量修改（杜绝全量手动），修改上可使用一些工具进行替换方式手动带来的问题，工具如果团队给时间可以自己造轮子，如果没有可以使用阿里妈妈 gogocode-cli 工具。核心原理都是API 对比 后 AST 编译器那一套，但这种有可能咱们一些业务场景还是需要手动处理。
问题2:
嗯，你刚才也说了，Vue3的hook相对灵活。那么你简历上也有熟悉 React,React的hook也很灵活。React hook vs Vue  hooks你能说下他们原理最大的区别是什么？
回答：
这两个 hook 最大的区别是执行的时机不同，vue中setup函数在组件渲染过程中只会进入一次，而react 不同只要组件没有被缓存就会多次触发渲染。
在 vue3中响应式原理大致为 Proxy和Reflect实现reactive，ref是由reactive实现的，computed也是由包装了effect的ref的value的响应式数据。过程为 执行effect→触发get→触发track依赖收集→取执行的active effect进行dep。
而在 react 中 hook 分为 mount 和 update 两个阶段。 
useState  在 mountState 阶段创建链表为更新队列然后通过 .bind 把当前 fiber、更新队列和这个 dispatch 方法关联起来。最后返回当前 state 和 修改 state 的方法。dispatchAction 阶段除了需要保持循环链表的正确性，还要获取上一次渲染的 state并且通过计算最新的state 来决定是否重新渲染，如果需要渲染在 beginWorker 中继续走scheduleUpdateOnFiber 调度逻辑
而 useEffect 在 mountEffect 阶段获取当前 hook 节点以及 useEffect 的依赖，并调用 pushEffect 将当前 effect 添加到 FiberNode 的 updateQueue 队列中并将当 effect 保存在当前 hook 节点的 memoizedState 属性中，而当依赖有变化才会 push 新的effect ，然后在commit 阶段才会重新执行useEffect 的回调。其他useCallback、useMemo 等原理类似。不过这两个主要是区别是缓存 callback 函数和返回值的不同。
而对于更新数据来讲react 的主流程是 enqueueSetState 入口，
- 通过 getInstance 获取实例自身fiber
- 通过 requestUpdateLane 获取当前 fiber 的优先级
- 根据优先级  createUpdate 创建 update，在render阶段的beginWork中会计算update 
- 通过 enqueueUpdate 将updateQueue挂载到fiber节点上 
- 在通过 scheduleUpdateOnFiber 调度 update
- 而调度又分为同步调度（performSyncWorkOnRoot）和异步调度（ensureRootIsScheduled）通过控制任务的优先级，控制那些任务进入协调器这也是 Scheduler调度器主要做的事情
- 当调度器处理完优先级后 Reconciler 协调器登场负责构建 fiber tree，找出并标记变化的组件（通过不断的 while 循环调用 performUnitOfWork 处理子节点、兄弟节点、打标记，两个重要的函数beginWork 和 completeWork），它是一个双缓存的结构同时存在两棵 Fiber树 。当前屏幕上显示内容对应的 Fiber树 称为 current Fiber 树 ，正在内存中构建的 Fiber树称为 workInProgress Fiber 树。
- 当找出变化的组件后进行 commit 阶段。将变化的组件渲染到页面上。这其中又分为 dom 渲染前、dom 渲染中和dom 渲染后。而react  18版本在外部状态发生变化的进行渲染时候会进行并发渲染产生 tearing 现象。
问题3:
嗯? 那这里有个有趣的问题。你说了React 的 fiber，为什么 Vue 不这么做呢？
回答：
实现机制不同一个采用的运行时优化，一个采用了编译时优化，也就是本质 GPL 和 DSL 的的区别。
我认为 react 是一直在做用户感知上做努力而非单独的性能上。而基于运行时和编译时两种不同的场景 react 要做是因为走了同步更新的策略。虽然有调度但是由于单线程和屏幕刷新率等特点在组件特别大或者嵌套特别深的时候会由于一直在调度计算和更新，导致卡顿。不论是简单的 expirationTime和批处理、模拟 requestIdleCallback 还是 lans优先级通道。18版本以前一直在优化问题。让用户感知它快了、不闪烁了等等
而 vue 的响应式策略跟 react 很像都是缓存队列，但实现完全不一样vue 中当劫持完数据后遍历 watcher实例，然后依次触发 watcher 的 update 方法 将watcher实例推入到 queue队列中，最后执行nextTick 去更新数据。其实 nextTick 就是走的浏览器的任务机制( prmose-> mutationObserver > setTimeout)
两者相比较本质都是化同步为异步的渲染方式只不过一个放在前，一个放在编译时一个放在运行时而已。然而就是由于 fiber 架构的原因导致如下几个问题
第一： 组件状态维护问题
第二：domdiff 更新机制问题
第三： render 后渲染问题
虽然vue在组件数据处理的时候不像react 去开辟一块新的内存，并且在更新试图的domdiff 中有双端比较，但是它为了明确知道更新的位置为每个组件也添加的监听器，所以当组件过大或者组件过多需要更新的时候也会有性能问题
问题4:
那你们团队上是如何做技术选型的呢？你有参与其中么？遇到一些技术方案团队人员抗拒你们是怎么处理的呢？
回答：
其实技术选型主要有以下几个方面
- 开发库、框架、插件的平台是否可信任或者说大平台
- 社区活跃度（生态）、流行度（github star、issue维护）。框架本身出问题时是否及时解决
- 本身业务形态及团队内人员上手难以成度。
其实最主要的还是要看业务，比如注重业务并且业务推动特别急的的情况下选择一些容易上手、迭代数独快也不是不可以。主要是能拿住绩效。在公司稳定期有新的业务场景可以选择技术相对有挑战的，毕竟有挑战代表就需要有成本不论是时间成本还是人力成本。

如果在团队中推动一些技术方案其他人比较抗拒。一般要怀柔政策也就是让别人怎么样认同你做的事情。例如团队中使用vue 想推动react。那首先就想好业绩和业务指标为什么这么做和产生的收益先把老板拿下，其次用技术本身和成员发展、性能数据、分享等一些列的手段分批次落地（还有一点重要的是人情世故）



vue3 数据不卡了 更新逻辑卡 因为 没有那种 任务分级 和 任务中断 

资料
https://github.com/vuejs/rfcs/issues/89#issuecomment-546988615
https://zhuanlan.zhihu.com/p/42630183
https://nanxiaobei.medium.com/whats-react-forget-react-without-memo-e37a75441d9b
https://overreacted.io/zh-hans/before-you-memo/