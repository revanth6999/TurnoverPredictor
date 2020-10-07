using System.ComponentModel.DataAnnotations;

namespace TurnoverPredictorAPI.DTOs
{
    public class UserRegistrationDto
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Password should be atleast 6 characters")]
        public string Password { get; set; }
    }
}



// [Required]
// public bool IsManager { get; set; }
// [Required]
// public int ManagerId { get; set; }