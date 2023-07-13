import {IUserState} from '../interfaces'

type Action = |
 {type: "SIGN_UP", payload: any} |
 {type: "LOGIN", payload: any} |
 {type: 'ACTIVATE_CHAT', payload:boolean} |
 {type: 'SET_CHAT', payload:string} |
 {type: 'TOGGLE'} |
 {type: 'LOGOUT'} |
 {type: 'IMAGE' , payload:string} | 
 {type: 'LOAD', payload: any}



export const userReducer = (state: IUserState, action: Action): IUserState => {
    switch(action.type){
        case 'LOAD': {
            return {
                ...state,
                userName: action.payload.userName,
                loged: 'authenticated',
                id: action.payload._id,
                profilePic: action.payload.profilePic
            }
        }
        case 'SIGN_UP':
            
            return {
                ...state,
                userName: action.payload.username,
                loged: 'authenticated',
                id: action.payload.id
            }
        case 'LOGIN': {
            
            return {
                ...state,
                userName: action.payload.username,
                loged: 'authenticated',
                id: action.payload.id,
                profilePic: action.payload.pic
            }
        }
        
        case 'TOGGLE': {
            return {
                ...state,
                userMenu: !state.userMenu
            }
        }
       case 'ACTIVATE_CHAT': {
        return {
            ...state, 
            isActiveChat: action.payload
        }
       }
       case 'SET_CHAT':{
        return {
            ...state,
            activeChatId: action.payload
        }
       }
       case 'IMAGE':{
        return {
            ...state,
            profilePic: action.payload
            
        }
       }
       case 'LOGOUT': {
        return {
            ...state,
            userName: '',
            loged: 'not-authenticated',
            id:'',
            userMenu: false
        }
       }
      
        default: 
            return state
    }
}