import { useContext, useState } from "react";
import { postComment } from "../api";
import { UserContext } from "./UserContext";

const AddComment = ({article, setComments}) => {
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const [commentBody, setCommentBody] = useState('')
  const [emptyBody, setEmptyBody] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return
    
    if(commentBody === ''){
      setEmptyBody(true)
      setError('Comment cannot be empty')
      return
    }
    setSubmitting(true)
    postComment(article.article_id, commentBody, loggedInUser.username)
    .then((newComment) => {
      setComments((oldComments) => [newComment, ...oldComments]);
      setSubmitting(false)
      setCommentBody('')
      setSuccessMessage('Comment posted!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 2000)
      return newComment
    })
    .catch((error) => {
      setSubmitting(false)
      setError('Posting comment failed')
    })
  }

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <label htmlFor="commentBody">Comment:</label>
      <textarea 
      className="textarea"
        id="commentBody"
        value={commentBody}
        onChange={(event) => {
          setCommentBody(event.target.value)
        }}
        disabled={submitting}
      />
      <button className="post-button">
        {submitting ? "Posting..." : "Post"}
      </button>
      {error ? <p>{error}</p> : null}
      {successMessage ? <p>{successMessage}</p> : null}
    </form>
  )
}

  export default AddComment