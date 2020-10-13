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
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DataContext Context;
        public FeedbackRepository(DataContext context)
        {
            Context = context;
        }
        public async Task<UserFeedback> SubmitFeedback(UserFeedback userFeedback)
        {                        
            try
            {
                var feedback = await Context.UserFeedbacks.Where(f => f.UserId == userFeedback.UserId).FirstOrDefaultAsync();
                if(feedback == null)
                {
                    await Context.UserFeedbacks.AddAsync(userFeedback);
                    await SaveAll();
                    return userFeedback;
                }
                
                feedback.JobSatisfaction = userFeedback.JobSatisfaction;
                feedback.EnvironmentSatisfaction = userFeedback.EnvironmentSatisfaction;
                feedback.WorkLifeBalance = userFeedback.WorkLifeBalance;
                feedback.Datetime = userFeedback.Datetime;

                await SaveAll();
                return feedback;
            }
            catch(Exception)
            {
                return null;
            }
        }

        public async Task<AverageFeedbackDto> GetAverageValues()
        {
            var avgjob = await Context.UserFeedbacks.AverageAsync(u => u.JobSatisfaction);
            var avgenv = await Context.UserFeedbacks.AverageAsync(u => u.EnvironmentSatisfaction);
            var avgwrk = await Context.UserFeedbacks.AverageAsync(u => u.WorkLifeBalance);
            avgjob = (avgjob / 4) * 100;
            avgenv = (avgenv / 4) * 100;
            avgwrk = (avgwrk / 4) * 100;
            return new AverageFeedbackDto{
                AvgJobSatis = avgjob,
                AvgEnvSatis = avgenv,
                AvgWorkLife = avgwrk
            };
        }

        public async Task<UserFeedback> GetFeedback(int id)
        {
            var feedback = await Context.UserFeedbacks.FirstOrDefaultAsync(f => f.Id == id);
            return feedback;            
        }
        
        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }
    }
}