# 错误码

-   200 - 成功
-   301 - 永久重定向
-   302 - 临时重定向
-   304 - 资源未被修改， not modify
-   403 - 没有权限
-   413 - 请求实体过大
-   404 - not found
-   500 - 服务器错误
-   502 - bad Getway
-   503 Service Unavailable 表示服务器端暂时无法处理请求
-   504 - 网关超时

# request

-   host origin /UA

-   Content-type 发送数据的格式，如 application/json
-   Content-length 返回数据的大小，多少字节
-   Content-encoding

# response

# 存储

-   cookie
    path
    domain
    expires
    secure
    httponly
    samesite
-   session
-   localstorage
-   sessionstorage

## 三次握手、四次挥手

## 性能优化

-   CDN 缓存/DNS 缓存

-   keep-alive
    -   一定时间内，同一域名多次请求数据，只建立一次 HTTP 请求
-   减少网络传输大小， 开启压缩，gzip 等
-   http 缓存
    -   expires 和 cache-control，设置一个过期时间，然后这个期间不会再发布请求。Expires 可能存在客户端时间跟服务端时间不一致的问题。cache-control 是基于返回时间的一个时间段区域，精确到秒，cache-control 优先级更高，max-age
    -   Etag（if-None-Match） 和 Last-Modify（if-modify-since） ，每次请求都会带着 etag 和 last-modify-time，然后和服务端做比较未发生变化返回 304，last-modify-time 精确到秒，无法判断 1s 内的操作，所有 etag 优先级更高

## http1-http2

-   http1.1

    -   长连接，管道网络传输，允许浏览器同时发出多个请求，多个请求还是按照顺序返回，会照常对头阻塞问题
    -   TCP 连接数限制
    -   队头阻塞 (Head Of Line Blocking) 问题
    -   Header 内容多，而且每次请求 Header 不会变化太多，没有相应的压缩传输优化方案
    -   缓存机制
    -   明文传输不安全

-   http2
    -   二进制分帧层，以二进制传输代替原本的明文传输，
    -   多路复用 (MultiPlexing)，单一长连接，二进制格式传输，
    -   请求优先级设置，并发多个请求，顺序不需要对应
    -   头部 header 压缩，多个请求头相似，会消除重复部分（算法，维护一个请求头信息表）
    -   服务端推送 Server Push，服务端不需要被动响应，请求 html 可能会把对应的 js 和 css 主动发送给客户端。

## https

1、https 协议需要到 ca 申请证书，一般免费证书较少，因而需要一定费用。
2、http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
3、http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
4、http 的连接很简单，是无状态的；HTTPS 协议是由 SSL/TLS+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。

5、非对称密钥来加密对称加密的密钥

## URL 的输入到浏览器解析

-   输入
-   dns 解析
-   发送 http 请求
-   传输数据
-   接收数据

## 手写简单的 HTTP 服务器

```
var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<meta charset="UTF-8"><h1>dadaqianduan</h1>');
    res.end();
}).listen(3000);
```

## get/post

## tcp/udp

-   tcp 面向连接的，传输数据要先建立连接；udp 是不需要连接的
-   tcp 是一对一；udp 可以支持 1 对多或者多对多
-   tcp 是可靠交付，数据无差错，不丢失；udp 是最大努力交付，不报账可靠交付
-   tcp 有拥塞控制、流量控制，保证数据传输安全；udp 没有，网络拥堵，不影响 udp 发送速率
-   tcp 首部长度大，会造成开销
-   tcp 流式传输，没有边界；udp 可能会造成丢包和乱序
