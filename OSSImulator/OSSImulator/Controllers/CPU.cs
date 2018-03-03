using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace OSSImulator.Controllers
{
  
        public class CPU : Runnable
        {
    /**
     * register 1 should always be zero, register 0 is accumulator
     */
        public int[] registers = new int[16];

        /**
         *flag[0] = idle
         *flag[1] = terminate queue
         *flag[2] = unload
         *flag[3] = loaded; a job has been loaded
         *flag[4] = running
         */
        public bool[] flags = { true, false, false, false, false };

        public int instType;
        public int opCode;

        public int tmpReg1;
        public int tmpReg2;
        public int tmpDstReg;
        public int tmpBReg;
        public int tmpSReg1;
        public int tmpSReg2;
        public int tmpAddress;


        public PCB j;
        public bool jump = false;
        public long start;
        public int jobCounter;
        public String[] cache;
        public String[] instructionCache;
        public int cacheSize;
        public int tempBuffer;
        public int inputBuffer;
        public int outputBuffer;
        public int IOCount;
        public int programCounter;
        long jobMemoryStartAddress;
        private int jobNumber;
        /**
         * <p>represents the current job's VMA's. Checkout:
         * <a href="http://duartes.org/gustavo/blog/post/how-the-kernel-manages-your-memory/">How the Kernel Manages Your Memory</a></p>
         */
        private List<int> VMA = new List<int>();
        private long threadID;
        private int cpuNum;


        /**
         * @param cpuNum represents the physical core label. 0 < cpuNum < Driver.numberOfCPUs
         */
        public CPU(int cpuNum)
        {
            this.cpuNum = cpuNum;
            registers[1] = 0;
        }

        /**
         *
         * @param programCount represents the index of the instruction located in the cache.
         * @return Returns the Hex String representation of a cpu instruction.
         */
        public String fetch(int programCount)
        {
            String instruction = cache[programCounter];
            return instruction;
        }

        /**
         *Converts the @param from a hex string into a 32 bit binary string.
         * The first two bits are used to determine the type of instruction.
         * Then using the switch statement, the function sets up the cpu
         * according to the instruction type and the registers used. Refer
         * to Bobbie's document on Instruction Formats for more details.
         *
         * @param instruction the hex string returned from fetch()
         * @return the opcode for the instruction passed in
         * @see #fetch(int programCount)
         */
        public int decode(String instruction)
        {
            string binInstr = Convert.ToString(Convert.ToInt32(instruction, 16), 2);
            String tmpInstr = binInstr;
            instType = Int32.Parse(tmpInstr.Substring(0, 2));
            opCode = Convert.ToInt32(tmpInstr, 2);
            switch (instType)
            {
                case 00:
                    {
                        //arithmetic or logical operation
                        tmpSReg1 = Convert.ToInt32(tmpInstr.Substring(8, 12));
                        tmpSReg2 = Convert.ToInt32(tmpInstr.Substring(12, 16));
                        tmpDstReg = Convert.ToInt32(tmpInstr.Substring(16, 20));
                        break;
                    }
                case 01:
                    {
                        //conditional jump
                        tmpBReg = Convert.ToInt32(tmpInstr.Substring(8, 12));
                        tmpDstReg = Convert.ToInt32(tmpInstr.Substring(12, 16));
                        tmpAddress = Convert.ToInt32(tmpInstr.Substring(16));
                        break;
                    }
                case 10:
                    {
                        //unconditional jump
                        tmpAddress = Convert.ToInt32(tmpInstr.Substring(8));
                        break;
                    }
                case 11:
                    {
                        //IO operation
                        tmpReg1 = Convert.ToInt32(tmpInstr.Substring(8, 12));
                        tmpReg2 = Convert.ToInt32(tmpInstr.Substring(12, 16));
                        tmpAddress = Convert.ToInt32(tmpInstr.Substring(16));
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Exception:Invalid instruction type");
                        break;
                    }
            }

            return opCode;
        }

        /**
         * Executes the @param
         * See Bobbie's docs for Instruction Format and Instruction Set.
         *
         * @param instruction the opcode returned from #decode(String instruction)
         * @see #decode(String instruction)
         */
        public void executeInstruction(int instruction)
        {
            int opcode = instruction;

            switch (opcode)
            {
                case 0: //0 RD
                    {
                        //IO read
                        if (tmpReg2 > 0)
                        {
                           registers[tmpReg1] = Convert.ToInt32(cache[registers[tmpReg2] / 4].Substring(2));
                            //                    log(String.format("Reading val:%s from R%s into R%s", registers[tmpReg1], tmpReg2, tmpReg1 ));
                        }
                        else
                        {
                            //dma read for the tmpAddress
                            registers[tmpReg1] = Convert.ToInt32(cache[tmpAddress / 4].Substring(2));
                            //log(String.format("Reading from cache[%s] val:%s into R%s", tmpAddress/4, Helpers.convertFromHexToDecimal( cache[tmpAddress/4].substring(2) ), tmpReg1));

                        }

                        Driver.jobMetricses[currentJobNumber() - 1].ios++;
                        break;
                    }
                case 1: //1 WR
                    {
                        //IO write
                        if (tmpReg2 > 0)
                        {
                            registers[tmpReg2] = registers[tmpReg1];
                            //                    log(String.format("WR writing from R%s val:%s to R%s val: %s", tmpReg1, registers[tmpReg1], tmpReg2, registers[tmpReg2]));
                        }
                        else
                        {
                            cache[tmpAddress / 4] = "0x" + Convert.ToInt32(registers[tmpReg1]);
                            //dmawrite with tmpAddress
                            //                    log(String.format("WR writing from R%s val: %s to cache[%s] val:%s ", tmpReg1, registers[tmpReg1], tmpAddress/4, cache[tmpAddress/4] ));
                        }

                        Driver.jobMetricses[currentJobNumber() - 1].ios++;

                        break;
                    }
                case 2: //2 ST
                    {
                        cache[registers[tmpDstReg] / 4] = "0x" + Convert.ToInt32(registers[tmpBReg]);
                        //                log(String.format("ST storing from R%s val:%s into cache[%s] val:%s", tmpBReg, registers[tmpBReg], registers[tmpDstReg]/4, cache[registers[tmpDstReg]/4] ));
                        break;
                    }
                case 3: //LW
                    {
                        registers[tmpDstReg] = Convert.ToInt32(cache[(registers[tmpBReg] / 4) + tmpAddress].Substring(2));
                        //                log(String.format("LW loading from cache[%s] val:%s into R%s val:%s", (registers[tmpBReg]/4) + tmpAddress, cache[(registers[tmpBReg]/4) + tmpAddress].substring(2), tmpDstReg, registers[tmpDstReg] ));

                        break;
                    }
                case 4: //MOV
                    {
                        registers[tmpDstReg] = registers[tmpBReg];
                        //                log(String.format("MOV from R%s val:%s R%s", tmpBReg, registers[tmpBReg], tmpDstReg ));
                        break;
                    }
                case 5: //ADD
                    {
                        registers[tmpDstReg] = registers[tmpSReg1];
                        registers[tmpDstReg] += registers[tmpSReg2];
                        //                log(String.format("ADD from R%s val:%s with R%s val:%s to R%s val%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));

                        break;
                    }
                case 6: //SUB
                    {
                        registers[tmpDstReg] = registers[tmpSReg1];
                        registers[tmpDstReg] = registers[tmpDstReg] - registers[tmpSReg2];
                        //                log(String.format("SUB from R%s val:%s with R%s val:%s to R%s val%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));

                        break;
                    }
                case 7: //MUL
                    {
                        registers[tmpDstReg] = registers[tmpSReg1] * registers[tmpSReg2];
                        //                log(String.format("MUL from R%s val:%s with R%s val:%s to R%s val%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));

                        break;
                    }
                case 8: //DIV
                    {
                        registers[tmpDstReg] = registers[tmpSReg1] / registers[tmpSReg2];
                        //                log(String.format("DIV from R%s val:%s with R%s val:%s to R%s val%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));

                        break;
                    }
                case 9: //AND
                    {
                        registers[tmpDstReg] = registers[tmpSReg1] & registers[tmpSReg2];
                        //                log(String.format("Logical AND R%s val:%s & R%s val:%s to R%s val:%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));
                        break;
                    }
                case 10:    //0A OR
                    {
                        registers[tmpDstReg] = registers[tmpSReg1] ^ registers[tmpSReg2];
                        //                log(String.format("Logical OR R%s val:%s & R%s val:%s to R%s val:%s", tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2], tmpDstReg, registers[tmpDstReg]));

                        break;
                    }
                case 11:    //0B MOVI
                    {
                        registers[tmpDstReg] = tmpAddress;
                        //                log(String.format("MOVI val:%s to R%s", tmpAddress, tmpDstReg));
                        break;
                    }
                case 12:    //0C ADDI
                    {
                        registers[tmpDstReg] += tmpAddress;
                        //                log(String.format("ADDI val:%s with R%s final val:%s", tmpAddress, tmpDstReg, registers[tmpDstReg]));
                        break;
                    }
                case 13:    //0D MULI
                    {
                        registers[tmpDstReg] *= tmpAddress;
                        //                log(String.format("MUL val:%s with R%s final val:%s", tmpAddress, tmpDstReg, registers[tmpDstReg]));
                        break;
                    }
                case 14:    //0E DIVI
                    {
                        registers[tmpDstReg] /= tmpAddress;
                        //                log(String.format("DIVI val:%s with R%s final val:%s", tmpAddress, tmpDstReg, registers[tmpDstReg]));
                        break;
                    }
                case 15:    //0F LDI
                    {

                        registers[tmpDstReg] = (tmpAddress);
                        //                log(String.format("LDI val:%s into R%s", tmpAddress, tmpDstReg));
                        break;
                    }
                case 16:    //10 SLT
                    {
                        if (registers[tmpSReg1] < registers[tmpSReg2])
                        {
                            registers[tmpDstReg] = 1;
                            //                    log(String.format("Set R%s to %s because R%s val:%s < R%s val:%s",tmpDstReg, registers[tmpDstReg], tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2]));
                        }
                        else
                        {
                            registers[tmpDstReg] = 0;
                            //                    log(String.format("Set R%s to %s because R%s val:%s >= R%s val:%s",tmpDstReg, registers[tmpDstReg], tmpSReg1, registers[tmpSReg1], tmpSReg2, registers[tmpSReg2]));
                        }
                        break;
                    }
                case 17:    //11 SLTI
                    {
                        if (registers[tmpSReg1] < (tmpAddress / 4))
                        {
                            registers[tmpDstReg] = 1;
                            //                    log(String.format("Set R%s to %s because R%s val:%s < val:%s",tmpDstReg, registers[tmpDstReg], tmpSReg1, registers[tmpSReg1], tmpAddress/4));
                        }
                        else
                        {
                            registers[tmpDstReg] = 0;
                            //                    log(String.format("Set R%s to %s because R%s val:%s >= val:%s",tmpDstReg, registers[tmpDstReg], tmpSReg1, registers[tmpSReg1], tmpAddress/4));
                        }
                        break;
                    }
                case 18:    //12 HLT
                    {
                        programCounter = jobCounter;
                        //                log(String.format("HLT Logical end of program Program Counter:%s", programCounter));
                        break;
                    }
                case 19:    //13 NOP
                    {
                        //does nothing
                        //                log("NOP Does nothing");
                        break;
                    }
                case 20:    //14 JMP
                    {
                        programCounter = tmpAddress / 4;
                        jump = true;
                        //                log(String.format("JMP to %s, set jump to true.", tmpAddress/4));
                        break;
                    }
                case 21:    //15 BEQ
                    {
                        if (registers[tmpBReg] == registers[tmpDstReg])
                        {
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BEQ Branch to address %s because R%s val:%s == R%s val:%s", tmpAddress/4, tmpBReg, registers[tmpBReg], tmpDstReg, registers[tmpDstReg]));
                        }
                        else
                        {
                            //                    log(String.format("BEQ Does NOT branch to address %s because R%s val:%s != R%s val:%s", tmpAddress/4, tmpBReg, registers[tmpBReg], tmpDstReg, registers[tmpDstReg]));

                        }
                        break;
                    }
                case 22: //16 BNE
                    {
                        if (registers[tmpBReg] != registers[tmpDstReg])
                        {
                            //branch
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BNE Branch to address %s because R%s val:%s != R%s val:%s", tmpAddress/4, tmpBReg, registers[tmpBReg], tmpDstReg, registers[tmpDstReg]));

                        }
                        else
                        {
                            //                    log(String.format("BEQ Does NOT branch to address %s because R%s val:%s == R%s val:%s", tmpAddress/4, tmpBReg, registers[tmpBReg], tmpDstReg, registers[tmpDstReg]));

                        }
                        break;
                    }
                case 23: //17 BEZ
                    {
                        if (registers[tmpBReg] == 0)
                        {
                            //branch
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BEZ Branch to address %s because R%s val:%s = 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        else
                        {
                            //                    log(String.format("BEZ Does NOT branch to address %s because R%s val:%s != 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        break;
                    }
                case 24: //18 BNZ
                    {
                        if (registers[tmpBReg] != 0)
                        {
                            //branch
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BNZ Branch to address %s because R%s val:%s != 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        else
                        {
                            //                    log(String.format("BNZ Does NOT branch to address %s because R%s val:%s = 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        break;
                    }
                case 25:    //19 BGZ
                    {
                        if (registers[tmpBReg] > 0)
                        {
                            //branch
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BGZ Branch to address %s because R%s val:%s > 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        else
                        {
                            //                    log(String.format("BGZ Does NOT branch to address %s because R%s val:%s < 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        break;
                    }
                case 26:    //1A BLZ
                    {
                        if (registers[tmpBReg] < 0)
                        {
                            //branch
                            programCounter = tmpAddress / 4;
                            jump = true;
                            //                    log(String.format("BLZ Branch to address %s because R%s val:%s < 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        else
                        {
                            //                    log(String.format("BLZ Does NOT branch to address %s because R%s val:%s > 0", tmpAddress/4, tmpBReg, registers[tmpBReg]));
                        }
                        break;
                    }
                default:
                    {
                        Console.WriteLine("System error:invalid operation");
                        break;
                    }


            }

        }

        public int effectiveAddress(int i, long a)
        {
            return registers[i] + (int)a;
        }


        /**
         * wrapper function that #load(PCB job) uses. Calculates the correct memory address
         * that will map to the correct page in the page table.
         *
         * @param address
         * @return the hex string in memory
         */
        private String read(int address)
        {
            return MMU.read(VMA.get(address / RAM.getPageSize()) * RAM.getPageSize() + (address % RAM.getPageSize()));
        }

        public void load(PCB job)
        {
            Console.WriteLine("cpu.loading job: " + job.getJobNumber());
            jobNumber = job.getJobNumber();
            printFlags("PRE LOADING");
            // int instructionCounter = 1;
            jobMemoryStartAddress = job.getJobMemoryAddress();
            start = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            j = job;
            IOCount = 0;
            tempBuffer = j.getTemporaryBuffer();
            inputBuffer = j.getInputBuffer();
            outputBuffer = j.getOutputBuffer();
            jobCounter = j.getJobInstructionCount();
            cacheSize = tempBuffer + inputBuffer + outputBuffer + jobCounter;
            cache = new String[cacheSize];
            instructionCache = new String[jobCounter];
            VMA = job.getAllocatedVirtualPages();

            for (int i = 0; i < cacheSize; i++)
            {
                cache[i] = read(i);
            }

            programCounter = j.getProgramCounter();
            setIdleFlag(false);
            
            setTerminateFlag(false);
            setJobLoaded(true);
            Console.WriteLine("cpu.loading jon: " + job.getJobNumber() + " complete");
            updateMetrics(CPUMetrics.CPU_STATE.LOADING, "N/A");
            sleep(3);
            updateOsMetrics();
            printFlags("POST LOADING");
        }

        public void run()
        {
            Driver.jobMetricses[currentJobNumber() - 1].setStartRunTime(DateTimeOffset.Now.ToUnixTimeMilliseconds());
            Driver.updateJobMetrics(Driver.jobMetricses[currentJobNumber() - 1]);
            printFlags("PRE RUNNING");
            setRunning(true);
            threadID = Thread.currentThread().getId();
            Driver.jobsRan.add("\nRUNNING JOB: " + currentJobNumber() + "\tON THREAD: " + threadID);
            Console.WriteLine("\nRUNNING JOB: " + currentJobNumber() + "\tON THREAD: " + threadID);
            while (programCounter < jobCounter)
            {
                String instruction = fetch(programCounter);
                int opCode = decode(instruction);
                executeInstruction(opCode);

                if (!jump)
                {
                    programCounter++;
                }
                else
                {
                    jump = false;
                }

                sleep();
                updateMetrics(CPUMetrics.CPU_STATE.RUNNING, instruction);
            }

            setIdleFlag(true);
            setTerminateFlag(true);
            setUnload(true);
            setRunning(false);
            Driver.jobMetricses[currentJobNumber() - 1].setEndRunTime(DateTimeOffset.Now.ToUnixTimeMilliseconds());
            Driver.updateJobMetrics(Driver.jobMetricses[currentJobNumber() - 1]);
            printFlags("POST RUNNING");
        }


        public void unload(PCB current)
        {
            updateMetrics(CPUMetrics.CPU_STATE.UNLOADING, "N/A");
            printFlags("PRE UNLOADING");
            Console.WriteLine("UNLOADING JOB " + currentJobNumber() + "PROGRAM COUNTER:" + programCounter + " JOB CNTR:" + jobCounter)
        
            current.setTemporaryBuffer(tempBuffer);
            current.setInputBuffer(inputBuffer);
            current.setOutputBuffer(outputBuffer);
            current.setJobInstructionCount(jobCounter);
            current.setRegisters(registers);
            current.setProgramCounter(programCounter);
            current.setCache(cache);
            current.setCacheSize(cacheSize);

            if (programCounter < jobCounter)
            {
                // setTerminateFlag(false);
                current.setProcessStatus(PCB.PROCESS_STATUS.WAIT);
            }
            else
            {
                // setTerminateFlag(true);
                current.setProcessStatus(PCB.PROCESS_STATUS.TERMINATE);
            }

            setIdleFlag(true);
            setUnload(false);
            setTerminateFlag(false);
            setJobLoaded(false);
            sleep(2);
            updateOsMetrics();
            updateMetrics(CPUMetrics.CPU_STATE.IDLE, "N/A");
            printFlags("POST UNLOADING");

        }


        //Utility
        private void setIdleFlag(bool val)
        {
            flags[0] = val;
        }

        private void setTerminateFlag(bool val)
        {
            flags[1] = val;
        }

        private void setUnload(bool val)
        {
            flags[2] = val;
        }

        public bool shouldUnload()
        {
            return flags[2];
        }
        public bool isIdle()
        {
            return flags[0];
        }

        public bool isJobLoaded()
        {
            return flags[3];
        }

        public void setJobLoaded(bool val)
        {
            flags[3] = val;
        }

        public bool shouldTerminate()
        {
            return flags[1];
        }

        public int currentJobNumber()
        {
            return jobNumber;
        }
        public bool isRunning()
        {
            return flags[4];
        }

        public void setRunning(bool val)
        {
            flags[4] = val;
        }

        /**
         * great function to use when manually debugging the CPU through logs.
         *
         * @param type
         */
        public void printFlags(String type)
        {
            Console.WriteLine(String.Format("FLAGS: JO: % CPU_THREAD: %s TYPE: %s idle:%s terminate: %s unload: %s load: %s running: %s",
                currentJobNumber(),
                threadID,
                type,
                isIdle(),
                shouldTerminate(),
                shouldUnload(),
                isJobLoaded(),
                isRunning()));
   
        }



        //Helpers

        /**
         * logging function, prepends the log message with the Job and CPU num.
         * @param val the message to be logged.
         */
        private void log(String val)
        {
            Console.WriteLine(String.Format("JOB: &s CPU #: %s MSG: %s",
                currentJobNumber(),
                cpuNum,
                val));
        }
        /**
         * Function makes call that updates the gui with the most recent metric data.
         *
         * @param state The current state of the CPU, RUNNING, LOADING,... see enum type.
         * @param instruction
         * @see Driver#updateCpuMetric(CPUMetrics)
         */
        private void updateMetrics(CPUMetrics.CPU_STATE state, String instruction)
        {
            CPUMetrics metrics = new CPUMetrics(cpuNum);
            metrics.setTotalInstructionsNumber(jobCounter);
            metrics.setProgramCounter(programCounter);
            metrics.setCurrentJobNumber(currentJobNumber());
            metrics.setCurrentState(state);
            metrics.setCurrentInstruction(instruction);
            Driver.updateCpuMetric(metrics);
        }


        /**
         * Function calls  Driver.updateOsMetric(); that updates the gui with the current OS metrics.
         * @see Driver#updateOsMetric()
         */
        private void updateOsMetrics()
        {
            Driver.updateOsMetric();
        }

        /**
         * sleeps the current thread for mills in Driver
         * @see Driver#sleepTimeMs
         */
        private void sleep()
        {
            try
            {
                Thread.sleep(Driver.sleepTimeMs);
            }
            catch (InterruptedException ex)
            {

            }
        }


        /**
         * sleeps the current thread for mills in Driver
         *
         * @param mul multiplier for Driver#sleepTimeMs
         * @see Driver#sleepTimeMs
         */
        private void sleep(int mul)
        {
            try
            {
                Thread.sleep(Driver.sleepTimeMs * mul);
            }
            catch (InterruptedException ex)
            {

            }
        }

    }


}
}
