import { Container, Row, Col, Badge } from 'react-bootstrap';
import styled from 'styled-components';


const TaskInfo: React.FC = ()=>{
    return <>
        <Container>
            <Row>
            <Col>
                <TaskTitle>
                Task title - <Subtitle>task1</Subtitle>
                </TaskTitle>
            </Col>
            </Row>
      
            <Row>
                <Col md={3}>
                    <InfoBadge>Priority: High</InfoBadge>
                </Col>
                <Col md={3}>    
                    <InfoBadge>Story id: 12</InfoBadge>
                </Col>
                <Col md={3}>
                    <InfoBadge>Status: Todo</InfoBadge>
                </Col>
                <Col md={3}>
                    <InfoBadge>User id: 12</InfoBadge>
                </Col>
            </Row>
      
            <Row>
                <Col md={6}>
                <DateBadge>Estimated time: 12.01.2024</DateBadge>
                </Col>
                <Col md={6}>
                <DateBadge>Creation date: 12.01.2024</DateBadge>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                <DateBadge>Start date: 12.01.2024</DateBadge>
                </Col>
                <Col md={6}>
                <DateBadge>Completion date: 12.01.2024</DateBadge>
                </Col>
            </Row>
            <Row>
                <Col>
                <DescriptionTitle>Description</DescriptionTitle>
                <DescriptionText>
                    Description of task Description of taskDescription of taskDescription of taskDescription of task Description of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of taskDescription of task
                </DescriptionText>
                </Col>
            </Row>
        </Container>
    </>
}

const TaskTitle = styled.h2`
  color: #DAA520;
  margin-bottom: 10px;
`;

const Subtitle = styled.span`
  color: #DAA520;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const InfoBadge = styled.div`
  background-color: #FFEB3B;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const DateBadge = styled.div`
  background-color: #B3E5FC;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const DescriptionTitle = styled.h4`
  color: #DAA520;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DescriptionText = styled.p`
  color: #333;
`;

export {TaskInfo}