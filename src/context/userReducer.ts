import { IUserState } from "./store"

type Action = |
 {type: "SIGN_UP", payload: any} |
 {type: "LOGIN", payload: any} |
 {type: "GET_FRIENDS", payload: any} | 
 {type: "ADD_FRIEND"} |
 {type: "SEARCH"}

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
        case 'GET_FRIENDS':{
            return{
                ...state,
                friends: [...state.friends, action.payload]
            }
        }
        case 'SEARCH':{

        }
        default: 
            return state
    }
}