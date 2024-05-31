import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter as Router, useNavigate} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { AuthProvider, useAuth } from '../components/AuthContext';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');
jest.mock('../components/AuthContext', () => ({
    useAuth: jest.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>,
}));
// Добавляем замоканную функцию useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
describe('LoginForm Component', () => {
    let loginMock;
    let mockNavigate;
    beforeEach(() => {
        loginMock = jest.fn();
        useAuth.mockReturnValue({ login: loginMock });
        mockNavigate = jest.fn();
        // Мокаем useNavigate для возврата mockNavigate
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    test('корректное отображение формы', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        );

        expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    });

    test('обработка успешной отправки формы', async () => {
        const userData = { user: { is_staff: false } };
        axios.post.mockResolvedValue({ data: userData });

        render(
            <Router>
                <AuthProvider>
                    <LoginForm />
                </AuthProvider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith(userData.user);
        });
    });

    test('показывается сообщение об ошибке при неудачной попытке входа', async () => {
        axios.post.mockRejectedValue(new Error('Invalid credentials'));

        render(
            <Router>
                <AuthProvider>
                    <LoginForm />
                </AuthProvider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('Неверные учетные данные');
        });
    });
    test('перенаправляет пользователя на нужную страницу после успешного входа', async () => {
        const userData = { user: { is_staff: false } };
        axios.post.mockResolvedValue({ data: userData });

        render(
            <Router>
                <AuthProvider>
                    <LoginForm />
                </AuthProvider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Логин/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith(userData.user);
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });
});
