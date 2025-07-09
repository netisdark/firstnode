import React, { useEffect, useState } from "react";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://firstnode-li1f.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article, idx) => (
          <div key={idx} style={cardStyle}>
            <h2>{article.title}</h2>
            {article.images?.[0] && (
              <img src={article.images[0]} alt="Article visual" style={imageStyle} />
            )}
            <p><strong>Summary:</strong> {article.summary}</p>
            <p>{article.content}</p>
            <p><em>Joke:</em> {article.jokes}</p>
            <blockquote>{article.quote}</blockquote>
            {article.questions?.length > 0 && (
              <>
                <h4>Questions:</h4>
                <ul>
                  {article.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </>
            )}
            <p><a href={article.source} target="_blank" rel="noopener noreferrer">Read More</a></p>
            <small>{new Date(article.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "1.5rem",
  marginBottom: "1.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const imageStyle = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  margin: "1rem 0"
};

export default ArticlesList;
