using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        IEnumerable<UserDto> GetUserModelList();
        Task<User> GetUser(int id);
        Task<bool> UpdateUserProfile(int userId, UserProfileUpdateDto userProfileUpdateDto);
        Task<bool> UpdateUserJob(int userId, UserJobUpdateDto userProfileUpdateDto);
        Task<IEnumerable<User>> GetUsersUnderManager(int managerId);

    }
}