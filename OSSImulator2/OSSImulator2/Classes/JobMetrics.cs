using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class JobMetrics
    {
        private int jobNumber = -1;
        private int blockUsed = 0;
        private int cpuNo = -1;
        private int waitTime = 0;
        private int runTime = 0;
        private long timeStamp = 0;
        public long startRunTime = 0;
        public long endRunTime = 0;
        public long startWaitTime = 0;
        public long endWaitTime = 0;
        public int ios = 0; 
        public JobMetrics()
        {
            jobNumber = -1;
            cpuNo = -1;
        }
        public int getJobNumber()
        {
            return jobNumber;
        }
        public void setJobNumber(int jobNumber)
        {
            this.jobNumber = jobNumber;
        }
        public int getBlockUsed()
        {
            return blockUsed;
        }
        public void setBlockUsed(int blockUsed)
        {
            this.blockUsed = blockUsed;
        }
        public int getCpuNo()
        {
            return cpuNo;
        }
        public void setCpuNo(int cpuNo)
        {
            this.cpuNo = cpuNo;
        }
        public int getWaitTime()
        {
            if(getEndWaitTime() ==0)
            {
                return 0;
            }
            return (int)(getEndWaitTime() - getStartWaitTime());
        }
        public void setWaitTime(int waitTime)
        {
            this.waitTime = waitTime;
        }
        public int getRunTime()
        {
            if(getRunTime() == 0)
            {
                return 0;
            }
            return (int)(getEndRunTime() - getStartRunTime());

        }
        public void setRunTime(int runTime)
        {
            this.runTime = runTime;
        }
        public long getEndWaitTime()
        {
            return endWaitTime;
        }
        public void setStartWaitTime(long startWaitTime)
        {
            this.startWaitTime = startWaitTime;
        }
        public void setEndWaitTime(long endWaitTime)
        {
            this.endWaitTime = endWaitTime;
        }
        public long getStartWaitTime()
        {
            return startWaitTime;
        }
        public long getEndRunTime()
        {
            return endRunTime;
        }
        public void setEndRunTime(long endRunTime)
        {
            this.endRunTime = endRunTime;
        }
        public long getStartRunTime()
        {
            return startRunTime;
        }
        public void setStartRunTime(long startRunTime)
        {
            this.startRunTime = startRunTime;
        }
        public long getTimestamp()
        {
            return timeStamp;
        }
        public void setTimestamp(long timestamp)
        {
            this.timeStamp = timestamp;
        }
        public void setIos(int ios)
        {
            this.ios = ios;
        }
        public int getIos()
        {
            return ios;
        }
        public void update(JobMetrics metrics)
        {
            setBlockUsed(metrics.getBlockUsed());
            setTimestamp(metrics.getTimestamp());
            setCpuNo(metrics.getCpuNo());
            setEndRunTime(metrics.getEndRunTime());
            setStartRunTime(metrics.getStartRunTime());
            setStartWaitTime(metrics.getStartWaitTime());
            setEndWaitTime(metrics.getEndWaitTime());
            setJobNumber(metrics.getJobNumber());
            setIos(metrics.getIos());
        }
        public Object getColumn(int col)
        {
            switch(col)
            {
                case 0:
                    return getTimestamp();
                case 1:
                    return getJobNumber();
                case 2:
                    return getCpuNo();
                case 3:
                    return getWaitTime();
                case 4:
                    return getRunTime();
                case 5:
                    return getBlockUsed();
                case 6:
                    return getIos();
            }
            return getJobNumber();
        }
    }
}
