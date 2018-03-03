using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
namespace OSSImulator.Controllers
{
    public class Driver
    {
        public static int NUM_CPUS = 4;
        public static int SORT_ALGORITHM = 1;
        public static int SLEEP_INTERVAL = 15;
        public static SchedulingType schedulingType;
        public static List<JobMetrics> jobMets = new List<JobMetrics>();
        public Driver()
        {
            LongTermScheduler = new LongTermScheduler();
            shortTermScheduler = new ShortTermScheduler();
        }
        public Driver(int numOFCPUs, SchedulingType schedulingType)
        {
            LongTermScheduler = new LongTermScheduler();
            shortTermScheduler = new ShortTermScheduler();
            CPUs = new CPU[numOFCPUs];
            
            for (int i = 0; i < CPUs.Length; i++)
            {
                cpuFutures = new Future<?>[numOFCPUs];
                jobsRan = new List<String>();
                isOSComplete = false;
                commands = new string[31];
            }
        }
        public static void init(int numOfCPUs, SchedulingType schedType, int sleep)
        {
            LongTermScheduler = new LongTermScheduler();
            shortTermScheduler = new ShortTermScheduler();
            schedulingType = schedType;
            CPUs = new CPU[numOfCPUs];
            CpuMetrics = new CPUMetrics[numOfCPUs];
            for (int i = 0; i < CPUs.Length; i++)
            {
                CPUs[i] = new CPU(1 + i);
            }
            for (int i = 0; i < CpuMetrics.Length; i++)
            {
                CpuMetrics[i] = new CPUMetrics(i + 1);
            }
            cpuFutures = new Future<?>[numOfCPUs];
            executorService = Executors.newFixedThreadPool(numOfCPUs);
            jobsRan = new List<string>();
            isOSComplete = false;
            commands = new String[31];
            numberOfCPUs = numOfCPUs;
            sleepTimeMs = (long)sleep;
            completedJobs = 0;
        }
        public static LongTermScheduler LongTermScheduler;
        public static ShortTermScheduler shortTermScheduler;
        public static CPU CPU;
        public static CPU[] CPUs;
        public static CPUMetrics[] CpuMetrics;
        public static JobMetrics[] jobMetricses;
        public static Future<?>[] cpuFutures;
        public static List<string> jobsRan;
        public static bool isOSComplete = false;
        public static string[] commands;
        public static int numberOfCPUs = 4;
        public static int totalWaitTime = 0;
        public static int totalRunTime = 0;
        public static int completedJobs = 0;
        public static long sleepTimeMs = 0;
        public static long osStartTime = 0;
        public static long osEndtime = 0;

        public static void run()
        {

            RAM.init();
            Disk.init();
            PCBManager.init();
            osStartTime = DateTimeOffset.Now.ToUnixTimeMilliseconds();

            Loader loader = new Loader(System.getProperty("user.dir") + "/src/ProgramFile.txt");
            loader.Start();

            jobMetricses = new JobMetrics[PCBManager.getJobListSize()];
            for (int i = 0; i < jobMetricses.Length; i++)
                jobMetricses[i] = new JobMetrics();


            string s = Disk.readDisk(2);
            System.out.println("DISK TEST: " + s);

            while (custardStands())
            {
                ready();
                aim((schedulingType != null) ? schedulingType : SchedulingType.FIFO);
                fire();
            }
            executorService.shutdown();

        }
        public static bool custardStands()
        {
            return !PCBManager.allJobsDone() && !isOSComplete;
        }
        public static void ready()
        {
            LongTermScheduler.Schedule();
        }
        public static void aim(SchedulingType type)
        {
            shortTermScheduler.Schedule(type);
        }
        public static void fire()
        {
            Dispatcher.dispatch();
            for (int i = 0; i < CPUs.Length && custardStands(); i++)
            {
                if (cpuFutures[i] != null && cpuFutures[i].isCancelled())
                {
                    Console.WriteLine("XXXXXX CANCELLED XXXXX" + i);
                    try
                    {
                        if (cpuFutures[i] != null && cpuFutures[i].isDone())
                        {
                            cpuFutures[i].get();
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("TASK FINISHED BUT EXECPTION WAS THROWN!!!>>\n" + ex.ToString());
                    }
                    if (((cpuFutures[i] == null || cpuFutures[i].isDone() || cpuFutures[i].isCancelled()) && CPUs[i].isJobLoaded() && !CPUs[i].shouldUnload()))
                    {
                        cpuFutures[i] = executorService.submit(CPUS[i]);
                        commands[CPUs[i].currentJobNumber()] += "\nRUNNING JOB:" + CPUs[i].currentJobNumber() + "\tON CPU: " + i;
                    }
                }
            }
        }
        public static bool areAllCPUsIdle()
        {
            for(int i=0;i<CPUs.Length;i++)
            {
                if(!CPUs[i].isIdle())
                {
                    return false;
                }
            }
            return true;
        }
        public static void updateCpuMetric(CPUMetrics metrics)
        {
            CpuMetrics[metrics.cpuNumber-1].update(metrics);
            //update the metrics of the CPU
        }
        public static void updateJobMetrics(JobMetrics jobMetrics)
        {
            jobMetricses[jobMetrics.getJobNumber() - 1].update(jobMetrics);
            if(jobMetricses[jobMetrics.getJobNumber()-1].getWaitTime()>0)
            {
                totalWaitTime += jobMetricses[jobMetrics.getJobNumber() - 1].getWaitTime();
            }
            if(jobMetricses[jobMetrics.getJobNumber()-1].getRunTime()>0)
            {
                totalRunTime += jobMetricses[jobMetrics.getJobNumber() - 1].getRunTime();
            }
            //update job metrics 
        }
        public static void updateOsMetric()
        {
            int jobsInProgress = numberOfBusyCpus();
            OSMetrics osMetrics = new OSMetrics(PCBManager.getJobListSize(), numberOfBusyCpus(), completedJobs, getAverageWaitTime(), getAverageRunTime());
            //update OsMetrics

        }
        public static double getAverageWaitTime()
        {
            int jobs = 0;
            int waitTime = 0;
            foreach(JobMetrics job in jobMetricses)
            {
                if(job.getWaitTime()>0)
                {
                    jobs++;
                    waitTime += job.getWaitTime();
                }
            }
            return (double) waitTime / jobs;
        }
        private static double getAverageRunTime()
        {
            int jobs = 0;
            int runtime = 0;
            foreach(JobMetrics job in jobMetricses)
            {
                if(job.getRunTime()>0)
                {
                    jobs++;
                    runtime += job.getRunTime();
                }
            }
            return (double)runtime / jobs;
        }
        private static int numberOfBusyCpus()
        {
            int count = 0;
            foreach(CPU cpu in CPUs)
            {
                if (!CPU.isIdle())
                {
                    count++;
                }
            }
            return count;
        }
        public static double calcOSRunTime()
        {
            return (double)((osEndtime - osStartTime) / 1000.0);
        }
        public static void main(String[] args)
        {
            int numberOfTimesDriverRuns = 0;
        }
    }
}
