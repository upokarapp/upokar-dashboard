import { createContext, useEffect, useReducer } from "react";

export const Context = createContext();

const initialState = {
    isLogin: JSON.parse(localStorage.getItem("admin")) ? true : false,
    isLoading: false,
    connection: true,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "CONNECTION":
            return { ...state, connection: action.payload };

        case "LOADING":
            return { ...state, isLoading: action.payload };

        case "LOGIN_SUCCESS":
            return { ...state, isLogin: true, admin: action.payload };

        case "LOGIN_FAILURE":
            return { ...state, isLogin: false, admin: null };

        case "LOGOUT":
            return { ...state, connection: null, isLogin: false, admin: null };

        case "ADMIN_UPDATE":
            // Update admin data
            return { ...state, admin: action.payload };

        default:
            return state;
    }
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Whenever admin data is updated, save it to localStorage
        localStorage.setItem("admin", JSON.stringify(state.admin));
    }, [state.admin]);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
