import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import NavBar from "./NavBar";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  return (
    <div className="single-article">
      <div className="body">
        <img src={article.article_img_url} id="single-article-image"></img>
        <h2>{article.title}</h2>
        <p>
          Written by <span className="italic">{article.author}</span>
        </p>
        <p>Topic: {article.topic}</p>
        <p>Published: {article.created_at}</p>
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>
      </div>
      <div className="comments-section">
        <h2>{article.comment_count} Comments</h2>
        <ul className="comment-list">
          {comments.map((comment, article_id) => {
            return <CommentCard comment={comment} key={article_id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default SingleArticle;
