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
import DateFormat from "./DateFormat";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article)
        setDateString(article.created_at)
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
        <DateFormat dateString={dateString}/>
        <p>Votes: {article.votes}</p>
        </Typography>
        <div className="vote-buttons">
          <button
            onClick={() => {
              handleVote(1);
            }}
            disabled={voteChange === 1}
          >
            <ThumbUpRoundedIcon/>
          </button>
          <button
            onClick={() => {
              handleVote(-1);
            }}
            disabled={voteChange === -1}
          >
            <ThumbDownAltRoundedIcon/>
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
    </Card>
    </div>
  );
};

export default SingleArticle;
