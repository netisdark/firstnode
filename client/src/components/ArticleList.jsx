import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ArticleList = () => {
  const { theme } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/getArticleList')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(error));
  }, []);

  const textColor = theme === 'light' ? '1c1c1e' : 'f5f5f7';
  const backgroundColor = theme === 'light' ? 'f5f5f7' : '1c1c1e';

  return (
    <div className={`py-4 bg-${backgroundColor} transition duration-300`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-orbitron text-${textColor}`}>Article List</h2>
        <ul>
          {articles.map((article, index) => (
            <li key={index} className="py-2 border-b border-gray-200">
              <img
                src={article.images[0]}
                alt={article.title}
                className="h-30 w-60 mr-2 rounded"
              />
              <span className={`text-lg text-${textColor}`}>{article.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleList;