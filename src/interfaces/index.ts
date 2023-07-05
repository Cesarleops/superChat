
export interface Login {
    password: string;
    email: string;
  }
  export interface SignUp{
    userName: string;
    email: string;
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

  export interface SearchedUser{
    userName: string
    id: string
  }