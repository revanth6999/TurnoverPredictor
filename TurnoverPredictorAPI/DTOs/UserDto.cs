using System;

namespace TurnoverPredictorAPI.DTOs
{
    public class UserDto
    {
        // public int Id { get; set; }
        public int Age { get; set; }     
        public string BusinessTravel { get; set; }
        public string Department { get; set; }
        public float DistanceFromHome { get; set; }
        public int Education { get; set; }
        public string EducationField { get; set; }
        public string Gender { get; set; }
        public int EnvironmentSatisfaction { get; set; }
        public int JobInvolvement { get; set; }
        public int JobLevel { get; set; }
        public string JobRole { get; set; }
        public int JobSatisfaction { get; set; }
        public string MaritalStatus { get; set; }
        public float AnnualIncome { get; set; }
        public int NumCompaniesWorked { get; set; }
        public string OverTime { get; set; }
        public float PercentSalaryHike { get; set; }
        public int PerformanceRating { get; set; }
        public int StockOptionLevel { get; set; }
        public int TotalWorkingYears { get; set; }
        public int TrainingTimesLastYear { get; set; }
        public int WorkLifeBalance { get; set; }
        public int YearsAtCompany { get; set; }
        public int YearsInCurrentRole { get; set; }
        public int YearsSinceLastPromotion { get; set; }
        public int YearsWithCurrManager { get; set; }
    }
}
