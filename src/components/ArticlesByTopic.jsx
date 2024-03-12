import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../api";
import NavBar from "./NavBar";

const ArticlesByTopic = ({ topic }) => {
   const [articles, setArticles] = useState([]);

   useEffect(() => {
      getArticlesByTopic(topic)
      .then((articlesFromApi) => {
         setArticles(articlesFromApi);
      })
      .catch((error) => {
         console.error("Error fetching articles by topic:", error);
      });
   }, [topic]);

   return (
      <div>
         <NavBar/>
         <h2>{`Articles about ${topic}`}</h2>
         <ul>
            {articles.map((article, article_id) => (
               <ArticleCard article={article} key={article_id} />
            ))}
         </ul>
      </div>
   );
};

export default ArticlesByTopic;