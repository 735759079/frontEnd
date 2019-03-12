### 页面内容

- 减少 http 请求
  - http 请求主要是指对图片、样式、脚本等资源的加载
  - 合并 js/css 文件
  - 合并发送 ajax 请求，到了服务端再分散发送
  - css sprite 将背景图片合成一个，然后通过 css 来控制显示
- 减少 DNS 查询
  - 输入 url 的系列流程，首先就是进行域名解析
  - DNS 缓存机制
- 避免重定向
  - htpp 重定向，涉及 301/302 状态码，最好用标准的 3xxHTTP 状态码，主要是为了让**返回按钮**能正常使用
  - http 头部有重定向 location 信息
  - 额外的 HTTP 头，比如 Expires 和 Cache-Control 也表示重定向
  - 先进行一次请求，然后根据收到的服务器的重定向响应，再次发送请求
  - **最浪费的重定向经常发生、而且很容易被忽略：URL 末尾应该添加/但未添加。比如，访问http://astrology.yahoo.com/astrology将被301重定向到 http://astrology.yahoo.com/astrology/（注意末尾的 /）**
- 缓存 ajax 请求
  - 尚未过期的 Expires 或者 Cache-Control HTTP 头
  - 涉及 304 状态码，详见 **服务器-添加 Expires 或 Cache 响应头**
- 延迟加载
  - 非首屏使用的数据、样式、脚本、图片等
  - 用户交互时显示的内容
  - 减少初始渲染的 dom 元素的数量
- 预加载
  - 利用浏览器空闲时间请求将来要使用的资源
  - 无条件预先加载：页面加载完成（load）后，马上获取其他资源。以 google.com 为例，首页加载完成后会立即下载一个 Sprite 图片，此图首页不需要，但是搜索结果页要用到
- 减少 DOM 元素数量
  - 从以下几个角度考虑移除不必要的标记：
    - 是否还在使用表格布局？**不使用表格布**局是因为：table 占用更多的字节；表格不易维护，响应式布局；会阻挡浏览器渲染引擎的渲染顺序等等
    - 塞进去更多的<div>仅为了处理布局问题？也许有更好、更语义化的标记
    - 通过伪元素实现的功能，就没必要添加额外元素，如清除浮动
- 划分内容到不同域名
  - 动态内容放在 csspod.com 上，静态资源放在 static.csspod.com 上。这样还可以禁用静态资源域下的 Cookie，减少数据传输，详见 Cookie 优化。
- 尽量减少 iframe 的使用
  - iframe 的优点：
    - 可以用来加载速度较慢的第三方资源，如广告、徽章；
    - 可用作安全沙箱；
    - 可以并行下载脚本；
  - 缺点：
    - 加载代价昂贵，即使是空的页面；
    - 阻塞页面 load 事件触发；
    - 缺乏语义。
- 避免 404 错误

### 服务器

- 使用 CDB
- 添加 Expires 或者 Cache-Control
- 启用 Gzip
- 配置 Etag
- 尽早输出缓冲
- ajax 请求使用 GET 方法
- 避免图片 src 为空

### cookie

- 减少 cookie 大小
- 静态资源使用无 cookie 域名

### css 方面

- 把样式表放在<head></head>中
- 不要使用 css 表达式
- 使用 link 替代@import
- 不要使用 filter

### JavaScript 方面

- 把脚本放在页面
- 使用外部的 JavaScript 和 css
- 压缩 JavaScript 和 css
- 移除重复脚本
- 减少 DOM 操作
- 使用高效的事件处理

### 图片方面

- 优化图片
- 优化 css sprite（css 精灵）
- 不要在 HTML 中缩放图片
- 使用体积小、可缓存的 favicon.ico

### 移动端

- 保持单个文件小于 25KB
- 打包内容为分段 multipart 文档
