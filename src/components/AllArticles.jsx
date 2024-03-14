import "../App.css";

import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Routes, Route, useSearchParams, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const AllArticles = (sort_by) => {
  const [articles, setArticles] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order_by");

  const setSortBy = (filter) => {
     const newParams = new URLSearchParams(searchParams);
     newParams.set("sort_by", filter);
     setSearchParams(newParams);
   };

   const setOrderBy = (direction) => {
     const newParams = new URLSearchParams(searchParams);
     newParams.set("order_by", direction);
     setSearchParams(newParams);
   };

  useEffect(() => {
    getAllArticles(sortByQuery, orderQuery)
    .then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [sortByQuery, orderQuery]);

  return (
    <div>
      <h2>All Articles</h2>
      <div className="sort-buttons">
        <p>sort by</p>
        <button onClick={() => setSortBy("created_at")}>Date</button>
        <button onClick={() => setSortBy("comment_count")}>No. of Comments</button>
        <button onClick={() => setSortBy("votes")}>Votes</button>
      </div>
      <div className="order-buttons">
         <p>Order by</p>
        <button onClick={() => setOrderBy("ASC")}>Ascending</button>
        <button onClick={() => setOrderBy("DESC")}>Descending</button>
      </div>
      <ul className="article-list">
        {articles.map((article, article_id) => {
          return <ArticleCard article={article} key={article_id} />;
        })}
      </ul>
    </div>
  );
};

export default AllArticles;
