import React from 'react'
import PropTypes from 'prop-types'

const Newcomment = props => {
  return (
    <div>Newcomment</div>
  )
}

Newcomment.propTypes = {
  post: PropTypes.object.isRequired
}

export default Newcomment