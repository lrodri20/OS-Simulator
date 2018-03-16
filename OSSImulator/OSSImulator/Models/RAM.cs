using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class RAM
    {
        private RAM()
        {
            _memBlock = new Page[1024 / PAGE_SIZE];
            _currentIndex = 0;
            _pageTable = new int[1024 / PAGE_SIZE];
            Array.Fill(_pageTable, -1);
        }
        public static void init()
        {
            _memBlock = new Page[1024 / PAGE_SIZE];
            _currentIndex = 0;
            _pageTable = new int[1024 / PAGE_SIZE];
            for(int i=0;i<_pageTable.Length;i++)
            {
                _pageTable[i] = -1;
            }
        }
        private const int PAGE_SIZE = 64;
        public static Page [] _memBlock;
        private static int _currentIndex = 0;
        private static int[] _pageTable;
        public static void addEntryToPageTable(int index, int entry)
        {
            _pageTable[index] = entry;
        }
        public static int getPhysicalPageNumber(int virtualPagerNumber)
        {
            if(virtualPagerNumber> _pageTable.Length)
            {
                Console.WriteLine("Virtual page is greater than pageTable Length. Out of bonds exception");
            }
            return _pageTable[virtualPagerNumber];
        }
        public static void writeRam(int pageNumber,int offset,string value)
        {
            _memBlock[pageNumber].writeToPage(offset, value);
        }
        public static string readRam(int pageNumber,int offset)
        {
            return _memBlock[pageNumber].getData(offset);
        }
        public static int getPageSize()
        {
            return PAGE_SIZE;
        }
        public static int getNextAvaliableVirtualPageNumber()
        {
            int index = 0;
            for(int i=0;i<_pageTable.Length;i++)
            {
                if(_pageTable[i]==-1)
                {
                    index = i;
                    break;
                }

            }
            return index;
        }
        public static bool isRAWFull()
        {
            for(int i=0;i<_pageTable.Length;i++)
            {
                if (_pageTable[i] == -1)
                    return false;
            }
            return true;
        }
        public static bool isNumPagesAvailable(int num)
        {
            int freepages = 0;
            for(int i=0;i<_pageTable.Length;i++)
            {
                if(_pageTable[i]==-1)
                {
                    freepages++;
                }
            }
            return freepages>=num;
        }
        public static List<int> Allocate(int pagesNeeded)
        {
            List<int> pages = new List<int>();
            int pagesAllocated = 0;
            if(!isNumPagesAvailable(pagesNeeded))
            {
                return pages;
            }
            for(int i=0;i<_pageTable.Length && pages.Capacity < pagesNeeded;i++)
            {
                if(_pageTable[i]==-1)
                {
                    pages.Add(i);
                }
            }
            for(int i=0;i<_memBlock.Length && pagesAllocated < pagesNeeded; i++)
            {
                if(_memBlock[i]==null)
                {
                    _pageTable[pages[pagesAllocated]] = i;
                    pagesAllocated++;
                }
            }
            return pages;
        }
        public static void deallocatePcb(PCB pcb)
        {
            if (pcb.getProcessStatus() == PCB.PROCESS_STATUS.TERMINATE)
            {
                int startingVirtualPageNum = Helpers.getPageNumberFromAddress(pcb.getJobMemoryAddress());
                for (int i = 0; i < pcb.getAllocatedVirtualPages().Capacity; i++)
                {
                    int virtualPageNum = pcb.getAllocatedVirtualPages()[i];
                    int physicalPageNum = _pageTable[virtualPageNum];
                    _memBlock[physicalPageNum] = null;
                    _pageTable[virtualPageNum] = -1;
                }
            }
        }
        public static void fillPage(int pageNum, string[] data)
        {
            int i = 0;
            _memBlock[pageNum] = new Page(RAM.getPageSize());
            while(!_memBlock[pageNum].isFull() && i<data.Length)
            {
                _memBlock[pageNum].addToPage(data[i]);
                i++;
            }
            if(i<data.Length)
            {
                Console.WriteLine("page size mismatch");
            }
        }

    }
    class pageTableEntry
    {
        pageTableEntry(int physPageNum)
        {
            PhysicalPageNum = physPageNum;
        }
        public int PhysicalPageNum;
        public bool isDirty;

    }
}
