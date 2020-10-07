using System;

namespace TurnoverPredictorAPI.DTOs
{
    public class UserCompUpdateDto
    {
        public int UserId { get; set; }
        public string BusinessTravel { get; set; }
        public float AnnualIncome { get; set; }
        public float PercentSalaryHike { get; set; }
        public int StockOptionLevel { get; set; }
    }
}
