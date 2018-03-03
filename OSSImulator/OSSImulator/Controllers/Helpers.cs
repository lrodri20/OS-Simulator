using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator.Controllers
{
    public class Helpers
    {
        private Helpers()
        { }
        public static int convertFromHexToDecimal(string hex)
        {
            return Convert.ToInt32(hex, 16);
        }
        public static string convertFromDecimalToHex(int dec)
        {
            return dec.ToString("X");
        }
        public static string convertFromHexStringToBinaryString(string hex)
        {
            long i = Convert.ToInt64(hex, 16);
            string bin = Convert.ToString(i, 2);
           
            return bin;
        }
        public static int convertFromBinaryStringToDecimalInteger(string bin)
        {
            int i = Convert.ToInt32(bin, 2);
            return i;
        }
        public static int getPageNumberFromAddress(int address)
        {
            return address / RAM.getPageSize();
        }




    }
}
