const lineItemsInitialValue = []
const lineItemsReducer = (state=lineItemsInitialValue, action)=>{
    switch(action.type){
        case 'ADD_ITEM' : {
            return [{...action.payload}, ...state]
        }
        case 'REMOVE_ITEM' : {
            return state.filter(item => action.payload !==item._id)
        }
        case 'RESET_ITEMS' : {
            return lineItemsInitialValue
        }
        case 'INCREMENT_QUANTITY' : {
            return state.map((item)=>{
                if(item._id ===action.payload && item.quantity >=1){
                    return {...item, "qunatity" : item.quantity +1}
                }else{
                    return {...item}
                }
            })
        }
        case 'DECREMENT_QUANTITY' : {
            return state.map((item)=>{
                if(item._id ===action.payload && item.quantity>=2){
                    return {...item, "qunatity" : item.quantity -1}
                }else{
                    return {...item}
                }
            })
        }
        default :{
            return [...state]
        }
    }   
}

export default lineItemsReducer

