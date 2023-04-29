import { getFromLocalStorage } from "../../utils/localStorage";
export function getToken(){
    return getFromLocalStorage('token');
}