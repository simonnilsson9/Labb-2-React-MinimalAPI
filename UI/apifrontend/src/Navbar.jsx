import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchTitle.trim()) {
      try {
        const response = await fetch(`https://localhost:7032/api/book/${encodeURIComponent(searchTitle)}`);
        if (response.ok) {
          const data = await response.json();
          // Assuming data contains the book details
          if (data.result) {
            // Navigate to the book details page, pass the book ID or details
            navigate(`/book/${data.result.id}`); // Adjust based on your API response structure
          } else {
            alert('Book not found'); // Notify if the book isn't found
          }
        } else {
          alert('Book not found. Try something else!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching for the book');
      } finally {
        setSearchTitle(''); // Clear the search input
      }
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books-by-genre">Genre</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books-by-author">Author</Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)} // Update state on input change
                placeholder="Search for a book"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


