using System.Collections.Generic;
using System.Threading.Tasks;
using TurnoverPredictorAPI.Models;
using TurnoverPredictorAPI.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System;
using TurnoverPredictorAPI.Services;

namespace TurnoverPredictorAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext Context;
        private readonly IMapper Mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }
        public IEnumerable<UserDto> GetUserModelList()
        {
            var users = (
                from u in Context.Users
                 join p in Context.UserPerformances on u.Id equals p.UserId
                 join f in Context.UserFeedbacks on p.UserId equals f.UserId
                 select new UserDto {
                    Age = DateTimeHandler.CalculateYears(u.DateOfBirth),
                    BusinessTravel = u.BusinessTravel,
                    Department = u.Department,
                    DistanceFromHome = u.DistanceFromHome,
                    Education = u.Education,
                    EducationField = u.EducationField,
                    Gender = u.Gender,
                    EnvironmentSatisfaction = f.EnvironmentSatisfaction,
                    JobInvolvement = p.JobInvolvement,
                    JobLevel = u.JobLevel,
                    JobRole = u.JobRole,
                    JobSatisfaction = f.JobSatisfaction,
                    MaritalStatus = u.MaritalStatus,
                    AnnualIncome = u.AnnualIncome,
                    NumCompaniesWorked = u.NumCompaniesWorked,
                    OverTime = p.OverTime,
                    PercentSalaryHike = u.PercentSalaryHike,
                    PerformanceRating = p.PerformanceRating,
                    StockOptionLevel = u.StockOptionLevel,
                    TotalWorkingYears = u.TotalWorkingYears,
                    TrainingTimesLastYear = p.TrainingTimesLastYear,
                    WorkLifeBalance = f.WorkLifeBalance,
                    YearsAtCompany = DateTimeHandler.CalculateYears(u.DateOfJoining),
                    YearsInCurrentRole = DateTimeHandler.CalculateYears(p.LastRoleUpdate),
                    YearsSinceLastPromotion = DateTimeHandler.CalculateYears(p.LastPromotionUpdate),
                    YearsWithCurrManager = DateTimeHandler.CalculateYears(p.LastManagerUpdate)
                 }
            );            
            return users;
        }

        // public async Task<IEnumerable<User>> GetUsersWithCompensation()
        // {
        //     var users = await Context.Users.ToListAsync();
        //     return users;
        // }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await Context.Users.ToListAsync();
            return users;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
        public async Task<IEnumerable<User>> GetUsersUnderManager(int managerId)
        {
            var users = await Context.Users.Where(u => u.ManagerId == managerId).ToListAsync();
            return users;
        }
        public async Task<bool> UpdateUserProfile(int userId, UserProfileUpdateDto userProfileUpdateDto)
        {
            try
            {
                var user = await Context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
                
                user.DateOfBirth = userProfileUpdateDto.DateOfBirth;
                user.DistanceFromHome = userProfileUpdateDto.DistanceFromHome;
                user.Education = userProfileUpdateDto.Education;
                user.EducationField = userProfileUpdateDto.EducationField;
                user.Gender = userProfileUpdateDto.Gender;
                user.MaritalStatus = userProfileUpdateDto.MaritalStatus;
                user.NumCompaniesWorked = userProfileUpdateDto.NumCompaniesWorked;
                user.TotalWorkingYears = userProfileUpdateDto.TotalWorkingYears;

                await SaveAll();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
        public async Task<bool> UpdateUserJob(int userId, UserJobUpdateDto userJobUpdateDto)
        {
            try
            {
                var user = await Context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();

                user.JobRole = userJobUpdateDto.JobRole;
                user.JobLevel = userJobUpdateDto.JobLevel;
                user.Department = userJobUpdateDto.Department;
                user.ManagerId = userJobUpdateDto.ManagerId;
                
                await SaveAll();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<UserCompUpdateDto> SubmitUserCompensation(UserCompUpdateDto userCompDto)
        {
            try
            {
                var compensation = await Context.Users.Where(u => u.Id == userCompDto.UserId).FirstOrDefaultAsync();
                if(compensation == null)
                {
                    await Context.Users.AddAsync(compensation);
                    await SaveAll();
                    return Mapper.Map<UserCompUpdateDto>(compensation);
                }
                compensation.BusinessTravel = userCompDto.BusinessTravel;
                compensation.AnnualIncome = userCompDto.AnnualIncome;
                compensation.PercentSalaryHike = userCompDto.PercentSalaryHike;
                compensation.StockOptionLevel = userCompDto.StockOptionLevel;
                
                await SaveAll();
                return Mapper.Map<UserCompUpdateDto>(compensation);
            }
            catch(Exception)
            {
                return null;
            }
        }

        public async Task<IEnumerable<User>> GetManagers()
        {
            var users = await Context.Users.Where(u => u.JobRole.Equals("Manager")).ToListAsync();
            return users;
        }

        public async Task<IEnumerable<User>> GetUsersJD()
        {
            var users = await Context.Users.Where(p => p.JobRole == null).ToListAsync();
            return users;
        }
        public async Task<IEnumerable<User>> GetUsersWithoutComp()
        {
            var users = await Context.Users.Where(p => p.AnnualIncome == 0).ToListAsync();
            return users;
        }
        public async Task<IEnumerable<User>> GetUsersUnderManagerNotRated(int managerId)
        {
            var users = await (from u in Context.Users join p in Context.UserPerformances on u.Id equals p.UserId
                         where u.ManagerId == managerId && p.PerformanceRating == 0
                         select u).ToListAsync();
            
            return users;
        }

        public async Task<User> DeleteUser(int id)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.Id == id);
            Context.Users.Remove(user);

            var userPerformance = await Context.UserPerformances.FirstOrDefaultAsync(u => u.UserId == id);
            if(userPerformance != null)
            {
                Context.UserPerformances.Remove(userPerformance);
            }

            var userFeedback = await Context.UserFeedbacks.FirstOrDefaultAsync(u => u.UserId == id);
            if(userFeedback != null)
            {
                Context.UserFeedbacks.Remove(userFeedback);
            }

            await Context.SaveChangesAsync();

            return user;
        }
    }
}