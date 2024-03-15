import React from "react";
import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation()

  const path = location.pathname
  let errorMessage;
  if (path.startsWith("/articles/topic")) {
    errorMessage = "Topic not found"
  } else if (path.startsWith("/articles")) {
    errorMessage = "Article not found"
  } else {
    errorMessage = "Page not found"
  }

  return (
    <div>
      <h2>404 - Not Found</h2>
      <h3>{errorMessage}</h3>
    </div>
  )
}

export default NotFoundPage;
