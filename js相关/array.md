# 判断是否是数组

-   Array.isArray()
-   typeof -> instanceof
-   constructor
    -   a.constructor == Array，创建数组调用的是 Array 这个构造函数，
-   Object.prototype.toString

##

-   类数组转换成数组
    Array.from(arguments)
    Array.slice.apply(arguments)

## 数组方法

-   改变原数组
-   数组有返回值

push/unshift
pop/shift

sort => 返回排序后的数组 原数组也会改变
reverse => 同上

concat => 复制当前数组并返回副本 原数组不变
slice => 返回指定区域的数组 不改变原数组

splice => 删除/插入/替换 返回删除项 改变原数组

indexOf/lastIndexOf

forEach

map 返回函数调用的结果组成的数组
filter

every/some => 返回 true/false

reduce
_ 前一个值、当前值、项的索引和数组对象
_ 返回的任何值都会作为第一个参数自动传给下一项
