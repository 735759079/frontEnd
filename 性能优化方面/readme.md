### 页面内容

-   减少 http 请求
    -   http 请求主要是指对图片、样式、脚本等资源的加载
    -   合并 js/css 文件
    -   合并发送 ajax 请求，到了服务端再分散发送
    -   css sprite 将背景图片合成一个，然后通过 css 来控制显示
-   减少 DNS 查询
    -   输入 url 的系列流程，首先就是进行域名解析
    -   DNS 缓存机制
-   避免重定向
    -   htpp 重定向，涉及 301/302 状态码，最好用标准的 3xxHTTP 状态码，主要是为了让**返回按钮**能正常使用
    -   http 头部有重定向 location 信息
    -   额外的 HTTP 头，比如 Expires 和 Cache-Control 也表示重定向
    -   先进行一次请求，然后根据收到的服务器的重定向响应，再次发送请求
    -   **最浪费的重定向经常发生、而且很容易被忽略：URL 末尾应该添加/但未添加。比如，访问http://astrology.yahoo.com/astrology将被301重定向到 http://astrology.yahoo.com/astrology/（注意末尾的 /）**
-   缓存 ajax 请求
    -   尚未过期的 Expires 或者 Cache-Control HTTP 头
    -   涉及 304 状态码，详见 **服务器-添加 Expires 或 Cache 响应头**
-   延迟加载
    -   非首屏使用的数据、样式、脚本、图片等
    -   用户交互时显示的内容
    -   减少初始渲染的 dom 元素的数量
-   预加载
    -   利用浏览器空闲时间请求将来要使用的资源
    -   无条件预先加载：页面加载完成（load）后，马上获取其他资源。以 google.com 为例，首页加载完成后会立即下载一个 Sprite 图片，此图首页不需要，但是搜索结果页要用到
-   减少 DOM 元素数量
    -   从以下几个角度考虑移除不必要的标记：
        -   是否还在使用表格布局？**不使用表格布**局是因为：table 占用更多的字节；表格不易维护，响应式布局；会阻挡浏览器渲染引擎的渲染顺序等等
        -   塞进去更多的<div>仅为了处理布局问题？也许有更好、更语义化的标记
        -   通过伪元素实现的功能，就没必要添加额外元素，如清除浮动
-   划分内容到不同域名
    -   动态内容放在 csspod.com 上，静态资源放在 static.csspod.com 上。这样还可以禁用静态资源域下的 Cookie，减少数据传输，详见 Cookie 优化。
-   尽量减少 iframe 的使用
    -   iframe 的优点：
        -   可以用来加载速度较慢的第三方资源，如广告、徽章；
        -   可用作安全沙箱；
        -   可以并行下载脚本；
    -   缺点：
        -   加载代价昂贵，即使是空的页面；
        -   阻塞页面 load 事件触发；
        -   缺乏语义。
-   避免 404 错误

### 服务器

-   使用 CDN
    -   内容发送网络
    -   分散在不同地理位置的 web 服务器
-   添加 Expires 或者 Cache-Control
    -   静态内容：将 Expires 响应头设置为将来很远的时间，实现「永不过期」策略
    -   动态内容：设置合适的 Cache-Control 响应头，让浏览器有条件地发起请求
-   启用 Gzip
    -   对 html、css、js 等文本类型的内容压缩
    -   图片和 pdf 不要 Gzip 颜色，本身已经压缩过了
    -   客户端就有了支持压缩的 Accept-Encoding HTTP 请求头；Accept-Encoding: gzip, deflate
    -   服务器通过 Content-Encoding 响应头来通知客户端；Content-Encoding: gzip
-   配置 Etag
    -   和 Last-Modified 相似
    -   字符串
-   尽早输出（flush）缓冲
    -   用户请求页面时，服务器通常需要花费 200 ~ 500 毫秒来组合 HTML 页面
    -   <?php flush(); ?>用PHP中的flush()函数，可以发送部分已经准备好的 HTML到浏览器，以便服务器还在忙于处理剩余页面时，浏览器可以提前开始获取资源
-   ajax 请求使用 GET 方法
    -   post 请求，先发送 Http Header，再发送 data
-   避免图片 src 为空
    -   src、href 为空字符串时，浏览器仍会向服务器发起一个 http 请求

### cookie

-   减少 cookie 大小

    -   保存用户名，用于身份验证、个性化设置等等
    -   cookie 通过 http 头在服务器和浏览器间传送
    -   去除不必要的 Cookie；
    -   尽量压缩 Cookie 大小；
    -   注意设置 Cookie 的 domain 级别，如无必要，不要影响到 sub-domain；
    -   设置合适的过期时间。

-   静态资源使用无 cookie 域名

### css 方面

-   把样式表放在<head></head>中
    -   减少用户白屏等待时间
-   不要使用 css 表达式
-   使用 link 替代@import
    -   在 ie 低版本下，和放在页面底部一样
-   不要使用 filter

### JavaScript 方面

-   把脚本放在页面底部
    -   不能放在页面底部的，script 有 defer 和 async 属性
-   使用外部的 JavaScript 和 css
    -   利用缓存机制，可以是 js 和 css 文件在不同页面重用
-   压缩 JavaScript 和 css
    -   代码压缩
-   移除重复脚本
    -   重复的脚本不仅产生不必要的 HTTP 请求，而且重复解析执行浪费时间和计算资源
-   减少 DOM 操作
    -   将一百个节点插入 html 中，选择将一百个节点生成之后统一插入，而不是一个一个插入
    -   缓存已经访问过的元素；
    -   使用 DocumentFragment 暂存 DOM，整理好以后再插入 DOM 树；
    -   操作 className，而不是多次读写 style；
    -   避免使用 JavaScript 修复布局。
-   使用高效的事件处理
    -   减少绑定事件监听的节点，如通过事件委托
    -   尽早处理事件，在 DOMContentLoaded 即可进行，不用等到 load 以后

### 图片方面

-   优化图片
    -   PNG 格式
-   优化 css sprite（css 精灵）
    -   水平排列 Sprite 中的图片，垂直排列会增加图片大小；
    -   Spirite 中把颜色较近的组合在一起可以降低颜色数，理想状况是低于 256 色以适用 PNG8 格式；
    -   不要在 Spirite 的图像中间留有较大空隙。减少空隙虽然不太影响文件大小，但可以降低用户代理把图片解压为像素图的内存消耗，对移动设备更友好。
-   ## 不要在 HTML 中缩放图片
-   使用体积小、可缓存的 favicon.ico
    -   Favicon.ico 一般存放在网站根目录下，无论是否在页面中设置，浏览器都会尝试请求这个文件。
    -   存在（避免 404）；
    -   尽量小，最好小于 1K；可以使用 PNG 格式的 favicon。
    -   设置较长的过期时间。

### 移动端

-   保持单个文件小于 25KB
-   打包内容为分段 multipart 文档
