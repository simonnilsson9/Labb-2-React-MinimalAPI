using Labb__Minimal_API___Anrop_till_ASP.Net.Models;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Repository
{
	public interface IBookRepository
	{
		Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<IEnumerable<Book>> GetBooksByAuthorAsync(string author);
		Task<IEnumerable<Book>> GetBooksByGenre(string genre);
        Task<Book> GetBookAsyncById(Guid id);
		Task<Book> GetBookAsyncByTitle(string title);
        Task CreateBookAsync(Book book);
		Task UpdateBookAsync(Book book);
		Task DeleteBookAsync(Book book);
		Task SaveAsync();
	}
}
