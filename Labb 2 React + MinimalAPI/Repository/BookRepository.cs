using Labb__Minimal_API___Anrop_till_ASP.Net.Data;
using Labb__Minimal_API___Anrop_till_ASP.Net.Models;
using Microsoft.EntityFrameworkCore;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Repository
{
	public class BookRepository : IBookRepository
	{
		private readonly AppDbContext _db;
        public BookRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task CreateBookAsync(Book book)
		{
			await _db.Books.AddAsync(book);
		}

		public async Task DeleteBookAsync(Book book)
		{
			 _db.Books.Remove(book);
		}

		public async Task<IEnumerable<Book>> GetAllBooksAsync()
		{
			return await _db.Books.ToListAsync();
		}

		public async Task<Book> GetBookAsyncById(Guid id)
		{
			return await _db.Books.FirstOrDefaultAsync(b => b.ID == id);
		}

		public async Task<Book> GetBookAsyncByTitle(string title)
		{
			return await _db.Books.FirstOrDefaultAsync(t => t.Title.ToLower() == title.ToLower());
		}

        public async Task<IEnumerable<Book>> GetBooksByAuthorAsync(string author)
        {
            return await _db.Books.Where(b => b.Author.ToLower() == author.ToLower()).ToListAsync();
        }

        public async Task<IEnumerable<Book>> GetBooksByGenre(string genre)
        {
            return await _db.Books.Where(b => b.Genre.ToLower() == genre.ToLower()).ToListAsync();
        }

        public async Task SaveAsync()
		{
			await _db.SaveChangesAsync();
		}

		public async Task UpdateBookAsync(Book book)
		{
			_db.Books.Update(book);
		}
	}
}
