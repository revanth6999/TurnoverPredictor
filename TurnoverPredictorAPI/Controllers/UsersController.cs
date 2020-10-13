using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using TurnoverPredictorAPI.Data;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace TurnoverPredictorAPI.Controllers
{
    // [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IUserRepository UserRepo;
        private readonly IPerformanceRepository PerformanceRepo;
        public UsersController(IMapper mapper, IUserRepository userRepo,  IPerformanceRepository performanceRepo)
        {
            Mapper = mapper;
            UserRepo = userRepo;
            PerformanceRepo = performanceRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await UserRepo.GetUsers();          
            return Ok(Mapper.Map<IEnumerable<UserAppDto>>(users));
        }

        [HttpGet]
        [Route("compall")]
        public async Task<IActionResult> GetUsersWithCompensation()
        {
            var users = await UserRepo.GetUsers();        
            return Ok(Mapper.Map<IEnumerable<UserCompAppDto>>(users));
        }

        [HttpGet]
        [Route("managers")]
        public async Task<IActionResult> GetManagers()
        {
            var users = await UserRepo.GetManagers();        
            return Ok(Mapper.Map<IEnumerable<UserAppDto>>(users));
        }
        
        [HttpGet]
        [Route("modellist")]
        public IActionResult GetUserModelList()
        {
            var users = UserRepo.GetUserModelList();          
            return Ok(Mapper.Map<IEnumerable<UserDto>>(users));
        }

        [HttpGet]
        [Route("manager/{id}")]
        public async Task<IActionResult> GetUsersUnderManager(int id)
        {
            var users = await UserRepo.GetUsersUnderManager(id);          
            return Ok(Mapper.Map<IEnumerable<UserAppDto>>(users));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await UserRepo.GetUser(id);
            return Ok(Mapper.Map<UserAppDto>(user));
        }

        [HttpPut]
        [Route("updateProfile/{id}")]
        public async Task<IActionResult> UpdateUserProfile(int id, UserProfileUpdateDto userProfileUpdateDto)
        {
            await UserRepo.UpdateUserProfile(id, userProfileUpdateDto);
            return Ok(
                new {
                    id,
                    userProfileUpdateDto
                }
            );    
        }
        
        [HttpPut]
        [Route("updateJob/{id}")]
        public async Task<IActionResult> UpdateUserJob(int id, UserJobUpdateDto userJobUpdateDto)
        {
            try
            {
                var user = await UserRepo.GetUser(id);
                var performance = await PerformanceRepo.GetPerformance(id);

                if(performance != null)
                {
                    if(user.JobLevel != userJobUpdateDto.JobLevel)
                    {
                        performance.LastPromotionUpdate = DateTime.Now;
                        await PerformanceRepo.SubmitUserPerformance(performance);
                    }
                    if(user.JobRole != userJobUpdateDto.JobRole)
                    {
                        performance.LastRoleUpdate = DateTime.Now;
                        await PerformanceRepo.SubmitUserPerformance(performance);
                    }
                    if(user.ManagerId != userJobUpdateDto.ManagerId)
                    {
                        performance.LastManagerUpdate = DateTime.Now;
                        await PerformanceRepo.SubmitUserPerformance(performance);
                    }
                }               
                else
                {
                    performance = new UserPerformance{
                        LastManagerUpdate = DateTime.Now,
                        LastRoleUpdate = DateTime.Now,
                        LastPromotionUpdate = DateTime.Now,
                        UserId = id
                    };
                    await PerformanceRepo.SubmitUserPerformance(performance);
                }

                await UserRepo.UpdateUserJob(id, userJobUpdateDto);
                return Ok(
                    new {
                        id,
                        userJobUpdateDto
                    }
                );    
            }
            catch(Exception)
            {
                return StatusCode(500, "Could not send feedback. Please try again later!");
            }            
        }

        [HttpPost]
        [Route("compensations/submit")]
        public async Task<IActionResult> SubmitCompensation(UserCompUpdateDto userCompDto)
        {
            try
            {
                var compensation = await UserRepo.SubmitUserCompensation(userCompDto); 
                return Created(
                    compensation.UserId.ToString(),
                    compensation
                );
            }
            catch(Exception)
            {
                return StatusCode(500, "Could not submit compensation info. Please try again later!");
            }            
        }

        [HttpGet]
        [Route("jobdes")]
        public async Task<IActionResult> GetUsersWithoutJD()
        {
            var users = await UserRepo.GetUsersJD();        
            return Ok(Mapper.Map<IEnumerable<UserCompAppDto>>(users));
        }

        [HttpGet]
        [Route("compen")]
        public async Task<IActionResult> GetUsersWithoutCompensation()
        {
            var users = await UserRepo.GetUsersWithoutComp();        
            return Ok(Mapper.Map<IEnumerable<UserCompAppDto>>(users));
        }
        
        [HttpGet]
        [Route("manager/{id}/notrated")]
        public async Task<IActionResult> GetUsersUnderManagerNotRated(int id)
        {
            var users = await UserRepo.GetUsersUnderManagerNotRated(id);          
            return Ok(Mapper.Map<IEnumerable<UserAppDto>>(users));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var user = await UserRepo.DeleteUser(id);        
            return Ok(Mapper.Map<UserCompAppDto>(user));
                       
        }
    }
    
}