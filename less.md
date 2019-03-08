1. 变量 
@color #222222

2. 计算
@color+#221111

3. Mixins 混入 将一个类嵌入到另一个类中

```
.background{
    background-color:@color;
    opacity:0.5;
}

#top{
    .background
}
```
