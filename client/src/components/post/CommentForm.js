import React, {useState} from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({addComment, post: { _id}}) => {

const [text, setText] = useState('')

  return (
    <div className="post-form">
    <div className="bg-primary p">Leave a Comment</div>
    <form className="form my-1" 
    onSubmit={e => {
      e.preventDefault()
      addComment({text},_id)
      setText('')
    }}
    >
      <textarea
      value={text}
        name="text"
        cols="30"
        rows="5"
        placeholder="Add Comment"
        onChange={e => setText(e.target.value)}
        required
      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default CommentForm