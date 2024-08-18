import { Card } from "react-bootstrap"
import { IPropsChildren } from "../../interfaces/IPropsChildren"
import { useContext } from "react"
import { SettingsContext } from "../../App";

export const CustomCard:React.FC<IPropsChildren> = ({children})=>{
    const settingsContext = useContext(SettingsContext);
    return <Card data-bs-theme={settingsContext.values.card.dataBsTheme} bg={settingsContext.values.card.bg} >{children}</Card>
}