* 盒子模型+box-sizing
* position：absolute、relative、static、fixed、sticky（新增，粘性布局，屏幕范围正常，超出范围fixed）
* 弹性布局flex，align-items: center;justify-content: center;
* 水平居中，垂直水平居中。
* css选择器
* 优先级计算
* 浮动，清除浮动（伪类） .clearfix:after {content: " "; display: block; clear: both; height: 0;}
* CSS Sprites（css精灵）：将所有图片包含到一张大图中，利用css background进行定位，减少http请求
* 重绘，回流（reflow）减少
* 动画时间间隔，16.7ms（显示器频率）
* chrome支持小于12px的文字 p{font-size:10px;-webkit-transform:scale(0.8);}
* 单冒号和双冒号的区分，伪类和伪元素
* css动画，transform（旋转、缩放、移动或倾斜）和transition（动画过渡）
* 响应式布局 <meta name=’viewport’ content=”width=device-width, initial-scale=1. maximum-scale=1,user-scalable=no”>
  * header、、nav、footer、aside
  * 布局：浮动、普通、绝对、弹性
  * @media
  * px、rm、rem
  * swiper动画
  * 动画
* 用纯CSS创建一个三角形的原理是什么？
首先，需要把元素的宽度、高度设为0。然后设置边框样式。

width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;