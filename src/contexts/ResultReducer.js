const ResultReducer = (state, action) => {
    switch (action.type) {
        case 'GET_RESULTS_START':
            return {
                results: null,
                isLoading: true,
            }
        case 'GET_RESULTS_SUCCESS':
            return {
                results: action.payload,
                isLoading: false,
            }
        default:
            return { ...state }
    }
}

export default ResultReducer
