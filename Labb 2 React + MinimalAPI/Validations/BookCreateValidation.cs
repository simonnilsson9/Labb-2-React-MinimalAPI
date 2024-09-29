using FluentValidation;
using Labb__Minimal_API___Anrop_till_ASP.Net.Models.DTO;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Validations
{
    public class BookCreateValidation : AbstractValidator<BookCreateDTO>
    {
        public BookCreateValidation()
        {
            RuleFor(model => model.Title)
            .NotNull().NotEmpty();
            RuleFor(model => model.Author).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(model => model.Genre).NotEmpty().MinimumLength(2);
            RuleFor(model => model.PublicationYear).NotEmpty().InclusiveBetween(1, 2024);
        }
    }
}
