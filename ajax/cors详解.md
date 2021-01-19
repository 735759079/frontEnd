==**cors（跨域资源共享）注解**==
> 跨域资源共享标准新增了一组HTTP首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的HTTP请求方法（特别是GET以外的HTTP请求，或者搭配某些MIME类型的POST请求），浏览器必须首先使用OPTIONS方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的HTTP请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括Cookies和HTTP认证相关数据）
----------

- 使用cors的时候，http请求会被划分为两类（是否会触发==cors预检请求 #FF5722==）
	 - **简单请求**
> 1、使用下列方法之一：GET、POST、HEAD。

> 2、不得人为设置该集合之外的其他首部字段。该集合为：Accept、Accept-Language、Content-Language、Content-Type 

> 3、Content-Type 的值仅限于下列三者之一：text/plain、multipart/form-data、application/x-www-form-urlencoded

> 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问

> 请求中没有使用 ReadableStream 对象

简单请求的发送从代码上来看和普通的XHR没太大区别，但是HTTP头当中要求总是包含一个域（Origin）的信息。该域包含协议名、地址以及一个可选的端口。不过这一项实际上由浏览器代为发送，并不是开发者代码可以触及到的。

简单请求的部分响应头及解释如下：
> Access-Control-Allow-Origin（必含）- 不可省略，否则请求按失败处理。该项控制数据的可见范围，如果希望数据对任何人都可见，可以填写"*"。

> Access-Control-Allow-Credentials（可选） – 该项标志着请求当中是否包含cookies信息，只有一个可选值：true（必为小写）。如果不包含cookies，请略去该项，而不是填写false。这一项与XmlHttpRequest2对象当中的withCredentials属性应保持一致，即withCredentials为true时该项也为true；withCredentials为false时，省略该项不写。反之则导致请求失败。

> Access-Control-Expose-Headers（可选） – 该项确定XmlHttpRequest2对象当中getResponseHeader()方法所能获得的额外信息。通常情况下getResponseHeader()方法只能获得如下的信息：
> Cache-Control Content-Language Content-Type Expires Last-Modified Pragma
> 当你需要访问额外的信息时，就需要在这一项当中填写并以逗号进行分隔

 1.复杂请求

如果仅仅是简单请求，那么即便不用CORS也没有什么大不了，但CORS的复杂请求就令CORS显得更加有用了。简单来说，任何不满足上述简单请求要求的请求，都属于复杂请求。比如说你需要发送PUT、DELETE等HTTP动作，或者发送==Content-Type: application/json==的内容。
复杂请求表面上看起来和简单请求使用上差不多，但实际上浏览器发送了不止一个请求。其中最先发送的是一种"预请求"，此时作为服务端，也需要返回"预回应"作为响应。预请求实际上是对服务端的一种权限请求，只有当预请求成功返回，实际请求才开始执行

预请求以OPTIONS形式发送，当中同样包含域，并且还包含了两项CORS特有的内容
> Access-Control-Request-Method – 该项内容是实际请求的种类，可以是GET、POST之类的简单请求，也可以是PUT、DELETE等等。

> Access-Control-Request-Headers – 该项是一个以逗号分隔的列表，当中是复杂请求所使用的头部。

预请求以OPTIONS形式发送，当中同样包含域，并且还包含了两项CORS特有的内容

Access-Control-Request-Method – 该项内容是实际请求的种类，可以是GET、POST之类的简单请求，也可以是PUT、DELETE等等。
Access-Control-Request-Headers – 该项是一个以逗号分隔的列表，当中是复杂请求所使用的头部。


显而易见，这个预请求实际上就是在为之后的实际请求发送一个权限请求，在预回应返回的内容当中，服务端应当对这两项进行回复，以让浏览器确定请求是否能够成功完成。

复杂请求的部分响应头及解释如下：

> Access-Control-Allow-Origin（必含） – 和简单请求一样的，必须包含一个域。

> Access-Control-Allow-Methods（必含） – 这是对预请求当中Access-Control-Request-Method的回复，这一回复将是一个以逗号分隔的列表。尽管客户端或许只请求某一方法，但服务端仍然可以返回所有允许的方法，以便客户端将其缓存。

> Access-Control-Allow-Headers（当预请求中包含Access-Control-Request-Headers时必须包含）– 这是对预请求当中Access-Control-Request-Headers的回复，和上面一样是以逗号分隔的列表，可以返回所有支持的头部。这里在实际使用中有遇到，所有支持的头部一时可能不能完全写出来，而又不想在这一层做过多的判断，没关系，事实上通过request的header可以直接取到Access-Control-Request-Headers，直接把对应的value设置到Access-Control-Allow-Headers即可。

> Access-Control-Allow-Credentials（可选） – 和简单请求当中作用相同

> Access-Control-Max-Age（可选） – 以秒为单位的缓存时间。预请求的的发送并非免费午餐，允许时应当尽可能缓存。


理论聊完之后，咱们来看一下实践，首先启动两个服务，一个端口为3000,的静态资源服务器，用于请求接口，另一台端口为5000的接口服务器，如图所示：
![vps](./images/vps.jpg)

后端接口服务器代码如下：

``` js
const  express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 实现CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("cache-control", "no-cache");
    res.header("content-type", "application/json; charset=utf-8");
    res.header("ETag", '');
    next();
});
app.post("/p",(req,res)=>{
    res.send(req.body)
})

app.listen(5000,()=>{
    console.log("5000")
})
```
前端请求资源脚本代码如下：
``` js
axios.post("http://localhost:5000/p",{name:"zs",age:"18"}).then((data)=>{
    console.log(data.data);
})
```

我们用axios这个http请求库发送了一个post请求，axios发送post请求默认会把数据转化为json格式，并且会默认设置请求头：Content-Type：application/json，很显然这是一个复杂请求，这样的话，会触发options请求。

我们分别启动两个服务，并打开浏览器，访问页面，加载请求接口脚本，观察network如图：
我们看到，代码中命名只发送了一次异步请求为什么显示两次呢？详细截图如下：
![html](./images/html.jpg)

我们看到确实发送了两次请求一次为OPTIONS一次为POST，而我们代码中并没有处理对OPTIONS请求的响应处理，所以上面服务端代码是不合理的，综合考虑，OPTIONS请求并会对实际http请求差生影响，所以我们统一的对OPTIONS请求返回204，服务端负责支持CORS的中间件修正代码如下：

``` js
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("cache-control", "no-cache");
    res.header("content-type", "application/json; charset=utf-8");
    res.header("ETag", '');
    //header头信息设置结束后，结束程序往下执行，返回
    if(req.method.toLocaleLowerCase() === 'options'){
        res.status(204);
        return res.json({});   //直接返回空数据，结束此次请求
    }else{
        next();
    }
});
我们在中间件中判断请求方式，如果请求方式为OPTIONS返回状态码204,并返回空信息。
```
限于篇幅文章到此就该结束了，当然了还有好多文档没有测试希望大家看完文章亲手测试一下。
如果我们将请求脚本改成如下代码：
``` js
axios.post("http://localhost:5000/p","name=zs&age=18",{headers:{
    "Content-Type":"application/x-www-form-urlencoded",
}}).then((data)=>{
    console.log(data.data);
})
或者又改成如下代码：

axios.post("http://localhost:5000/p","name=zs&age=18",{headers:{
    "Content-Type":"application/x-www-form-urlencoded",
    "clm":"234"
}}).then((data)=>{
    console.log(data.data);
})
```

