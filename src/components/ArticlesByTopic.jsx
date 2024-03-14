import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../api";
import { useParams, useSearchParams } from "react-router-dom";

const ArticlesByTopic = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
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
    getArticlesByTopic(topic, sortByQuery, orderQuery)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching articles by topic:", error);
      });
  }, [topic, sortByQuery, orderQuery]);

  return (
    <div>
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
      <h2>{`Articles about ${topic}`}</h2>
      <ul className="article-list">
        {articles.map((article, article_id) => (
          <ArticleCard article={article} key={article_id} />
        ))}
      </ul>
    </div>
  );
};

export default ArticlesByTopic;
