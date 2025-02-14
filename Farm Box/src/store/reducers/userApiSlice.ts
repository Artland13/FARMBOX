import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from 'models/IUser';

import url from '../../url';

interface IAuthResponse extends IUser {
  email: string;
  password: string;
  phoneNumber: string;
  surname: string;
  position?: string;
}

interface IUpdatePosition {
  id: number;
  position: string;
}

type IRegUser = Omit<IUser, 'id'>;

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: 'include' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IAuthResponse, IRegUser>({
      query: (user) => ({
        url: '/userReg',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation<IAuthResponse, IUser>({
      query: (user) => ({
        url: '/userLogin',
        method: 'POST',
        body: user,
      }),
    }),
    checkUser: builder.query<IUser, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    updatePosition: builder.mutation<IUser, IUpdatePosition>({
      query: (user) => ({
        url: '/userPosition',
        method: 'PATCH',
        body: user,
      }),
    }),
    userLogout:builder.mutation({
      query:()=>({
        url: '/userLogout',
        method: 'post',
      }),
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCheckUserQuery,
  useUpdatePositionMutation,
  useUserLogoutMutation
} = userApiSlice;
