using System;

namespace TurnoverPredictorAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }   
        public DateTime DateOfBirth { get; set; }     
        public float DistanceFromHome { get; set; }
        public string Education { get; set; }
        public string EducationField { get; set; }
        public string Gender { get; set; }
        public string JobRole { get; set; }
        public string JobLevel { get; set; }
        public string Department { get; set; }
        public string MaritalStatus { get; set; }
        public int ManagerId { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int NumCompaniesWorked { get; set; }
        public int TotalWorkingYears { get; set; }
    }
}