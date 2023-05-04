import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { newPost } from '../../actions/post'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

const Newpost = ({newPost, history}) => {

    const [formData, setFormData] = useState({
      text: '',
    })

    const { text } = formData

    const onChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
      e.preventDefault()
      newPost(formData, history)

    }
  return (
    
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
          value={text}
          onChange={e => onChange(e)}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" onClick={e => onSubmit(e)} />
        </form>
      </div>)

}

Newpost.propTypes = {
  newPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(null, {newPost})(withRouter(Newpost))