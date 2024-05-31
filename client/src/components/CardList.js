import React, {useState} from 'react';
import { CardGroup } from 'react-bootstrap';
import CardItem from './CardItem';
import excursion from "../pages/Excursion";

const CardList = ({excursions, searchParams} ) => {

    return (
        <div className="cardlist">
            <div className="cardlist__title">
                Наши экскурсии:
            </div>
            <CardGroup className="d-flex flex-wrap cardlist__content">
                {excursions.map(excursion =>
                    <CardItem excursion={excursion} key={excursion.id}/>
                )}
            </CardGroup>
        </div>
    );
};

export default CardList;