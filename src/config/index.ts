export enum ThemeFieldType {
  TEXT,
  SELECT
}

export interface ThemeField {
  key: string
  label: string
  type: ThemeFieldType
  values?: Array<any>
}

export interface ThemeConfig {
  name: string
  fields: Array<ThemeField>
  default: any
}
