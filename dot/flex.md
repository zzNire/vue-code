## flex
* 容器
    * flex-direction 主轴方向
        * row
        * row-reverse
        * column
        * column-reverse
    * flex-wrap 是否换行
        * nowrap
        * wrap
        * wrap-reserve
    * flex-flow ：flex-direction flex-wrap
    * justify-content 同一行内 所有元素在一行的水平位置
        * flex-start
        * flex-end
        * center
        * space-between
        * space-round
    * align-items   同一行 所有元素 在一行的垂直位置
        * flex-start
        * flex-end
        * center
        * baseline
        * stretch
    * align-content 各行 在垂在方向上 的对齐方式
        * flex-start
        * flex-end
        * center
        * space-between
        * space-round
        * strech
* 项目
    * order 根据order从小到大排列显示项目 
    * flex-grow 有剩余空间是否放大
        * 默认0,不放大 
        * number(!=0)，每个项目根据数字比例放大
        * 可以设置flex-basis:0,依据flex-grow来均分容器
    * flex-shrink 空间不足是否缩小
        * 默认1，缩小
        * 0 不缩小
    * flex-basis 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 来改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的宽或者高（取决于主轴的方向）的尺寸大小
    * flex：flex-grow,flex-shrink,flex-basis
    * align-self
        * 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
