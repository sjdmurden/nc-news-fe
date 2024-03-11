import axios from 'axios'

const ncNewsApi = axios.create({
   baseURL: 'https://nc-news-7ps8.onrender.com/api'
})

const getAllArticles = () => {
   return ncNewsApi.get('/articles')
   .then((response) => {
      console.log(response);
      return response.data.articles
   })
   .catch((error) => {
      console.dir(error);
    });
}

const getArticlesByTopic = (topic) => {
   return ncNewsApi.get(`/articles?topic=${topic}`)
   .then((response) => {
      console.log(response);
      return response.data.articles
   })
   .catch((error) => {
      console.dir(error);
    });
}

const getArticleById = (article_id) => {
   return ncNewsApi.get(`/articles/${article_id}`)
   .then((response) => {
      console.log(response);
      return response.data.articles
   })
   .catch((error) => {
      console.dir(error);
    });
}

export {getAllArticles, getArticlesByTopic, getArticleById}