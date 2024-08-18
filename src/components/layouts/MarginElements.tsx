import styled from "styled-components"
import { IPropsChildren } from "../../interfaces/IPropsChildren"



export const MarginElements: React.FC<IPropsChildren> = ({children})=>{
    return <AddMargin>{children}</AddMargin>
}

const AddMargin = styled.div`
    &>*{
        margin: 1rem 0;
    }
`