const InitialProductsState = []
const productsInfoReducer = (state=InitialProductsState, action)=>{
    switch (action.type){
        case 'SET_CREATE_PROD' :{
           return [{...action.payload}, ...state]
        }
        case 'SET_DEL_PROD' :{
            return state.filter((prod)=>{
                return  prod._id !== action.payload
            })
        }
        case 'SET_UPDATE_PROD' : {
            return state.map((prod)=>{
                if(prod._id === action.payload._id){
                    return {...prod,...action.payload}
                }else{
                    return {...prod}
                }
            })
        }
        // case 'SET_DEL_ALL_CUST' :{
        //     return InitialProductsState
        // }
        case 'SET_LIST_PROD' : {
            return [...action.payload]
        }
        default :{
            return [...state]
        }
}
}
export default productsInfoReducer