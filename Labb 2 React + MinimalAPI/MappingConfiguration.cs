using AutoMapper;
using Labb__Minimal_API___Anrop_till_ASP.Net.Models;
using Labb__Minimal_API___Anrop_till_ASP.Net.Models.DTO;

namespace Labb__Minimal_API___Anrop_till_ASP.Net
{
	public class MappingConfiguration : Profile
	{
        public MappingConfiguration()
        {
            CreateMap<Book, BookInfoDTO>().ReverseMap();
            CreateMap<Book, BookCreateDTO>().ReverseMap();
        }
    }
}
