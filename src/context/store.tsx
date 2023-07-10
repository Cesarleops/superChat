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
import { SignUp, Login, IUserState } from "@/interfaces";

axios.defaults.withCredentials = true;
const initialState: IUserState = {
  userName: "",
  loged: "not-authenticated",
  profilePic: "",
  id: "",
  userMenu: false,
  isActiveChat: false,
  activeChatId: "",
};

interface UserContextProps {
  userState: IUserState;
  login: (form: Login) => void;
  signUp: (form: SignUp) => void;
  setMenu: () => void;
  setActiveChat: (value: boolean) => void;
  setActiveChatId: (name: string) => void;
  socket: Socket | null;
  logout(): void;
  setProfilePic(payload: string): void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
export const UserProvider = ({ children }: any) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
  };

  const authenticated =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("authenticated")
      : false;

  useEffect(() => {
    if (authenticated) {
      connectSocket();
    }
  }, [authenticated]);

  useEffect(() => {
    if (socket) {
      const id = localStorage.getItem("iden");
      socket?.emit("loged", {
        sendedBy: userState.id ? userState.id : id,
      });
    }
  }, [socket, userState.id]);

  const signUp = async (form: SignUp) => {
    const { data } = await axios.post("http://localhost:8000/api/users", form);
    localStorage.setItem("iden", data.newUser._id);
    localStorage.setItem("authenticated", "true");
    dispatch({
      type: "SIGN_UP",
      payload: { username: data.newUser.userName, id: data.newUser._id },
    });
  };

  const login = async (form: Login): Promise<void> => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth", form);
      localStorage.setItem("iden", data.user._id);
      localStorage.setItem("authenticated", "true");
      dispatch({
        type: "LOGIN",
        payload: {
          username: data.user.userName,
          id: data.user._id,
          pic: data.user.profilePic,
        },
      });
    } catch (error) {
      throw "User or Email are incorrect";
    }
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

  const setProfilePic = (payload: string) => {
    dispatch({
      type: "IMAGE",
      payload,
    });
  };

  const logout = () => {
    localStorage.clear();

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <UserContext.Provider
      value={{
        setProfilePic,
        userState,
        login,
        signUp,
        socket,
        setMenu,
        setActiveChat,
        setActiveChatId,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
