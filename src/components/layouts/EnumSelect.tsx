import { Form, InputGroup } from "react-bootstrap";
import { Status } from "../../enums/Status";
import { Priority } from "../../enums/Priority";
import { Theme } from "../../enums/BootrapEnums";
import { Variant } from "react-bootstrap/esm/types";
import { IPropsChildren } from "../../interfaces/IPropsChildren";



type Enums = Status | Priority | Theme | Variant 

interface IProps extends IPropsChildren{
    enum: Enums
    defaultValue: string;
    onChange: ()=>void

}

export const EnumSelect: React.FC<IProps> = ( { defaultValue, onChange, children, enum:Enums } ) => {
    return <>
        <InputGroup>
            <InputGroup.Text >Data Bs Theme</InputGroup.Text>
            <Form.Select 
                defaultValue={defaultValue} 
                onChange={onChange}>
                { (Object.keys(Theme)).map((key,id) => {
                    return <option 
                                key={id} 
                                value={key}
                                
                                >
                            {key}
                            </option>;
                })}
            </Form.Select>
        </InputGroup>
    </>
}