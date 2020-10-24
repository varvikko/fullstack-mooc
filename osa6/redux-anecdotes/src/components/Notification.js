import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
  var dispatch = useDispatch()
  var notification = useSelector((state) => {
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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