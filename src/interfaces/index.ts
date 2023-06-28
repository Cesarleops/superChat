
export interface ILogin {
    userName: string;
    email: string;
  }
  export interface ISignUp extends ILogin{
    password: string;
  }
  
  export interface IFriend {
    name: string;
    profilePic?: string;
  }
  
  export interface IUserState {
    userName: string;
    id: string;
    loged: string;
    userMenu: boolean
    isActiveChat?: boolean
    activeChatId?: string
  }