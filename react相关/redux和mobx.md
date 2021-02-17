# 概念

-   redux
    -   遵循函数式编程
    -   数据存储在一个大 store
    -   对象的不可变性，不能直接操作状态对象，在原来的基础上返回一个新的对象
-   mobx
    -   偏向于面向对象编程和响应式编程，将状态包裹成可观察对象
    -   按模块划分出多个独立的 store 管理
    -   可以直接使用新值更新状态

# redux 实现

-   创建仓库，存储 state 和 reducer 获取最新状态向仓库发送 action，订阅仓库内的状态变化（订阅完成后取消订阅）

# redux 的 connect

-   connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
    -   mapStateToProps[function]，允许我们将 store 中的数据(state.user)作为 props(user)绑定到组件中
    -   mapDispatchToProps[object/function]，允许我们将 action 作为 props 绑定到组件中，如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；
-   Provider 组件
    -   在原应用组件上包裹一层，使原来整个应用成为 Provider 的子组件
    -   接收 Redux 的 store 作为 props，通过 context 对象传递给子孙组件上的 connect

# mobx
