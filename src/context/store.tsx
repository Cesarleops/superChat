"use client";
import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { userReducer } from "./userReducer";
import axios from "axios";
import { io } from "socket.io-client";
import { ISignUp, ILogin, IUserState } from "@/interfaces";

const initialState: IUserState = {
  userName: "",
  loged: "not-authenticated",
  id: "",
  userMenu: false,
  isActiveChat: false,
  activeChatId: "",
};

interface UserContextProps {
  userState: IUserState;
  login: (form: ISignUp) => void;
  signUp: (form: ILogin) => void;
  setMenu: () => void;
  setActiveChat: (value: boolean) => void;
  setActiveChatId: (name: string) => void;
  socket: Socket | null;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
export const UserProvider = ({ children }: any) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  const signUp = async (form: ILogin) => {
    const { data } = await axios.post("http://localhost:8000/api/users", form);
    localStorage.setItem("iden", data.newUser._id);
    dispatch({
      type: "SIGN_UP",
      payload: { username: data.newUser.userName, id: data.newUser._id },
    });
  };

  const login = async (form: ILogin) => {
    const { data } = await axios.post("http://localhost:8000/api/auth", form);
    localStorage.setItem("iden", data.user._id);
    dispatch({
      type: "LOGIN",
      payload: { username: data.user.userName, id: data.user._id },
    });
  };

  const setMenu = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const setActiveChatId = (payload: string) => {
    dispatch({
      type: "SET_CHAT",
      payload,
    });
  };

  const setActiveChat = (payload: boolean) => {
    dispatch({
      type: "ACTIVATE_CHAT",
      payload,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        login,
        signUp,
        socket,
        setMenu,
        setActiveChat,
        setActiveChatId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
