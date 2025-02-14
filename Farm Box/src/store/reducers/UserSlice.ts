import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/IUser';
import { userApiSlice } from './userApiSlice';
import { RootState } from '@store/store';

interface IUserState {
  user: IUser | null;
  isAuthentificated: boolean;
  error: string;
}

const initialState: IUserState = {
  user: null,
  isAuthentificated: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: () => initialState,
    userLogin: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthentificated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApiSlice.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthentificated = true;
        }
      )
      .addMatcher(
        userApiSlice.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthentificated = true;
        }
      )
      .addMatcher(
        userApiSlice.endpoints.checkUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthentificated = true;
        }
      );
  },
});

export const { userLogout,userLogin } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthentificated = (state: RootState) =>
  state.user.isAuthentificated;
export const selectUser = (state: RootState) => state.user.user;