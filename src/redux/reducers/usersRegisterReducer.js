const InitialRegUserState = []
const usersRegisterReducer = (state=InitialRegUserState, action)=>{
    switch (action.type){
        case 'SET_REG_USERS' :{
            return [...state,{...action.payload}]
        }
        default :{
            return [...state]
        }
}
}
export default usersRegisterReducer