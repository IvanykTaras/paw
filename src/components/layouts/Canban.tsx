import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';


interface IProps{
    todo = IPropschildren
}

const Canban: React.FC = ()=>{

    return <>
    <BoardContainer fluid>
      <Row className='d-flex justify-content-around'>
        <Column md={3}>
          <ColumnTitle>To Do</ColumnTitle>
          <TaskCard>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card link</Card.Link>
              <Card.Link href="#">Another link</Card.Link>
            </Card.Body>
          </TaskCard>
        </Column>
        <Column md={3}>
          <ColumnTitle>Doing</ColumnTitle>
          {/* Add tasks here */}
        </Column>
        <Column md={3}>
          <ColumnTitle>Done</ColumnTitle>
          {/* Add tasks here */}
        </Column>
      </Row>
    </BoardContainer>
    </>
}


const BoardContainer = styled(Container)`
  min-height: 100vh;
  padding-top: 20px;
`;

const Column = styled(Col)`
  background-color: #e9ecef;
  border-radius: 5px;
  min-height: 90vh;
  margin: 10px;
 
`;

const ColumnTitle = styled.h2`
  text-align: center;
  color: #495057;
`;

const TaskCard = styled(Card)`
  margin-bottom: 10px;
`;

export {Canban}