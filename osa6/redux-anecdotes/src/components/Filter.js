import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
    var filter = useSelector(state => state.filter)
    var dispatch = useDispatch()

  const handleChange = (event) => {
      dispatch({ type: 'CHANGE_FILTER', filter: event.target.value })
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter