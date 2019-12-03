## 下载网络图片并转为base64

#### 代码

```js
/**
 * @desc 下载网络图片保存为base64格式
 * @param {String} url 图片地址
 * @return {void}
 */
const downloadBase64Img = url => new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
});
```