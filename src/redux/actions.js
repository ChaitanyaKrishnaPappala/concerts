import axios from 'axios'
const axiosClient = axios.create({baseURL: 'http://localhost:3001/api'})

export const fetchEvents = (filters='') => {
    return dispatch => {
        dispatch({type: 'FETCH_EVENTS'})
        return axiosClient.get(`/events${filters ? `?${filters}`: ''}`)
            .then(res => {
                if (res && res.data) {
                    return dispatch({type: 'FETCH_EVENTS_SUCCESS', data: res.data})
                } else {
                    return dispatch({type: 'FETCH_EVENTS_FAILURE', error: 'No results found'})
                }
            })
            .catch(err => {
                return dispatch({type: 'FETCH_EVENTS_FAILURE', error: err.toString()})
            })
    };
}


export const clearRequest = (type) => {
    return dispatch => {
        dispatch({type})
    }
};
