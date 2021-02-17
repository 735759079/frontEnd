## AST

## polyfill

## setTimeout/setInterval/requestAnimationFrame

-   setInterval
    _ 使用 setInterval 时，某些间隔会被跳过；
    _ 可能多个定时器会连续执行；

每个 setTimeout 产生的任务会直接 push 到任务队列中；而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。

-   requestAnimationFrame
-   cancelAnimationFrame

## AMD/CommonJs/ES6

-   AMD

    -   require.js
    -   所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成之后，这个回调函数才会运行

-   CommonJs

    -   所有代码都运行在模块作用域，不会污染全局作用域
    -   模块是同步加载的，即只有加载完成，才能执行后面的操作
    -   模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
    -   require 返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值
    -   模块就是对象，输入时必须查找对象属性

-   ES6
    -   静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
    -   动态加载,import()作为函数调用，将其作为参数传递给模块的路径。它返回一个 promise，它用一个模块对象来实现，让你可以访问该对象的导出

## url 解析

## Decorator，即装饰器

保留原来的名字和主功能，添加⼀些附庸功能
修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升

```
class soldier{
}

function strong(target){
    target.AK = true
}

@strong
class soldier{
}
soldier.AK // true
```

代码可读性变强了，装饰器命名相当于一个注释
在不改变原有代码情况下，对原来功能进行扩展

```
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

## AST 抽象语法树

-   AST 的使用场景
    -   代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
        -   如 JSLint、JSHint 对代码错误或风格的检查，发现一些潜在的错误
        -   IDE 的错误提示、格式化、高亮、自动补全等等
    -   代码混淆压缩
        -   UglifyJS2 等
    -   优化变更代码，改变代码结构使达到想要的结构
        -   代码打包工具 webpack、rollup 等等
        -   CommonJS、AMD、CMD、UMD 等代码规范之间的转化
        -   CoffeeScript、TypeScript、JSX 等转化为原生 Javascript
-   AST 的定义
    -   抽象语法结构的树状表现形式，
-   JavaScript Parser(三板斧)
    -   通过 esprima(解析器) 把源码转化为 AST
    -   通过 estraverse 遍历并更新 AST
    -   通过 escodegen 将 AST 重新生成源码
-   利用 AST 转化箭头函数
-   利用 AST 实现预计算的 babel 插件

## babel 深入了解

-   语法插件/转译插件（preset）
