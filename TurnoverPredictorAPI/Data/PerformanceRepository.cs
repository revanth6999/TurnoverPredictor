using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.Models;
using TurnoverPredictorAPI.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System;

namespace TurnoverPredictorAPI.Data
{
    public class PerformanceRepository : IPerformanceRepository
    {
        private readonly DataContext Context;
        public PerformanceRepository(DataContext context)
        {
            Context = context;
        }
        public async Task<UserPerformance> GetPerformance(int userId)
        {
            var performance = await Context.UserPerformances.FirstOrDefaultAsync(p => p.UserId == userId);
            return performance;
        }
        public async Task<UserPerformance> SubmitUserPerformance(UserPerformance userPerformance)
        {
            try
            {
                var performance = await Context.UserPerformances.Where(p => p.UserId == userPerformance.UserId).FirstOrDefaultAsync();
                if(performance == null)
                {
                    await Context.UserPerformances.AddAsync(userPerformance);
                    await SaveAll();
                    return userPerformance;
                }

                performance.PerformanceRating = userPerformance.PerformanceRating;
                performance.OverTime = userPerformance.OverTime;
                performance.JobInvolvement = userPerformance.JobInvolvement;
                performance.TrainingTimesLastYear = userPerformance.TrainingTimesLastYear;
                // performance.ManagerId = userPerformance.ManagerId;
                performance.Datetime = userPerformance.Datetime;
                // performance.LastManagerUpdate = userPerformance.LastManagerUpdate;
                // performance.LastPromotionUpdate = userPerformance.LastPromotionUpdate;
                // performance.LastRoleUpdate = userPerformance.LastRoleUpdate;

                await SaveAll();
                return performance;
            }
            catch(Exception)
            {
                return null;
            }
        }
        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }
    }
}