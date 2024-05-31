import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "../App.css";
import axios from "axios";
import { useAuth } from '../components/AuthContext';
import ModalBooking from "../components/ModalBooking";
import ModalWarning from "../components/ModalWarning";

const Excursion = () => {
    const { id } = useParams();
    const [excursionData, setExcursionData] = useState({ description: '', datee: '', timee: '', cost:'', group_size:'', category:'', route:'', complexity:'', guide: '', photo:''});
    const { user } = useAuth();
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCloseAuthModal = () => setShowAuthModal(false);
    const handleCloseBookingModal = () => setShowBookingModal(false);

    useEffect(() => {
        fetchExcursionData();
    }, []);

    const fetchExcursionData = () => {
        axios
            .get(`http://localhost:8000/api/excursions/${id}/`)
            .then(res => {
                setExcursionData(res.data);
                fetchBookings();
            })
            .catch(err => console.log(err));
    };

    const fetchBookings = () => {
        axios
            .get(`http://localhost:8000/api/excursions/${id}/bookings`)
            .then(res => {
                const bookings = res.data;
                setExcursionData(prevData => ({ ...prevData, bookings: bookings }));
            })
            .catch(err => console.log(err));
    };

    const calculateAvailableSeats = () => {
        if (!excursionData.bookings) return parseInt(excursionData.group_size);
        const reservedSeats = excursionData.bookings.reduce((total, booking) => total + booking.num_of_reserve, 0);
        return parseInt(excursionData.group_size) - reservedSeats;
    };

    const handleBookingClick = () => {
        if (user) {
            setShowBookingModal(true);
        } else {
            setShowAuthModal(true);
        }
    };

    if (!excursionData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h2 className="excursion-title">{excursionData.title}</h2>
            <div className="pageelem">
                <div className="pageelem__title">Описание экскурсии:</div>
                <div className="excursion-main-description">
                    <div className="excursion_photo">
                        <img src={excursionData.photo} alt=""/>
                    </div>
                    <div className="excursion-main-description__info" dangerouslySetInnerHTML={{ __html: excursionData.description }}></div>
                    <div style={{ clear: 'both' }}></div> {/* Добавляем блок для очистки */}
                </div>
                <div className="excursion_details">
                    <div className="excursion-description">
                        <div className="excursion-description__title">Размер группы:</div>
                        <div className="excursion-description__info">{excursionData.group_size}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Количество свободных мест:</div>
                        <div className="excursion-description__info">{calculateAvailableSeats()}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Категория:</div>
                        <div className="excursion-description__info">{excursionData.category && excursionData.category.name}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Стоимость за место:</div>
                        <div className="excursion-description__info">{excursionData.cost} рублей</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Дата и время проведения:</div>
                        <div className="excursion-description__info">{excursionData.datee} {excursionData.timee}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Гид:</div>
                        <div className="excursion-description__info">{excursionData.guide && excursionData.guide.first_name} {excursionData.guide && excursionData.guide.last_name} {excursionData.guide && excursionData.guide.email}</div>
                    </div>
                    <div className="pageelem__title">О маршруте:</div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Сложность:</div>
                        <div className="excursion-description__info">{excursionData.route && excursionData.route.complexity && excursionData.route.complexity.name}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Длительность:</div>
                        <div className="excursion-description__info">{excursionData.route && excursionData.route.duration}</div>
                    </div>
                    <div className="excursion-description">
                        <div className="excursion-description__title">Длина маршрута:</div>
                        <div className="excursion-description__info">{excursionData.route && excursionData.route.length} км.</div>
                    </div>
                    <button
                        style={{ marginTop:'10px', backgroundColor: 'cadetblue', border: 'darkslategray solid 2px', fontWeight: 'bold' }}
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={handleBookingClick}>
                        Забронировать
                    </button>
                </div>
            </div>
            {/* Модальное окно для бронирования */}
            <ModalBooking
                show={showBookingModal}
                handleClose={handleCloseBookingModal}
                excursionId={excursionData ? excursionData.id : null}
                userId={user ? user.id : null}
                availableSeats={calculateAvailableSeats()}
            />
            {/* Модальное окно для неавторизованных пользователей */}
            <ModalWarning show={showAuthModal} handleClose={handleCloseAuthModal} />
        </Container>
    );
};

export default Excursion;
