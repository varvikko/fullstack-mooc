
function reducer(state = { content: null }, action) {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { content: action.content }
        case 'HIDE_NOTIFICATION':
            return { content: null }
        default:
            return state
    }
}

export function createNotification(content) {
    return {
        type: 'SHOW_NOTIFICATION',
        content
    }
}

export function hideNotification() {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer
