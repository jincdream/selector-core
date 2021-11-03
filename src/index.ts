import CloneDeepWith from 'lodash.clonedeepwith'
import { IValueModel, ISValueModel, InsertMode, FilterMode } from './coreTypes'
export * from './coreTypes'
export default class Selector {
  dataSource = [] as ISValueModel[]
  values = [] as ISValueModel[]
  constructor(dataSource: ISValueModel[] = [], values: ISValueModel[] = []) {
    this.init(dataSource, values)
  }
  init(dataSource: ISValueModel[] = [], values: IValueModel[] = []) {
    let cpDataSource = CloneDeepWith<ISValueModel[]>(dataSource)
    this.dataSource = cpDataSource.map((v, indexValue) => {
      const isCurrent = values.some((vv) => {
        const oValue = { ...vv } as ISValueModel
        if (typeof oValue.value === 'object') {
          throw new Error("${value} can't be a 'object' type!")
        }
        const _isCurrent = oValue.value === v.value
        if (_isCurrent) {
          oValue.indexValue = indexValue
          oValue.isCurrent = true
        }
        return _isCurrent
      })
      v.indexValue = indexValue
      v.isCurrent = isCurrent
      return { ...v }
    })
    this.values = values
  }
  /**
   * dataSourceChange
   */
  initDataSource(dataSource: ISValueModel[] = []) {
    this.init(dataSource, this.values)
  }
  /**
   * example: has dataSource [{value: 1, label: 1}]
   * selector.addDataSource([{value: 1, label: 1},{value: 2, label: 2}])
   * return [{value: 1, label: 1},{value: 2, label: 2}]
   * @param newDataSource [{value: "value", label: "label"}]
   */
  addDataSource(newDataSource: ISValueModel[] = []) {
    let oldDataSource = this.getDataSource()
    let dataSource = this.filterValues(
      oldDataSource.map((v) => this.clean(v)),
      newDataSource,
      FilterMode.REMOVE
    )
    this.initDataSource(dataSource.concat(oldDataSource))
  }
  /**
   * valueChange
   */
  initValues(values: ISValueModel[] = []) {
    this.init(this.dataSource, values)
  }
  /**
   * getValues
   */
  getValues(): IValueModel[] {
    return this.values.map((v) => this.clean(v))
  }
  /**
   * cleaning
   */
  clean(value: ISValueModel) {
    const { indexValue, isCurrent, ...result } = value
    return result
  }
  /**
   * getDataSource
   */
  getDataSource(): ISValueModel[] {
    return CloneDeepWith<ISValueModel[]>(this.dataSource)
  }
  /**
   * saveValues
   */
  insertValue(values: ISValueModel[], mode: InsertMode) {
    if (mode === InsertMode.SINGLE) {
      this.initValues(values)
    } else {
      const newValues = this.filterValues(
        this.dataSource,
        values,
        FilterMode.EXTRACT
      )
      this.initValues(this.values.concat(newValues))
    }
  }
  /**
   * removeValues
   */
  removeValues(values: ISValueModel[]) {
    const newValues = this.filterValues(values, this.values, FilterMode.REMOVE)
    this.initValues(newValues)
  }
  fixValue<T extends { [key: string]: any }>(option: {
    valueKey: keyof T
    labelKey?: keyof T
    values: T[]
  }): ISValueModel[] {
    let { values = [], valueKey, labelKey = '' } = option
    return values.map((v) => {
      let rz: ISValueModel = {
        value: v[valueKey],
        label: v[labelKey],
        ...v,
      }
      return rz
    })
  }
  /**
   * case:
   * value: { value: 1, label: "a" }
   * dataSource: { value: 1, label: "a", ext: { data: {} }}
   *
   * value ===> { value: 1, label: "a", ext: { data: {} }}
   */
  mixValueFromDataSource() {
    this.values = this.values.map((v) => {
      let dataSource = this.dataSource.find((k) => this.contrast(v, k))
      return dataSource ? { ...dataSource } : v
    })
  }
  /**
   * changeValues
   */
  change(values: ISValueModel[] = [], mode: InsertMode = InsertMode.SINGLE) {
    if (values[0].isCurrent) {
      this.removeValues(values)
    } else {
      const test = this.filterValues(this.values, values, FilterMode.EXTRACT)
      test.length === 0
        ? this.insertValue(values, mode)
        : this.removeValues(values)
    }
    return this
  }
  private contrast(condition: ISValueModel, targer: ISValueModel) {
    let than = false
    if (condition.indexValue !== void 0 && targer.indexValue !== void 0) {
      than = targer.indexValue === condition.indexValue
    } else {
      than = condition.value === targer.value
    }
    return than
  }
  /**
   * 数组过滤，提取命中条件后的数据 或者 剔除命中条件的目标
   * @param conditions 条件数组: example [1,2,3,5]
   * @param targets 目标数组: example [2,4]
   * @param mode FilterMode: "extract" | "remove"
   */
  private filterValues(
    conditions: ISValueModel[],
    targets: ISValueModel[],
    mode: FilterMode
  ) {
    const useRemove = mode === FilterMode.REMOVE
    // 算法优化
    let conditionIndex = 0
    return targets.filter((target) => {
      let result = useRemove
      for (let i = conditionIndex; i < conditions.length; i++) {
        const condition = conditions[i]
        const than = this.contrast(condition, target)
        if (than) {
          conditionIndex = i
          result = !result
          break
        }
      }
      return result
    })
  }
}
