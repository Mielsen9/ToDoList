import React from 'react';
import { createRoot } from 'react-dom/client';
import  "./scss/style.scss";
import {App} from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LazyAbout} from "@/components/pages/about/About.lazy";
import {LazyShop} from "@/components/pages/shop/Shop.lazy";


const root = document.getElementById('root');

if (!root) {
    throw new Error('root nod found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: <LazyAbout />
            },
            {
                path: '/shop',
                element: <LazyShop />
            },

        ]
    },
]);


container.render(
    <RouterProvider router={router}/>
)




