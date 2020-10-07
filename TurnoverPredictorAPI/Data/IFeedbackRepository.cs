using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public interface IFeedbackRepository
    {
        Task<UserFeedback> SubmitFeedback(UserFeedback userFeedback);
    }
}