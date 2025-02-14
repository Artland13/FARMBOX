// @ts-expect-error: React import is required to use JSX but is not directly referenced in the file
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './index';
import { setupStore } from '@store/store.ts';

const store = setupStore;

describe('Тест страницы входа', () => {
  test('Валидация email при блюре', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </Provider>
      );
    });

    const emailInput = screen.getByLabelText(/Введите e-mail/i);
    await act(async () => {
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
    });

    await waitFor(() => {
      const error = screen.getByText(/Заполните поле/i);
      expect(error).toBeTruthy();
    });
  });

  test('Валидация password при блюре', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </Provider>
      );
    });

    const passwordInput = screen.getByLabelText(/Введите пароль/i);
    await act(async () => {
      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);
    });
    const error = screen.getByText(/Заполните поле/i);
    expect(error).toBeTruthy();
  });
});
