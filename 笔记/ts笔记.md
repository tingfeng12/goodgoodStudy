ts声明空间
    类型声明空间和变量声明空间
模块
    全局模块
        全局变量空间容易导致文件内代码命名冲突 推荐使用文件模块
    文件模块
        文件模块也被称为外部模块，如果typescript文件的根级别位置包含import或export 那么他会在文件中创建一个本地作用于 其他文件使用时需要显式的导入

为什么使用TypeScript
    1.TypeScript的类型系统被设计为可选的，因此 你的JavaScript就是 TypeScript
    2.TypeScript不会阻止JavaScript运行 即使类型错误也不例外 保障了逐步迁移

如何从JavaScript迁移到TypeScript
    1.添加tsconfig.json文件
    2.将.js文件扩展名修改为.ts ，开始使用any减少错误
    3.开始在TypeScript中写代码 减少any的使用
    4.回到旧代码 添加类型注释并修复已识别的错误
    5.为第三方JavaScript代码定义环境声明

