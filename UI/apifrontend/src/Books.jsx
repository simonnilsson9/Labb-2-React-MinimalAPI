import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const BooksComponent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:7032/api/books');

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        if (data.isSuccess) {
          setBooks(data.result);
        } else {
          setError('Failed to retrieve books');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleMoreInfo = (id) => {
    console.log("Show more info for book with ID:", id);
    navigate(`/book/${id}`);
  };

  const handleEdit = (id) => {
    console.log("Editing book with ID:", id);
    navigate(`/edit/book/${id}`)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://localhost:7032/api/book/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete book');
        }

        // Filter out the deleted book from the state
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCreate = () => {
    console.log("Creating a new book");
    navigate('/create')
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-3">
  <h2 className="text-center">All Books</h2>
  <table className="table table-hover table-bordered text-center">
    <thead className="table-dark">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book) => (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <div className="btn-group" role="group" aria-label="Action buttons">
              <button
                onClick={() => handleMoreInfo(book.id)}
                className="btn btn-outline-success btn-sm me-2"
              >
                <i className="fa fa-info-circle"></i> More Info
              </button>
              <button
                onClick={() => handleEdit(book.id)}
                className="btn btn-outline-warning btn-sm me-2"
              >
                <i className="fa fa-edit"></i> Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="text-center">
    <button onClick={handleCreate} className="btn btn-outline-primary">
      <i className="fa-solid fa-plus me-2"></i>Add New Book
    </button>
  </div>
</div>
  );
};

export default BooksComponent;

