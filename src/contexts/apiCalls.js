import { getResultsStart, getResultsSuccess } from './ResultAction'

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const getResults = async (type, dispatch) => {
    dispatch(getResultsStart())

    fetch(`${baseUrl}${type}`, {
        method: 'GET',
        headers: {
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'EU',
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (type.includes('news')) {
                dispatch(getResultsSuccess(res.entries))
            } else if (type.includes('image')) {
                dispatch(getResultsSuccess(res.image_results))
            } else {
                dispatch(getResultsSuccess(res.results))
            }
        })
        .catch((err) => console.error(err))
}
