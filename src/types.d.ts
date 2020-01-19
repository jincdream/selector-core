export interface ISValueModel {
  value: string | number | boolean | object
  label: string
  indexValue?: number
  isCurrent?: boolean
}
export enum InserMode {
  SINGLE = 'single',
  MULTI = 'multi',
}
