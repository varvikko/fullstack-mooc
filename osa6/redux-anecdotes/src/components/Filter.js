import React from 'react'
import { connect } from 'react-redux'

function changeFilter(value) {
  return dispatch => {
    return dispatch({ type: 'CHANGE_FILTER', filter: value })
  }
}

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilter(event.target.value)
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

var mapDispatchToProps = {
  changeFilter
}

export default connect(null, mapDispatchToProps)(Filter)
