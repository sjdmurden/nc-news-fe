import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import ArticlesByTopic from "./components/ArticlesByTopic";
import SingleArticle from "./components/SingleArticle";
import {UserContext} from "./components/UserContext";

function App() {

  return (
      <div className="App">
        <h1>NC News</h1>
        <NavBar />
        <Routes>
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          {/* <Route path='/topic/:topic' element={<ArticlesByTopic />} /> */}
        </Routes>
      </div>
  );
}

export default App;
