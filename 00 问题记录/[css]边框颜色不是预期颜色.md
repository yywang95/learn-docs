## 边框颜色不是预期颜色

> 日期：2019.11.07

#### 【现象】

border颜色比预期颜色深

#### 【原因】

background会和border重合，且边框这是了透明度，边框展示出来的颜色是边框的颜色和背景色叠加而成的

#### 【解决】

```css
.box {
    background-clip: padding-box;
}
```
