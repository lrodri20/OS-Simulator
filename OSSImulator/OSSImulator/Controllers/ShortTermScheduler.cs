using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class ShortTermScheduler
    {
        public LinkedList<PCB> readyQueue;
        public PCB block;
        public bool ready = false;
        PCBManager.PCB_SORT_TYPE sortType;

        public ShortTermScheduler()
        {
            readyQueue = new LinkedList<PCB>();
        }
        public void PrioSchedule()
        {
            int totalJobs = 0;
            if(PCBManager.getCurrentPcbSortType() != PCBManager.PCB_SORT_TYPE.JOB_PRIORITY)
            {
                PCBManager.sortPcbList(PCBManager.PCB_SORT_TYPE.JOB_PRIORITY);
            }
            for(int i=1;i<totalJobs+1;i++)
            {
                readyQueue.AddFirst(PCBManager.getPCB(i));
            }
            sortType = PCBManager.PCB_SORT_TYPE.JOB_PRIORITY;
        }
        public void FIFOSChedule()
        {
            int totalJobs = PCBManager.getJobListSize();
            if (PCBManager.getCurrentPcbSortType() != PCBManager.PCB_SORT_TYPE.JOB_NUMBER) ;
            {
                PCBManager.sortPcbList(PCBManager.PCB_SORT_TYPE.JOB_NUMBER);
            }
            if (readyQueue.Count() == 0)
            {
                readyQueue.Clear();
            }
            for (int i = 1; i < totalJobs + 1; i++)
            {
                readyQueue.AddLast(PCBManager.getPCB(i));
            }
            sortType = PCBManager.PCB_SORT_TYPE.JOB_NUMBER;
        }
        public void Schedule(SchedulingType type)
        {
            PCBManager.PCB_SORT_TYPE sort_type = PCBManager.PCB_SORT_TYPE.JOB_NUMBER;
            switch (type)
            {
                case 1:
                    sort_type = PCBManager.PCB_SORT_TYPE.JOB_PRIORITY;
                    break;
                case 2:


                case 3:




            }




        }
    }
}
