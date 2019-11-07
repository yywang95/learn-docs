## 压力测试之autocannon

#### 1. 简介

autocannon是个node开发的压力测试工具

#### 2. 安装

```shell
npm i autocannon -g
```

#### 3. 使用

```shell
autocannon -c 100 -d 5 -p 10 http://127.0.0.1:8080
```

- -c 请求数
- -d 运行多久
- -p 链接数