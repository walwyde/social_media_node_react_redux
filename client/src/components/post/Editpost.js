import React from 'react'
import PropTypes from 'prop-types'

const Editpost = props => {
  return (
    <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

  )
}

Editpost.propTypes = {
  post: PropTypes.object.isRequired
}

export default Editpost