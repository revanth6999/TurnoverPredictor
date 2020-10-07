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
    public class CompensationRepository : ICompensationRepository
    {
        private readonly DataContext Context;
        public CompensationRepository(DataContext context)
        {
            Context = context;
        }
        public async Task<UserCompensation> SubmitUserCompensation(UserCompensation userCompensation)
        {
            try
            {
                var compensation = await Context.UserCompensations.Where(c => c.UserId == userCompensation.UserId).FirstOrDefaultAsync();
                if(compensation == null)
                {
                    await Context.UserCompensations.AddAsync(userCompensation);
                    await SaveAll();
                    return userCompensation;
                }
                compensation.BusinessTravel = userCompensation.BusinessTravel;
                compensation.AnnualIncome = userCompensation.AnnualIncome;
                compensation.PercentSalaryHike = userCompensation.PercentSalaryHike;
                compensation.DailyRate = userCompensation.DailyRate;
                compensation.StockOptionLevel = userCompensation.StockOptionLevel;
                compensation.Datetime = userCompensation.Datetime;
                
                await SaveAll();
                return compensation;
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