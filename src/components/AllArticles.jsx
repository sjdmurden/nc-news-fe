import "../App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { getAllArticles } from "../api";
import { Routes, Route, useSearchParams, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order_by");

  const setSortBy = (event) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  };

  const setOrderBy = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", direction);
    setSearchParams(newParams);
  };

  useEffect(() => {
    getAllArticles(sortByQuery, orderQuery).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [sortByQuery, orderQuery]);

  return (
    <div>
      <h2>All Articles</h2>
      <div className="mui">
        <Box>
          <FormControl >
            <InputLabel id="sort-by-label"
            style={{ color: 'black' }}>Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              value={sortByQuery}
              label="Sort"
              onChange={setSortBy}
              style={{ color: 'black', backgroundColor: 'white' }}  
            >
              <MenuItem value={"created_at"}>Date</MenuItem>
              <MenuItem value={"comment_count"}>Comments</MenuItem>
              <MenuItem value={"votes"}>Votes</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
