import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";
import { updateVotes } from "../api";
import AddComment from "./AddComment";
import NotFoundPage from "./NotFoundPage";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((error) => {
        console.log("Error fetching article: ", error.message);
        setError(error);
      });
  }, [article_id]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(article_id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => {
        console.log("Error fetching comments: ", error.message);
        setError(error);
      });
  }, [article_id]);

  const [voteChange, setVoteChange] = useState(0);
  function handleVote(vote) {
    //  event.preventDefault();
    setVoteChange((currChange) => {
      return currChange + vote;
    });
    updateVotes(article_id, vote).then((updatedArticle) => {
      setArticle(updatedArticle);
    });
  }
  if (error) {
    return <NotFoundPage error={error} />;
  }

  return (
    <div className="single-article">
      {/* <div className="body">
        <img src={article.article_img_url} id="single-article-image"></img>
        <h2>{article.title}</h2>
        <p>
          Written by <span className="italic">{article.author}</span>
        </p>
        <p>Topic: {article.topic}</p>
        <p>Published: {article.created_at}</p>
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>

        <div>
          <button
            onClick={() => {
              handleVote(1);
            }}
            disabled={voteChange === 1}
          >
            <span className="material-icons-outlined">thumb_up</span>
          </button>
          <button
            onClick={() => {
              handleVote(-1);
            }}
            disabled={voteChange === -1}
          >
            Downvote
          </button>
        </div>
      </div>
      <div className="comments-section">
        <h2>{article.comment_count} Comments</h2>

        <h3>Add comment</h3>
        <AddComment article={article} setComments={setComments} />

        <ul className="comment-list">
          {comments.map((comment, article_id) => {
            return (
              <CommentCard
                comment={comment}
                setComments={setComments}
                key={article_id}
              />
            );
          })}
        </ul>
      </div> */}
      <Card sx={{ maxWidth: 645 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={article.article_img_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" className="article-body">
          <p>{article.body} </p>
          <p>
          Written by <span className="italic">{article.author}</span>
        </p>
        <p>Topic: {article.topic}</p>
        <p>Published: {article.created_at}</p>
        <p>Votes: {article.votes}</p>
        </Typography>
        <div>
          <button
            onClick={() => {
              handleVote(1);
            }}
            disabled={voteChange === 1}
          >
            Upvote
          </button>
          <button
            onClick={() => {
              handleVote(-1);
            }}
            disabled={voteChange === -1}
          >
            Downvote
          </button>
        </div>
      </CardContent>
      <div className="comments-section">
        <h2>{article.comment_count} Comments</h2>

        <h3>Add comment</h3>
        <AddComment article={article} setComments={setComments} />

        <ul className="comment-list">
          {comments.map((comment, article_id) => {
            return (
              <CommentCard
                comment={comment}
                setComments={setComments}
                key={article_id}
              />
            );
          })}
        </ul>
      </div>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default SingleArticle;
