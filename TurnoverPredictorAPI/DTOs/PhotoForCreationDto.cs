using Microsoft.AspNetCore.Http;
namespace TurnoverPredictorAPI.DTOs
{
    public class PhotoForCreationDto
    {
        public IFormFile File { get; set; }
    }
}