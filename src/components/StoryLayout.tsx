import { Alert, Button, Card, Container, Form, InputGroup, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { StoryAPI } from '../services/StoryAPI';
import { Story } from '../models/Story';
import { Status } from '../enums/Status';
import { useStatusToString } from '../utils/useStatusToString';
import { useState } from 'react';

type filterOption = Status | "all";

export const StoryLayout: React.FC = ()=>{

    const [filterStatus, setFilterStatus] = useState<filterOption>("all");
    const [filterName, setFilterName] = useState<string>("");
    const [filterDescription, setFilterDescription] = useState<string>("");


    const selectStatus = (status: filterOption) => setFilterStatus(status) 
    const findName = (name: string) => setFilterName(name)
    const findDescription = (desc: string) => setFilterDescription(desc)

    const filterStatusCb = (story: Story) => (story.status === filterStatus) || filterStatus === "all" 
    const filterNameCb = (story: Story) => story.name.includes(filterName)
    const filterDescriptionCb = (story: Story) => story.description.includes(filterDescription)
    

    return <>
        <Container fluid>
            <Navbar>
                <NavElement>
                    <Form style={{marginRight: "0 1rem"}}>
                        <InputGroup>
                            <InputGroup.Text >Status</InputGroup.Text>
                            <Form.Select onChange={ e => selectStatus(e.target.value as filterOption)}>
                                <option value={"all"}>all</option>
                                <option value={Status.Todo}>{Status.Todo}</option>
                                <option value={Status.Doing}>{Status.Doing}</option>
                                <option value={Status.Done}>{Status.Done}</option>
                            </Form.Select>
                        </InputGroup>
                    </Form>
                </NavElement>
                
                <NavElement>
                    <Form>
                        <InputGroup>
                        <InputGroup.Text>Story name</InputGroup.Text>
                        <Form.Control 
                            placeholder="find name"
                            onChange={e => setFilterName(e.target.value)}
                            />
                        </InputGroup>
                    </Form>
                </NavElement>

                <NavElement>
                    <Form>
                        <InputGroup>
                        <InputGroup.Text>Story description</InputGroup.Text>
                        <Form.Control 
                            placeholder="find description"
                            onChange={e => setFilterDescription(e.target.value)}
                            />
                        </InputGroup>
                    </Form>
                </NavElement>
            </Navbar>

            {StoryAPI.getAll()
                .filter(filterStatusCb)
                .filter(filterNameCb)
                .filter(filterDescriptionCb)
                .map(
                (story: Story, index: number) => (
                <StoryCard key={index}>
                    <CardBody>
                        <CardName>  Name of history: {story.name} </CardName>
                        <CardDescription> Description of history: {story.description} </CardDescription>
                        <CardStatus variant={useStatusToString(story.status) as string}>status: {story.status}</CardStatus>
                    </CardBody>
                </StoryCard>
                )
            )}

        </Container>
    </>
}


const StoryCard = styled(Card)`
  margin: .5rem 0;
`

const CardBody = styled(Card.Body)`
  text-align: left;
`;

const CardName = styled(Card.Title)``;

const CardDescription = styled(Card.Text)``;

const CardStatus = styled(Alert)``;

const NavElement = styled.div`
   margin-right: 1rem; 
`

