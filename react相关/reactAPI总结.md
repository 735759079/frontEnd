### 1、react API
  * React.Component
  * React.PureComponent
  * React.memo???
  * React.createElement，等同于jsx
  * React.cloneElement，克隆并返回一个新的react元素
  * React.isValidElement，验证对象是否是一个react对象
  * React.Clidren，提供了处理this.props.children数据结构的工具
    * map，遍历并返回
    * forEach，类似map，但是不返回数组
    * count，组件总数，等于map或者forEach遍历次数
    * only，验证只有唯一一个孩子，并返回它
    * toAarray，返回一个排序的数组
  * React.Fragment，render方法返回对个元素，不需用创造一个额外的dom元素
  * React.createRef
  * React.forwardRef，创造一个react组件，可以接收ref属性

### 2、生命周期
  * 装载时：
    * constructor()
    * static getDerivedStateFromProps()，组件实例化后和接收新属性时调用，返回一个对象来更新状态，或者返回null表明不需要更新任何状态。
      * 父组件导致组件重新渲染，即使属性没更新，也会被调用
      * 调用this.setState()，通常不会触发改方法。
    * render()
    * componentDidMount()，组件装载后调用，网络请求最好放这里
  * 更新后：
    * static getDerivedStateFromProps()
    * shouldComponentUpdate()，接收到新属性或状态，在渲染前被调用，性能优化的一种手段
    * render()
    * getSnapshotBeforeUpdate()，在最新渲染输出提交给DOM前调用
      * 这个生命周期返回的任何值都会作为参数传递给componentDidUpdate()
    * componentDidUpdate()，初次渲染不会被调用，更新发生后调用
  * 卸载：
    * componentWillUnmount()，组件被卸载和销毁之前调用，清理在componentDidMount中创建的订阅
  * 错误处理：，显示一个回退UI，防止组件树崩溃
    * static getDerivedStateFromError()，后代组件抛出错误之后
      * 参数接收被抛出的错误，并返回一个值更新状态
    * componentDidCatch，后代组件抛出错误之后

### 3、this.setState方法
  * 异步的
  * 第一个参数是一个updater函数，(state,props)=> stateChange
  * 第二个参数一个回调函数

### 4、react的类属性
  * defaultProps 设置组件的默认属性

### 5、reactDom API
  * ReactDOM.render(element, container[, callback])
  * ReactDOM.unmountComponentAtNode(container)，卸载react组件
  * ReactDOM.findDOMNode(component)，获取组件生成的DOM元素
  * ReactDOM.createPortal(child, container)，创建一个传送门

### 6、reactDOMServer 服务端渲染API ，初次加载速度提升
  * ReactDOMServer.renderToString(element)，react元素渲染为原始的HTML