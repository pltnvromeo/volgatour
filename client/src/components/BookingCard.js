import React, {useEffect, useState} from 'react';
import { Card } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import Button from "react-bootstrap/Button";
import axios from 'axios';


const BookingCard = ({ booking }) => {
    const { user } = useAuth();
    const [cancelling, setCancelling] = useState(false); // Состояние процесса отмены бронирования
    const [deleted, setDeleted] = useState(false);
    const cancelBooking = () => {
        if (window.confirm("Вы уверены, что хотите отменить бронирование?")) {
            setCancelling(true);
            axios.delete(`http://localhost:8000/api/bookings/${booking.id}/`)
                .then(response => {
                    // Обработка успешного удаления бронирования
                    console.log("Бронирование успешно отменено");
                    setDeleted(true)// Дополнительные действия, например, обновление списка бронирований
                })
                .catch(error => {
                    // Обработка ошибки удаления бронирования
                    console.error('Ошибка при отмене бронирования:', error);
                    // Восстановление исходного состояния
                    setCancelling(false);
                });
        }
    };
    useEffect(() => {
        if (deleted) {
            window.location.reload(); // Обновление страницы при изменении состояния удаления
        }
    }, [deleted]);

    return (
        <Card style={{ width: '18rem', margin: '10px', borderRadius: '20px', border: 'darkslategray solid 3px', boxShadow: '3px 3px 0px cadetblue' }}>
            <Card.Body>
                <div className="booking-card">
                    <Card.Title className="card-text__title">
                        <div className="booking-card_check">
                            <div className="booking-card_title">Уникальный номер бронирования: </div>
                            <div className="booking-card_text">{booking.id}</div>
                        </div>
                    </Card.Title>
                    <div className="booking-card-text">
                        <div className="booking-card_check">
                            <div className="booking-card_title">Имя бронирующего: </div>
                            <div className="booking-card_text">{user && user.first_name} {user && user.last_name}</div>
                        </div>
                        <div className="booking-card_check">
                            <div className="booking-card_title">Название экскурсии: </div>
                            <div className="booking-card_text">{booking.excursion.title}</div>
                        </div>
                        <div className="booking-card_check">
                            <div className="booking-card_title">Дата: </div>
                            <div className="booking-card_text">{booking.excursion.datee}</div>
                        </div>
                        <div className="booking-card_check">
                            <div className="booking-card_title">Время: </div>
                            <div className="booking-card_text">{booking.excursion.timee}</div>
                        </div>
                        <div className="booking-card_check">
                            <div className="booking-card_title">Количество забронированных мест: </div>
                            <div className="booking-card_text">{booking.num_of_reserve}</div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button
                        style={{ backgroundColor: 'cadetblue', border: 'darkslategray solid 2px', marginTop: '7px' }}
                        onClick={cancelBooking}
                        disabled={cancelling} // Для блокировки кнопки во время процесса отмены
                    >
                        {cancelling ? "Отмена..." : "Отменить бронирование"}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookingCard;

