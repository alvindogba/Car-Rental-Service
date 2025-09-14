import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export interface Booking {
  id: string;
  renterId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentIntentId?: string | null;
  clientSecret?: string | null;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<Booking, { vehicleId: string; startDate: string; endDate: string }>({
      query: (body) => ({ url: "/bookings", method: "POST", body }),
      invalidatesTags: [{ type: "Booking", id: "ME" }, { type: "Booking", id: "OWNER" }],
    }),
    getMyBookings: builder.query<Booking[], void>({
      query: () => ({ url: "/bookings/me", method: "GET" }),
      providesTags: [{ type: "Booking", id: "ME" }],
    }),
    getOwnerBookings: builder.query<Booking[], void>({
      query: () => ({ url: "/bookings/owner", method: "GET" }),
      providesTags: [{ type: "Booking", id: "OWNER" }],
    }),
    getBooking: builder.query<Booking, string>({
      query: (id) => ({ url: `/bookings/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    updateBookingStatus: builder.mutation<Booking, { id: string; status: Booking["status"] }>({
      query: ({ id, status }) => ({ url: `/bookings/${id}/status`, method: "PUT", body: { status } }),
      invalidatesTags: (r, e, { id }) => [{ type: "Booking", id }, { type: "Booking", id: "ME" }, { type: "Booking", id: "OWNER" }],
    }),
    createPaymentIntent: builder.mutation<{ clientSecret: string }, { bookingId: string; currency?: string }>({
      query: (body) => ({ url: "/payments/create-intent", method: "POST", body }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetOwnerBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingStatusMutation,
  useCreatePaymentIntentMutation,
} = bookingApi;

