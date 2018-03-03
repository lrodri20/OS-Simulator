using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class DMA
    {
        bool work = true;
        int num = 0;
        int io = 0;
        int sig;
        void read(int channel,string ramPhysAddress, string startInfo)
        {

        }
        void write(int channel, string ramPhysAddress, string startInfo)
        {

        }
        Task<string> asynch_read(int channel, string ramPhysAddress, string startInfo)
        {
            Task<string> future = null;
            return future;
        }
        int signal(int tf)
        {
            return 0;
        }
        void active(int channel, string ramPhysAddress, string startInfo)
        {
            while(work)
            {
                switch(num)
                {
                    case 0:
                        read(channel, ramPhysAddress, startInfo);
                        break;
                    case 1:
                        write(channel, ramPhysAddress, startInfo);
                        break;
                }
                io = io + 4;
            }
            signal(sig);
        }
    }

}
