## 3D变换可以触发硬件加速

#### 方法1: translateZ

一般使用translateZ，因为`不会改变任何元素样式`，而且会使当前dom单独在一个layer，`减少重绘`的可能

```css
.a {
    transform: translateZ(0);
}
```