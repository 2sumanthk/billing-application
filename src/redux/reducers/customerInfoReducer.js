const InitialCustomersState = []
const customerInfoReducer = (state=InitialCustomersState, action)=>{
    switch (action.type){
        case 'SET_REG_CUST' :{
            return [...state,{...action.payload}]
        }
        case 'SET_DEL_CUST' :{
            const result = state.filter((cust)=>{
                return ! cust._id === action.payload
            })
            return [...state,...result]
        }
        case 'SET_UPDATE_CUST' : {
            const updateResult = state.map((cust)=>{
                if(cust._id === action.payload._id){
                    return [...state,{...action.payload}]
                }else{
                    return [...state]
                }
            })
            return [...state,...updateResult]
        }
        case 'SET_DEL_ALL_CUST' :{
            return InitialCustomersState
        }
        default :{
            return [...state]
        }
}
}
export default customerInfoReducer