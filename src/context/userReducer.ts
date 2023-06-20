import {IUserState} from '../interfaces'

type Action = |
 {type: "SIGN_UP", payload: any} |
 {type: "LOGIN", payload: any} |
 {type: 'ACTIVATE_CHAT', payload:boolean} |
 {type: 'SET_CHAT', payload:string} |
 {type: 'TOGGLE'} 



export const userReducer = (state: IUserState, action: Action): IUserState => {
    switch(action.type){
        case 'SIGN_UP':
            console.log(action.payload)
            return {
                ...state,
                userName: action.payload.username,
                loged: 'authenticated',
                id: action.payload.id
            }
        case 'LOGIN': {
            console.log(action.payload)
            return {
                ...state,
                userName: action.payload.username,
                loged: 'authenticated',
                id: action.payload.id
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
      
        default: 
            return state
    }
}