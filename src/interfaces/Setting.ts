import { Variant, Theme } from "../enums/BootrapEnums"

export interface ISettings{
    nav:{
        bg: Variant,
        dataBsTheme: Theme
    }
    card:{
        bg: Variant,
        dataBsTheme: Theme
    }
}
  
  
  
export interface ISettingsContext{
    values: ISettings,
    setFunction: (e:ISettings)=>void
}