import { useSelector } from "react-redux";
import { AppState } from "../store";

export const useAuthUser = () => useSelector((state: AppState) => state.auth.user)
export const useAuthSession = () => useSelector((state: AppState) => state.auth.session)
export const useAuthError = () => useSelector((state: AppState) => state.auth.error)