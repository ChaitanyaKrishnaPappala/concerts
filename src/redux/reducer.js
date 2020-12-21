import {Map, fromJS} from 'immutable'

const reducer = (state = Map(), action) => {
    switch (action.type) {
        case 'FETCH_EVENTS':
            return state.setIn(['events', 'loading'], true)
        case 'FETCH_EVENTS_SUCCESS':
            return state.setIn(['events', 'data'], fromJS(action.data))
                .setIn(['events', 'loading'], false)
        case 'FETCH_WEATHER_FAILURE':
            return state.setIn(['events', 'error'], action.error)
                .setIn(['events', 'loading'], false)
        default:
            return state
    }
}

export default reducer
