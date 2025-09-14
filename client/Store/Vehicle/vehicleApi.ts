import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export interface Vehicle {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  type?: string;
  seats?: number;
  fuel?: string;
  location?: string;
  rating?: number | null;
  images?: string[];
  available: boolean;
}

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery,
  tagTypes: ["Vehicle"],
  endpoints: (builder) => ({
    listVehicles: builder.query<Vehicle[], void>({
      query: () => ({ url: "/vehicles", method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Vehicle" as const, id })),
              { type: "Vehicle" as const, id: "LIST" },
            ]
          : [{ type: "Vehicle" as const, id: "LIST" }],
    }),
    getVehicle: builder.query<Vehicle, string>({
      query: (id) => ({ url: `/vehicles/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Vehicle", id }],
    }),
    listOwnerVehicles: builder.query<Vehicle[], void>({
      query: () => ({ url: "/vehicles/owner", method: "GET" }),
      providesTags: [{ type: "Vehicle", id: "OWNER_LIST" }],
    }),
    createVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (body) => ({ url: "/vehicles", method: "POST", body }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }, { type: "Vehicle", id: "OWNER_LIST" }],
    }),
    updateVehicle: builder.mutation<Vehicle, { id: string } & Partial<Vehicle>>({
      query: ({ id, ...patch }) => ({ url: `/vehicles/${id}`, method: "PUT", body: patch }),
      invalidatesTags: (result, error, { id }) => [{ type: "Vehicle", id }],
    }),
    deleteVehicle: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/vehicles/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }, { type: "Vehicle", id: "OWNER_LIST" }],
    }),
  }),
});

export const {
  useListVehiclesQuery,
  useGetVehicleQuery,
  useListOwnerVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApi;

