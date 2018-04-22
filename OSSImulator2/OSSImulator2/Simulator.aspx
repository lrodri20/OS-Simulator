<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Simulator.aspx.cs" Inherits="OSSImulator2.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="PCInput">
    <div class="row" style="background-color:gainsboro;padding:25px;">
        <fieldset class="Builder">
            <div class="row">
                <div class="col-md-6">
                    <h1>PC Simulator</h1>
                    <div class="form-horizontal">
                        <div class="">
                            <label class="col-xs-5 control-label">Disk Size</label>
                            <input type="number" min="100" max="4096" name="DiskSize" id="DiskSize" class="form-control-static" value="100" required />
                            <span class="validity"></span>
                        </div>
                        <div class="">
                            <label class="col-xs-5 control-label">Memory Size</label>
                            <input type="number" min="1" max="2048" name="MemorySize" id="MemorySize" class="form-control-static" value="1" required />
                            <span class="validity"></span>
                        </div>
                        <div class="">
                            <label class="col-xs-5 control-label">Page Size</label>
                            <input type="number" min="1" max="64" name="PageSize" id="PageSize" class="form-control-static" value="1" required/>
                            
                            <span class="validity"></span>
                        </div>
                        <div class="">
                            <label class="col-xs-5 control-label">CPUs</label>
                            <input type="number" min="1" max="8" name="CPUs" id="CPUs" class="form-control-static" value="1" required/>
                            <span class="validity"></span>
                        </div>
                        <div class="">
                            <label class="col-xs-5 control-label">Scheduling Method</label>
                            <select class="col-xs-5 control-label" style="text-align:left;width:185px;">
                                <option>FIFO</option>
                                <option>SJF</option>
                                <option>PRIORITY</option>
                            </select>
                        </div>                     
                    </div>
                </div>
                <div class="col-md-6">
                    <h1>Program List</h1>
                    <div style="height:200px;width:417px;overflow:auto;display:none" class="col-md-4" id="programList">
                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions] FROM [ProgramsList]"></asp:SqlDataSource>
                    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" CellPadding="4" DataKeyNames="PID" DataSourceID="SqlDataSource1" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                <AlternatingRowStyle BackColor="White" />
                        <Columns>
                            <asp:BoundField DataField="PID" HeaderText="PID" ReadOnly="True" SortExpression="PID" />
                            <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                        </Columns>
                <EditRowStyle BackColor="#2461BF" />
                <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                <RowStyle BackColor="#EFF3FB" />
                <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                <SortedAscendingCellStyle BackColor="#F5F7FB" />
                <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                <SortedDescendingCellStyle BackColor="#E9EBEF" />
                <SortedDescendingHeaderStyle BackColor="#4870BE" />
            </asp:GridView>
            </div>
                </div>
            </div>
            <div class="PrimaryButtons" style="max-width:550px;">
                 <button class="btn btn-primary col-xs-8" id="Run" type="button" style="margin-top:15px;" onclick="Determine()">Run Simulation</button>
                 <button class="btn btn-primary col-xs-4" id="Reset" type="button" style="margin-top:15px;" onclick="ResetButton() ">Reset</button>
            </div>
        </fieldset>
    </div>
    <div class="row" id="resultsButton">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary"id="viewRaw">View Raw Statistics</button>
            <button type="button" class="btn btn-primary"id="ShowGraph">Show Graph</button>
            <button type="button" class="btn btn-primary"id="ShowComparison">Show Comparision Graph</button>
            
        </div>
    </div>
    
        <div class="Program" style="display:none;">
            <div class="row" id="results">
                <div class="RawResults">
                    <h1>Programs</h1>
                        <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program1">
                            <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Waiting Time] AS Waiting_Time, [Page Service Time] AS Page_Service_Time, [Page Faults] AS Page_Faults, [IO Operations ] AS IO_Operations_, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([CPU] = @CPU) AND ([PageSize] = @PageSize) AND ([SchedulingMethod] = @SchedulingMethod))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="1" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                    <asp:Parameter DefaultValue="FIFO" Name="SchedulingMethod" Type="String" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource2" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                            <EditRowStyle BackColor="#2461BF" />
                            <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                            <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                            <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                            <RowStyle BackColor="#EFF3FB" />
                            <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                            <SortedAscendingCellStyle BackColor="#F5F7FB" />
                            <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                            <SortedDescendingCellStyle BackColor="#E9EBEF" />
                            <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                    <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program2">
                            <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Page Service Time] AS Page_Service_Time, [Waiting Time] AS Waiting_Time, [Page Faults] AS Page_Faults, [IO Operations ] AS IO_Operations_, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([SchedulingMethod] = @SchedulingMethod) AND ([CPU] = @CPU) AND ([PageSize] = @PageSize))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="FIFO" Name="SchedulingMethod" Type="String" />
                                    <asp:Parameter DefaultValue="4" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView3" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource3" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#EFF3FB" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#F5F7FB" />
                    <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                    <SortedDescendingCellStyle BackColor="#E9EBEF" />
                    <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                    <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program3">
                            <asp:SqlDataSource ID="SqlDataSource4" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Waiting Time] AS Waiting_Time, [Page Service Time] AS Page_Service_Time, [Page Faults] AS Page_Faults, [IO Operations ] AS IO_Operations_, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([CPU] = @CPU) AND ([SchedulingMethod] = @SchedulingMethod) AND ([PageSize] = @PageSize))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="1" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="PRIORITY" Name="SchedulingMethod" Type="String" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView4" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource4" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#EFF3FB" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#F5F7FB" />
                    <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                    <SortedDescendingCellStyle BackColor="#E9EBEF" />
                    <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                    <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program4">
                            <asp:SqlDataSource ID="SqlDataSource5" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Waiting Time] AS Waiting_Time, [Page Faults] AS Page_Faults, [Page Service Time] AS Page_Service_Time, [IO Operations ] AS IO_Operations_, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([CPU] = @CPU) AND ([PageSize] = @PageSize) AND ([SchedulingMethod] = @SchedulingMethod))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="4" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                    <asp:Parameter DefaultValue="PRIORITY" Name="SchedulingMethod" Type="String" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView5" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource5" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#EFF3FB" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#F5F7FB" />
                    <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                    <SortedDescendingCellStyle BackColor="#E9EBEF" />
                    <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                    <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program5">
                            <asp:SqlDataSource ID="SqlDataSource6" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Waiting Time] AS Waiting_Time, [Page Service Time] AS Page_Service_Time, [Page Faults] AS Page_Faults, [IO Operations ] AS IO_Operations_, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([CPU] = @CPU) AND ([PageSize] = @PageSize) AND ([SchedulingMethod] = @SchedulingMethod))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="1" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                    <asp:Parameter DefaultValue="SJF" Name="SchedulingMethod" Type="String" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView6" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource6" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#EFF3FB" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#F5F7FB" />
                    <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                    <SortedDescendingCellStyle BackColor="#E9EBEF" />
                    <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                    <div style="height:200px;width:1000px; overflow:auto; left: 0px; top: 0px;display:none;" class="col-md-4" id="program6">
                            <asp:SqlDataSource ID="SqlDataSource7" runat="server" ConnectionString="<%$ ConnectionStrings:OSConnectionString %>" SelectCommand="SELECT [PID], [Instructions], [Execution TIme] AS Execution_TIme, [Waiting Time] AS Waiting_Time, [Page Service Time] AS Page_Service_Time, [IO Operations ] AS IO_Operations_, [Page Faults] AS Page_Faults, [Instructions Executed] AS Instructions_Executed FROM [Process] WHERE (([CPU] = @CPU) AND ([PageSize] = @PageSize) AND ([SchedulingMethod] = @SchedulingMethod))">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="4" Name="CPU" Type="Int32" />
                                    <asp:Parameter DefaultValue="4" Name="PageSize" Type="Int32" />
                                    <asp:Parameter DefaultValue="SJF" Name="SchedulingMethod" Type="String" />
                                </SelectParameters>
                            </asp:SqlDataSource>
                            <asp:GridView ID="GridView7" runat="server" AutoGenerateColumns="False" CellPadding="4" DataSourceID="SqlDataSource7" ForeColor="#333333" GridLines="None" Width="350px" CssClass="HeaderFreeze">
                            <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                <asp:BoundField DataField="PID" HeaderText="PID" SortExpression="PID" />
                                <asp:BoundField DataField="Instructions" HeaderText="Instructions" SortExpression="Instructions" />
                                <asp:BoundField DataField="Execution_TIme" HeaderText="Execution_TIme" SortExpression="Execution_TIme" />
                                <asp:BoundField DataField="Waiting_Time" HeaderText="Waiting_Time" SortExpression="Waiting_Time" />
                                <asp:BoundField DataField="Page_Service_Time" HeaderText="Page_Service_Time" SortExpression="Page_Service_Time" />
                                <asp:BoundField DataField="IO_Operations_" HeaderText="IO_Operations_" SortExpression="IO_Operations_" />
                                <asp:BoundField DataField="Page_Faults" HeaderText="Page_Faults" SortExpression="Page_Faults" />
                                <asp:BoundField DataField="Instructions_Executed" HeaderText="Instructions_Executed" SortExpression="Instructions_Executed" />
                            </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#EFF3FB" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#F5F7FB" />
                    <SortedAscendingHeaderStyle BackColor="#6D95E1" />
                    <SortedDescendingCellStyle BackColor="#E9EBEF" />
                    <SortedDescendingHeaderStyle BackColor="#4870BE" />
                </asp:GridView>
                    </div>
                </div>
            </div>
        </div>
        <div class="Graph" style="display:none;">
            <h1>Graph</h1>
            <div id="chartContainer1" style="height: 300px; width: 100%;display:none"></div>
            <div id="chartContainer2" style="height: 300px; width: 100%;display:none"></div>
            <div id="chartContainer3" style="height: 300px; width: 100%;display:none"></div>
            <div id="chartContainer4" style="height: 300px; width: 100%;display:none"></div>
            <div id="chartContainer5" style="height: 300px; width: 100%;display:none"></div>
            <div id="chartContainer6" style="height: 300px; width: 100%;display:none"></div>
            <h1>Page Faults/Time(ns)</h1>
            <div id="PagesUsedFIFO" style="height:300px;width:100%;display:none;"></div>
            <div id="PagesUsedPriority" style="height:300px;width:100%;display:none;"></div>
            <div id="PagesUsedSJF" style="height:300px;width:100%;display:none;"></div>

        </div>
        <div class="Comparison">
            <h1>Comparison Graph</h1>
            <div class="btn btn-group" role="group">
                <button class="btn btn-primary" type="button" id="ExecutionTime">Execution Time</button>
                <button class="btn btn-primary" type="button" id="WaitingTime">Waiting Time</button>
                <button class="btn btn-primary" type="button" id="PageServiceTime">Page Service Time</button>
                <button class="btn btn-primary" type="button" id="PageFaults">Page Faults</button>
                
            </div>
            <div class="ExecutionTime" style="height:300px;width=100%;">
                 <div id="ExecutionTimeGraph1" style="height:300px;width:100%;display:none;"></div>
            <div id="ExecutionTimeGraph2" style="height:300px;width:100%;display:none;"></div>
            <div id="ExecutionTimeGraph3" style="height:300px;width:100%;display:none;"></div>
            <div id="ExecutionTimeGraph4" style="height:300px;width:100%;display:none;"></div>
            </div>
           <div class="Waitingtime" style="height:300px;width:100%">
                <div id="WaitingTime1" style="height:300px;width:100%;display:none;"></div>
            <div id="WaitingTime2" style="height:300px;width:100%;display:none;"></div>
            <div id="WaitingTime3" style="height:300px;width:100%;display:none;"></div>
            <div id="WaitingTime4" style="height:300px;width:100%;display:none;"></div>
           </div>
              <div class="PageService" style="height:300px;width:100%">
                   <div id="PageService1" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageService2" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageService3" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageService4" style="height:300px;width:100%;display:none;"></div>        
            </div>    
            <div class="PageFault" style="height:300px;width:100%">
                   <div id="PageFault1" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageFault2" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageFault3" style="height:300px;width:100%;display:none;"></div>
                    <div id="PageFault4" style="height:300px;width:100%;display:none;"></div>        
            </div>        
        </div>
        <div class="RawCSV">
        </div>
    </div>
    
    
   
    
</asp:Content>
