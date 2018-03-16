using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class Page
    {
        public string[] array;
        public int size;
        public int job;
        public int nextSlot = 0;
        public Page(int psize, int jobNo)
        {
            array = new string[psize];
            size = psize;
            job = jobNo;
        }
        public Page(int psize)
        {
            array = new string[psize];
            size = psize;
        }
        public bool isFull()
        {
            if (nextSlot >= size)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public void addToPage(string data)
        {
            if (!isFull())
            {
                array[nextSlot] = data;
                nextSlot++;
            }
        }
        public int getPageSize()
        {
            return size;
        }
        public string getData(int index)
        {
            return array[index];
        }
        public int getJob()
        {
            return job;
        }
        public void writeToPage(int offset, string data)
        {
            array[offset] = data;
        }
    }
}
