using System.ComponentModel.DataAnnotations;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Models.DTO
{
	public class BookCreateDTO
	{
        [Required(ErrorMessage = "Title is required.")]
        [MinLength(1, ErrorMessage = "Title cannot be empty.")]
        [MaxLength(50, ErrorMessage = "Title must be max 50 characters long.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        [MinLength(2, ErrorMessage = "Author name must be at least 2 characters long.")]
        [MaxLength(50, ErrorMessage = "Author must be max 50 characters long.")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Genre is required.")]
        [MinLength(2, ErrorMessage = "Genre must be at least 2 characters long.")]
        [MaxLength(25, ErrorMessage = "Genre must be max 25 characters long.")]
        public string Genre { get; set; }

        [Required(ErrorMessage = "Publication year is required.")]
        [Range(1, 2024, ErrorMessage = "Publication year must be between 1 and 2024.")]
        public int PublicationYear { get; set; }
    }
}
