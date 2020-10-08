using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TurnoverPredictorAPI.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFeedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    JobSatisfaction = table.Column<int>(nullable: false),
                    EnvironmentSatisfaction = table.Column<int>(nullable: false),
                    WorkLifeBalance = table.Column<int>(nullable: false),
                    Datetime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFeedbacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPerformances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    PerformanceRating = table.Column<int>(nullable: false),
                    OverTime = table.Column<string>(nullable: true),
                    JobInvolvement = table.Column<int>(nullable: false),
                    TrainingTimesLastYear = table.Column<int>(nullable: false),
                    ManagerId = table.Column<int>(nullable: false),
                    LastPromotionUpdate = table.Column<DateTime>(nullable: false),
                    LastRoleUpdate = table.Column<DateTime>(nullable: false),
                    LastManagerUpdate = table.Column<DateTime>(nullable: false),
                    Datetime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPerformances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    DistanceFromHome = table.Column<float>(nullable: false),
                    Education = table.Column<int>(nullable: false),
                    EducationField = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    JobRole = table.Column<string>(nullable: true),
                    JobLevel = table.Column<int>(nullable: false),
                    Department = table.Column<string>(nullable: true),
                    MaritalStatus = table.Column<string>(nullable: true),
                    ManagerId = table.Column<int>(nullable: false),
                    DateOfJoining = table.Column<DateTime>(nullable: false),
                    NumCompaniesWorked = table.Column<int>(nullable: false),
                    TotalWorkingYears = table.Column<int>(nullable: false),
                    BusinessTravel = table.Column<string>(nullable: true),
                    AnnualIncome = table.Column<float>(nullable: false),
                    PercentSalaryHike = table.Column<float>(nullable: false),
                    StockOptionLevel = table.Column<int>(nullable: false),
                    DisplayPictureUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFeedbacks");

            migrationBuilder.DropTable(
                name: "UserPerformances");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
