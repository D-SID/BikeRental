using Microsoft.EntityFrameworkCore.Migrations;

namespace BikeRental.Migrations
{
    public partial class AddMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BikeDetails",
                columns: table => new
                {
                    BikeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Type = table.Column<string>(type: "varchar(16)", nullable: true),
                    Price = table.Column<decimal>(type: "money", nullable: false),
                    Avalible = table.Column<bool>(type: "BIT default 'True'", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BikeDetails", x => x.BikeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BikeDetails");
        }
    }
}
