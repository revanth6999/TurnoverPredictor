namespace TurnoverPredictorAPI.DTOs
{
    public class UserJobUpdateDto
    {
        public string JobRole { get; set; }
        public string JobLevel { get; set; }
        public string Department { get; set; }
        public int ManagerId { get; set; }
    }
}