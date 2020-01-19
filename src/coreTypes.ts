export interface IValueModel {
  value: string | number | boolean | object
  label: string
}

export interface ISValueModel extends IValueModel {
  indexValue?: number
  isCurrent?: boolean
}

export enum InserMode {
  SINGLE = 'single',
  MULTI = 'multi',
}

export enum FilterMode {
  EXTRACT = 'extract',
  REMOVE = 'remove',
}
