const CommentCard = ({comment}) => {

   return (
      <div className="single-comment">
         <span className="italic">{comment.author}</span>
         <p>{comment.body}</p>
         <p>{comment.created_at}</p>
         <p>Votes: {comment.votes}</p>
      </div>
   )
}

export default CommentCard