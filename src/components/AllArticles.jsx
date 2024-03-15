import "../App.css";
import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Routes, Route, useSearchParams, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import NotFoundPage from "./NotFoundPage";
import DateFormat from "./DateFormat";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order_by");
  const { topic } = useParams();
  const [error, setError] = useState(null);

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
    getAllArticles(topic, sortByQuery, orderQuery)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching articles by topic:", error);
        setError(error);
      });
  }, [topic, sortByQuery, orderQuery]);

  if (error) {
    return <NotFoundPage error={error} />;
  }

  return (
    <div>
      <h2>{topic ? `Articles on ${topic}` : "All Articles"}</h2>
      <div className="sort-buttons">
        <label htmlFor="sort-select">Sort by: </label>
        <select id="sort-select" onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="comment_count">No. of Comments</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div className="order-buttons">
        <label htmlFor="order-select">Order by: </label>
        <select id="order-select" onChange={(e) => setOrderBy(e.target.value)}>
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>
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
