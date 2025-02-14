import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';

const initialState: string = '';

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setActivePosition: (_, action: PayloadAction<string>) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApiSlice.endpoints.loginUser.matchFulfilled,
        (_, action) => {
          if (action.payload.position) {
            return action.payload.position;
          }
        }
      )
      .addMatcher(
        userApiSlice.endpoints.checkUser.matchFulfilled,
        (_, action) => {
          if (action.payload.position) {
            return action.payload.position;
          }
        }
      )
      .addMatcher(
        userApiSlice.endpoints.registerUser.matchFulfilled,
        (_, action) => {
          if (action.payload.position) {
            return action.payload.position;
          }
        }
      );
  },
});

export const { setActivePosition } = positionSlice.actions;
export default positionSlice.reducer;