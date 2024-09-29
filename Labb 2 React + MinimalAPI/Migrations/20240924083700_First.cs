using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Labb_2_React___MinimalAPI.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicationYear = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "ID", "Author", "Description", "Genre", "IsAvailable", "PublicationYear", "Title" },
                values: new object[,]
                {
                    { new Guid("1906cc51-9ca5-4847-9b2c-712a56d1aa28"), "Suzanne Collins", "We follow Katniss Everdeen and her struggles.", "Science fiction", false, 2008, "The Hunger Games" },
                    { new Guid("43c9c692-37ed-4ff8-8839-52cf5c30c194"), "Jordan Belfort", "About Jordan Belforts interesting life!", "Autobiography", true, 2008, "Wolf of the Wall Street" },
                    { new Guid("bf511146-1351-4be0-883f-2a44140f6c91"), "J.K. Rowling", "Book about Harry Potter and his wizarding friends.", "Fantasy", true, 1999, "Harry Potter and the Prisoner of Azkaban" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
