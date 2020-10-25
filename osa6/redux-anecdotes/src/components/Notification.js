import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

export function addNotification(content, t) {
  return async (dispatch) => {
    await new Promise((resolve, reject) => {
      var id = setTimeout(() => {
        resolve(id)
      }, t * 1000);
      
      dispatch({
        type: 'SHOW_NOTIFICATION',
        content,
        id
      })
    })
    return dispatch({
      type: 'HIDE_NOTIFICATION',
    })
  }
}

const Notification = () => {
  var dispatch = useDispatch()
  var notification = useSelector((state) => {
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
