using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using TurnoverPredictorAPI.Data;
using TurnoverPredictorAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TurnoverPredictorAPI.DTOs;

namespace TurnoverPredictorAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository Repo;
        private readonly IConfiguration Config;
        private readonly IMapper Mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            Config = config;
            Repo = repo;
            Mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDto userRegistrationDto)
        {
            userRegistrationDto.Email = userRegistrationDto.Email.ToLower();

            if (await Repo.UserExists(userRegistrationDto.Email))
            {
                string error = "An account with the email already exists";
                return BadRequest(error);
            }

            var newUser = new User
            {
                FirstName = userRegistrationDto.FirstName,
                LastName = userRegistrationDto.LastName,
                Email = userRegistrationDto.Email,
                DateOfJoining = DateTime.Now              
            };

            var createdUser = await Repo.Register(newUser, userRegistrationDto.Password);

            var user = Mapper.Map<UserAppDto>(createdUser);
            
            return Created(
                user.Id.ToString(),
                user
            );        
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var storedUser = await Repo.Login(userLoginDto.Email.ToLower(), userLoginDto.Password);

            if (storedUser == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, storedUser.Id.ToString()),
                new Claim(ClaimTypes.Name, storedUser.Email.ToLower()) 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = Mapper.Map<UserAppDto>(storedUser);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });       
        }
    }
}