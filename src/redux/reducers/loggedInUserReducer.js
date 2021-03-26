const InitialLoggedInUserState = []
const loggedInUsersReducers = (state=InitialLoggedInUserState, action)=>{
    switch (action.type){
        case 'SET_LOGGED_IN_USER' :{
            return [...state,{...action.payload}]
        }
        default :{
            return [...state]
        }
}
}
export default loggedInUsersReducers