import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Routes, Route } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {
   const [articles, setArticles] = useState([])

   useEffect(() => {
      getAllArticles()
      .then((articlesFromApi) => {
         console.log(articlesFromApi);
         setArticles(articlesFromApi)
      })
   }, [])

   return (
      <div>
         <h2>All Articles</h2>
         <ul>
            {articles.map((article, i) => {
               return (
                  <ArticleCard article={article} key={i} />
               )
            })}
         </ul>
      </div>
   )
}

export default AllArticles