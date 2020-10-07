using System;
using System.Globalization;

namespace TurnoverPredictorAPI.Services
{
    public class DateTimeHandler
    {
        public static int CalculateYears(DateTime start, DateTime end)
        {
            TimeSpan timeSpan = end - start;
            return Convert.ToInt32(timeSpan.Days / 365);
        }
        public static int CalculateYears(DateTime start)
        {
            TimeSpan timeSpan = DateTime.Now - start;
            return Convert.ToInt32(timeSpan.Days / 365);
        }
    }
}