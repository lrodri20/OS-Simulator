using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class Disk
    {
        private Disk()
        {
            _diskBlock = new string[4096];
        }
        public static void init()
        {
            _diskBlock = new string[4096];
        }
        private static string [] _diskBlock = new string[4096];
        public static string readDisk(int index) { return _diskBlock[index]; }
        public static void writeDisk(string val,int index)
        {
            _diskBlock[index] = val;
        }
        public static string [] getSomeData(int index, int size)
        {
            string[] temp = new string[size];
            int j = 0;
            for(int i = index;i<index+size;i++)
            {
                temp[j] = _diskBlock[i];
                j++;
            }
            return temp;
        }


    }
}
