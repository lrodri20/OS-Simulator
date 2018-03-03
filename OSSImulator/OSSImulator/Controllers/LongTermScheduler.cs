using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class LongTermScheduler
    {
        public LongTermScheduler()
        {

        }
        public void Schedule()
        {
            if(!RAM.isRAWFull())
            {
                int totalJobs = PCBManager.getJobListSize();
                for(int i=1;i<=totalJobs;i++)
                {
                    if (!PCBManager.getPCB(i).isJobInMemory() && PCBManager.getPCB(i).getProcessStatus() == PCB.PROCESS_STATUS.NEW && !RAM.isRAWFull())
                        loadJobToRAM(PCBManager.getPCB(i));
                }
            }
        }
        public void loadJobToRAM(PCB block)
        {
            int jobNo = block.getJobNumber();
            int i = 0;
            int k;
            int m = PCBManager.getPCB(jobNo).getJobInstructionCount();
            int dataCardSize = block.getInputBuffer() + block.getOutputBuffer() + block.getTemporaryBuffer();
            int memory = PCBManager.getPCB(jobNo).getJobInstructionCount() + dataCardSize;
            int numPages = (int)Math.Ceiling((double)memory / (double)RAM.getPageSize());
            int startAddress = block.getJobDiskAddress();
            int currentDiskAddress = startAddress;
            int physPageNo;
            int virtualPageNo = RAM.getNextAvaliableVirtualPageNumber();
            string[] chunk;
            List<int> virtualAllocatedPages = RAM.Allocate(numPages);
            if(virtualAllocatedPages.Capacity !=0)
            {
                Console.WriteLine(jobNo);
                PCBManager.getPCB(jobNo).setJobInMemory(true);
                PCBManager.getPCB(jobNo).setJobMemoryAddress(virtualPageNo * RAM.getPageSize());
                PCBManager.getPCB(jobNo).setProcessStatus(PCB.PROCESS_STATUS.READY);
                PCBManager.getPCB(jobNo).setPagesNeeded(numPages);
                PCBManager.getPCB(jobNo).setAllocatedVirtualPages(virtualAllocatedPages);

                int n = RAM.getNextAvaliableVirtualPageNumber();
                for(int j=0;j<virtualAllocatedPages.Capacity;j++)
                {
                    physPageNo = RAM.getPhysicalPageNumber(virtualAllocatedPages[j]);
                    chunk = Disk.getChunk(currentDiskAddress, calculateChunkSize(block, currentDiskAddress));
                    try
                    {
                        RAM.fillPage(physPageNo, chunk);
                    }
                    catch(Exception e)
                    {
                        
                    }
                    currentDiskAddress += RAM.getPageSize();
                }
                JobMetrics metrics = new JobMetrics();
                metrics.setTimestamp(DateTimeOffset.Now.ToUnixTimeMilliseconds());
                metrics.setJobNumber(jobNo);
                metrics.setStartWaitTime(metrics.getTimestamp());
                metrics.setBlocksUsed(memory);
                Driver.jobMetricses[jobNo - 1].update(metrics);
                Driver.shortTermScheduler.addToReadyQueue(PCBManager.getPCB(jobNo));
            }
        }
        private int calculateChunkSize(PCB pcb,int currentDiskAddress)
        {
            int dataCardSize = pcb.getInputBuffer() + pcb.getOutputBuffer() + pcb.getTemporaryBuffer();
            int memory = pcb.getJobInstructionCount() + dataCardSize;
            if (currentDiskAddress + RAM.getPageSize() > pcb.getJobDiskAddress() + memory)
                return (pcb.getJobDiskAddress() + memory) - currentDiskAddress;
            else
                return RAM.getPageSize();

        }














    }
}
