import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useAuth } from "../components/AuthContext";
import BookingCardList from "../components/BookingCardList";
import axios from 'axios';

const PersonalPage = () => {
    const { user } = useAuth();
    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/bookings/?user_id=${user.id}`)
                .then(response => {
                    setBookingList(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при получении списка бронирований:', error);
                });
        }
    }, [user]);

    return (
        <Container>
            <div className="pageelem">
                <div className="pageelem__title">Информация о профиле:</div>

                <div className="excursion-description">
                    <div className="excursion-description__title">Имя:</div>
                    <div className="excursion-description__info">{user && user.first_name}</div>
                </div>

                <div className="excursion-description">
                    <div className="excursion-description__title">Фамилия:</div>
                    <div className="excursion-description__info">{user && user.last_name}</div>
                </div>

                <div className="excursion-description">
                    <div className="excursion-description__title">Эл почта:</div>
                    <div className="excursion-description__info">{user && user.email}</div>
                </div>

                <div className="pageelem pageelem_children">
                    <div className="pageelem__title">Бронирования:</div>
                    <BookingCardList bookings={bookingList}/>
                </div>

            </div>

        </Container>
    );
};

export default PersonalPage;
