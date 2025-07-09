import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useTheme } from './ThemeContext'; // Adjust path if needed

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();;
  const [menuOpen, setMenuOpen] = useState(false);

  const bgColor = theme === 'light' ? 'bg-[#f5f5f7]' : 'bg-[#1c1c1e]';
  const textColor = theme === 'light' ? 'text-[#1c1c1e]' : 'text-[#f5f5f7]';
  const accentColor = 'text-[#3daee9]';

  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded hover:underline font-[Exo] ${
          isActive ? `${accentColor} underline` : textColor
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className={`sticky top-0 left-0 w-full z-50 shadow ${bgColor} transition duration-300`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo & Title */}
        <div className="flex items-center">
          <img
            src="./intelixir-logo.png"
            alt="Intelixir Logo"
            className="h-30 w-40 mr-2"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navItem('/', 'Home')}
          {navItem('/categories', 'Categories')}
          {navItem('/ai-digest', 'AI Digest')}
          {navItem('/about', 'About')}
          {navItem('/contact', 'Contact')}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full hover:scale-105 transition ${textColor}`}
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} className={`${textColor}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col space-y-2 ${bgColor}`}>
          {navItem('/', 'Home')}
          {navItem('/categories', 'Categories')}
          {navItem('/ai-digest', 'AI Digest')}
          {navItem('/about', 'About')}
          {navItem('/contact', 'Contact')}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
