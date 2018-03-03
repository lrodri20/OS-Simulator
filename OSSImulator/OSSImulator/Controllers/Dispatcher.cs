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
            if(Driver.shortTermScheduler.readyQueue.size() == 0 && Driver.areAllCPUsIdle())
            {
                terminateJobs();
                Console.WriteLine("There are no errors");
                Console.WriteLine("OS finished successfully");
                Driver.executeService.shutdown();
                Driver.isOSComplete = true;
                Driver.osEndTime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
                void Run()
                {
                    MainFrame.signalOSFinish();
                }
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
                        Driver.
                    }
                }
            }
            


        }







    }
}
