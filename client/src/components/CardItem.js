import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../App.css"
const CardItem = (props) => {
    return (
        <Card style={{ width: '18rem', margin: '10px', borderRadius: '20px', border: 'darkslategray solid 3px', boxShadow: '10px 10px 0px cadetblue', position:'relative'}}>
            <Card.Img
                style={{borderTopLeftRadius:'20px',borderTopRightRadius: '20px', height:'15rem',objectFit: 'cover'}}
                variant="top"
                src={props.excursion.photo}/>
            <Card.Body >
                <div className="card-text">

                <Card.Title className="card-text__title">{props.excursion.title}</Card.Title>
                <Card.Text>{props.excursion.small_description}</Card.Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Link to={`/excursion/${props.excursion.id}`}>
                    <Button style={{backgroundColor: 'cadetblue', border: 'darkslategray solid 2px', marginTop: '7px'}} >Узнать больше</Button>
                </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardItem;