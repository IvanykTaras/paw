import { SideNavBar } from './components/layouts/SideNavBar';
import { Outlet, useOutlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { createContext, useContext, useState } from 'react';
import { Theme, Variant } from './enums/BootrapEnums';
import { ISettings, ISettingsContext } from './interfaces/Setting';
import { MarginElements } from './components/layouts/MarginElements';





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
  const outlet = useOutlet();
  
 
  return (
    <>
    <SettingsContext.Provider value={ {values: settingProps, setFunction: (e:ISettings)=>setSettingProps(e)} } >
      <SideNavBar/>
      <Container fluid style={{paddingTop: "1rem"}}>
        {
          outlet ?  <Outlet/> : <>
            <div style={{ textAlign: "center", marginTop: "15rem"}}>
              <MarginElements>
                <h1 style={{fontSize: "10rem"}} className='animate__animated  animate__fadeInDown'>Manage me</h1>
                <p style={{fontSize: "3rem"}} className='animate__animated  animate__fadeInRight'> <i>"Mam nadzieje że to działa"</i></p>
                <pre style={{fontSize: "2rem", marginLeft: "20rem"}} className='animate__animated  animate__fadeInUp'><b>Taras Ivanyk</b></pre>
              </MarginElements>
            </div>
          </>
        }
      </Container>
    </SettingsContext.Provider>
    </>
  )
}


export default App
