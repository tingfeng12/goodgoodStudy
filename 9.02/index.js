请实现FilterOut代码

type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]

你：__________________


type FilterOut<T extends any[], F> = T extends [infer L, ...infer R]
    ? [L] extends [F]
        ? FilterOut<R, F>
        : [L, ...FilterOut<R, F>]
    : []

    定义两个泛型变量  一个任意类型数组  一个是数组中的值  然后递归数组中的每一个值  除了和第二个参数相同的都拼在一起 