## windows

```shell
netstat -ano | findstr ${pid}
```

返回结果

```
TCP   0.0.0.0:3000   0.0.0.0:0   LISTENING   5516
TCP   [::]:3000      [::]:0      LISTENING   5516
```

获取端口号正则

```js
const reg = new RegExp(/:(\d*)/);
```

## linux | os

```shell
netstat -anvf inet | grep ${pid}
```

返回结果

```
tcp46   0   0 *.8058   *.*   LISTEN   131072   131072   2952   0
udp4    0   0 *.49153  *.*            196724   9216     2952   0
```

获取端口号正则

```js
const reg = new RegExp(/\*\.(\d*)/);
```
