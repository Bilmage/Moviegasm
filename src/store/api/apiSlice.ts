import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

export interface CustomQueryArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseUrl?: string;
  responseType?: "json" | "blob";
}

const axiosBaseQuery: BaseQueryFn<CustomQueryArgs, unknown, unknown> = async ({
  url,
  method = "GET",
  body,
  params,
  headers,
  baseUrl,
  responseType = "json",
}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      params,
      headers: {
        ...headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      responseType,
      ...(baseUrl && { baseURL: baseUrl }),
    };

    const result = await axiosClient(config);
    return { data: result };
  } catch (axiosError) {
    return { error: axiosError };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: [
    'MovieList',
    'TVList', 
    'Details',
    'Videos',
    'Credits',
    'Similar',
    'Search',
    'MultiSearch',
    'Trending',
    'DiscoverMovies',
    'DiscoverTV',
    'Genres',
  ],
  endpoints: (_builder: unknown) => ({}),
});
