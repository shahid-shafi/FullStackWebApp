const reducer = (state, action) => {
    switch (action.type) {
        case "inputChange":
            return {
                ...state,
                [action.field]: action.payload,
            }
        default: return state;
    }
}
export default reducer

