import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

export function addNotification(content, t) {
  return async (dispatch) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, t * 1000);
    })

    return dispatch({
      type: 'SHOW_NOTIFICATION',
      content
    })
  }
}

const Notification = () => {
  var dispatch = useDispatch()
  var notification = useSelector((state) => {
    
    if (state.notification.content) {
      setTimeout(() => {
        console.log("mit")
        dispatch(hideNotification())
      }, 5000)
    }
    return state.notification
  })
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    notification.content ? 
    <div style={style}>
      {notification.content}
    </div> : null
  )
}

export default Notification
