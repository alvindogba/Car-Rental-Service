import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TypeScript for the user role
type UserRole = "renter" | "owner";

// Interface for the user object
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

// Interface for the auth state
export interface AuthState {
  user: User;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "renter",
  },
  token: null,
  loading: false,
  error: null,
};

// Define the login payload type
interface LoginPayload {
  user: User;
  token: string;
}

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //function to be user after a user log in
    setCredentials: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    //function to be user after a user log out
    removeCredentials: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "renter",
      };
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
