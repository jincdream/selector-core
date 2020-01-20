export interface IValueModel {
  value: string | number | boolean | object
  label: string
}

export interface ISValueModel extends IValueModel {
  ____indexValue____?: number
  ____isCurrent____?: boolean
}

export enum InserMode {
  SINGLE = 'single',
  MULTI = 'multi',
}

export enum FilterMode {
  EXTRACT = 'extract',
  REMOVE = 'remove',
}
