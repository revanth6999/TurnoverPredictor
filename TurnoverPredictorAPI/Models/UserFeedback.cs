using System;

namespace TurnoverPredictorAPI.Models
{
    public class UserFeedback
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int JobSatisfaction { get; set; }
        public int EnvironmentSatisfaction { get; set; }
        public int WorkLifeBalance { get; set; }
        public DateTime Datetime { get; set; }
    }
}