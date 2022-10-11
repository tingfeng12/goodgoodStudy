React16/17/18生命周期都发生了哪些变化？你在生命周期遇到过什么坑么？
你：___________________________

很明显一个坑，16.8之后因为reconcile架构改了，带will的生命周期可能会重复执行 因为会被打断，之后再执行
https://note.youdao.com/web/#/file/SVRFC409CF53BF344CC92875B2521BAAFB8/note/1EB330E9FED04030B9831B34021D60AA/

https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377