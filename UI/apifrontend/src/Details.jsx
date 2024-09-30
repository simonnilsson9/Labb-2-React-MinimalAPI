import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7032/api/book/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();

        if (data.isSuccess) {
          setBook(data.result); // Assuming your API response structure
        } else {
          setError('Failed to retrieve book details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // Dependency array includes id to refetch if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>No book found.</div>; // Handle case if book is null
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h2 className="mb-0">More Info</h2>
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3 font-weight-bold">ID</dt>
            <dd className="col-sm-9">{book.id}</dd>

            <dt className="col-sm-3 font-weight-bold">Title</dt>
            <dd className="col-sm-9">{book.title}</dd>

            <dt className="col-sm-3 font-weight-bold">Author</dt>
            <dd className="col-sm-9">{book.author}</dd>

            <dt className="col-sm-3 font-weight-bold">Genre</dt>
            <dd className="col-sm-9">{book.genre}</dd>

            <dt className="col-sm-3 font-weight-bold">Description</dt>
            <dd className="col-sm-9">{book.description}</dd>

            <dt className="col-sm-3 font-weight-bold">Publication Year</dt>
            <dd className="col-sm-9">{book.publicationYear}</dd>

            <dt className="col-sm-3 font-weight-bold">Available To Rent</dt>
            <dd className="col-sm-9">{book.isAvailable ? 'Yes' : 'No'}</dd>
          </dl>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-secondary" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  );
};

export default Details;
