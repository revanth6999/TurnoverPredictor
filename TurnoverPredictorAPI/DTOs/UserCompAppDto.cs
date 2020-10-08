using System;

namespace TurnoverPredictorAPI.DTOs
{
    public class UserCompAppDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }     
        public float DistanceFromHome { get; set; }
        public int Education { get; set; }
        public string EducationField { get; set; }
        public string Gender { get; set; }
        public string JobRole { get; set; }
        public int JobLevel { get; set; }
        public string Department { get; set; }
        public string MaritalStatus { get; set; }
        public int ManagerId { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int NumCompaniesWorked { get; set; }
        public int TotalWorkingYears { get; set; }
        public string BusinessTravel { get; set; }
        public float AnnualIncome { get; set; }
        public float PercentSalaryHike { get; set; }
        public int StockOptionLevel { get; set; }
        public string DisplayPictureUrl { get; set; }
    }
}