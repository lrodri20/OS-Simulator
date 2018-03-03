using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class MMU
    {
        static int nextEmptyDiskSlot = 0;
        static int nextEmptyRamSlot = 0;
        int ram = 1024;
        int disk = 4096;
        int page_num;
        public static string read(int virtualAddress)
        {
            int virtualPageNum = getVirtualPageNumber(virtualAddress);
            int offset = getOffset(virtualAddress);
            return readFromPhysical(getPhysicalPageNumber(virtualPageNum), offset);
        }
        public static void write(int virtualAddress, string value)
        {
            int virtualPageNum = getVirtualPageNumber(virtualAddress);
            int offset = getOffset(virtualAddress);
            writeToPhysical(getPhysicalPageNumber(virtualPageNum), offset, value);
        }
        public static void writeToPhysical(int physicalPageNumber,int offset, string value)
        {
            RAM.writeRam(physicalPageNumber, offset, value);
        }
        public static string readFromPhysical(int physicalPageNumber,int offset)
        {
            return RAM.readRam(physicalPageNumber, offset);
        }
        public static int getVirtualPageNumber(int virtualAddress)
        {
            return virtualAddress / RAM.getPageSize();
        }
        public static int getOffset(int virtualAddress)
        {
            return virtualAddress % RAM.getPageSize();
        }
        public static int getPhysicalPageNumber(int virtualPageNumber)
        {
            return RAM.getPhysicalPageNumber(virtualPageNumber);
        }
        public static void synchronizeCache(PCB job)
        {
            int cacheSize = job.getCacheSize();
            int startDiskAddress = job.getJobDiskAddress();
            int currentDiskAddress = startDiskAddress;
            int currentMemoryAddress = job.getJobMemoryAddress();
            for (int i = 0; currentDiskAddress < startDiskAddress + cacheSize; i++)
            {
                int virtualPage = job.getAllocatedVirtualPages()[i / RAM.getPageSize()];
                int virtualPageTimesSize = virtualPage * RAM.getPageSize();
                int finalAdd = virtualPageTimesSize + i % RAM.getPageSize();
                write(job.getAllocatedVirtualPages()[i / RAM.getPageSize()] * RAM.getPageSize() + i % RAM.getPageSize(), job.getCache()[i]);
                Disk.writeDisk(job.getCache()[i], currentDiskAddress);
                currentDiskAddress++;
                currentMemoryAddress++;
            }
        }



    }
}
