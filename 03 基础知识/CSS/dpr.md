# 像素
- picture element -> `pixel`
- 一个像素就是计算机能够显示一种特定颜色的`最小区域`
- 当设备尺寸相同但像素变得更密集时，屏幕能显示的画面的过渡更细致，网站看起来更明快。

# ppi

- 屏幕上`每英寸可以显示的像素点的数量`，即屏幕像素密度

# 设备像素

- device independent pixel -> `dip`
- 设备屏幕的`物理像素`，任何设备的物理像素的数量都是固定的

# 逻辑像素

- CSS pixels -> css像素
- 是为web开发者创造的，在CSS和javascript中使用的一个抽象的层
- pc端1css像素就是1物理像素

# dpr

- devicePixelRatio -> `设备像素比`
- dpr = 设备像素 / css像素
- 可以想象成，1css像素的大小是固定的，但是屏幕像素的密度太高，所以可能2个物理像素等于1css像素，那么dpr就是2