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
import { Sign, Login, IUserState } from "@/interfaces";

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
  socket: Socket | null;
  login: (form: Login) => Promise<void>;
  signUp: (form: Sign) => void;
  setMenu: () => void;
  setActiveChat: (value: boolean) => void;
  setActiveChatId: (name: string) => void;
  logout(): void;
  setProfilePic(payload: string): void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
export const UserProvider = ({ children }: any) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [socket, setSocket] = useState<Socket | null>(null);

  const getMyUser = async () => {
    const { data } = await axios.get(
      `https://mychat-back.onrender.com/api/users/myuser`
    );
    loadUser(data);
  };

  const storedSocketId =
    typeof window !== "undefined" ? localStorage.getItem("socketId") : false;

  useEffect(() => {
    if (userState.id) {
      const newSocket = io("https://mychat-back.onrender.com", {
        query: { socketId: storedSocketId },
      });

      setSocket(newSocket);
      newSocket.on("connect", () => {
        localStorage.setItem("socketId", newSocket.id);
      });
    }
  }, [storedSocketId, userState.id]);

  useEffect(() => {
    if (localStorage.getItem("loged")) {
      getMyUser();
    }
  }, []);

  useEffect(() => {
    if (userState.id && socket !== null) {
      socket?.emit("loged", {
        sendedBy: userState.id,
      });
    }
  }, [socket, userState.id]);

  const loadUser = (payload: object) => {
    dispatch({
      type: "LOAD",
      payload,
    });
  };

  const signUp = async (form: Sign) => {
    const { data } = await axios.post(
      "https://mychat-back.onrender.com/api/users",
      form
    );
    localStorage.setItem("loged", "true");
    console.log(data);
    dispatch({
      type: "SIGN_UP",
      payload: { username: data.newUser.userName, id: data.newUser._id },
    });
  };

  const login = async (form: Login): Promise<void> => {
    try {
      const { data } = await axios.post(
        "https://mychat-back.onrender.com/api/auth",
        form
      );

      localStorage.setItem("loged", "true");
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
