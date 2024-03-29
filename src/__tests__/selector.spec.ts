import Selector from '../index'
import { InsertMode, ISValueModel } from '../coreTypes'

const Copy = (o: object | object[]) => JSON.parse(JSON.stringify(o))

const insertMode = InsertMode
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

  it(`--API--: [insertValue] | [removeValues] | [clean]`, () => {
    // 选择第一个值
    {
      selector.insertValue([dataSource[0]], insertMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[0]].map((v) => selector.clean(v)))
    }
    // 选择第二个值
    {
      selector.insertValue([dataSource[1]], insertMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[1]].map((v) => selector.clean(v)))
    }
    // 选择第三个值
    {
      selector.insertValue([dataSource[2]], insertMode.SINGLE)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(1)
      expect(values).toEqual([sDataSource[2]].map((v) => selector.clean(v)))
    }
    // 选择第四个值 多选
    {
      selector.insertValue([dataSource[3]], insertMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(2)
      expect(values).toEqual(
        [sDataSource[2], sDataSource[3]].map((v) => selector.clean(v))
      )
    }
    // 选择第五个值 变成单选
    {
      selector.insertValue([dataSource[4]], insertMode.SINGLE)
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
      selector.insertValue(dataSource, insertMode.MULTI)
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
      selector.change(dataSource, InsertMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(dataSource.length)
      expect(values).toEqual(dataSource.map((v) => selector.clean(v)))
      expect(values).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
    // 反选， 清空
    {
      selector.change(dataSource, InsertMode.MULTI)
      const values = selector.getValues()
      const sDataSource = selector.getDataSource()
      expect(values.length).toBe(0)
      expect(values).toEqual([])
      expect(dataSource).toEqual(sDataSource.map((v) => selector.clean(v)))
    }
  })

  it(`--API--: [newDataSource]`, () => {
    const newDatasource = [
      {
        label: 'text0',
        value: 0,
      },
      {
        label: 'text990',
        value: 999,
      },
    ]
    const targetDatasource = [
      {
        label: 'text990',
        value: 999,
      } as ISValueModel,
    ].concat(dataSource)

    selector.addDataSource(newDatasource)
    const resultDataSource = selector
      .getDataSource()
      .map((v) => selector.clean(v))
    expect(resultDataSource).toEqual(targetDatasource)
  })

  it(`--API--: [dataSource value]`, () => {
    const dataSource = ([
      {
        value: '0',
        label: '',
        checked: 'false',
        image:
          '//img.alicdn.com/bao/uploaded/i1/263667666/O1CN01AqzXxs26V4o35xsB5_!!0-item_pic.jpg',
        itemId: '605984572601',
        itemName: '11111为鲲测试请不要拍002',
        price: '1.0',
      },
      {
        value: '2',
        label: '',
        checked: 'false',
        image:
          '//img.alicdn.com/bao/uploaded/i4/263667666/O1CN015sdt1Q26V4o1qDx5y_!!0-item_pic.jpg',
        itemId: '605979860998',
        itemName: '为鲲测试，请不要拍001',
        price: '1.0',
      },
    ] as unknown) as ISValueModel[]
    let _selector = new Selector(dataSource, ([
      { value: '0', price: '1.0' },
    ] as unknown) as ISValueModel[])
    _selector.mixValueFromDataSource()
    // bad case
    // expect(_selector.getValues()).toEqual([{
    //   label: 'text0',
    //   value: 0
    // }])
    expect(_selector.getValues()).toEqual([dataSource[0]])
  })

  it(`--API--: [fixValue]`, () => {
    type Item = {
      itemId: string
      itemName: string
    }
    let _selector = new Selector([], [])
    const items: Item[] = [
      {
        itemId: '605984572601',
        itemName: '11111为鲲测试请不要拍002',
      },
      {
        itemId: '605979860998',
        itemName: '为鲲测试，请不要拍001',
      },
    ]
    const itemValue: Item[] = [
      {
        itemId: '605984572601',
        itemName: '11111为鲲测试请不要拍002',
      },
    ]
    const dataSource = _selector.fixValue<Item>({
      valueKey: 'itemId',
      labelKey: 'itemName',
      values: items,
    })
    const values = _selector.fixValue<Item>({
      valueKey: 'itemId',
      values: itemValue,
    })
    _selector.init(dataSource, values)

    expect(_selector.getDataSource().map((d) => _selector.clean(d))).toEqual(
      dataSource
    )
    expect(_selector.getValues()).toEqual(values)
  })
})
