using System;

namespace TurnoverPredictorAPI.Models
{
    public class UserPerformance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PerformanceRating { get; set; }
        public string OverTime { get; set; }
        public int JobInvolvement { get; set; }
        public int TrainingTimesLastYear { get; set; }
        public int ManagerId { get; set; }
        public DateTime LastPromotionUpdate { get; set; }
        public DateTime LastRoleUpdate { get; set; }
        public DateTime LastManagerUpdate { get; set; }
        public DateTime Datetime { get; set; }
    }
}
