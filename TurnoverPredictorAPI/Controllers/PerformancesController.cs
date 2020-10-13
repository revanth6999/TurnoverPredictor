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
    public class PerformancesController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IPerformanceRepository PerformanceRepo;   
        public PerformancesController(IMapper mapper, IPerformanceRepository performanceRepo)
        {
            Mapper = mapper;
            PerformanceRepo = performanceRepo;
        }
        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> SubmitPerformance(UserPerformance userPerformance)
        {
            try
            {
                userPerformance.Datetime = DateTime.Now;
                var performance = await PerformanceRepo.SubmitUserPerformance(userPerformance); 
                return Created(
                    performance.Id.ToString(),
                    performance
                );
            }
            catch(Exception)
            {
                return StatusCode(500, "Could not submit performance info. Please try again later!");
            }            
        }

        [HttpGet]
        [Route("average")]
        public async Task<IActionResult> GetAverageValue()
        {
            var average = await PerformanceRepo.GetAverageValues();
            return Ok(average);
        }
    }
}