import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setCookie, deleteCookie } from '../../utils/cookie';

import type { TLoginData, TRegisterData } from '../../utils/burger-api';
import type { RootState } from '../store';
import type { TUser } from '@utils-types';

type AuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (data: TLoginData) => {
  const result = await loginUserApi(data);
  localStorage.setItem('refreshToken', result.refreshToken);
  setCookie('accessToken', result.accessToken);
  return result;
});

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const result = await registerUserApi(data);
    localStorage.setItem('refreshToken', result.refreshToken);
    setCookie('accessToken', result.accessToken);
    return result;
  }
);

export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const getUser = createAsyncThunk('auth/getUser', getUserApi);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'error';
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state) => {
      state.isAuthChecked = true;
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const { setAuthChecked, clearAuthError } = authSlice.actions;

export const selectUser = (state: RootState): TUser | null => state.auth.user;

export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.isAuthChecked;

export const selectAuthLoading = (state: RootState): boolean => state.auth.isLoading;

export const selectAuthError = (state: RootState): string | null => state.auth.error;

export default authSlice.reducer;
