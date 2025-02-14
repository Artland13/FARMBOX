import { useForm } from 'react-hook-form';
import s from './SignIn.module.scss';
import InputWithTitle from '@ui/InputWithTitle/InputWithTitle';
import BtnPraimary from '@ui/BtnPraimary/BtnPraimary';
import { Link, useNavigate } from 'react-router-dom';
import BtnSecondary from '@ui/BtnSecondary/BtnSecondary';
import { IUser } from 'models/IUser';
import { useLoginUserMutation } from '@store/reducers/userApiSlice';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { userLogin } from '@store/reducers/UserSlice';
// @ts-expect-error: React import is required to use JSX but is not directly referenced in the file
import React from 'react';

export default function SignIn() {
  interface IFormLogin extends IUser {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: IUser) => {
    try {
      const req = await loginUser(data).unwrap();
      dispatch(userLogin(req));
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
        <div className={s.header}>Вход</div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} data-testid="sign-in-form">
          <InputWithTitle
            title="Введите e-mail"
            type="email"
            {...register('email', {
              required: 'Это обязательное поле',
            })}
          />
          {errors?.email && <p className={s.error}>Заполните поле</p>}
          <InputWithTitle
            title="Введите пароль"
            type="password"
            {...register('password', {
              required: 'Это обязательное поле',
            })}
          />
          {errors?.password && <p className={s.error}>Заполните поле</p>}
          {error && <p className={s.error}>{error}</p>}
          <div className={s.buttons}>
            <BtnPraimary type="submit" title={'Вход'} />
            <Link to="/signup">
              <BtnSecondary title={'Регистрация'} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
