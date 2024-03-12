import { useContext, useState } from "react";
import { postComment } from "../api";
import { UserContext } from "./UserContext";

const AddComment = ({article}) => {
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const [commentBody, setCommentBody] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    
    postComment(article.article_id, commentBody, loggedInUser.username)
    .then((response) => {
      return response
    }).then(() => {
      location.reload()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="commentBody">Comment:</label>
      <input 
        type="text" 
        id="commentBody"
        onChange={(event) => {
          setCommentBody(event.target.value)
        }}
      />
      <button>Add</button>
    </form>
  )
}

  export default AddComment