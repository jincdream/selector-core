import Selector from '../index'
import { InserMode, ISValueModel } from '../index'

const Copy = (o: object | object[]) => JSON.parse(JSON.stringify(o))

const inserMode = InserMode
describe(`Greeter`, () => {
  let selector: Selector
  const dataSource = [
    {
      label: 'text0',
      value: 0,
      t: 1,
    },
    {
      label: 'text1',
      value: 1,
    },
    {
      label: 'text2',
      value: 2,
    },
    {
      label: 'text3',
      value: 3,
    },
    {
      label: 'text4',
      value: 4,
    },
    {
      label: 'text5',
      value: 5,
    },
  ] as ISValueModel[]

  beforeEach(() => {
    selector = new Selector(Copy(dataSource))
  })

  it(`--API--: [getValues]`, () => {
    const values = selector.getValues()
    expect(values.length).toBe(0)
    expect(values).toEqual([])
  })

  it(`--API--: [getDataSource]`, () => {
    const sDataSource = selector.getDataSource()
    expect(sDataSource.length).toBe(dataSource.length)
    expect(dataSource).toEqual(sDataSource.map((v) => selector.clean(v)))
  })

  it(`--API--: [inserValue] | [removeValues] | [clean]`, () => {
    // 选择第一个值
    {
      selector.inserValue([dataSource[0]], inserMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[0]].map((v) => selector.clean(v)))
    }
    // 选择第二个值
    {
      selector.inserValue([dataSource[1]], inserMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[1]].map((v) => selector.clean(v)))
    }
    // 选择第三个值
    {
      selector.inserValue([dataSource[2]], inserMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[2]].map((v) => selector.clean(v)))
    }
    // 选择第四个值 多选
    {
      selector.inserValue([dataSource[3]], inserMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(2)
      expect(values).toEqual(
        [sDataSource[2], sDataSource[3]].map((v) => selector.clean(v))
      )
    }
    // 选择第五个值 变成单选
    {
      selector.inserValue([dataSource[4]], inserMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[4]].map((v) => selector.clean(v)))
    }
    // 清空
    {
      selector.removeValues([dataSource[4]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(sDataSource.length).toBe(dataSource.length)
    }
    // 全选
    {
      selector.inserValue(dataSource, inserMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(dataSource.length)
      expect(values).toEqual(dataSource)
      expect(values).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
    // 清空
    {
      selector.removeValues(dataSource)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(sDataSource.length).toBe(dataSource.length)
    }
  })

  it(`--API--: [change]`, () => {
    // 单选
    {
      selector.change([dataSource[0]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[0]].map((v) => selector.clean(v)))
    }
    // 反选， 清空
    {
      selector.change([dataSource[0]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(dataSource).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
    // 单选
    {
      selector.change([dataSource[1]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[1]].map((v) => selector.clean(v)))
    }
    // 单选
    {
      selector.change([dataSource[2]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[2]].map((v) => selector.clean(v)))
    }
    // 反选， 清空
    {
      selector.change([dataSource[2]])
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(dataSource).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
    // 全选
    {
      selector.change(dataSource, InserMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(dataSource.length)
      expect(values).toEqual(dataSource.map((v) => selector.clean(v)))
      expect(values).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
    // 反选， 清空
    {
      selector.change(dataSource, InserMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(dataSource).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
  })
})
