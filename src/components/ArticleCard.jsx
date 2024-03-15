import "../App.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import DateFormat from "./DateFormat";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={article.article_img_url}
          title="article_img_url"
        />
        <CardContent style={{}}>
          <Typography gutterBottom variant="h5" component="span">
            <Link to={`/articles/${article.article_id}`} article={article}>
              <span>{article.title}</span>
              <br />
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">
            <p>Written by <span className="italic">{article.author}</span></p>
            <DateFormat dateString={article.created_at}/>
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: 10 }}>
                {article.comment_count} <MessageIcon />
              </p>
              <p>
                {article.votes} <PollRoundedIcon />
              </p>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
