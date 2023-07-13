
export interface Login {
    password: string;
    email: string;
    [index: string]: string | undefined ;
  }
  export interface Sign{
    userName?: string;
    email: string;
    password: string;
    [index: string]: string | undefined ;
    
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
    profilePic?:string
    activeChatId?: string
  }

  export interface SearchedUser{
    userName: string
    id: string
  }