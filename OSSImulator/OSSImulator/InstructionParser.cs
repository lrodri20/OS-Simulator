using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSSImulator
{
    public class InstructionParser
    {
        public InstructionParser(string path)
        {
            programfilePath = path;
            try
            {
                fileReader = new FileReader(path);
                bufferedReader = new BufferedReader(fileReader);
            }
            catch (IOExection ex)
            {



            }
        }
        public FileReader fileReader;
        public BufferedReader bufferedReader;
        public string programFilePath;
        public bool loadingComplete = false;

        const int JOB_NUM_POS = 2;
        const int JOB_INSTR_COUNTR_POS = 3;
        const int JOB_PRIORiTY_POS = 4;
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
            bool inDataSection = false;
            while (!loadingComplete)
            {
                line = bufferedReader.readLine();
                if (line != null)
                {
                    if (line.Contains("JOB") || line.Contains("END"))
                    {
                        inDataSection = false;
                        Console.WriteLine(line);
                    }
                    else if (line.Contains("Data"))
                    {
                        inDataSection = true;
                    }
                    else
                    {
                        if (!inDataSection)
                        {
                            printInstruction(line.Substring(2));
                        }
                    }
                }
                else
                {
                    loadingComplete = true;
                }
            }
        }
        public void printInstruction(string line)
        {
            string opcode = hexToBinary(line).Substring(0,2);
            if (opcode.Equals("00"))
                printArithInstruction(line);
            else if (opcode.Equals("01"))
                printCondImedformat(line);
            else if (opcode.Equals("10"))
                printUnconditonalJump(line);
            else if (opcode.Equals("11"))
                printIOInstruction(line);
        }
        public void printArithInstruction(string hexLine)
        {
            string line = hexToBinary(hexLine);
            string translatedLine = string.Format("%s\t%s\t%s\t%s\tArithmetric\topcode: %s\tsource:%s\tsource:%s\td-reg:%s\t",
                hexLine,
                getInstrType(hexLine),
                getOpCode(line),
                line.Substring(8, 12),
                line.Substring(12, 16),
                line.Substring(16, 20),
                getOpCodeInstructionName(Int32.Parse(binaryToDecimal(line.Substring(2, 8)))),
                binaryToDecimal(line.Substring(8, 12)),
                binaryToDecimal(line.Substring(12, 16)),
                binaryToDecimal(line.Substring(16, 20))
            );
            Console.WriteLine(translatedLine);
        }
        public void printCondImedformat(string hexLine)
        {
            string line = hexToBinary(hexLine);

            string translatedLine = string.Format("%s\t%s\t%s\t%s\t%s\t%s\tConditional/Immediate\topcode:%s\tb-reg:%s\td-reg:%s\taddress:%s\t",
                hexLine,
                getInstrType(hexLine),
                getOpCode(line),
                line.Substring(8, 12),
                line.Substring(12, 16),
                line.Substring(16),
                getOpCodeInstructionName(Int32.Parse(binaryToDecimal(line.Substring(2, 8)))),
                binaryToDecimal(line.Substring(8, 12)),
                binaryToDecimal(line.Substring(12, 16)),
                binaryToDecimal(line.Substring(16))
                );
            Console.WriteLine(translatedLine);
        }
        public void printUnconditonalJump(string hexLine)
        {
            string line = hexToBinary(hexLine);
            string s = binaryToDecimal(line.Substring(2, 9));
            string translatedLine = string.Format("%s\t%s\t%s\t%s\t\t\tJUMP\topcode:%s\taddress:%s",
                    hexLine,
                    getInstrType(hexLine),
                    getOpCode(line),
                    line.Substring(8),
                    getOpCodeInstructionName(Int32.Parse(binaryToDecimal(line.Substring(2, 8)))),
                    binaryToDecimal(line.Substring(8))
                );
            Console.WriteLine(translatedLine);
        }
        public void printIOInstruction(string hexLine)
        {
            string line = hexToBinary(hexLine);
            string s = binaryToDecimal(line.Substring(2, 9));
            string translatedLine = string.Format("%s\t%s\t%s\t%s\t%s\t%s\tIO\topcode:%s source:%s\tsource:%s\td-reg:%s\t",
                   hexLine,
                   getInstrType(hexLine),
                   getOpCode(line),
                   line.Substring(8, 12),
                   line.Substring(12, 16),
                   line.Substring(16),
                   getOpCodeInstructionName(Int32.Parse(binaryToDecimal(line.Substring(2, 8)))),
                   binaryToDecimal(line.Substring(8, 12)),
                   binaryToDecimal(line.Substring(12, 16)),
                   binaryToDecimal(line.Substring(16))
                   );
            Console.WriteLine(translatedLine);
        }
        public string getOpCode(string line)
        {
            return line.Substring(2, 8);
        }
        public string getInstrType(string Line)
        {
            return hexToBinary(Line).Substring(0, 2);
        }
        public string hexToBinary(string hex)
        {
            long i = Convert.ToInt64(hex, 16);
            string bin = i.ToString();
            return bin;
        }
        public string binaryToDecimal(string bin)
        {
            int i = Convert.ToInt32(bin, 2);
            string dec = i.ToString();
            return dec;
        }
        public string getOpCodeInstructionName(int opcode)
        {
            string opCodeName = "";
            switch(opcode)
            {
                case 0:
                    opCodeName = "0\tRD\t";
                    break;
                case 1:
                    opCodeName = "1\tWR\t";
                    break;
                case 2:
                    opCodeName = "2\tST";
                    break;
                case 3:
                    opCodeName = "3\tLW";
                    break;
                case 4:
                    opCodeName = "4\tMOV";
                    break;
                case 5:
                    opCodeName = "5\tADD";
                    break;
                case 6:
                    opCodeName = "6\tSUB";
                    break;
                case 7:
                    opCodeName = "7\tMUL";
                    break;
                case 8:
                    opCodeName = "8\tOIV";
                    break;
                case 9:
                    opCodeName = "9\tAND";
                    break;
                case 10:
                    opCodeName = "0A\tOR";
                    break;
                case 11:
                    opCodeName = "0B\tMOVI";
                    break;
                case 12:
                    opCodeName = "0C\tADDI";
                    break;
                case 13:
                    opCodeName = "0D\tMULI";
                    break;
                case 14:
                    opCodeName = "9E\tDIVI";
                    break;
                case 15:
                    opCodeName = "0F\tLDI";
                    break;
                case 16:
                    opCodeName = "10\tSLT";
                    break;
                case 17:
                    opCodeName = "11\tSLTI";
                    break;
                case 18:
                    opCodeName = "12\tHLT";
                    break;
                case 19:
                    opCodeName = "13\tNOP";
                    break;
                case 20:
                    opCodeName = "14\tMP";
                    break;
                case 21:
                    opCodeName = "15\tBEQ";
                    break;
                case 22:
                    opCodeName = "16\tBNE";
                    break;
                case 23:
                    opCodeName = "17\tBEZ";
                    break;
                case 24:
                    opCodeName = "18\tBNZ";
                    break;
                case 25:
                    opCodeName = "19\tBGZ";
                    break;
                case 26:
                    opCodeName = "1A\tBLZ";
                    break;
            }


            return opCodeName;
        }
    }
}
