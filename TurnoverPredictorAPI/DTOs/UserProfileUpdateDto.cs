using System;

namespace TurnoverPredictorAPI.DTOs
{
    public class UserProfileUpdateDto
    {
        public DateTime DateOfBirth { get; set; }     
        public float DistanceFromHome { get; set; }
        public int Education { get; set; }
        public string EducationField { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public int NumCompaniesWorked { get; set; }
        public int TotalWorkingYears { get; set; }
    }
}