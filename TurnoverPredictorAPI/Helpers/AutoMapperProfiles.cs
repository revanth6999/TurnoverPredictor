using System.Linq;
using AutoMapper;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserAppDto>();
            CreateMap<User, UserCompUpdateDto>();
            CreateMap<User, UserCompAppDto>();
        }
    }
}