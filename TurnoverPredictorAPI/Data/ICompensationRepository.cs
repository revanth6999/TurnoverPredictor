using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public interface ICompensationRepository
    {
        Task<UserCompensation> SubmitUserCompensation(UserCompensation userCompensation);
    }
}