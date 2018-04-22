using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class OSMetrics
    {
        int totalJobs = 0;
        int jobsInProgress = 0;
        int jobsCompleted = 0;
        double averageWaitTime = 0;
        double averageRunTime = 0;
        public OSMetrics(int totalJobs, int jobsInProgress,int jobsCompleted,double averageWaitTime,double averageRunTime)
        {
            this.totalJobs = totalJobs;
            this.jobsInProgress = jobsInProgress;
            this.jobsCompleted = jobsCompleted;
            this.averageWaitTime = averageWaitTime;
            this.averageRunTime = averageRunTime;
        }
        public int getTotalJobs()
        {
            return totalJobs;
        }
        public void setTotalJobs(int totalJobs)
        {
            this.totalJobs = totalJobs;
        }
        public int getJobsInProgress()
        {
            return jobsInProgress;
        }
        public void setJobsInProgress(int jobsInProgress)
        {
            this.jobsInProgress = jobsInProgress;
        }
        public int getJobsCompleted()
        {
            return jobsCompleted;
        }
        public void setJobsCompleted(int jobsCompleted)
        {
            this.jobsCompleted = jobsCompleted;
        }
        public double getAverageWaitTime()
        {
            return averageWaitTime;
        }
        public void setAverageWaitTime(int averageWaitTime)
        {
            this.averageWaitTime = averageWaitTime;
        }
        public double getAverageRunTime()
        {
            return averageRunTime;
        }
        public void setAverageRunTime(int averageRunTime)
        {
            this.averageRunTime = averageRunTime;
        }
    }
}
