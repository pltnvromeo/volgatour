import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "./AuthContext"; // Импорт контекста авторизации


const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null); // Состояние для хранения ошибки

    // Получение функции login из контекста авторизации
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/users/login/',
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log("Response date:", response.data);
            // Проверка наличия сообщения об успешном входе
            if (response.data.user) {
                login(response.data.user); // Передаем данные пользователя в функцию login
                // Получаем значение is_staff из ответа сервера
                const isStaff = response.data.user && response.data.user.is_staff;
                // Проверяем, является ли пользователь сотрудником
                if (isStaff) {
                    // Если пользователь является сотрудником, перенаправляем его на страницу администратора
                    window.location.href = 'http://localhost:8000/admin/';
                } else {
                    // В противном случае перенаправляем на страницу Home
                    navigate('/home');
                }
            }
        } catch (error) {
            console.error('Ошибка при аутентификации:', error);
            // Если произошла ошибка, устанавливаем состояние ошибки для отображения сообщения
            setError('Неверные учетные данные');
        }
    };

    return (
        <div className="loginFormWrapper">
            <div className="loginForm">
                <h3>Войти в профиль</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" controlId="formBasicText">
                        <label htmlFor="username" className="form-label">Логин</label>
                        <input type="text" name="username" value={loginData.username} onChange={handleChange} className="form-control" id="username" placeholder="Введите логин" />
                    </div>
                    <div className="mb-3" controlId="formBasicPassword">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" id="password" placeholder="Введите пароль" />
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Отображение ошибки */}
                    <p>
                        Ещё не зарегистрированы? <Link to="/register">Зарегистрироваться.</Link>
                    </p>
                    <button style={{ backgroundColor: 'cadetblue', border: 'darkslategray solid 2px' }} className="btn btn-primary" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;





