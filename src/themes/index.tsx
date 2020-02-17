import SuperluminarTheme, { Config as SuperluminarConfig } from './superluminar'
import SuperluminarAWSTheme, { Config as SuperluminarAWSConfig } from './superluminar-aws'
import { ThemeConfig } from '../config'

export interface IThemeList {
  [key: string]: { Preview: React.FC<any>; Config: ThemeConfig }
}

export const ThemeList: IThemeList = {
  superluminar: {
    Preview: SuperluminarTheme,
    Config: SuperluminarConfig
  },
  'superluminar-aws': {
    Preview: SuperluminarAWSTheme,
    Config: SuperluminarAWSConfig
  }
}

export const ThemeDefault = Object.keys(ThemeList)[0]
