using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
namespace OSSImulator.Controllers
{
    public class Dispatcher
    {
        public static void dispatch()
        {
            terminateJobs();
            loadJobs();
            if(Driver.shortTermScheduler.readyQueue.Capacity == 0 && Driver.areAllCPUsIdle())
            {
                terminateJobs();
                Console.WriteLine("There are no errors");
                Console.WriteLine("OS finished successfully");
                Driver.isOSComplete = true;
                Driver.osEndtime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
                //Signal os finish
            }

        }
        public static void terminateJobs()
        {
            for(int i=0;i<Driver.CPUs.Length;i++)
            {
                int currentJobNumber = Driver.CPUs[i].currentJobNumber();
                try
                {
                    if(Driver.CPUs[i].isIdle() &&Driver.CPUs[i].shouldTerminate())
                    {
                        Console.WriteLine(String.Format("TERMINATING" + currentJobNumber + ":is idle:{0} shouldTerminate:{1} cpu loaded:{2} shouldUnload:{3}", Driver.CPUs[i].isIdle(), Driver.CPUs[i].shouldTerminate(), Driver.CPUs[i].isJobLoaded(), Driver.CPUs[i].shouldUnload()));
                        Console.WriteLine("Terminating Job"+currentJobNumber+"ON CPU:"+i);
                        Driver.commands[currentJobNumber] += "TERMINATING JOB" + currentJobNumber + "ON CPU: " + i;
                        Driver.CPUs[i].unload(PCBManager.getPCB(currentJobNumber));
                        MMU.synchronizeCache(PCBManager.getPCB(currentJobNumber));
                        RAM.deallocatePcb(PCBManager.getPCB(currentJobNumber));
                        Console.WriteLine(string.Format("TERMINATED" + currentJobNumber + ":is idle:%s shouldTerminate:%s cpu loaded:%s shouldUnload:%s", Driver.CPUs[i].isIdle(), Driver.CPUs[i].shouldTerminate(), Driver.CPUs[i].isJobLoaded(), Driver.CPUs[i].shouldUnload()));
                        if (PCBManager.getPCB(currentJobNumber).getProcessStatus() == PCB.PROCESS_STATUS.TERMINATE)
                            Driver.completedJobs++;
                        Driver.updateOsMetric();
                    }
                }
                catch(IndexOutOfRangeException ex)
                {
                    throw new IndexOutOfRangeException("Exception Terminating Job" + currentJobNumber + "On CPU:" + i + " " + ex.ToString());


                }
            }
        }
        public static void loadJobs()
        {
            for(int i=0;i<Driver.CPUs.Length;i++)
            {
                if (Driver.CPUs[i].isIdle() && Driver.shortTermScheduler.readyQueue.Capacity>0)
                {
                    PCB pcb = Driver.shortTermScheduler.readyQueue[0];
                    Driver.shortTermScheduler.readyQueue.RemoveAt(0);
                    if(Driver.CPUs[i].shouldUnload())
                    {
                        Console.WriteLine(string.Format("Job:%sCPU:%sTrapped!", Driver.CPUs[i].currentJobNumber(), i));
                        terminateJobs();
                    }
                    Driver.jobMetricses[pcb.getJobNumber() - 1].setTimestamp(DateTimeOffset.Now.ToUnixTimeMilliseconds());
                    Driver.jobMetricses[pcb.getJobNumber() - 1].setJobNumber(pcb.getJobNumber());
                    Driver.jobMetricses[pcb.getJobNumber() - 1].setEndWaitTime(DateTimeOffset.Now.ToUnixTimeMilliseconds());
                    Driver.jobMetricses[pcb.getJobNumber() - 1].setCpuNo(i + 1);
                    Driver.updateJobMetrics(Driver.jobMetricses[pcb.getJobNumber() - 1]);
                    Driver.commands[pcb.getJobNumber()] += "loading job:" + pcb.getJobNumber() + "cpu:" + i;
                    Driver.CPUs[i].load(pcb);

                }
            }
        }
    }
}
