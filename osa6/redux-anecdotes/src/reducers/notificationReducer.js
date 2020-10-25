
function reducer(state = { content: null, id: null }, action) {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            if (state.id) {
                clearTimeout(state.id)
            }
            return { ...state, content: action.content, id: action.id }
        case 'HIDE_NOTIFICATION':
            return { ...state, content: null }
        default:
            return state
    }
}

export function createNotification(content) {
    return {
        type: 'SHOW_NOTIFICATION',
        content,
    }
}

export function hideNotification() {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer
