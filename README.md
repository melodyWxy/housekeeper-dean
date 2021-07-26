

# housekeeper-dean

dean(蒂安)，为您的行程提供管理服务。管理日程表的命令行工具。

## Install

```shell
# 安装
yarn global add @melody-core/housekeeper-dean
# use
dean --help
dean search

# or 或者您可以用通过melody去管理它，前提是您已经安装了@melody-core/melody-cli
# 安装
melody install @melody-core/housekeeper-dean
# use
melody dean --help
melody dean search

```

## How to use?

### 查看日程
```shell
dean search

```
### 新增日程
```shell
# 执行add，会有相关交互
dean add 
```

### 更新日程
```shell
dean update <index>
```

### 删除日程
```shell
dean remove <index>
```


