import React from 'react';
import { CardGroup } from "react-bootstrap";
import BookingCard from "./BookingCard";

const BookingCardList = ({ bookings }) => {
    return (
        <div className="booking-card-list">
            <div className="booking-card-list__title">
                Для подтверждения бронирования вам необходимо предъявить чек гиду!
            </div>
            <CardGroup className="d-flex flex-wrap justify-content-between">
                {bookings.map(booking =>
                    <BookingCard booking={booking} key={booking.id}/>
                )}
            </CardGroup>
        </div>
    );
};

export default BookingCardList;
