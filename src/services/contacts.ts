import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";

export const contactsApi = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1",
    }),
    tagTypes: ["Contacts"],
    endpoints(build) {
        return {
            getContacts: build.query({
                query: () => ({
                    url: "/contacts?sort=created:desc",
                    method: "get",
                }),
                providesTags: ["Contacts"],
            }),
            createContact: build.mutation({
                query: (newContact) => ({
                    url: "/contact",
                    method: "post",
                    data: newContact,
                }),
                invalidatesTags: ["Contacts"],
            }),
            deleteContact: build.mutation({
                query: (contactId) => ({
                    url: `/contact/${contactId}`,
                    method: "delete",
                }),
                invalidatesTags: ["Contacts"],
            }),
        };
    },
});

export const { useGetContactsQuery, useCreateContactMutation, useDeleteContactMutation } =
    contactsApi;
