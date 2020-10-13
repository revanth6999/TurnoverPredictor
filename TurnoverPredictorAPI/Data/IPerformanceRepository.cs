using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.DTOs;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public interface IPerformanceRepository
    {
        Task<UserPerformance> GetPerformance(int userId);
        Task<UserPerformance> SubmitUserPerformance(UserPerformance userPerformance);
        Task<AveragePerformanceDto> GetAverageValues();
    }
}