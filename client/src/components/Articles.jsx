import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "./ThemeContext"; // adjust path as needed

const Articles = () => {
  const { theme, toggleTheme } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
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

  const isLight = theme === "light";
  const bgColor = isLight ? "#ffffff" : "#1c1c1e";
  const textColor = isLight ? "#1c1c1e" : "#f5f5f7";
  const cardBorder = isLight ? "#ddd" : "#444";
  const titleFont = "Exo";
  const contentFont = "Montserrat";

  if (loading) return <p style={{ color: textColor }}>Loading articles...</p>;

  return (
    <div style={{ padding: "1rem", backgroundColor: bgColor, minHeight: "100vh" }}>
      {articles.length === 0 ? (
        <p style={{ color: textColor }}>No articles found.</p>
      ) : (
        articles.map((article, idx) => (
          <div key={idx} style={cardStyle(cardBorder, bgColor, textColor)}>
            <h2 style={{ fontFamily: titleFont }}>{article.title}</h2>
            {article.images?.[0] && (
              <img src={article.images[0]} alt="Article visual" style={imageStyle} />
            )}
            <p style={{ fontFamily: contentFont }}><strong>Summary:</strong> {article.summary}</p>
            <p style={{ fontFamily: contentFont }}>{article.content}</p>
            <p style={{ fontFamily: contentFont }}><em>Joke:</em> {article.jokes}</p>
            <blockquote style={{ fontFamily: contentFont }}>{article.quote}</blockquote>
            <p style={{ fontFamily: contentFont }}>{article.questions?.length > 0 && (
              <>
                <h4>Questions:</h4>
                <ul>
                  {article.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </>
            )}
            </p>
            <p><a href={article.source} target="_blank" rel="noopener noreferrer">Read More</a></p>
            <small>{new Date(article.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = (borderColor, bgColor, textColor) => ({
  borderBottom: `1px solid ${borderColor}`,
  padding: "1rem",
  marginBottom: "1rem",
  backgroundColor: bgColor,
  color: textColor
});
const imageStyle = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  margin: "1rem 0"
};

export default Articles;
