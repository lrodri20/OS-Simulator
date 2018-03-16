using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class PCB
    {
        private int jobNumber;
        private int jobPriority;
        private int jobDiskAddress;
        private int jobMemoryAddress;
        private int jobInstructionCount;
        private int dataDiskAddress;
        private int dataMemoryAddress;
        private int pageTableStartingIndex;
        private int pagesNeeded;
        private List<int> allocatedVirtualPages;
        private int inputBuffer;
        private int outputBuffer;
        private int temporaryBuffer;
        private bool IObound;
        private string instruction;
        private bool jobInMemory;
        private bool hasJobRan;
        private PROCESS_STATUS processStatus;
        private int[] registers;
        private int programCounter;
        private string[] cache;
        private int cacheSize;
        public enum PROCESS_STATUS { NEW, READY, WAIT, RUN, TERMINATE };

        public int getCacheSize()
        {
            return cacheSize;
        }
        public void setCacheSize(int cacheSize)
        {
            this.cacheSize = cacheSize;
        }
        public string [] getCache()
        {
            return cache;
        }
        public void setCache(string[]cache)
        {
            this.cache = cache;
        }
        public int getProgramCounter()
        {
            return programCounter;
        }
        public void setProgramCounter(int num)
        {
            programCounter = num;
        }
        public void setRegisters(int[]reg)
        {
            registers = reg;
        }
        public int[] getRegisters()
        {
            return registers;
        }
        public PROCESS_STATUS getProcessStatus()
        {
            return processStatus;
        }
        public void setProcessStatus(PROCESS_STATUS processStatus)
        {
            this.processStatus = processStatus;
        }
        public bool isHasJobRan()
        {
            return hasJobRan;
        }
        public void setHasJobRan(bool hasJobRan)
        {
            this.hasJobRan = hasJobRan;
        }
        public bool isJobInMemory()
        {
            return jobInMemory;
        }
        public void setJobInMemory(bool jobInMemory)
        {
            this.jobInMemory = jobInMemory;
        }
        public string getInstruction()
        {
            return instruction;
        }
        public void setInstruction(string instruction)
        {
            this.instruction = instruction;
        }
        public bool isIObound()
        {
            return IObound;
        }
        public void setIObound(bool IObound)
        {
            this.IObound = IObound;
        }
        public int getTemporaryBuffer()
        {
            return temporaryBuffer;
        }
        public void setTemporaryBuffer(int temporaryBuffer)
        {
            this.temporaryBuffer = temporaryBuffer;
        }
        public int getOutputBuffer()
        {
            return outputBuffer;
        }
        public void setOutputBuffer(int outputBuffer)
        {
            this.outputBuffer = outputBuffer; 
        }
        public int getInputBuffer()
        {
            return inputBuffer;
        }
        public void setInputBuffer(int inputBuffer)
        {
            this.inputBuffer = inputBuffer;
        }
        public int getDataMemoryAddress()
        {
            return dataMemoryAddress;
        }
        public void setDataMemoryAddress(int dataMemoryAddress)
        {
            this.dataMemoryAddress = dataMemoryAddress;
        }
        public int getDataDiskAddress()
        {
            return dataDiskAddress;
        }
        public void setDataDiskAddress(int dataDiskAddress)
        {
            this.dataDiskAddress = dataDiskAddress;
        }
        public int getJobInstructionCount()
        {
            return jobInstructionCount;
        }
        public void setJobinstructionCount(int jobInstructionCount)
        {
            this.jobInstructionCount = jobInstructionCount;
        }
        public int getJobMemoryAddress()
        {
            return jobMemoryAddress;
        }
        public void setJobMemoryAddress(int jobMemoryAddress)
        {
            this.jobMemoryAddress = jobMemoryAddress;
        }
        public int getJobDiskAddress()
        {
            return jobDiskAddress;
        }
        public void setJobDiskAddres(int jobDiskAddress)
        {
            this.jobDiskAddress = jobDiskAddress;
        }
        public int getJobPriority()
        {
            return jobPriority;
        }
        public void setJobPriority(int jobPriority)
        {
            this.jobPriority = jobPriority;
        }
        public int getJobNumber()
        {
            return jobNumber;
        }
        public void setJobNumber(int jobNumber)
        {
            this.jobNumber = jobNumber;
        }
        public int getPageTableStartingIndex()
        {
            return pageTableStartingIndex;
        }
        public void setPageTableStartingIndex(int pageTableStartingIndex)
        {
            this.pageTableStartingIndex = pageTableStartingIndex;
        }
        public int getPagesNeeded()
        {
            return pagesNeeded;
        }
        public void setPagesNeeded(int pagesNeeded)
        {
            this.pagesNeeded = pagesNeeded;
        }
        public List<int> getAllocatedVirtualPages()
        {
            return allocatedVirtualPages;
        }
        public void setAllocatedVirtualPages(List<int>allocatedVirtualPages)
        {
            this.allocatedVirtualPages = allocatedVirtualPages;
        }
        public PCB(int jobNum,int jobPri,int jobInstrCount,int jobDiskAdd)
        {
            jobNumber = jobNum;
            jobPriority = jobPri;
            jobDiskAddress = jobDiskAdd;
            jobInstructionCount = jobInstrCount;
            jobInMemory = false;
            registers = new int[16];
            Array.Fill(registers, 0);
            processStatus = PROCESS_STATUS.NEW;
        }
    }
}
