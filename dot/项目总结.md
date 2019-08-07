## 项目中关于 nextTick 的 使用
1. created中对dom的操作一定要放在 nextTick 中，因为在执行created钩子函数的时候
2. 与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
3. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

在本项目中:
1. 显示搜索框渐入动画，通过给dom设置 transform 和 transition来实现动画。由于通过 v-show 来控制搜索框是否显示，v-show会改变dom的display值，所以刚开始dom并不会在页面占据空间，此时通过 transiton实现的动画没有初始值，所以无效。通过 nextTick在 dom 显示后再添加 transition 属性 才能有效

> v-if 是否渲染该dom  v-show 改变display值来控制是否显示

## 适配不同分辨率的手机屏幕
### css @media
通过css来识别不同的手机屏幕属性，比如说 `-webkit-min-device-pixel-ratio` 就是设备的像素比，设备上物理像素和设备独立像素的比例。也就是设备的实际像素与css中表示的一个像素的比例。

> 比如：一个手机屏幕物理像素宽度为640px,而在css中显示宽度为320px，所以像素比就是2。

对于像素比高的设备，可以进行缩放，或使用更分辨率更高的图片
```css
@media  (-webkit-min-device-pixel-ratio: 2){
        .c{
            transform: scaleY(0.5);
        }
    }

@midia (-webkit-min-device-pixel-ratio: 2){
      .back{
        background:url(...);
      }
}
```
### rem
rem 是根据根元素的 font-size大小来进行设置的，根据不同的像素比设备，可以设置不同的根元素字体大小

* `<meta name="viewport">` 它提供有关视口初始大小的提示，仅供移动设备使用。在 content 设置相关属性

```html
<meta name="viewport" content="initial-scale = 1,maxinum-scale = 1,minimum-scale=1,user-scalable=no">
<script>  
            
    var viewport = document.querySelector("meta[name=viewport]");  
              //下面是根据设备像素设置viewport  
    if (window.devicePixelRatio == 1) {  
        viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');  
    }  
     if (window.devicePixelRatio == 2) {  
       viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');  
     }          
    var docEl = document.documentElement;  
    var fontsize = 10 * (docEl.clientWidth / 320) + 'px';  
    docEl.style.fontSize = fontsize;   
                
 </script>
```

### vh vw 
为0-100的值，表示占视窗的百分比

## 实现带惯性的多个文本共同跟随鼠标运动
主要通过 setInterval 来进行 跟随鼠标运动，16ms执行一次，相当于60帧动画。

本项目中使用 重复 调用 window.requestAnimationFrame 来实现动画

监听 mouseMove 事件 来 改变目标位置，setInterval 就根据目标位置的改变来 不断运行 run方法

1. 设置鼠标运动监听事件
2. 设置每一个dom 需要跟随的父dom，以及初始位置
3. 根据鼠标移动，修改目标位置，为每一个元素执行 run 方法，开始运动
  * 如果有跟随的父dom，那么目标位置就是上一次父dom运动到的位置，否则就是鼠标位置
  * `this.x = this.PX += (this.ddx += ((this.x0 - this.PX - this.ddx) + this.cx) / rs) / sp;` 修改运动位置

他会根据此次目标位置和当前位置的差值，来修改每次运动的距离
run方法：
```js
CObj.prototype.run = function () {
        if (!this.parent) {
          this.x0 = m.x;
          this.y0 = m.y;
        } else {
          this.x0 = this.parent.x;
          this.y0 = this.parent.y;

        }
        this.x = this.PX += (this.ddx += ((this.x0 - this.PX - this.ddx) + this.cx) / rs) / sp;
        this.y = this.PY += (this.ddy += ((this.y0 - this.PY - this.ddy) + this.cy) / rs) / sp;
        this.css.transform = `translate3D(${Math.round(this.x)}px,${ Math.round(this.y)}px,0)`
      }
```
其中 
* x0,y0 为目标位置
* PX,PY 为上一次运动所在位置
* x,y 为本次运动位置
* sp 为 运动速度，值越大越慢
* rs 为 运动惯性，值越大惯性越大
* cx，cy 为相对于父节点偏移的距离，这里都为0
* dds为惯性大小，随着距离的减小，惯性会减小


为了实现 不同的dom 依次开始运动，可以为 dom设置 parent dom，此dom的目标位置 是 父节点本次的运动位置。

## touch事件

### 左右滑动切换
  * touchsatrt  记录下起始位置 X，Y值  并置Ydirection为false表示进行左右滑动            e.touches[0].pageX pageY
  * touchmove  记录下X，Y方向上的偏移量 如果水平位移小于垂直方向 置Ydirection 为true 并开始移动
    * 在移动的过程中，根据移动的百分比移动歌词部分，并修改透明度
  * touchend  实现自动补充位移量 补充动画时间 
    * 判断移动的距离是否大于10%，是的话就补充位移，不是的话就回退

### Touch对象
表示一个触摸点，其属性包括 位置 压力 
```js
    screenX: 511, 
    screenY: 400,//触点相对于屏幕左边沿的Y坐标
    clientX: 244.37899780273438, 
    clientY: 189.3820037841797,//相对于可视区域
    pageX: 244.37, 
    pageY: 189.37,//相对于HTML文档顶部，当页面有滚动的时候与clientX=Y 不等
    force: 1,//压力大小，是从0.0(没有压力)到1.0(最大压力)的浮点数
    identifier: 1036403715,//一次触摸动作的唯一标识符
    radiusX: 37.565673828125, //能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径
    radiusY: 37.565673828125,
    rotationAngle: 0,//它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面
    target: {} // 此次触摸事件的目标element
```
### TouchEvent对象
一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件

属性
* touches 一个 TouchList对象，表示一组触点，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上
* targetTouches 触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点

触摸事件类型
* touchStart 当用户在触摸平面上放置了一个触点时触发
* touchEnd 当一个触点被用户从触摸平面上移除（当用户将一个手指离开触摸平面）时触发
* touchMove 当用户在触摸平面上移动触点时触发
