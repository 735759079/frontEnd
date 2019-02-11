1、jsx本质
  react.createElement('element','attribute','content)方法

2、import PropTypes from 'prop-types'进行类型检测

3、静态的类型检测，通过typescript来进行，配置tsconfig.json

4、ref的几种创建方式
  字符串形式的ref（废弃）
  通过react.createRef()，通过this.ref.current来访问实例或dom
  通过回调函数来：内联函数定义会被调用两次，一次null，一次为dom。。。。定义成类的绑定函数方式可以避免。通过this.ref来访问。

5、表单的受控组件以及非受控组件
  受控组件，通过this.setState来实时更新数据。大多数情况下推荐
  非受控组件，通过ref来获取值
  二者的区别在于是否是需要实时匹配数据验证的结果。

6、react的性能优化
  控制react组件的渲染，生命周期shouldComponentUpdate，对props和state进行浅比较看是否需要。
  或者创建组建时继承react.PureComponent，不需要写shouldComponentUpdate

  不可突变的数据，数组——concat，展开语法，对象——object.assign，对象展开属性

7、react，算法，比较树，设置key值，可以提高效率

8、context，组件之间共享某个值

9、Fragments
  render方法返回的值，必须被包裹会带入不必要的dom节点
  react.Fragment组件或者<></>

10、Protals传送门

11、react API
  React.Component
  React.PureComponent
  React.memo???
  React.createElement，等同于jsx
  React.cloneElement，克隆并返回一个新的react元素
  React.isValidElement，验证对象是否是一个react对象
  React.Clidren，提供了处理this.props.children数据结构的工具
    map，遍历并返回
    forEach，类似map，但是不返回数组
    count，组件总数，等于map或者forEach遍历次数
    only，验证只有唯一一个孩子，并返回它
    toAarray，返回一个排序的数组
  React.Fragment，render方法返回对个元素，不需用创造一个额外的dom元素
  React.createRef
  React.forwardRef，创造一个react组件，可以接收ref属性

12、生命周期
  装载时：
    constructor()
    static getDerivedStateFromProps()
    render()
    componentDidMount()
  更新后：
    static getDerivedStateFromProps()
    shouldComponentUpdate()
    render()
    getSnapshotBeforeUpdate()
    componentUpdate()
  卸载：
    componentWillUnmount()
  错误处理：
  static getDerivedStateFromError()
  componentDidCatch