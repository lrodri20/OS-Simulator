using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;

namespace OSSImulator.Controllers
{
    public class PCBManager
    {
            private PCBManager() { }

            public static void init()
            {
                pcbList = new List<PCB>();
                currentSortType = PCB_SORT_TYPE.JOB_NUMBER;
            }

            private static List<PCB> pcbList = new List<PCB>();
            public enum PCB_SORT_TYPE { SHORTEST_JOB, JOB_NUMBER, JOB_PRIORITY }
            private static PCB_SORT_TYPE currentSortType = PCB_SORT_TYPE.JOB_NUMBER;
            public static int getJobListSize()
            {
                
                return pcbList.Count;
            }

            public static void insertPCB(PCB pcb)
            {
                pcbList.Add(pcb);
            }

            public static PCB getPCB(int index)
            {
                return pcbList[index-1];
            }

            public static void sortPcbList(PCB_SORT_TYPE type)
            {
                _sortPcbList(type, pcbList);
            }

            public static void sortPcbList(PCB_SORT_TYPE type, List<PCB> list)
            {
                _sortPcbList(type, list);
            }

            public static PCB_SORT_TYPE getCurrentPcbSortType() { return currentSortType; }

            public static bool allJobsDone()
            {
                int count = 0;
                
                while (count != pcbList.Count-1)
                {
                    
                    if (pcbList[count].getProcessStatus()!= PCB.PROCESS_STATUS.TERMINATE)
                        return false;
                    count++;
                }
                return true;
            }
            private static void _sortPcbList(PCB_SORT_TYPE type, List<PCB> list)
            {
                switch (type)
                {
                    case PCB_SORT_TYPE.JOB_NUMBER:
                        list.Sort(delegate (PCB o1, PCB o2)
                        {
                            int o1Job = o1.getJobNumber();
                            int o2Job = o2.getJobNumber();
                            return o1Job.CompareTo(o2Job);
                        });
                        break;

                    case  PCB_SORT_TYPE.JOB_PRIORITY:
                        list.Sort(delegate (PCB o1, PCB o2)
                        {
                            int o1Pri = o1.getJobPriority();
                            int o2Pri = o2.getJobPriority();
                            return o1Pri.CompareTo(o2Pri);
                        }); 
                        break;

                    case PCB_SORT_TYPE.SHORTEST_JOB:
                        list.Sort(delegate (PCB o1, PCB o2)
                        {
                            int o1Inst = o1.getJobInstructionCount();
                            int o2Inst = o2.getJobInstructionCount();
                            return o1Inst.CompareTo(o2Inst);
                        });
                        break;
        }


}

















    }
}
