import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
// import ArticlesByTopic from "./components/ArticlesByTopic";
import SingleArticle from "./components/SingleArticle";
import {UserContext} from "./components/UserContext";
import NotFoundPage from './components/NotFoundPage'
import WelcomePage from './components/WelcomePage'

function App() {

  return (
      <div className="App">
        <h1>NC News</h1>
        <NavBar />
        <Routes>
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path='/articles/topic/:topic' element={<AllArticles />} />
          <Route path="/" element={<WelcomePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
  );
}

export default App;
