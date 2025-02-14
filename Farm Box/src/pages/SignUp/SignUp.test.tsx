// @ts-expect-error: React import is required to use JSX but is not directly referenced in the file
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '@store/store.ts';
import '@testing-library/jest-dom'; // Добавляем импорт jest-dom
import SignUp from './index';

const store = setupStore;

describe('Тест страницы регистрации', () => {
  test('Валидация поля имени', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const nameInput = screen.getByLabelText(/Ваше имя/i);
    await act(async () => {
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'A' } });
      fireEvent.blur(nameInput);
    });
    expect(screen.getByText(/Больше двух символов/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'A'.repeat(51) } });
      fireEvent.blur(nameInput);
    });
    expect(screen.getByText(/Меньше 50 символов/i)).toBeInTheDocument();
  });

  test('Валидация поля фамилии при блюре', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const surnameInput = screen.getByLabelText(/Ваша фамилия/i);
    await act(async () => {
      fireEvent.focus(surnameInput);
      fireEvent.blur(surnameInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(surnameInput, { target: { value: 'A' } });
      fireEvent.blur(surnameInput);
    });
    expect(screen.getByText(/Больше двух символов/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(surnameInput, { target: { value: 'A'.repeat(51) } });
      fireEvent.blur(surnameInput);
    });
    expect(screen.getByText(/Меньше 50 символов/i)).toBeInTheDocument();
  });

  test('Валидация поля номера телефона', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const phoneInput = screen.getByLabelText(/Ваш номер телефона/i);
    await act(async () => {
      fireEvent.focus(phoneInput);
      fireEvent.blur(phoneInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(phoneInput, { target: { value: '12345' } });
      fireEvent.blur(phoneInput);
    });
    expect(screen.getByText(/Больше 11 символов/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(phoneInput, { target: { value: '+12345678901234' } });
      fireEvent.blur(phoneInput);
    });
    expect(screen.getByText(/Меньше 13 символов/i)).toBeInTheDocument();
  });

  test('Валидация поля email при блюре', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const emailInput = screen.getByLabelText(/Введите e-mail/i);
    await act(async () => {
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'a@b.' } });
      fireEvent.blur(emailInput);
    });
    expect(screen.getByText(/Больше 5 символов/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: 'a'.repeat(66) + '@example.com' },
      });
      fireEvent.blur(emailInput);
    });
    expect(screen.getByText(/Меньше 70 символов/i)).toBeInTheDocument();
  });

  test('Валидация поля пароля', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const passwordInput = screen.getByLabelText(/Введите пароль/i);
    await act(async () => {
      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: '1234' } });
      fireEvent.blur(passwordInput);
    });
    expect(screen.getByText(/Больше 5 символов/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'a'.repeat(71) } });
      fireEvent.blur(passwordInput);
    });
    expect(screen.getByText(/Меньше 70 символов/i)).toBeInTheDocument();
  });

  test('Валидация поля повторения пароля', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </Provider>
      );
    });

    const repPasswordInput = screen.getByLabelText(/Повторите пароль/i);
    await act(async () => {
      fireEvent.focus(repPasswordInput);
      fireEvent.blur(repPasswordInput);
    });

    expect(screen.getByText(/Это обязательное поле/i)).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/Введите пароль/i);
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: '1234' } });
      fireEvent.blur(passwordInput);
    });

    await act(async () => {
      fireEvent.change(repPasswordInput, { target: { value: '12346' } });
      fireEvent.blur(repPasswordInput);
    });
    expect(screen.getByText(/Пароли не совпадают/i)).toBeInTheDocument();
  });
});
