import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import logo2 from "../images/logo_vt.svg";
import { useAuth } from "./AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";

const Header = () => {
    const { user, login, logout } = useAuth(); // Добавляем login и logout из контекста авторизации

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            login(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/users/logout/'); // Отправляем POST-запрос к logout_view
            logout(); // Вызываем функцию logout после успешного выхода из системы
            localStorage.removeItem('user'); // Удаляем информацию о пользователе из локального хранилища
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        src={logo2}
                        alt="Logo"
                        height="20"
                        className="d-inline-block mb-1"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/home"> Главная </Nav.Link>
                        <Nav.Link href="/about"> О нас </Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <Nav.Link>
                                <p onClick={handleLogout} style={{display:"inline"}}> Выйти из аккаунта {user.username}</p>
                                <p style={{display:"inline"}}> | </p>
                                <Link to="/mypage" className="custom-link">Мой профиль</Link>
                            </Nav.Link>
                        ) : (
                            <Nav.Link>
                                <Link to="/login" className="custom-link">Войти</Link>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;


