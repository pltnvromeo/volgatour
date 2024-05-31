import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null); // Добавляем состояние для хранения ошибки
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что все поля заполнены
        if (!formData.username || !formData.email || !formData.first_name || !formData.last_name || !formData.password || !formData.confirmPassword) {
            setError('Все поля должны быть заполнены!'); // Устанавливаем ошибку
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают!'); // Устанавливаем ошибку
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/users/register/', formData);
            console.log(response.data);
            if (response.data.message) {
                login(formData);
                navigate('/home');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response.data.error) {
                setError('Пользователь с таким логином или эл.почтой уже существует!'); // Устанавливаем ошибку из ответа сервера
            }
        }
    };

    return (
        <div className="loginFormWrapper">
            <div className="registerForm">
                <h5 style={{textAlign: "center"}}>Регистрация</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Введите логин" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Эл.почта</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Введите эл.почту" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Ваше имя" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Ваша фамилия" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Введите пароль еще раз" />
                        {error && <p className="text-danger">{error}</p>}
                    </Form.Group>

                    <Button style={{backgroundColor: 'cadetblue', border: 'darkslategray solid 2px'}} type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;


