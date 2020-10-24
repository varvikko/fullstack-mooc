function reducer(state = '', action) {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.filter
        default:
            return state
    }
}

export default reducer
