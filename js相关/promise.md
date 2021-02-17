## 封装一个函数，参数是定时器的时间，.then 执行回调函数。

```
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(5000).then(() => console.log('我会在5秒后打印'));
```

## promise.all()/promise.race()

-   promise.all()，一个失败全部失败
    -   解决办法，增加 catch 的处理 return 错误数据

1、4 个请求，尽可能快的运行
promise.all([req1,req2,req3]).then(()=>task1())
req4.then(()=>task2())

```

```
