import store from "./store";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import App from "./App";
import HomeScreen from "./screens/HomeScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import ChatScreen from "./screens/ChatScreen.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="" element={<PrivateRoute/>}>
                <Route index={true} path="/chat" element={<ChatScreen/>}/>
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
            <RouterProvider router={router}/>
    </Provider>
);
