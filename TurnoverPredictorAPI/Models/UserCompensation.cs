using System;

namespace TurnoverPredictorAPI.Models
{
    public class UserCompensation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string BusinessTravel { get; set; }
        public float AnnualIncome { get; set; }
        public float PercentSalaryHike { get; set; }
        public float DailyRate { get; set; }
        public int StockOptionLevel { get; set; }
        public DateTime Datetime { get; set; }
    }
}