
using FluentValidation;
using Labb__Minimal_API___Anrop_till_ASP.Net.Data;
using Labb__Minimal_API___Anrop_till_ASP.Net.EndPoints;
using Labb__Minimal_API___Anrop_till_ASP.Net.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Labb__Minimal_API___Anrop_till_ASP.Net
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddAuthorization();

			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			//Add all Services
			builder.Services.AddAutoMapper(typeof(MappingConfiguration));
			builder.Services.AddScoped<IBookRepository, BookRepository>();
			builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            //React
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            }); ;


            //Database
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

            app.UseHttpsRedirection();

			app.UseAuthorization();

			//Add the EndPoint-Class for cleaner look. 
			app.ConfigurationEndPoints();

            //React
            app.UseCors("AllowAll");


            app.Run();
		}
	}
}
