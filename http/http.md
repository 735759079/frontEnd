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

-   keep-alive
-   减少网络传输大小， 开启压缩，gzip 等
-   缓存
