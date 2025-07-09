import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import ArticleList from './components/ArticleList';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Increase width of ArticleList */}
          <div className="md:w-1/5 w-full">
            <ArticleList />
          </div>

          {/* Remaining space for Articles */}
          <div className="md:w-3/5 w-full">
            <Articles />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
