import { Project } from './models/Project'
import { StoryLayout } from './components/pages/StoryLayout';
import { SideNavBar } from './components/layouts/SideNavBar';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { createContext, useContext, useState } from 'react';
import { Theme, Variant } from './enums/BootrapEnums';
import { ISettings, ISettingsContext } from './interfaces/Setting';





export const SettingsContext = createContext<ISettingsContext>({
  values: {
    nav:{
      bg: Variant.light,
      dataBsTheme: Theme.light
    },
    card:{
      bg: Variant.light,
      dataBsTheme: Theme.light
    }
  },
  setFunction: ()=>{}
});



function App() {  
  const [settingProps, setSettingProps] = useState<ISettings>(useContext(SettingsContext).values);

  
 
  return (
    <>
    <SettingsContext.Provider value={ {values: settingProps, setFunction: (e:ISettings)=>setSettingProps(e)} } >
      <SideNavBar/>
      <Container fluid style={{paddingTop: "1rem"}}>
        <Outlet/>
      </Container>
    </SettingsContext.Provider>
    </>
  )
}


export default App
