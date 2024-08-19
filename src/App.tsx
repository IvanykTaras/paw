import { SideNavBar } from './components/layouts/SideNavBar';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
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


interface IUserAuth{
  values:{
    refreshToken: string,
    accessToken: string,
    userId: string
  },
  setFunction: ((e:{
    refreshToken: string,
    accessToken: string,
    userId: string
  })=>void)
}
export const userAuthContext = createContext<IUserAuth>({
  values: {
    refreshToken: "",
    accessToken: "",
    userId: ""
  },
  setFunction: ()=>{}
});


function App() {  
  const [settingProps, setSettingProps] = useState<ISettings>(useContext(SettingsContext).values);
  const outlet = useOutlet();
  const navigate = useNavigate();
  
  const [userAuth, setUserAuth] = useState<{
    refreshToken: string,
    accessToken: string,
    userId: string
  }>({
    refreshToken: "",
    accessToken: "",
    userId: ""
  });

  useEffect(()=>{
    if(
      userAuth.accessToken.length === 0 &&
      userAuth.refreshToken.length === 0 &&
      userAuth.userId.length === 0 
    ){ navigate("/login")}
  },[])
  
  return (
    <div className='body'>
    <userAuthContext.Provider value={{values: userAuth, setFunction: (e)=>setUserAuth(e)}}>
      <SettingsContext.Provider value={ {values: settingProps, setFunction: (e:ISettings)=>setSettingProps(e)} } >
        {userAuth.accessToken.length > 0 ? <SideNavBar/> : <></>}
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
    </userAuthContext.Provider>
    </div>
  )
}


export default App
