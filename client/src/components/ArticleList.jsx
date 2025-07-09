import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from './ThemeContext';

const ArticleList = () => {
  const { theme, toggleTheme } = useTheme();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/getArticleList')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(error));
  }, []);

  const bgClass = theme === 'light' ? 'bg-[#f5f5f7]' : 'bg-[#1c1c1e]';
  const textClass = theme === 'light' ? 'text-[#1c1c1e]' : 'text-[#f5f5f7]';

  return (
    <div className={`py-4 ${bgClass} transition duration-300`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-orbitron mb-4 ${textClass}`}>Article List</h2>
        <ul>
          {articles.map((article, index) => (
            <li key={index} className="py-2 border-b border-gray-200 flex flex-col items-center gap-4">
              <img
                src={article.images[0]}
                alt={article.title}
                className="h-30 w-60 object-cover rounded"
              />
              <span className={`text-lg ${textClass}`}>{article.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleList;
