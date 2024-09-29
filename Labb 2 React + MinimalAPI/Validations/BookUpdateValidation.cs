using FluentValidation;
using Labb__Minimal_API___Anrop_till_ASP.Net.Models.DTO;

namespace Labb__Minimal_API___Anrop_till_ASP.Net.Validations
{
    public class BookUpdateValidation : AbstractValidator<BookInfoDTO>
    {
        public BookUpdateValidation()
        {
            RuleFor(model => model.ID).NotEmpty();
            RuleFor(model => model.Title).NotEmpty().MinimumLength(2).MaximumLength(50);
            RuleFor(model => model.Author).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(model => model.Description).MinimumLength(2).MaximumLength(250);
            RuleFor(model => model.PublicationYear).NotEmpty().InclusiveBetween(1, 2024);
        }
    }
}
