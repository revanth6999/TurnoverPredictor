using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<IEnumerable<User>> GetManagers();
        IEnumerable<UserDto> GetUserModelList();
        // Task<IEnumerable<UserCompAppDto>> GetUsersWithCompensation();
        Task<User> GetUser(int id);
        Task<bool> UpdateUserProfile(int userId, UserProfileUpdateDto userProfileUpdateDto);
        Task<bool> UpdateUserJob(int userId, UserJobUpdateDto userProfileUpdateDto);
        Task<IEnumerable<User>> GetUsersUnderManager(int managerId);
        Task<UserCompUpdateDto> SubmitUserCompensation(UserCompUpdateDto userCompDto);
        Task<IEnumerable<User>> GetUsersJD();
        Task<IEnumerable<User>> GetUsersWithoutComp();
        Task<IEnumerable<User>> GetUsersUnderManagerNotRated(int managerId);
        Task<User> DeleteUser(int id);
    }
}