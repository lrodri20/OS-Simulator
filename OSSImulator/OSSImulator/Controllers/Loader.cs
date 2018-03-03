using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
namespace OSSImulator.Controllers
{
    public class Loader
    {
        public Loader(string path)
        {
            programFilePath = path;
            try
            {
                fileReader = new StreamReader(path);
                


            }
            catch(IOException ex)
            {




            }

        }
        public StreamReader fileReader;
        public string programFilePath;
        public bool loadingComplete = false;

        const int JOB_NUM_POS = 2;
        const int JOB_INSTR_COUNTR_POS = 3;
        const int JOB_PRIORITY_POS = 4;

        const int DATA_IN_BUFF_POS = 2;
        const int DATA_OUT_BUFF_POS = 3;
        const int DATA_TEMP_BUFF_POS = 4;

        public void Start()
        {
            string line = "";
            int currentIndex = 0;
            int currentJob = 0;
            string[] splitLine;
            PCB pcb;
            while(!loadingComplete)
            {
                line = fileReader.ReadLine();
                if(line!=null)
                {
                    if(line.Contains("JOB"))
                    {
                        splitLine = line.Split("\\s+");
                        currentJob = Convert.ToInt32(splitLine[JOB_NUM_POS], 16);
                        PCBManager.insertPCB(new PCB(currentJob, Convert.ToInt32(splitLine[JOB_PRIORITY_POS], 16), Convert.ToInt32(splitLine[JOB_INSTR_COUNTR_POS], 16), currentIndex));
                    }
                    else if(line.Contains("Data"))
                    {
                        splitLine = line.Split("\\s+");
                        if (PCBManager.getCurrentPcbSortType() != PCBManager.PCB_SORT_TYPE.JOB_NUMBER)
                            PCBManager.sortPcbList(PCBManager.PCB_SORT_TYPE.JOB_NUMBER);
                        PCB currentPCB = PCBManager.getPCB(currentJob);
                        currentPCB.setDataDiskAddress(currentIndex);
                        currentPCB.setInputBuffer(Convert.ToInt32(splitLine[DATA_IN_BUFF_POS], 16));
                        currentPCB.setOutputBuffer(Convert.ToInt32(splitLine[DATA_OUT_BUFF_POS], 16));
                        currentPCB.setTemporaryBuffer(Convert.ToInt32(splitLine[DATA_TEMP_BUFF_POS], 16));
                    }
                    else if(line.Contains("END"))
                    {

                    }
                    else
                    {
                        Disk.writeDisk(line, currentIndex);
                        currentIndex++;

                    }

                }
                else
                {
                    loadingComplete = true;
                }


            }



        }











    }
}
