const InitialCustomersState = []
const customerInfoReducer = (state=InitialCustomersState, action)=>{
    switch (action.type){
        case 'SET_REG_CUST' :{
            return [...state,{...action.payload}]
        }
        case 'SET_DEL_CUST' :{
            return state.filter((cust)=>{
                return cust._id !== action.payload
            })
        }
        case 'SET_UPDATE_CUST' : {
             return state.map((cust)=>{
                if(cust._id === action.payload._id){
                    return {...cust, ...action.payload}
                }else{
                    return {...cust}
                }
            })
        }
        case 'SET_DEL_ALL_CUST' :{
            return InitialCustomersState
        }
        case 'SET_LIST_CUSTS' :{
            return [...action.payload]
        }
        default :{
            return [...state]
        }
}
}
export default customerInfoReducer