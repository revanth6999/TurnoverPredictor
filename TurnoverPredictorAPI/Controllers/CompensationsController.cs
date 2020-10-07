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
    public class CompensationsController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly ICompensationRepository CompensationRepo;   
        public CompensationsController(IMapper mapper, ICompensationRepository compensationRepo)
        {
            Mapper = mapper;
            CompensationRepo = compensationRepo;
        }
        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> SubmitCompensation(UserCompensation userCompensation)
        {
            try
            {
                userCompensation.Datetime = DateTime.Now;
                var compensation = await CompensationRepo.SubmitUserCompensation(userCompensation); 
                return Created(
                    compensation.Id.ToString(),
                    compensation
                );
            }
            catch(Exception)
            {
                return StatusCode(500, "Could not submit compensation info. Please try again later!");
            }            
        }
    }
}