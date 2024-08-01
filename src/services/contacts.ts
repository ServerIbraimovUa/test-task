import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";

export const contactsApi = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1",
    }),
    tagTypes: ["Contacts", "Contact"],
    endpoints(build) {
        return {
            getContacts: build.query({
                query: () => ({
                    url: "/contacts?sort=created:desc",
                    method: "get",
                }),
                providesTags: ["Contacts"],
            }),
            getContactById: build.query({
                query: (id) => ({
                    url: `/contact/${id}`,
                    method: "get",
                }),
                providesTags: ["Contact"],
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
            updateContactTags: build.mutation({
                query: ({ id, tags }) => ({
                    url: `/contacts/${id}/tags`,
                    method: "put",
                    data: { tags },
                }),
                invalidatesTags: ["Contact"],
            }),
        };
    },
});

export const {
    useGetContactsQuery,
    useGetContactByIdQuery,
    useCreateContactMutation,
    useDeleteContactMutation,
    useUpdateContactTagsMutation,
} = contactsApi;
