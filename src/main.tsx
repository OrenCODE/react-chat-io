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
import AdminScreen from "./screens/AdminScreen.tsx";
import {UserRole} from "./utils/sliceHelpers.ts";
import UsersTable from "./components/UsersTable.tsx";
import PaymentsTable from "./components/PaymentsTable.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<HomeScreen/>}/>
            <Route path="login" element={<LoginScreen/>}/>
            <Route path="register" element={<RegisterScreen/>}/>
            <Route element={<PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.USER]}/>}>
                <Route path="chat" element={<ChatScreen/>}/>
            </Route>
            <Route element={<PrivateRoute allowedRoles={[UserRole.ADMIN]} />}>
                <Route path="admin" element={<AdminScreen />}>
                    <Route index element={<UsersTable />} />
                    <Route path="users" element={<UsersTable />} />
                    <Route path="payments" element={<PaymentsTable />} />
                </Route>
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
