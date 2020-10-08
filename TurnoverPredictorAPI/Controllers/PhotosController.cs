using System;
using System.IO;
using System.Threading.Tasks;
using TurnoverPredictorAPI.Data;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
namespace TurnoverPredictorAPI.Controllers
{
    
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly DataContext _context;  
        private readonly IWebHostEnvironment webHostEnvironment;  
        public PhotosController(DataContext context, IWebHostEnvironment hostEnvironment)  
        {  
            _context = context;  
            webHostEnvironment = hostEnvironment;  
        } 
        [HttpGet]
        public async Task<IActionResult> GetPhoto(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            var url = user.DisplayPictureUrl;

            return Ok(url);
        }
        [HttpPost] 
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
        
            if(ModelState.IsValid)
            {
                string filename = UploadedFile(photoForCreationDto);
                var user = await _context.Users.FindAsync(userId);
                user.DisplayPictureUrl = "http://127.0.0.1:5500/TurnoverPredictorAPI/images/" + filename;
                await _context.SaveChangesAsync();
                return Ok(user);
            }

            return BadRequest("Could not add the photo");
        }
        private string UploadedFile(PhotoForCreationDto model)  
        {  
            string uniqueFileName = null;  
            string filePath = null;
            if (model.File != null)  
            {  
                string uploadsFolder = Path.Combine(@"C:\Users\Revanth\Desktop\a3\JumpstartHackathon\TurnoverPredictorAPI", "images");  
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.File.FileName;  
                filePath = Path.Combine(uploadsFolder, uniqueFileName);  
                using (var fileStream = new FileStream(filePath, FileMode.Create))  
                {  
                    model.File.CopyTo(fileStream);  
                }  
            }  
            return uniqueFileName;  
        }  
        
    }
    
}