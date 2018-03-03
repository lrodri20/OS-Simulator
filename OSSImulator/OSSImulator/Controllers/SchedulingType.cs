using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class SchedulingType
    {
        public enum Schedulingtype
        {
            PRIORITY =1,
            FIFO= 2,
            SJF =3
        };
        private int type;
        public int val() { return type; }

        public SchedulingType(int type)
        {
            this.type = type;
        }

        static SchedulingType fromValue(int value)
        {
            Schedulingtype schedule = Enum.GetValues(value);
            return null;
        }



    }







}
}
