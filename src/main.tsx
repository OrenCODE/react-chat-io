import store from "./store";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import App from "./App";
import ChatScreen from "./screens/ChatScreen/ChatScreen.tsx";
import LoginScreen from "./screens/LoginScreen/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="" element={<PrivateRoute/>}>
                <Route index={true} path="/chat" element={<ChatScreen/>}/>
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </Provider>
);
