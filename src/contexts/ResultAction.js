export const getResultsStart = () => ({
    type: 'GET_RESULTS_START',
})

export const getResultsSuccess = (results) => ({
    type: 'GET_RESULTS_SUCCESS',
    payload: results,
})
