import '../App.css'
import {Link} from "react-router-dom";

const ArticleCard = ({article}) => {
   return (
      <div className="article-card">
         <Link to={`/articles/${article.article_id}`} article={article}>
            <p>{article.title}</p>
         </Link>
         <p>Written by {article.author}</p>
         <img src={article.article_img_url} id='image'></img>
         <p>{article.created_at}</p>
         <p>{article.comment_count} comments</p>
         <p>{article.votes} votes</p>
      </div>
   )
}

export default ArticleCard