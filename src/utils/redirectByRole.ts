import {UserInfo, UserRole} from "./sliceHelpers.ts";
import {NavigateFunction} from "react-router-dom";

export const redirectByRole = (userInfo: UserInfo | null, navigate: NavigateFunction) => {

    if (!userInfo) return;

    if (userInfo.role === UserRole.ADMIN) {
        navigate("/admin");

    } else if (userInfo.role === UserRole.MANAGER) {
        navigate("/manager");

    } else {
        navigate("/chat");
    }
}
