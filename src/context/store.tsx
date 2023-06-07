"use client";
import {
  createContext,
  useReducer,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";
import { userReducer } from "./userReducer";
import axios from "axios";

export interface IUserState {
  userName: string;
  id: string;
  loged: string;
  friends: IFriend[];
}

const initialState: IUserState = {
  userName: "",
  loged: "not-authenticated",
  id: "",
  friends: [],
};

interface ILogin {
  userName: string;
  email: string;
}
interface ISignUp {
  userName: string;
  email: string;
  password: string;
}

interface IFriend {
  name: string;
  profilePic?: string;
}

interface UserContextProps {
  userState: IUserState;
  login: (form: ISignUp) => void;
  signUp: (form: ILogin) => void;
  addFriend: (friend: IFriend) => void;
  getFriends: () => void;
  searchingUsers: (query: string) => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
export const UserProvider = ({ children }: any) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const signUp = async (form: ILogin) => {
    console.log("llego", form);
    const { data } = await axios.post("http://localhost:8000/api/users", form);
    console.log(data);
    dispatch({
      type: "SIGN_UP",
      payload: { username: data.newUser.userName, id: data.newUser._id },
    });
  };

  const login = async (form: ILogin) => {
    const { data } = await axios.post("http://localhost:8000/api/auth", form);
    console.log(data.user);
    dispatch({
      type: "LOGIN",
      payload: { username: data.user.userName, id: data.user._id },
    });
  };

  const addFriend = async (friend: IFriend) => {
    const { data } = await axios.post(
      `http://localhost:8000/api/users/friends/${userState}`,
      friend
    );
    dispatch({
      type: "ADD_FRIEND",
    });
  };

  const getFriends = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/users/friends/${initialState.id}`
    );
    dispatch({
      type: "GET_FRIENDS",
      payload: data,
    });
  };

  const searchingUsers = async (query: string) => {
    const { data } = await axios.post("http://localhost:8000/api/users");
    dispatch({
      type: "SEARCH",
    });
  };
  return (
    <UserContext.Provider
      value={{
        userState,
        login,
        addFriend,
        signUp,
        searchingUsers,
        getFriends,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
