import { useDispatch } from "react-redux";
import { register, login, logout, getMe } from "../services/auth.api";
import { setUser,setLoading,setError } from "../auth.slice";


export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister(name, email, password) {
        try{
            dispatch(setLoading(true));
            const data = await register(name, email, password);
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

        async function handleLogin(email, password) {
        try{
            dispatch(setLoading(true));
            const data = await login(email, password);
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handlegetMe() {
        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try{
            dispatch(setLoading(true));
            await logout();
            dispatch(setUser(null));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleLogout, handlegetMe};
}