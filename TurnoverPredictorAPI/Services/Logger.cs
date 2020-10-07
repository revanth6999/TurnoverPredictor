using System;
using System.IO;

namespace TurnoverPredictorAPI.Services
{
    public class Logger : ILogger
    {        
        public void log(string message, string path)
        {
            using (StreamWriter streamWriter = File.AppendText(path))
            {
                String timeStamp = DateTime.Now.ToShortDateString() + " "  + DateTime.Now.ToLongTimeString();
                streamWriter.WriteLine(timeStamp + message);                
            }
        }
    }
}