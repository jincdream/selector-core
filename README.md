<p align="center">
  <img src="./logo.png" width="200" alt="selector">
</p>

# selector-core

> selector-core

[![Build Status](https://travis-ci.org/jincdream/selector.js.svg?branch=master)](https://travis-ci.org/jincdream/selector.js.svg?branch=master)
[![NPM version](https://img.shields.io/npm/v/selector-core.svg)](https://www.npmjs.com/package/selector-core)
![Downloads](https://img.shields.io/npm/dm/selector-core.svg)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

---

## ✨ Features

- The simulation Javascript to UI
- No UI

## 🔧 Installation

```sh
yarn add selector-core
```

```
npm i selector-core -S
```

## 🎬 Getting started

Simple:

```ts
import Selector,{ISValueModel} from "selector-core"

const DataSource: ISValueModel[] = [{
  leble: "React",
  value: "react"
},{
  leble: "Vue",
  value: "vuew"
},{
  leble: "Angular",
  value: "angular"
},{
  lable: "TaobalMiniapp",
  value: "tabobao_miniapp"
}]

const selector = new Selector(DataSource)

```

## 🎭 Examples

```ts
import Selector,{ISValueModel} from "selector-core"

const DataSource: ISValueModel[] = [{
  leble: "React",
  value: "react"
},{
  leble: "Vue",
  value: "vuew"
},{
  leble: "Angular",
  value: "angular"
},{
  lable: "TaobalMiniapp",
  value: "tabobao_miniapp"
}]

const InitValues = []

const selector = new Selector(DataSource,InitValues)

let values = selector.getValues()
// ==>
// []

let dataSource = selector.getDataSource()
/* ==>
[{
  leble: "React",
  value: "react",
  isCurrent: false, // built-in
  indexValue: 0 // built-in
},{
  leble: "Vue",
  value: "vuew",
  isCurrent: false, // built-in
  indexValue: 1 // built-in
},{
  leble: "Angular",
  value: "angular",
  isCurrent: false, // built-in
  indexValue: 2 // built-in
},{
  lable: "TaobalMiniapp",
  value: "tabobao_miniapp",
  isCurrent: false, // built-in
  indexValue: 3 // built-in
}]
*/

// select values
selector.change([dataSource[3]]).getValues()
/* ==>
{
  lable: "TaobalMiniapp",
  value: "tabobao_miniapp"
}
*/

// invert selection
selector.change([dataSource[3]]).getValues()
/* ==>
[]
*/

```
## The constructor arguments

```ts
Selector(dataSource: ISValueModel[] = [], values: ISValueModel[] = [])

```

| 参数名(name) | 说明(explain) | 必填(required) | 类型(types) | 默认值(default) | 备注(PS) |
| ------ | ---- | ---- | ---- | ------ | ---- |
|  |  |  |  |  |  |
| dataSource | 可选数据模型（selectable values） | 是（Y） | ISValueModel[] | 无（null）| |
| values | 已选值（selected values） | 否（N） | ISValueModel[] | 无（null）| |


## The instance API

### `getValues(): IValueModel[]`
- 获取当前已选的values（Get the selected values）。


### `getDataSource(): ISValueModel[]`

- 获取 dataSource （可选值）, 将内置`isCurrent` 和 `isCurrent` 属性（Get the `dataSource` value(selectable values), property `isCurrent`,`indexValue` will be built-in）

### `change(values: ISValueModel, mode?: InserMode = InserMode.SINGLE)`

- 改变某些可选项的状态，如果没被选中（不在values里面），将被选中；如果已经被选中（在values）里面，将被剔除
- `values`: 必须是在DataSource里面的选项
- `mode`: 单选（`sigle`）还是多选（`multi`），默认为单选。

### `removeValues(values: ISValueModel[])`

- 从values里面剔除某些已选中值。

### `inserValue(values: ISValueModel[], mode: InserMode)`

- 往values里面插入某些值，该值必须在`dataSource`里面。
- `mode=sigle`: `values` 将直接替换掉已有的值
- `mode=multi`: `values` 将在已选择值后面添加

### `initDataSource(dataSource: ISValueModel[] = [])`

- 将改变实例的`dataSource`，当前选择器的`values`不变

### `initValues(values: ISValueModel[] = [])`

- 将改变实例的`values`，当前选择器的`dataSource`不变

### `init(dataSource: ISValueModel[] = [], values: IValueModel[] = [])`

- 同时改变`values`和`dataSource`

## 🥂 License

[MIT](./LICENSE.md) as always
