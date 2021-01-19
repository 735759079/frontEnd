## 虚拟 dom

-   只比较同一层级，不跨级比较
-   tag 不相同，则直接删掉重建，不再深度比较
-   tag 和 key，两者都相同，则认为是相同节点，不再深度比较

## 单项数据绑定

-   通过原生 dom 操作无法对视图层做更新

## this.setState

-   合成事件和生命周期中是异步过程。“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，
-   原生事件和定时器函数中是同步过程
-   批量更新，只取最后一次的操作。批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的

*
*
*   batchUpdate 机制
*   transaction（事务）机制

## this.setState 源码解释

-   合成事件的代码执行在更新操作之前，performWork 、performWorkOnRoot、performSyncWork、performAsyncWork

## 合成事件

更好的兼容性和跨平台，摆脱传统 DOM 事件
挂载到 document，减少内存消耗，避免频繁解绑
方便事件的统一管理，如：事务机制

-   react 里面的时间都是合成事件，react 将事件都绑定在 document 上了，但是优先于真正绑定在 document 上的事件
-   event 不是原生的，是 SyntheticEvent 合成事件对象

## 性能优化问题

-   key，虚拟 dom 渲染问题
-   懒加载（延迟加载）。React.lazy 方法与 Suspense 组件（React-loadable）
-   shouldComponentUpdate、React.PureComponent（class 组件）、React.memo（无状态组件）=>父组件值变化，子组件会全部渲染，react.memo()
-   immutable.js
-   bind 函数绑定位置和使用次数（箭头函数代替）
-   生命周期事件销毁
-   服务端渲染
-   通用的前端优化，css sprit 等
-   webpack 层面优化

## 高阶组件

## render Props

## react 受困组件/非受困组件
