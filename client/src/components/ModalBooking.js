import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";

const ModalBooking = ({ show, handleClose, excursionId, userId, availableSeats}) => {
    const [bookingData, setBookingData] = useState({
        seats: '',
        confirmation: false,
        booking_user_id: userId,
        excursion_id: excursionId,
    });
    // Обновляем bookingData, когда excursionId или userId меняются
    useEffect(() => {
        setBookingData(prevState => ({
            ...prevState,
            booking_user_id: userId,
            excursion_id: excursionId,
        }));
    }, [excursionId, userId]);
    // Функция для обновления состояния количества мест
    const handleSeatsChange = (e) => {
        const { value } = e.target;
        setBookingData(prevState => ({
            ...prevState,
            seats: value
        }));
    };

    const handleBookingSubmit = async () => {
        try {
            if (!bookingData.seats) {
                console.error('Ошибка: количество мест не указано');
                return;
            }
            if (!bookingData.seats || bookingData.seats <= 0) { // Проверяем, что количество мест указано и больше нуля
                alert('Пожалуйста, введите корректное количество мест для бронирования.');
                return; // Прерываем отправку данных
            }
            if (bookingData.seats > availableSeats) { // Проверяем, есть ли достаточное количество мест для бронирования
                alert('Недостаточно свободных мест для бронирования. Вы можете указать меньшее количество или выбрать другую экскурсию');
                return;
            }
            const response = await axios.post(
                `http://localhost:8000/api/create-booking/`,
                {
                    // Используем значения из bookingData
                    booking_user_id: bookingData.booking_user_id,
                    excursion_id: bookingData.excursion_id,
                    num_of_reserve: bookingData.seats
                }
            );
            console.log('Данные для отправки на сервер:', {
                booking_user_id: bookingData.booking_user_id,
                excursion_id: bookingData.excursion_id,
                num_of_reserve: bookingData.seats
            });
            console.log('Бронирование создано:', response.data);
            handleClose();
        } catch (error) {
            console.error('Ошибка создания бронирования:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Бронирование экскурсии</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formSeats">
                        <Form.Label>Количество бронируемых мест</Form.Label>
                        <Form.Control
                            type="number"
                            className="mt-1"
                            placeholder="Введите количество мест"
                            value={bookingData.seats}
                            onChange={handleSeatsChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmation">
                        <Form.Check
                            type="checkbox"
                            className="mt-3"
                            label="Подтверждаю бронирование"
                            checked={bookingData.confirmation}
                            onChange={(e) => setBookingData({ ...bookingData, confirmation: e.target.checked })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleBookingSubmit}>
                    Забронировать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBooking;

