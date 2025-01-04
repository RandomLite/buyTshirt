import { createContext } from "react";

export const UserData = createContext(
{
setUserAuth: () => {},
userAuth: null

//email pass to get the data of that specific user
}
);

export const ToastData = createContext(
{
setToastConfig: () => {},
toastConfigBool: null
}
);