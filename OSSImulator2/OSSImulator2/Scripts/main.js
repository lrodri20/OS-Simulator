var randomnumbernew ;
var randomnumberold ;
var count=0;
function Determine() {
    $("#programList").show();
    randomnumbernew = Math.floor(Math.random() * 6) + 1;
    var divName = "program" + randomnumbernew;
    var div = document.getElementById(divName);
    div.style.display = "";
    var divRawName = "chartContainer" + randomnumbernew;
    var divRaw = document.getElementById(divRawName);
    divRaw.style.display = "";
    randomnumberchart = Math.floor(Math.random() * 4) + 1;
    var ResultsChart = "ExecutionTimeGraph" + randomnumberchart;
    var divChartResults = document.getElementById(ResultsChart);
    divChartResults.style.display = "";
    var WaitingChart = "WaitingTime" + randomnumberchart;
    var divWaitingResults = document.getElementById(WaitingChart);
    divWaitingResults.style.display = "";
    var PageServiceTime = "PageService" + randomnumberchart;
    var divPageServiceTime = document.getElementById(PageServiceTime);
    divPageServiceTime.style.display = "";
    var PageFaultsTime = "PageFault" + randomnumberchart;
    var divPageFaultsTime = document.getElementById(PageFaultsTime);
    divPageFaultsTime.style.display = "";

}
function ResetButton() {
    window.location.reload();
}
$(document).ready(function () {
    $(".btn-group > .btn").click(function () {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
        
    });
    $("#ExecutionTime").click(function () {
        $(".ExecutionTime").show();
        $(".Waitingtime").hide();
        $(".PageService").hide();
        $(".PageFault").hide();

    });
    $("#WaitingTime").click(function () {
        $(".ExecutionTime").hide();
        $(".Waitingtime").show();
        $(".PageService").hide();
        $(".PageFault").hide();

    });
    $("#PageServiceTime").click(function () {
        $(".ExecutionTime").hide();
        $(".Waitingtime").hide();
        $(".PageService").show();
        $(".PageFault").hide();

    });
    $("#PageFaults").click(function () {
        $(".ExecutionTime").hide();
        $(".Waitingtime").hide();
        $(".PageService").hide();
        $(".PageFault").show();


    });

    $("#viewRaw").click(function () {
        $(".Program").show(); 
        $(".Graph").hide();
        $(".Comparison").hide();
        $(".RawCSV").hide();
        $(".RawResults").show();
    });
   
    $("#ShowGraph").click(function () {
        $(".Graph").show();
        $(".RawResults").hide();
        $(".Program").hide();
        $(".Comparison").hide();
        $(".RawCSV").hide();
        
    });
    $("#ShowComparison").click(function () {
        $(".Comparison").show();
        $(".Program").hide();
        $(".RawResults").hide();
        $(".Graph").hide();
        $(".RawCSV").hide();
        $(".ExecutionTime").hide();
        $(".Waitingtime").hide();
        $(".PageService").hide();
        $(".PageFault").hide();
        
    });
    $("#ViewRawCSV").click(function () {
        $(".RawCSV").show();
        $(".Program").hide();
        $(".Graph").hide();
        $(".Comparison").hide();
        $(".RawResults").hide();
        
    });
});


window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Progress Graph"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"
      
        },
        data: [{
            type: "column",
            name: "Execution Time(ms)",
            showInLegend: true,
            legendText: "Execution Time",
            dataPoints: [
                { y: 0.08866 },
                { y: 0.114295 },
                { y: 0.101626 },
                { y: 0.070567 },
                { y: 0.087754 },
                { y: 0.100122 },
                { y: 0.069661 },
                { y: 0.063328 },
                { y: 0.086249 },
                { y: 0.094087 },
                { y: 0.101025 },
                { y: 0.104644 },
                { y: 0.101928 },
                { y: 0.062424 },
                { y: 0.086248 },
                { y: 0.05649 },
                { y: 0.089865 },
                { y: 0.104947 },
                { y: 0.093785 },
                { y: 0.093786 },
                { y: 0.072076 },
                { y: 0.89866 },
                { y: 0.102232 },
                { y: 0.094389 },
                { y: 0.083233 },
                { y: 0.065443 },
                { y: 0.082025 },
                { y: 0.10223 },
                { y: 0.098915 },
                { y: 0.069964 }

            ]
        },
        {
            type: "column",
            name: "Waiting Time(ms)",
            showInLegend: true,
            legendText: "Waiting Time",
            dataPoints: [
                { y: 3.728567 },
                { y: 3.765661 },
                { y: 3.182132 },
                { y: 2.308491 },
                { y: 3.814418 },
                { y: 3.239124 },
                { y: 2.36971 },
                { y: 2.418564 },
                { y: 3.294008 },
                { y: 3.871513 },
                { y: 3.902268 },
                { y: 3.952029 },
                { y: 3.348593 },
                { y: 2.119108 },
                { y: 3.419462 },
                { y: 1.829903},
                { y: 4.003297 },
                { y: 3.41729 },
                { y: 3.507824 },
                { y: 3.540088 },
                { y: 2.534363 },
                { y: 4.049737},
                { y: 3.58321 },
                { y: 3.636287 },
                { y: 2.961382 },
                { y: 2.229178 },
                { y: 4.098892 },
                { y: 4.14443},
                { y: 3.691171 },
                { y: 2.637198 }
           
            ]
        },
        {
            type: "column",
            name: "Page Service Time(ms)",
            showInLegend: true,
            legendText: "Page Service Time",
            dataPoints: [
                { y: .108867 },
                { y: .098312 },
                { y: .089868 },
                { y: .063028 },
                { y: .098611 },
                { y: .089264 },
                { y: .062424 },
                { y: .063329 },
                { y: .090771},
                { y: .096501 },
                { y: 0.100724 },
                { y: 0.101325 },
                { y: 0.089868 },
                { y: 0.055186 },
                { y: 0.090166 },
                { y: 0.050964},
                { y: 0.104342 },
                { y: 0.091073 },
                { y: 0.091071 },
                { y: 0.091677 },
                { y: 0.064838},
                { y: 0.100722 },
                { y: 0.091979 },
                { y: 0.090169 },
                { y: 0.078709 },
                { y: 0.056996 },
                { y: 0.10012 },
                { y: 0.0962 },
                { y: 0.088659 },
                { y: 0.060917 }
            ]
        },
        {
            type: "column",
            name: "Average Execution Time(ms)",
            showInLegend: true,
            legendText: "Average Execution Time",
            dataPoints: [
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695},
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 },
                { y: 0.087695 }
            ]
        },
        {
            type: "column",
            name: "Average Waiting Time(ms)",
            showInLegend: true,
            legendText: "Average Waiting Time",
            dataPoints: [
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 },
                { y: 3.288411 }
            ]
        },
        {
            type: "column",
            name: "Average Page Service Time(ms)",
            showInLegend: true,
            legendText: "Average Page Service Time",
            dataPoints: [
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 },
                { y: 0.085223 }
            ]
        }]
    })
    var chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Progress Graph"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Execution Time(ms)",
            showInLegend: true,
            legendText: "Execution Time",
            dataPoints: [
                { y: 0.151386 },
                { y: 0.270506 },
                { y: 0.107955 },
                { y: 0.08474 },
                { y: 0.124248 },
                { y: 0.22254 },
                { y: 0.103741 },
                { y: 0.139021 },
                { y: 0.111276 },
                { y: 0.242458 },
                { y: 0.123038 },
                { y: 0.15772 },
                { y: 0.249396 },
                { y: 0.081122 },
                { y: 0.202051 },
                { y: 0.297646 },
                { y: 0.210494 },
                { y: 0.155308 },
                { y: 0.125753 },
                { y: 0.131784 },
                { y: 0.107358 },
                { y: 0.119423 },
                { y: 0.186368 },
                { y: 0.255425 },
                { y: 0.212906 },
                { y: 0.084739 },
                { y: 0.121226 },
                { y: 0.23703 },
                { y: 0.158623 },
                { y: 0.110977 }

            ]
        },
        {
            type: "column",
            name: "Waiting Time(ms)",
            showInLegend: true,
            legendText: "Waiting Time",
            dataPoints: [
                { y: 5.212274 },
                { y: 5.279524 },
                { y: 4.655282 },
                { y: 3.318737 },
                { y: 5.246351 },
                { y: 4.61487 },
                { y: 3.31904 },
                { y: 3.4457 },
                { y: 4.792496 },
                { y: 5.322648 },
                { y: 5.370248 },
                { y: 5.41048 },
                { y: 4.803351 },
                { y: 2.945098 },
                { y: 4.840141 },
                { y: 2.591664 },
                { y: 5.408292 },
                { y: 5.006002 },
                { y: 5.257811 },
                { y: 5.005095 },
                { y: 3.688157 },
                { y: 5.62964 },
                { y: 5.062694 },
                { y: 4.944482 },
                { y: 4.381458 },
                { y: 3.196001 },
                { y: 5.35107 },
                { y: 5.537365 },
                { y: 5.185434 },
                { y: 3.948712 }

            ]
        },
        {
            type: "column",
            name: "Page Service Time(ms)",
            showInLegend: true,
            legendText: "Page Service Time",
            dataPoints: [
                { y: .160433 },
                { y: .53347 },
                { y: .189687 },
                { y: .073583 },
                { y: .209287 },
                { y: .142642 },
                { y: .107356 },
                { y: .085946 },
                { y: .128167 },
                { y: .122737 },
                { y: 0.224667 },
                { y: 0.283166 },
                { y: 0.166465 },
                { y: 0.083233 },
                { y: 0.160734 },
                { y: 0.088056 },
                { y: 0.226778 },
                { y: 0.281662 },
                { y: 0.51206 },
                { y: 0.128772 },
                { y: 0.091072 },
                { y: 0.182145 },
                { y: 0.126559 },
                { y: 0.23432 },
                { y: 0.49306 },
                { y: 0.07117 },
                { y: 0.548851 },
                { y: 0.202049 },
                { y: 0.130579 },
                { y: 0.115198 }
            ]
        },
        {
            type: "column",
            name: "Average Execution Time(ms)",
            showInLegend: true,
            legendText: "Average Execution Time",
            dataPoints: [
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 },
                { y: 0.162876 }
            ]
        },
        {
            type: "column",
            name: "Average Waiting Time(ms)",
            showInLegend: true,
            legendText: "Average Waiting Time",
            dataPoints: [
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 },
                { y: 4.626059 }
            ]
        },
        {
            type: "column",
            name: "Average Page Service Time(ms)",
            showInLegend: true,
            legendText: "Average Page Service Time",
            dataPoints: [
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 },
                { y: 0.203467 }
            ]
        }]
    })
    var chart = new CanvasJS.Chart("chartContainer3", {
    animationEnabled: true,
        theme: "light2",
            title: {
        text: "Progress Graph"
    },
    axisY: {
        includeZero: false
    },
    legend: {
        cursor: "pointer"

    },
    data: [{
        type: "column",
        name: "Execution Time(ms)",
        showInLegend: true,
        legendText: "Execution Time",
        dataPoints: [
            { y: 0.097708 },
            { y: 0.097106 },
            { y: 0.091072 },
            { y: 0.081425 },
            { y: 0.098009 },
            { y: 0.091375 },
            { y: 0.062725 },
            { y: 0.085343 },
            { y: 0.103437 },
            { y: 0.098312 },
            { y: 0.094691 },
            { y: 0.097103 },
            { y: 0.09409 },
            { y: 0.063329 },
            { y: 0.088961 },
            { y: 0.047648 },
            { y: 0.097408 },
            { y: 0.100119 },
            { y: 0.069361 },
            { y: 0.090167 },
            { y: 0.062725 },
            { y: 0.109167 },
            { y: 0.112183 },
            { y: 0.0910722 },
            { y: 0.077504 },
            { y: 0.054583 },
            { y: 0.097103 },
            { y: 0.107355 },
            { y: 0.089867 },
            { y: 0.061821 }
        
        ]
    },
    {
        type: "column",
        name: "Waiting Time(ms)",
        showInLegend: true,
        legendText: "Waiting Time",
        dataPoints: [
            { y: 3.913727 },
            { y: 2.956559 },
            { y: 2.102523 },
            { y: 2.463798 },
            { y: 3.594672 },
            { y: 1.788592 },
            { y: 2.72566 },
            { y: 0.221348 },
            { y: 4.259624 },
            { y: .9221292 },
            { y: 3.671269 },
            { y: 1.280449 },
            { y: .579909 },
            { y: 4.236708 },
            { y: 2.6060137 },
            { y: 1.585938 },
            { y: 3.270489 },
            { y: .331724 },
            { y: 4.55908 },
            { y: 3.99347 },
            { y: 3.106435 },
            { y: .702048 },
            { y: 2.246367 },
            { y: 1.899566 },
            { y: 1.40349 },
            { y: 2.894737 },
            { y: 1.055785 },
            { y: 3.348292 },
            { y: 4.469215 },
            { y: 1.64776 }

        ]
    },
    {
        type: "column",
        name: "Page Service Time(ms)",
        showInLegend: true,
        legendText: "Page Service Time",
        dataPoints: [
            { y: .09982 },
            { y: .107657 },
            { y: .1002 },
            { y: .074788 },
            { y: .101205 },
            { y: .104644 },
            { y: .067551 },
            { y: .0895 },
            { y: .092581 },
            { y: .113992 },
            { y: 0.101931 },
            { y: 0.1152 },
            { y: 0.122136 },
            { y: 0.076598 },
            { y: 0.09982 },
            { y: 0.056996 },
            { y: 0.11399 },
            { y: 0.141135 },
            { y: 0.091074 },
            { y: 0.094933 },
            { y: 0.067855 },
            { y: 0.117609 },
            { y: 0.123342 },
            { y: 0.105549 },
            { y: 0.08964 },
            { y: 0.060313 },
            { y: 0.114597 },
            { y: 0.104946 },
            { y: 0.089866 },
            { y: 0.07117 }
        ]
    },
    {
        type: "column",
        name: "Average Execution Time(ms)",
        showInLegend: true,
        legendText: "Average Execution Time",
        dataPoints: [
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 },
            { y: 0.087092 }
        ]
    },
    {
        type: "column",
        name: "Average Waiting Time(ms)",
        showInLegend: true,
        legendText: "Average Waiting Time",
        dataPoints: [
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 },
            { y: 2.461265 }
        ]
    },
    {
        type: "column",
        name: "Average Page Service Time(ms)",
        showInLegend: true,
        legendText: "Average Page Service Time",
        dataPoints: [
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 },
            { y: 0.096894 }
        ]
    }]
})
    var chart = new CanvasJS.Chart("chartContainer4", {
    animationEnabled: true,
        theme: "light2",
            title: {
        text: "Progress Graph"
    },
    axisY: {
        includeZero: false
    },
    legend: {
        cursor: "pointer"

    },
    data: [{
        type: "column",
        name: "Execution Time(ms)",
        showInLegend: true,
        legendText: "Execution Time",
        dataPoints: [
            { y: .15018 },
            { y: 0.17943 },
            { y: 0.152894 },
            { y: 0.07901 },
            { y: 0.179732 },
            { y: 0.115199 },
            { y: 0.144451 },
            { y: 0.085041 },
            { y: 0.179734 },
            { y: 0.285885 },
            { y: 0.250604 },
            { y: 0.158923 },
            { y: 0.326598 },
            { y: 0.137514 },
            { y: 0.132087 },
            { y: 0.118213 },
            { y: 0.152291 },
            { y: 0.303071 },
            { y: 0.134194 },
            { y: 0.138418 },
            { y: 0.149278 },
            { y: 0.192097 },
            { y: 0.212907 },
            { y: 0.12907 },
            { y: 0.144751 },
            { y: 0.184256 },
            { y: 0.204461 },
            { y: 0.180033 },
            { y: 0.112182 },
            { y: 0.174605 }

        ]
    },
    {
        type: "column",
        name: "Waiting Time(ms)",
        showInLegend: true,
        legendText: "Waiting Time",
        dataPoints: [
            { y: 5.399846 },
            { y: 4.073561 },
            { y: 3.0033 },
            { y: 3.112465 },
            { y: 4.971627 },
            { y: 2.661324 },
            { y: 3.637798 },
            { y: 0.226475 },
            { y: 5.803345 },
            { y: 1.338955 },
            { y: 5.021983 },
            { y: 1.796127 },
            { y: 0.529549 },
            { y: 5.876624 },
            { y: 3.122419 },
            { y: 2.353726 },
            { y: 4.336223 },
            { y: 0.307601 },
            { y: 6.199004 },
            { y: 5.549124 },
            { y: 4.137188 },
            { y: 0.981899 },
            { y: 3.011142 },
            { y: 1.901981 },
            { y: 3.758424 },
            { y: 1.488532 },
            { y: 4.899551 },
            { y: 6.190556 },
            { y: 2.452035 },
            { y: 1.64776 }

        ]
    },
    {
        type: "column",
        name: "Page Service Time(ms)",
        showInLegend: true,
        legendText: "Page Service Time",
        dataPoints: [
            { y: .160134 },
            { y: .361577 },
            { y: .340769 },
            { y: .07328 },
            { y: .131483 },
            { y: .160433 },
            { y: .188176 },
            { y: .091978 },
            { y: .170384 },
            { y: .721347 },
            { y: 0.231001 },
            { y: 0.182451 },
            { y: 0.395957 },
            { y: 0.138419 },
            { y: 0.450841 },
            { y: 0.139929 },
            { y: 0.27533 },
            { y: 0.266286 },
            { y: 0.108263 },
            { y: 0.113088 },
            { y: 0.354339 },
            { y: 0.237031 },
            { y: 0.370926 },
            { y: 0.135101 },
            { y: 0.305788 },
            { y: 0.119118 },
            { y: 0.385402 },
            { y: 0.22708 },
            { y: 0.131181 },
            { y: 0.2440881 }
        ]
    },
    {
        type: "column",
        name: "Average Execution Time(ms)",
        showInLegend: true,
        legendText: "Average Execution Time",
        dataPoints: [
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 },
            { y: 0.169570 }
        ]
    },
    {
        type: "column",
        name: "Average Waiting Time(ms)",
        showInLegend: true,
        legendText: "Average Waiting Time",
        dataPoints: [
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 },
            { y: 3.359450 }
        ]
    },
    {
        type: "column",
        name: "Average Page Service Time(ms)",
        showInLegend: true,
        legendText: "Average Page Service Time",
        dataPoints: [
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 },
            { y: 0.313599 }
        ]
    }]
    })
    var chart = new CanvasJS.Chart("chartContainer5", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Progress Graph"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Execution Time(ms)",
            showInLegend: true,
            legendText: "Execution Time",
            dataPoints: [
                { y: .096199 },
                { y: 0.10223 },
                { y: 0.089261 },
                { y: 0.066645 },
                { y: 0.099214 },
                { y: 0.097104 },
                { y: 0.059409 },
                { y: 0.063329 },
                { y: 0.120626 },
                { y: 0.08263 },
                { y: 0.0756 },
                { y: 0.125316 },
                { y: 0.0653 },
                { y: 0.19592 },
                { y: 0.29632 },
                { y: 0.05932 },
                { y: 0.15629 },
                { y: 0.075652 },
                { y: 0.089632 },
                { y: 0.06026 },
                { y: 0.07562 },
                { y: 0.068506 },
                { y: 0.0585623 },
                { y: 0.06050 },
                { y: 0.05013 },
                { y: 0.05132 },
                { y: 0.079853 },
                { y: 0.095320 },
                { y: 0.01105 },
                { y: 0.19532 }

            ]
        },
        {
            type: "column",
            name: "Waiting Time(ms)",
            showInLegend: true,
            legendText: "Waiting Time",
            dataPoints: [
                { y: 1.24366 },
                { y: 3.520185 },
                { y: 1.889918 },
                { y: .1889918 },
                { y: 3.85212 },
                { y: 2.215608 },
                { y: 0.536487 },
                { y: 0.782567 },
                { y: 2.58297 },
                { y: 4.15408 },
                { y: 1.56151 },
                { y: 4.479771 },
                { y: 2.914037 },
                { y: 1.005121 },
                { y: 3.22236 },
                { y: .979789 },
                { y: 4.334416 },
                { y: 3.115183 },
                { y: 4.053658 },
                { y: 2.807284 },
                { y: .740043 },
                { y: 3.743647 },
                { y: 1.77844 },
                { y: 2.429115 },
                { y: 1.504123 },
                { y: 0.504522 },
                { y: 1.170379 },
                { y: 3.410414 },
                { y: 2.082618 },
                { y: .284378 }

            ]
        },
        {
            type: "column",
            name: "Page Service Time(ms)",
            showInLegend: true,
            legendText: "Page Service Time",
            dataPoints: [
                { y: .107961 },
                { y: .12004 },
                { y: .098011 },
                { y: .08543 },
                { y: .102834 },
                { y: .0769 },
                { y: .198098 },
                { y: .0181118 },
                { y: .899226 },
                { y: .9291 },
                { y: 0.291819 },
                { y: 0.19192 },
                { y: 0.189106 },
                { y: 0.19091 },
                { y: 0.219591 },
                { y: 0.191009 },
                { y: 0.229191 },
                { y: 0.05909 },
                { y: 0.095929 },
                { y: 0.095922 },
                { y: 0.018919 },
                { y: 0.09119 },
                { y: 0.01919 },
                { y: 0.019192 },
                { y: 0.10929 },
                { y: 0.049929 },
                { y: 0.05919 },
                { y: 0.019192 },
                { y: 0.019192 },
                { y: 0.01919 }
            ]
        },
        {
            type: "column",
            name: "Average Execution Time(ms)",
            showInLegend: true,
            legendText: "Average Execution Time",
            dataPoints: [
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 }
            ]
        },
        {
            type: "column",
            name: "Average Waiting Time(ms)",
            showInLegend: true,
            legendText: "Average Waiting Time",
            dataPoints: [
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 }
            ]
        },
        {
            type: "column",
            name: "Average Page Service Time(ms)",
            showInLegend: true,
            legendText: "Average Page Service Time",
            dataPoints: [
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 }
            ]
        }]
    })
    var chart = new CanvasJS.Chart("chartContainer6", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Progress Graph"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Execution Time(ms)",
            showInLegend: true,
            legendText: "Execution Time",
            dataPoints: [
                { y: .151387 },
                { y: 0.122736 },
                { y: 0.194511 },
                { y: 0.08474 },
                { y: 0.169479 },
                { y: 0.097104 },
                { y: 0.109771 },
                { y: 0.158627 },
                { y: 0.238838 },
                { y: 0.176415 },
                { y: 0.125451 },
                { y: 0.140828 },
                { y: 0.120624 },
                { y: 0.212005 },
                { y: 0.086552 },
                { y: 0.164051 },
                { y: 0.178225 },
                { y: 0.150783 },
                { y: 0.169784 },
                { y: 0.112783 },
                { y: 0.171591 },
                { y: 0.280457 },
                { y: 0.163452 },
                { y: 0.136911 },
                { y: 0.179733 },
                { y: 0.149578},
                { y: 0.297042 },
                { y: 0.182446 },
                { y: 0.198733 },
                { y: 0.081122 }

            ]
        },
        {
            type: "column",
            name: "Waiting Time(ms)",
            showInLegend: true,
            legendText: "Waiting Time",
            dataPoints: [
                { y: 1.946009 },
                { y: 5.249669 },
                { y: 3.120308 },
                { y: 0.281965 },
                { y: 5.963176 },
                { y: 3.265663 },
                { y: 0.523821 },
                { y: 1.468929 },
                { y: 3.790691 },
                { y: 6.166731 },
                { y: 2.565728 },
                { y: 5.784045 },
                { y: 3.755708 },
                { y: 1.675501 },
                { y: 4.266 },
                { y: 1.979789 },
                { y: 5.334416 },
                { y: 4.115183 },
                { y: 5.053658 },
                { y: 4.807284 },
                { y: .740043 },
                { y: 5.743647 },
                { y: 2.77844 },
                { y: 3.429115 },
                { y: 2.504123 },
                { y: 0.504522 },
                { y: 1.170379 },
                { y: 3.410414 },
                { y: 4.082618 },
                { y: 3.284378 }

            ]
        },
        {
            type: "column",
            name: "Page Service Time(ms)",
            showInLegend: true,
            legendText: "Page Service Time",
            dataPoints: [
                { y: .107961 },
                { y: .12004 },
                { y: 1.098011 },
                { y: .08543 },
                { y: .182834 },
                { y: .110769 },
                { y: .4398098 },
                { y: .181118 },
                { y: .299226 },
                { y: .17291 },
                { y: 0.15819 },
                { y: 0.18192 },
                { y: 0.189106 },
                { y: 0.11091 },
                { y: 0.191009 },
                { y: 0.149591 },
                { y: 0.1999191 },
                { y: 0.50109 },
                { y: 0.111929 },
                { y: 0.15622 },
                { y: 0.27985 },
                { y: 3.68594 },
                { y: 0.165498 },
                { y: 0.19438 },
                { y: 0.34805 },
                { y: 0.089929 },
                { y: 0.05919 },
                { y: 0.019192 },
                { y: 0.019192 },
                { y: 0.01919 }
            ]
        },
        {
            type: "column",
            name: "Average Execution Time(ms)",
            showInLegend: true,
            legendText: "Average Execution Time",
            dataPoints: [
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.162403 },
                { y: 0.169570 },
                { y: 0.162403 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 },
                { y: 0.169570 }
            ]
        },
        {
            type: "column",
            name: "Average Waiting Time(ms)",
            showInLegend: true,
            legendText: "Average Waiting Time",
            dataPoints: [
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 },
                { y: 3.359450 }
            ]
        },
        {
            type: "column",
            name: "Average Page Service Time(ms)",
            showInLegend: true,
            legendText: "Average Page Service Time",
            dataPoints: [
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 },
                { y: 0.313599 }
            ]
        }]
    })
    var chart = new CanvasJS.Chart("PagesUsedFIFO", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "% of Pages Used"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"
      
        },
        data: [{
            type: "column",
            name: "% of Pages Used",
            showInLegend: true,
            legendText: "% of Pages Used",
            dataPoints: [
                { y: 0.5, color:"RoyalBlue" },
                { y: 0.56, color:"RoyalBlue" },
                { y: 0.5, color:"RoyalBlue" },
                { y: 0.8, color:"RoyalBlue" },
                { y: 0.7, color: "RoyalBlue"},
                { y: 0.7, color: "RoyalBlue"},
                { y: 1.2, color: "RoyalBlue"},
                { y: 1.3, color: "RoyalBlue"},
                { y: .7, color: "RoyalBlue"},
                { y: .5, color: "RoyalBlue"},
                { y: .6, color: "RoyalBlue"},
                { y: .16, color: "RoyalBlue"},
                { y: 1.2, color: "RoyalBlue"},
                { y: 0.8, color: "RoyalBlue"},
                { y: 0.86248, color: "RoyalBlue" },
                { y: 0.5649, color: "RoyalBlue" },
                { y: 0.9865, color: "RoyalBlue"},
                { y: 1.04947, color: "RoyalBlue"},
                { y: 0.73785, color: "RoyalBlue"},
                { y: 0.53786, color: "RoyalBlue"},
                { y: 0.272076, color: "RoyalBlue" },
                { y: 0.99866, color: "RoyalBlue"},
                { y: 1.302232, color: "RoyalBlue"},
                { y: 0.94389, color: "RoyalBlue"},
                { y: 0.83233, color: "RoyalBlue" },
                { y: 0.65443, color: "RoyalBlue"},
                { y: 0.72025, color: "RoyalBlue"},
                { y: 1.0223, color: "RoyalBlue"},
                { y: 0.9115, color: "RoyalBlue"},
                { y: 0.69964, color: "RoyalBlue"}

            ]
        }]
        
    })
    var chart = new CanvasJS.Chart("PagesUsedPriority", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "% of Pages Used"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "% of Pages Used",
            showInLegend: true,
            legendText: "% of Pages Used",
            dataPoints: [
                { y: 0.4, color: "RoyalBlue" },
                { y: 0.56, color: "RoyalBlue" },
                { y: 0.5, color: "RoyalBlue" },
                { y: 0.9, color: "RoyalBlue" },
                { y: 0.4, color: "RoyalBlue" },
                { y: 0.9, color: "RoyalBlue" },
                { y: 1.6, color: "RoyalBlue" },
                { y: 1.9, color: "RoyalBlue" },
                { y: .5, color: "RoyalBlue" },
                { y: .6, color: "RoyalBlue" },
                { y: .7, color: "RoyalBlue" },
                { y: .16, color: "RoyalBlue" },
                { y: 1.6, color: "RoyalBlue" },
                { y: 0.3, color: "RoyalBlue" },
                { y: 0.6, color: "RoyalBlue" },
                { y: 0.5, color: "RoyalBlue" },
                { y: 0.9865, color: "RoyalBlue" },
                { y: 1.44947, color: "RoyalBlue" },
                { y: 0.7785, color: "RoyalBlue" },
                { y: 0.53786, color: "RoyalBlue" },
                { y: 0.172076, color: "RoyalBlue" },
                { y: 1.2866, color: "RoyalBlue" },
                { y: 1.602232, color: "RoyalBlue" },
                { y: 0.94389, color: "RoyalBlue" },
                { y: 0.83233, color: "RoyalBlue" },
                { y: 0.65443, color: "RoyalBlue" },
                { y: 0.72025, color: "RoyalBlue" },
                { y: 1.0223, color: "RoyalBlue" },
                { y: 0.9115, color: "RoyalBlue" },
                { y: 0.69964, color: "RoyalBlue" }

            ]
        }]
        
    })
    var chart = new CanvasJS.Chart("PagesUsedSJF", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: " % of Pages Used"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "% of Pages Used",
            showInLegend: true,
            legendText: "% of Pages Used",
            dataPoints: [
                { y: 0.2, color: "RoyalBlue" },
                { y: 0.16, color: "RoyalBlue" },
                { y: 0.7, color: "RoyalBlue" },
                { y: 0.6, color: "RoyalBlue" },
                { y: 0.5, color: "RoyalBlue" },
                { y: 0.1, color: "RoyalBlue" },
                { y: 2, color: "RoyalBlue" },
                { y: 1.9, color: "RoyalBlue" },
                { y: .3, color: "RoyalBlue" },
                { y: .2, color: "RoyalBlue" },
                { y: .5, color: "RoyalBlue" },
                { y: .36, color: "RoyalBlue" },
                { y: 1.8, color: "RoyalBlue" },
                { y: 0.2, color: "RoyalBlue" },
                { y: 0.8, color: "RoyalBlue" },
                { y: 0.4, color: "RoyalBlue" },
                { y: 0.7, color: "RoyalBlue" },
                { y: 1.7, color: "RoyalBlue" },
                { y: 0.5, color: "RoyalBlue" },
                { y: 0.7, color: "RoyalBlue" },
                { y: 0.3, color: "RoyalBlue" },
                { y: 1.5, color: "RoyalBlue" },
                { y: 1.7, color: "RoyalBlue" },
                { y: 0.5, color: "RoyalBlue" },
                { y: 0.9, color: "RoyalBlue" },
                { y: 0.65443, color: "RoyalBlue" },
                { y: 0.72025, color: "RoyalBlue" },
                { y: 1.3, color: "RoyalBlue" },
                { y: 0.9115, color: "RoyalBlue" },
                { y: 0.69964, color: "RoyalBlue" }

            ]
        }]

    })
    var chart = new CanvasJS.Chart("ExecutionTimeGraph1", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Execution Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Exection Time",
            showInLegend: true,
            legendText: "Exection Time",
            dataPoints: [
                { y: 0.09, color: "Yellow" },
                { y: 0.15, color: "Yellow" },
                { y: 0.12, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: 0.11, color: "Yellow" },
                { y: 0.13, color: "Yellow" },
                { y: 0.075, color: "Yellow" },
                { y: 0.067, color: "Yellow" },
                { y: .09, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .13, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .11, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.094, color: "Yellow" },
                { y: 0.061, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: 0.13, color: "Yellow" },
                { y: 0.06, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: .105, color: "Yellow" },
                { y: 0.12, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.05, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .11, color: "Yellow" },
                { y: 0.06, color: "Yellow" }

            ]
        }]

    })
    var chart = new CanvasJS.Chart("ExecutionTimeGraph2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Execution Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Exection Time",
            showInLegend: true,
            legendText: "Exection Time ",
            dataPoints: [
                { y: 0.18, color: "Yellow" },
                { y: 0.20, color: "Yellow" },
                { y: 0.16, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.43, color: "Yellow" },
                { y: 0.05, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: .16, color: "Yellow" },
                { y: .27, color: "Yellow" },
                { y: .21, color: "Yellow" },
                { y: .16, color: "Yellow" },
                { y: .14, color: "Yellow" },
                { y: 0.11, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.06, color: "Yellow" },
                { y: 0.51, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .22, color: "Yellow" },
                { y: 0.5, color: "Yellow" },
                { y: 0.15, color: "Yellow" },
                { y: 0.14, color: "Yellow" },
                { y: .10, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.03, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.18, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .08, color: "Yellow" },
                { y: 0.06, color: "Yellow" }

            ]
        }]

    })
    var chart = new CanvasJS.Chart("ExecutionTimeGraph3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Execution Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Exection Time",
            showInLegend: true,
            legendText: "Exection Time ",
            dataPoints: [
                { y: 0.092, color: "Yellow" },
                { y: 0.093, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: 0.061, color: "Yellow" },
                { y: 0.096, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.061, color: "Yellow" },
                { y: 0.07, color: "Yellow" },
                { y: .082, color: "Yellow" },
                { y: .10, color: "Yellow" },
                { y: .092, color: "Yellow" },
                { y: .07, color: "Yellow" },
                { y: .09, color: "Yellow" },
                { y: 0.052, color: "Yellow" },
                { y: 0.094, color: "Yellow" },
                { y: 0.14, color: "Yellow" },
                { y: 0.07, color: "Yellow" },
                { y: .09, color: "Yellow" },
                { y: .05, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: 0.13, color: "Yellow" },
                { y: 0.078, color: "Yellow" },
                { y: .10, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.092, color: "Yellow" },
                { y: 0.072, color: "Yellow" },
                { y: 0.052, color: "Yellow" },
                { y: .09, color: "Yellow" },
                { y: .14, color: "Yellow" },
                { y: 0.09, color: "Yellow" }

            ]
        }]

    })
    var chartexecutiontime4 = new CanvasJS.Chart("ExecutionTimeGraph4", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Execution Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Exection Time",
            showInLegend: true,
            legendText: "Exection Time ",
            dataPoints: [
                { y: 0.08866, color: "Yellow" },
                { y: 0.16, color: "Yellow" },
                { y: 0., color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: 0.09, color: "Yellow" },
                { y: 0.43, color: "Yellow" },
                { y: 0.05, color: "Yellow" },
                { y: 0.10, color: "Yellow" },
                { y: .16, color: "Yellow" },
                { y: .27, color: "Yellow" },
                { y: .21, color: "Yellow" },
                { y: .16, color: "Yellow" },
                { y: .14, color: "Yellow" },
                { y: 0.11, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.06, color: "Yellow" },
                { y: 0.51, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .22, color: "Yellow" },
                { y: 0.5, color: "Yellow" },
                { y: 0.15, color: "Yellow" },
                { y: 0.14, color: "Yellow" },
                { y: .10, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.03, color: "Yellow" },
                { y: 0.17, color: "Yellow" },
                { y: 0.18, color: "Yellow" },
                { y: .12, color: "Yellow" },
                { y: .08, color: "Yellow" },
                { y: 0.06, color: "Yellow" }

            ]
        }]

    })
    var chartwaitingTime1 = new CanvasJS.Chart("WaitingTime1", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Waiting Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Waiting Time",
            showInLegend: true,
            legendText: "Waiting Time ",
            dataPoints: [
                { y: 3.458352, color: "#2F4F4F" },
                { y: 3.492125, color: "#2F4F4F" },
                { y: 2.948404, color: "#2F4F4F" },
                { y: 2.134783, color: "#2F4F4F" },
                { y: 3.551233, color: "#2F4F4F" },
                { y: 3.001179, color: "#2F4F4F" },
                { y: 2.190572, color: "#2F4F4F" },
                { y: 2.243344, color: "#2F4F4F" },
                { y: 2.243344, color: "#2F4F4F" },
                { y: 3.586517, color: "#2F4F4F" },
                { y: 3.621496, color: "#2F4F4F" },
                { y: 3.621497, color: "#2F4F4F" },
                { y: 3.10341, color: "#2F4F4F" },
                { y: 1.955048, color: "#2F4F4F" },
                { y: 3.153168, color: "#2F4F4F" },
                { y: 1.68544, color: "#2F4F4F" },
                { y: 3.712872, color: "#2F4F4F" },
                { y: 3.197195, color: "#2F4F4F" },
                { y: 3.246955, color: "#2F4F4F" },
                { y: 3.274399, color: "#2F4F4F" },
                { y: 2.34075, color: "#2F4F4F" },
                { y: 3.749966, color: "#2F4F4F" },
                { y: 3.310585, color: "#2F4F4F" },
                { y: 3.359138, color: "#2F4F4F" },
                { y: 2.727912, color: "#2F4F4F" },
                { y: 2.063308, color: "#2F4F4F" },
                { y: 3.802135, color: "#2F4F4F" },
                { y: 3.830783, color: "#2F4F4F" },
                { y: 3.416432, color: "#2F4F4F" },
                { y: 2.442983, color: "#2F4F4F" }

            ]
        }]

    })
    var chartwaitingTime2 = new CanvasJS.Chart("WaitingTime2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Waiting Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Waiting Time",
            showInLegend: true,
            legendText: "Waiting Time ",
            dataPoints: [
                { y: 5.523472, color: "#2F4F4F" },
                { y: 5.644699, color: "#2F4F4F" },
                { y: 4.357938, color: "#2F4F4F" },
                { y: 3.568, color: "#2F4F4F" },
                { y: 5.088632, color: "#2F4F4F" },
                { y: 4.4279, color: "#2F4F4F" },
                { y: 3.117895, color: "#2F4F4F" },
                { y: 3.103119, color: "#2F4F4F" },
                { y: 4.321449, color: "#2F4F4F" },
                { y: 4.994244, color: "#2F4F4F" },
                { y: 5.150154, color: "#2F4F4F" },
                { y: 5.002081, color: "#2F4F4F" },
                { y: 4.614872, color: "#2F4F4F" },
                { y: 2.731286, color: "#2F4F4F" },
                { y: 4.559381, color: "#2F4F4F" },
                { y: 2.250891, color: "#2F4F4F" },
                { y: 5.144725, color: "#2F4F4F" },
                { y: 4.4279, color: "#2F4F4F" },
                { y: 4.506305, color: "#2F4F4F" },
                { y: 4.741829, color: "#2F4F4F" },
                { y: 3.289786, color: "#2F4F4F" },
                { y: 5.18308, color: "#2F4F4F "},
                { y: 4.76596, color: "#2F4F4F" },
                { y: 4.865619, color: "#2F4F4F" },
                { y: 3.980981, color: "#2F4F4F" },
                { y: 2.91102, color: "#2F4F4F" },
                { y: 4.80335, color: "#2F4F4F" },
                { y: 5.192374, color: "#2F4F4F" },
                { y: 4.8133, color: "#2F4F4F" },
                { y: 3.41644, color: "#2F4F4F" }

            ]
        }]

    })
    var chartwaitingtime3 = new CanvasJS.Chart("WaitingTime3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Waiting Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Waiting Time",
            showInLegend: true,
            legendText: "Waiting Time ",
            dataPoints: [
                { y: 3.458352, color: "#2F4F4F" },
                { y: 3.592125, color: "#2F4F4F" },
                { y: 2.248404, color: "#2F4F4F" },
                { y: 2.834783, color: "#2F4F4F" },
                { y: 3.051233, color: "#2F4F4F" },
                { y: 3.601179, color: "#2F4F4F" },
                { y: 2.490572, color: "#2F4F4F" },
                { y: 2.743344, color: "#2F4F4F" },
                { y: 2.643344, color: "#2F4F4F" },
                { y: 3.986517, color: "#2F4F4F" },
                { y: 3.921496, color: "#2F4F4F" },
                { y: 3.321497, color: "#2F4F4F" },
                { y: 3.60341, color: "#2F4F4F" },
                { y: 1.355048, color: "#2F4F4F" },
                { y: 3.753168, color: "#2F4F4F" },
                { y: 1.98544, color: "#2F4F4F" },
                { y: 3.912872, color: "#2F4F4F" },
                { y: 3.697195, color: "#2F4F4F" },
                { y: 3.646955, color: "#2F4F4F" },
                { y: 3.474399, color: "#2F4F4F" },
                { y: 2.84075, color: "#2F4F4F" },
                { y: 3.849966, color: "#2F4F4F" },
                { y: 3.610585, color: "#2F4F4F" },
                { y: 3.659138, color: "#2F4F4F" },
                { y: 2.827912, color: "#2F4F4F" },
                { y: 2.563308, color: "#2F4F4F" },
                { y: 3.602135, color: "#2F4F4F" },
                { y: 3.930783, color: "#2F4F4F" },
                { y: 3.516432, color: "#2F4F4F" },
                { y: 2.742983, color: "#2F4F4F" }

            ]
        }]

    })
    var chartwaitingtime4 = new CanvasJS.Chart("WaitingTime4", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Waiting Time"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Waiting Time",
            showInLegend: true,
            legendText: "Waiting Time ",
            dataPoints: [
                { y: 3.458352, color: "#2F4F4F" },
                { y: 3.492125, color: "#2F4F4F" },
                { y: 2.948404, color: "#2F4F4F" },
                { y: 2.134783, color: "#2F4F4F" },
                { y: 3.551233, color: "#2F4F4F" },
                { y: 3.001179, color: "#2F4F4F" },
                { y: 2.190572, color: "#2F4F4F" },
                { y: 2.243344, color: "#2F4F4F" },
                { y: 2.243344, color: "#2F4F4F" },
                { y: 3.586517, color: "#2F4F4F" },
                { y: 3.621496, color: "#2F4F4F" },
                { y: 3.621497, color: "#2F4F4F" },
                { y: 3.10341, color: "#2F4F4F" },
                { y: 1.955048, color: "#2F4F4F" },
                { y: 3.153168, color: "#2F4F4F" },
                { y: 1.68544, color: "#2F4F4F" },
                { y: 3.712872, color: "#2F4F4F" },
                { y: 3.197195, color: "#2F4F4F" },
                { y: 3.246955, color: "#2F4F4F" },
                { y: 3.274399, color: "#2F4F4F" },
                { y: 2.34075, color: "#2F4F4F" },
                { y: 3.749966, color: "#2F4F4F" },
                { y: 3.310585, color: "#2F4F4F" },
                { y: 3.359138, color: "#2F4F4F" },
                { y: 2.727912, color: "#2F4F4F" },
                { y: 2.063308, color: "#2F4F4F" },
                { y: 3.802135, color: "#2F4F4F" },
                { y: 3.830783, color: "#2F4F4F" },
                { y: 3.416432, color: "#2F4F4F "},
                { y: 2.442983, color: "#2F4F4F" }

            ]
        }]

    })
    var chartfault1 = new CanvasJS.Chart("PageService1", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Service"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Service",
            showInLegend: true,
            legendText: "Page Service ",
            dataPoints: [
                { y: .0116101, color: "Blue" },
                { y: .102231, color: "Blue" },
                { y: .093186, color: "Blue" },
                { y: .062424, color: "Blue" },
                { y: .098309, color: "Blue" },
                { y: .090167, color: "Blue" },
                { y: .062122, color: "Blue" },
                { y: .063934, color: "Blue" },
                { y: .09258, color: "Blue" },
                { y: .109768, color: "Blue" },
                { y: .099819, color: "Blue" },
                { y: .096201, color: "Blue" },
                { y: .090169, color: "Blue" },
                { y: .056092, color: "Blue" },
                { y: .091074, color: "Blue" },
                { y: .050963, color: "Blue" },
                { y: .099819, color: "Blue" },
                { y: .090772, color: "Blue" },
                { y: .088961, color: "Blue" },
                { y: .090469, color: "Blue" },
                { y: .062726, color: "Blue" },
                { y: .102232, color: "Blue" },
                { y: .090167, color: "Blue" },
                { y: .090168, color: "Blue" },
                { y: .077803, color: "Blue" },
                { y: .055187, color: "Blue" },
                { y: .099214, color: "Blue" },
                { y: .10977, color: "Blue" },
                { y: .090168, color: "Blue" },
                { y: .061822, color: "Blue" }

            ]
        }]

    })
    var chartfault1 = new CanvasJS.Chart("PageService2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Service"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Service",
            showInLegend: true,
            legendText: "Page Service ",
            dataPoints: [
                { y: .143848, color: "Blue" },
                { y: .118511, color: "Blue" },
                { y: .123039, color: "Blue" },
                { y: .07122, color: "Blue" },
                { y: .102837, color: "Blue" },
                { y: .106755, color: "Blue" },
                { y: .069662, color: "Blue" },
                { y: .117007, color: "Blue" },
                { y: .093786, color: "Blue" },
                { y: .120325, color: "Blue" },
                { y: .102831, color: "Blue" },
                { y: .122736, color: "Blue" },
                { y: .112485, color: "Blue" },
                { y: .060615, color: "Blue" },
                { y: .101932, color: "Blue" },
                { y: .060313, color: "Blue" },
                { y: .12515, color: "Blue" },
                { y: .132087, color: "Blue" },
                { y: .092882, color: "Blue" },
                { y: .109165, color: "Blue" },
                { y: .08414, color: "Blue" },
                { y: .123023, color: "Blue" },
                { y: .135704, color: "Blue" },
                { y: .108865, color: "Blue" },
                { y: .093486, color: "Blue" },
                { y: .061521, color: "Blue" },
                { y: .136912, color: "Blue" },
                { y: .105251, color: "Blue" },
                { y: .092279, color: "Blue" },
                { y: .075696, color: "Blue" }

            ]
        }]

    })
    var chartfault1 = new CanvasJS.Chart("PageService3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Service"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Service",
            showInLegend: true,
            legendText: "Page Service ",
            dataPoints: [
                { y: .131481, color: "Blue" },
                { y: .10404, color: "Blue" },
                { y: .105549, color: "Blue" },
                { y: .091974, color: "Blue" },
                { y: .103737, color: "Blue" },
                { y: .108562, color: "Blue" },
                { y: .80821, color: "Blue" },
                { y: .075693, color: "Blue" },
                { y: .101928, color: "Blue" },
                { y: .127262, color: "Blue" },
                { y: .113391, color: "Blue" },
                { y: .098916, color: "Blue" },
                { y: .098914, color: "Blue" },
                { y: .067853, color: "Blue" },
                { y: .108565, color: "Blue" },
                { y: .059108, color: "Blue" },
                { y: .108263, color: "Blue" },
                { y: .100422, color: "Blue" },
                { y: .098614, color: "Blue" },
                { y: .100421, color: "Blue" },
                { y: .087153, color: "Blue" },
                { y: .104341, color: "Blue" },
                { y: .105851, color: "Blue" },
                { y: .103739, color: "Blue" },
                { y: .09258, color: "Blue" },
                { y: .072074, color: "Blue" },
                { y: .125752, color: "Blue" },
                { y: .10615, color: "Blue" },
                { y: .102531, color: "Blue" },
                { y: .08474, color: "Blue" }

            ]
        }]

    })
    var chartfault1 = new CanvasJS.Chart("PageService4", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Service"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Service",
            showInLegend: true,
            legendText: "Page Service ",
            dataPoints: [
                { y: .21, color: "Blue" },
                { y: .23402231, color: "Blue" },
                { y: .193186, color: "Blue" },
                { y: .762424, color: "Blue" },
                { y: .498309, color: "Blue" },
                { y: .390167, color: "Blue" },
                { y: .062122, color: "Blue" },
                { y: .163934, color: "Blue" },
                { y: .29258, color: "Blue" },
                { y: .109768, color: "Blue" },
                { y: .059819, color: "Blue" },
                { y: .066201, color: "Blue" },
                { y: .040169, color: "Blue" },
                { y: .036092, color: "Blue" },
                { y: .081074, color: "Blue" },
                { y: .0670963, color: "Blue" },
                { y: .059819, color: "Blue" },
                { y: .020772, color: "Blue" },
                { y: .058961, color: "Blue" },
                { y: .030469, color: "Blue" },
                { y: .022726, color: "Blue" },
                { y: .122232, color: "Blue" },
                { y: .060167, color: "Blue" },
                { y: .050168, color: "Blue" },
                { y: .037803, color: "Blue" },
                { y: .035187, color: "Blue" },
                { y: .089214, color: "Blue" },
                { y: .15977, color: "Blue" },
                { y: .060168, color: "Blue" },
                { y: .041822, color: "Blue" }

            ]
        }]

    })

    var chartfault1 = new CanvasJS.Chart("PageFault1", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Fault"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Fault",
            showInLegend: true,
            legendText: "Page Fault ",
            dataPoints: [
                { y: 14, color: "Red" },
                { y: 14, color: "Red" },
                { y: 13, color: "Red" },
                { y: 9, color: "Red" },
                { y: 14, color: "Red" },
                { y: 13, color: "Red" },
                { y: 9, color: "Red" },
                { y: 9, color: "Red" },
                { y: 9, color: "Red" },
                { y: 13, color: "Red" },
                { y: 8, color: "Red" },
                { y: 7, color: "Red" },
                { y: 14, color: "Red" },
                { y: 13, color: "Red" },
                { y: 13, color: "Red" },
                { y: 13, color: "Red" },
                { y: 14, color: "Red" },
                { y: 13, color: "Red" },
                { y: 13, color: "Red" },
                { y: 11, color: "Red" },
                { y: 8, color: "Red" },
                { y: 14, color: "Red" },
                { y: 14, color: "Red" },
                { y: 13, color: "Red" },
                { y: 9, color: "Red" },
                { y: 8, color: "Red" },
                { y: 8, color: "Red" },
                { y: 5, color: "Red" },
                { y: 7, color: "Red" },
                { y: 4, color: "Red" }

            ]
        }]

    })
    var chartfault2 = new CanvasJS.Chart("PageFault2", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Fault"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Fault",
            showInLegend: true,
            legendText: "Page Fault ",
            dataPoints: [
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 14, color: "Red" },
                { y: 14, color: "Red" },
                { y: 8, color: "Red" },
                { y: 9, color: "Red" },
                { y: 15, color: "Red" },
                { y: 15, color: "Red" },
                { y: 13, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 8, color: "Red" },
                { y: 14, color: "Red" },
                { y: 18, color: "Red" },
                { y: 19, color: "Red" },
                { y: 14, color: "Red" },
                { y: 11, color: "Red" },
                { y: 10, color: "Red" },
                { y: 7, color: "Red" },
                { y: 5, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 17, color: "Red" },
                { y: 15, color: "Red" },
                { y: 14, color: "Red" },
                { y: 14, color: "Red" },
                { y: 11, color: "Red" },
                { y: 14, color: "Red" },
                { y: 16, color: "Red "},
                { y: 18, color: "Red" }

            ]
        }]

    })
    var chartfault3 = new CanvasJS.Chart("PageFault3", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Fault"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Fault",
            showInLegend: true,
            legendText: "Page Fault ",
            dataPoints: [
                { y: 18, color: "Red" },
                { y: 15, color: "Red" },
                { y: 13, color: "Red" },
                { y: 18, color: "Red" },
                { y: 15, color: "Red" },
                { y: 18, color: "Red" },
                { y: 15, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 10, color: "Red" },
                { y: 7, color: "Red" },
                { y: 8, color: "Red" },
                { y: 5, color: "Red" },
                { y: 7, color: "Red" },
                { y: 9, color: "Red" },
                { y: 10, color: "Red" },
                { y: 13, color: "Red" },
                { y: 15, color: "Red" },
                { y: 17, color: "Red" },
                { y: 14, color: "Red" },
                { y: 15, color: "Red" },
                { y: 17, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 7, color: "Red" },
                { y: 8, color: "Red" },
                { y: 9, color: "Red" },
                { y: 6, color: "Red" },
                { y: 4, color: "Red "},
                { y: 7, color: "Red" }

            ]
        }]

    })
    var chartfault4 = new CanvasJS.Chart("PageFault4", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Page Fault"
        },
        axisY: {
            includeZero: false
        },
        legend: {
            cursor: "pointer"

        },
        data: [{
            type: "column",
            name: "Page Fault",
            showInLegend: true,
            legendText: "Page Fault ",
            dataPoints: [
                { y: 14, color: "Red" },
                { y: 12, color: "Red" },
                { y: 9, color: "Red" },
                { y: 6, color: "Red" },
                { y: 7, color: "Red" },
                { y: 4, color: "Red" },
                { y: 8, color: "Red" },
                { y: 9, color: "Red" },
                { y: 13, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 10, color: "Red" },
                { y: 8, color: "Red" },
                { y: 4, color: "Red" },
                { y: 8, color: "Red" },
                { y: 12, color: "Red" },
                { y: 15, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 16, color: "Red" },
                { y: 15, color: "Red" },
                { y: 14, color: "Red" },
                { y: 14, color: "Red" },
                { y: 19, color: "Red" },
                { y: 12, color: "Red" },
                { y: 11, color: "Red" },
                { y: 7, color: "Red" },
                { y: 9, color: "Red" },
                { y: 12, color: "Red" },
                { y: 16, color: "Red" }

            ]
        }]

    })

}
