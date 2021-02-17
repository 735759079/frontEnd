## 对象属性的控制

```
Object.defineProperty('a',{
    value:proto,
    writable:false, // 否是可写的
    configurable:false,  // 是否可以被删除,属性是否可更改
    enumerable:false // 是否可以被遍历
})

Object.preventExtensions
密封对象（不能添加新属性，不能删除已有属性）：
Object.seal
冻结对象（不能添加新属性，不能修改已有属性，不能删除已有属性）
Object.freeze
```

## 对象的 toString 和 valueOf 的作用

-   toString 返回的是对象的字符串
-   valueOf 是返回对象的原始值

隐式调用规则：
使用操作符运算时（如==、+-\*/等），调用 valueOf 方法,获取对象的值；
调用 alert、confirm 时，则调用 toString()

-   当重写 valueOf 返回对象时,则会调用 toString

*   数组的 toString 相当于调用了 join(",")
*   Date 的 valueOf()返回时间戳
*   console.log()可能输出对象或字符串，在输出函数或者 Date 对象时，调用的是其原型上的 toString

*   强制类型转化的 String()和 Number()则分别调用 toString 和 valueOf；

但是若重写两个方法，会先按照默认规则调用，
但若重写的方法返回值为引用类型时，则会调用另一方法，
当返回值也为引用类型时，则会报错。

## 对象基于原型的方法

-   判断是否属于原型属性 obj.hasOwnProperty()
