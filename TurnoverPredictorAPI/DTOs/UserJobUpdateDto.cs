namespace TurnoverPredictorAPI.DTOs
{
    public class UserJobUpdateDto
    {
        public string JobRole { get; set; }
        public int JobLevel { get; set; }
        public string Department { get; set; }
        public int ManagerId { get; set; }
    }
}