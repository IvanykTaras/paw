import { useContext } from "react";
import { Navbar } from "react-bootstrap"
import styled from "styled-components";
import { SettingsContext } from "../../App";
import { IPropsChildren } from "../../interfaces/IPropsChildren";
import { Status } from "../../enums/Status";

export type filterOption = Status | "all";

export const ActionPanelElement: React.FC<IPropsChildren> = ({children})=>{

    const settingsContext = useContext(SettingsContext);

    return <ElementPanel className="animate__animated animate__slideInDown" bg={settingsContext.values.nav.bg} data-bs-theme={settingsContext.values.nav.dataBsTheme}>
        {children}
    </ElementPanel>;
}

const ElementPanel = styled(Navbar)`
  margin-bottom: 1rem;
  padding: .5rem 1rem;
  border-radius: 7px;

  &>*{
    margin-right: 1rem;
  }
`