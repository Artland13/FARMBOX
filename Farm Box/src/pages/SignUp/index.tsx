import { useForm } from 'react-hook-form';
import s from './signup.module.scss';
import InputWithTitle from '@components/ui/InputWithTitle/InputWithTitle';
import { Link, useNavigate } from 'react-router-dom';
import BtnPraimary from '@components/ui/BtnPraimary/BtnPraimary';
import BtnSecondary from '@components/ui/BtnSecondary/BtnSecondary';
import { IUser } from 'models/IUser';
import { useRegisterUserMutation } from '@store/reducers/userApiSlice';
import { useState } from 'react';
// @ts-expect-error: React import is required to use JSX but is not directly referenced in the file
import React from 'react';

export default function SignUp() {
  interface InputForm extends Omit<IUser, 'id'>{
    repPassword: string;
    email: string;
    password: string;
    phoneNumber: string;
    surname: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputForm>({
    mode: 'onBlur',
  });

  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const password = watch('password');

  const onSubmit = async (data: InputForm) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {repPassword,...filteredData}=data
      await registerUser(filteredData).unwrap();
      navigate('/');
    } catch (err) {
      const error = err as { data: string };
      setError(error.data);
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.mainContainer}>
        <div className={s.header}>Регистрация</div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <InputWithTitle
            title="Ваше имя"
            type="text"
            placeholder="Иван"
            {...register('name', {
              required: 'Это обязательное поле',
              maxLength: {
                value: 50,
                message: 'Меньше 50 символов',
              },
              minLength: {
                value: 2,
                message: 'Больше двух символов',
              },
            })}
          />
          {errors?.name && <p className={s.error}>{errors?.name.message}</p>}
          <InputWithTitle
            title="Ваша фамилия"
            type="text"
            placeholder="Иванов"
            {...register('surname', {
              required: 'Это обязательное поле',
              maxLength: {
                value: 50,
                message: 'Меньше 50 символов',
              },
              minLength: {
                value: 2,
                message: 'Больше двух символов',
              },
            })}
          />
          {errors?.surname && (
            <p className={s.error}>{errors?.surname.message}</p>
          )}
          <InputWithTitle
            title="Ваш номер телефона"
            type="tel"
            placeholder="+79123456789"
            {...register('phoneNumber', {
              required: 'Это обязательное поле',
              maxLength: {
                value: 13,
                message: 'Меньше 13 символов',
              },
              minLength: {
                value: 11,
                message: 'Больше 11 символов',
              },
            })}
          />
          {errors?.phoneNumber && (
            <p className={s.error}>{errors?.phoneNumber.message}</p>
          )}
          <InputWithTitle
            title="Введите e-mail"
            type="email"
            placeholder="exmp@gmail.com"
            {...register('email', {
              required: 'Это обязательное поле',
              maxLength: {
                value: 70,
                message: 'Меньше 70 символов',
              },
              minLength: {
                value: 5,
                message: 'Больше 5 символов',
              },
            })}
          />
          {errors?.email && <p className={s.error}>{errors?.email.message}</p>}
          <InputWithTitle
            title="Введите пароль"
            type="password"
            {...register('password', {
              required: 'Это обязательное поле',
              maxLength: {
                value: 70,
                message: 'Меньше 70 символов',
              },
              minLength: {
                value: 5,
                message: 'Больше 5 символов',
              },
            })}
          />
          {errors?.password && (
            <p className={s.error}>{errors?.password.message}</p>
          )}
          <InputWithTitle
            title="Повторите пароль"
            type="password"
            {...register('repPassword', {
              required: 'Это обязательное поле',
              validate: value => value === password || 'Пароли не совпадают'
            })}
          />
          {errors?.repPassword && <p className={s.error}>{errors?.repPassword.message}</p>}
          {error && <p className={s.error}>{error}</p>}
          <div className={s.buttons}>
            <BtnPraimary type="submit" title={'Регистрация'} />
            <Link to="/signin">
              <BtnSecondary title={'Войти'} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
