using Labb__Minimal_API___Anrop_till_ASP.Net.Models;
using Microsoft.EntityFrameworkCore;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Data
{
	public class AppDbContext : DbContext
	{
        public AppDbContext(DbContextOptions<AppDbContext> options) :base(options)
        {

        }
        
        public DbSet<Book> Books { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Book>().HasData(

                new Book()
                {
                    ID = Guid.NewGuid(),
                    Title = "Harry Potter and the Prisoner of Azkaban",
                    Author = "J.K. Rowling",
                    PublicationYear = 1999,
                    Genre = "Fantasy",
                    Description = "Book about Harry Potter and his wizarding friends.",
                    IsAvailable = true,
					
                },

				new Book()
				{
                    ID = Guid.NewGuid(),
                    Title = "The Hunger Games",
					Author = "Suzanne Collins",
					PublicationYear = 2008,
					Genre = "Science fiction",
					Description = "We follow Katniss Everdeen and her struggles.",
					IsAvailable = false,
                    
                },

				new Book()
				{
					ID = Guid.NewGuid(),
					Title = "Wolf of the Wall Street",
					Author = "Jordan Belfort",
					PublicationYear = 2008,
					Genre = "Autobiography",
					Description = "About Jordan Belforts interesting life!",
					IsAvailable = true,
                    
                });
        }

	}
}
