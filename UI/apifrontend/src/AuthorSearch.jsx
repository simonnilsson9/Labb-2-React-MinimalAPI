import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorSearch = () => {
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!author) return;

    try {
      const response = await fetch(`https://localhost:7032/api/books/${encodeURIComponent(author)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.result || []);
      setShowResults(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setShowResults(false);
    }
  };

  return (
    <div className="container mt-5"> {/* Add container class for centering */}
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search for an author"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {error && <div className="mt-3 text-danger">{error}</div>}

      {showResults && (
        <div>
          <h2 className="mt-3">Books by {author}</h2>
          <table className="table table-hover table-bordered text-center"> {/* Center the text in the table */}
            <thead className="table-dark">
              <tr>                
                <th>Title</th>
                <th>Author</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>                    
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => navigate(`/book/${book.id}`)}
                      >
                        <i className="fa fa-info-circle me-1"></i> More Info
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuthorSearch;

