# 一、git commit message提交规范

### 1. 提交格式

```
<type>(scope): subject
```

### 2. 字段说明

#### (1) type

【字段说明】本次提交的类型，必填

【是否必填】必填

【类型】枚举值

【可选值】

- feat 添加了新功能
- fix 问题修复
- docs 添加文档说明，例如注释或README
- style 添加或修改样式
- refactor 代码重构
- test 添加测试代码
- revert 版本或代码回退

#### (2) scope

【字段说明】本次提交的修改范围

【是否必填】非必填

【类型】任意字符串

#### (3) subject

【字段说明】本次提交的修改描述

【是否必填】必填

【类型】任意字符串

### 3. 提交示例

```shell
feat(goodsDetail.vue): 添加商品详情页

fix: 代码格式修复

docs(README.md): 添加项目描述
```

### 4. 注意

- scope必须通过小括号包裹
- feat后必须添加小写的冒号

# 二、git hooks

git commit提交时添加两个校验，校验不通过则git commit不成功

- 上述的git commit message校验
- eslint代码格式校验

# 三、在项目中设置

### 1. 安装工具库

```shell
npm install @commitlint/{cli,config-conventional} husky -S
```

### 2. git commit message校验配置

在根目录下创建`commitlint.config.js`，配置以下内容

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 72], // this is default value, header can not over 72 word
        'subject-empty': [2, 'never'], // this is default value, subject can not be empty
        'type-enum': [2, 'always', [
            'feat', // add new feature or function
            'fix', // fix problem
            'docs', // add docs, like readme
            'style', // add or change style
            'refactor', // review code
            'test', // add test code
            'revert', // return to before
        ]], // this is default value, type enum
        'scope-case': [0],
    },
};
```

[更多配置参考文档](https://commitlint.js.org/#/reference-rules)

### 3. git hooks配置
在跟目录下创建`.huskyrc.js`，配置以下内容

```js
module.exports = {
    hooks: {
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS', // commit message校验
        'pre-commit': 'npm run lint', // eslint校验
    },
};
```

[更多配置参考文档](https://github.com/typicode/husky)

> **注：请在package.json的script中配置lint命令**