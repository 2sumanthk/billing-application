const InitialProductsState = []
const productsInfoReducer = (state=InitialProductsState, action)=>{
    switch (action.type){
        case 'SET_CREATE_PROD' :{
           return [{...action.payload}, ...state]
        }
        case 'SET_DEL_PROD' :{
            const result = state.filter((prod)=>{
                return ! prod._id === action.payload
            })
            return [...state,...result]
        }
        // case 'SET_UPDATE_CUST' : {
        //     const updateResult = state.map((cust)=>{
        //         if(cust._id === action.payload._id){
        //             return [...state,{...action.payload}]
        //         }else{
        //             return [...state]
        //         }
        //     })
        //     return [...state,...updateResult]
        // }
        // case 'SET_DEL_ALL_CUST' :{
        //     return InitialCustomersState
        // }
        default :{
            return [...state]
        }
}
}
export default productsInfoReducer