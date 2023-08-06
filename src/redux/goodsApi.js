import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const goodsApi = createApi({
    reducerPath: 'googsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://64ccc0ee2eafdcdc851a3d73.mockapi.io/',
    }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/' }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (build) => ({
        getGoods: build.query({
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Products', id })),
                          { type: 'Products', id: 'LIST' },
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        subTasks: build.mutation({
            query: (body) => ({
                url: `goods/${body.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetGoodsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useSubTasksMutation,
} = goodsApi;
