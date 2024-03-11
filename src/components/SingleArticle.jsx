import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../api"
import NavBar from "./NavBar"

const SingleArticle = () => {

   const {id} = useParams()
   const [article, setArticle] = useState([])

   useEffect(() => {
      getArticleById(id)
        .then((resArticle) => {
         console.log(resArticle);
          setArticle(resArticle);
        })
        .catch((err) => {
          setArticle([]);
        });
    }, [id]);

   return (
      <div>
         <NavBar/>
         <p>{ article.title }</p>
         <p>{ article.author }</p>
         <p>{ article.topic }</p>
         <p>{ article.created_at}</p>
         <p>{ article.article_img_url }</p>
         <p>{ article.body }</p>
         <p>{ article.votes }</p>
         <p>{ article.comment_count }</p>
      </div>
   )
}

export default SingleArticle