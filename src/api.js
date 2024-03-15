import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-7ps8.onrender.com/api",
});

const getAllArticles = (sort_by, order_by) => {
  return ncNewsApi
    .get(`/articles?sort_by=${sort_by}&order_by=${order_by}`)
    .then((response) => {
      return response.data.articles;
    })
    
};

const getArticlesByTopic = (topic, sort_by, order_by) => {
  return ncNewsApi
    .get(`/articles?topic=${topic}&sort_by=${sort_by}&order_by=${order_by}`)
    .then((response) => {
      return response.data.articles;
    })
    
};

const getArticleById = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    
};

const getArticleComments = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
   
};

const updateVotes = (article_id, voteType) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: voteType })
    .then((response) => {
      return response.data.updatedArticle;
    })
    
};

const postComment = (article_id, body, username) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      body: body,
      username: username,
    })
    .then((response) => {
      return response.data.comment;
    })
    
};

const deleteComment = (comment_id) => {
  return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then((response) => {
      return response;
    })
    
};

export {
  getAllArticles,
  getArticlesByTopic,
  getArticleById,
  getArticleComments,
  updateVotes,
  postComment,
  deleteComment,
};
