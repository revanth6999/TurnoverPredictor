using Microsoft.EntityFrameworkCore;
using TurnoverPredictorAPI.Models;

namespace TurnoverPredictorAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPerformance> UserPerformances { get; set; }
        public DbSet<UserFeedback> UserFeedbacks { get; set; }
    }
}