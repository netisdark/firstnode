import React from 'react';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import ArticleList from './components/ArticleList';
import { useTheme } from './components/ThemeContext';

function MainLayout() {
  const { theme } = useTheme();

  const bgColor = theme === 'light' ? 'bg-[#f5f5f7]' : 'bg-[#1c1c1e]';
  const textColor = theme === 'light' ? 'text-[#1c1c1e]' : 'text-[#f5f5f7]';

  return (
    <div className={`${bgColor} ${textColor} min-h-screen transition duration-300`}>
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="md:w-1/5 w-full">
          <ArticleList />
        </div>
        <div className="md:w-3/5 w-full">
          <Articles />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
