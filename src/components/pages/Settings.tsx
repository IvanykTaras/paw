import { Button, Card, Form, InputGroup } from "react-bootstrap"
import { MarginElements } from "../layouts/MarginElements"
import { Theme, Variant } from "../../enums/BootrapEnums"
import { useContext } from "react"
import { SettingsContext } from "../../App"
import { ISettingsContext } from "../../interfaces/Setting"
import { ActionPanelElement } from "../layouts/ActionPanelElement"
import { CardSample } from "../layouts/CardSample"

export const Settings: React.FC = ()=>{
    
    const settingContext:ISettingsContext = useContext(SettingsContext);
    
    

    return <>    
        <MarginElements>

            {/* Top pannel settings */}
            <Card >
                <Card.Header>Top pannel</Card.Header>
                <Card.Body>
                    <MarginElements>
                        <Form>
                            <InputGroup>
                            <InputGroup.Text >Bg</InputGroup.Text>
                                <Form.Select 
                                    defaultValue={settingContext.values.nav.bg}
                                    onChange={(e)=>{
                                        settingContext.setFunction({...settingContext.values, nav: {...settingContext.values.nav, bg: e.target.value as Variant} })
                                    }}>
                                    { (Object.keys(Variant) as Array<keyof typeof Variant>).map((key,id) => {
                                        return <option key={id} value={key}>{key}</option>;
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Form>
                        <Form>
                            <InputGroup>
                                <InputGroup.Text >Data Bs Theme</InputGroup.Text>
                                <Form.Select 
                                    defaultValue={settingContext.values.nav.dataBsTheme} 
                                    onChange={(e)=>{
                                        settingContext.setFunction({...settingContext.values, nav: {...settingContext.values.nav, dataBsTheme: e.target.value as Theme} })
                                    }}>
                                    { (Object.keys(Theme) as Array<keyof typeof Theme>).map((key,id) => {
                                        return <option 
                                                    key={id} 
                                                    value={key}
                                                    
                                                    >
                                                {key}
                                                </option>;
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Form>
                    </MarginElements>
                </Card.Body>
                <Card.Footer>
                {/* Panel to show settings */}
                <ActionPanelElement>
                        <Form>
                            <InputGroup>
                            <InputGroup.Text>some name</InputGroup.Text>
                            <Form.Control
                                placeholder="find something"
                                />
                            </InputGroup>
                        </Form> 
                        <Form>
                        <Form.Select>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                        </Form.Select>
                        </Form>
                        <Button variant='info'>button</Button>
                </ActionPanelElement> 
                </Card.Footer>
            </Card>


             {/* Card settings */}
            <Card >
                <Card.Header>Card</Card.Header>
                <Card.Body>
                    <MarginElements>
                        <Form>
                            <InputGroup>
                            <InputGroup.Text >Bg</InputGroup.Text>
                                <Form.Select 
                                    defaultValue={settingContext.values.card.bg}
                                    onChange={(e)=>{
                                        settingContext.setFunction({...settingContext.values, card:{...settingContext.values.card, bg: e.target.value as Variant}})
                                    }}>
                                    { (Object.keys(Variant) as Array<keyof typeof Variant>).map((key,id) => {
                                        return <option key={id} value={key}>{key}</option>;
                                    })}
                                </Form.Select>
                            </InputGroup>
                        
                            <InputGroup>
                                <InputGroup.Text >Data Bs Theme</InputGroup.Text>
                                <Form.Select 
                                    defaultValue={settingContext.values.card.dataBsTheme} 
                                    onChange={(e)=>{
                                        settingContext.setFunction({...settingContext.values, card:{...settingContext.values.card, dataBsTheme: e.target.value as Theme}})
                                    }}>
                                    { (Object.keys(Theme) as Array<keyof typeof Theme>).map((key,id) => {
                                        return <option 
                                                    key={id} 
                                                    value={key}
                                                    
                                                    >
                                                {key}
                                                </option>;
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Form>
                    </MarginElements>
                </Card.Body>
                <Card.Footer>
                {/* Card to show settings */}
                    <CardSample/>           
                </Card.Footer>
            </Card>




        </MarginElements>

        
    </>
}

