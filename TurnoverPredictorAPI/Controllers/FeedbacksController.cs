using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using TurnoverPredictorAPI.Data;
using TurnoverPredictorAPI.Models;
using TurnoverPredictorAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace TurnoverPredictorAPI.Controllers
{
    // [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IFeedbackRepository FeedbackRepo;
        public FeedbacksController(IMapper mapper, IFeedbackRepository feedbackRepo)
        {
            Mapper = mapper;
            FeedbackRepo = feedbackRepo;
        }

        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> SubmitFeedback(UserFeedback userFeedback)
        {
            try
            {
                userFeedback.Datetime = DateTime.Now;
                var feedback = await FeedbackRepo.SubmitFeedback(userFeedback); 
                return Created(
                    feedback.Id.ToString(),
                    feedback
                );
            }
            catch(Exception)
            {
                return StatusCode(500, "Could not send feedback. Please try again later!");
            }            
        }
        
        [HttpGet]
        [Route("average")]
        public async Task<IActionResult> GetAverageValue()
        {
            var average = await FeedbackRepo.GetAverageValues();
            return Ok(average);
        }
    }
}