$(function() {
    $("dd").hide();
    $("dt a").click(function() {
        $(this).parent().next().slideToggle();
        return false;
    });
    initTable();
    drawGaugeCanvas();
    setChartTitleClickFun();
    setKeyChartAndTable();
    setPayChartAndTable();
    setPlayerChartAndTable();
    setPlaytimeChartAndTable();

    $.getJSON("service.php",function(json){
        if(json.length>0){
            //第一個panel
            var equipment = json.equipment;
            $("#number").html(equipment);
            var newplayer = json.newplayer;
            $("#number1").html(equipment);
            var payplayer = json.payplayer;
            $("#number2").html(equipment);
            var income = json.income;
            $("#number3").html(equipment);

            //第二個panel        
            var trendData1 = new Array(8);
            var trendData2 = new Array(8);
            for(var i=0; i<8; i++){
                trendData1[i] = json.trendData1[i];
                trendData2[i] = json.trendData2[i];
            }
            drawTrendChart(trendData1, trendData2, "myChart");

            //第三個panel
            var sumEquipment = json.sumEquipment;
            $("#sumEquip").html(sumEquipment);
            var sumAccount = json.sumAccount;
            $("#sumAccount").html(sumAccount);
            var avgEquipment = json.avgEquipment;
            $("#avgEquip").html(avgEquipment);
            var avgAccount = json.avgAccount;
            $("#angAccount").html(equipment);  
            var keyData1 = new Array(8);
            var keyData2 = new Array(8);        
            for(var i=0; i<8; i++){
                keyData1[i] = json.keyData1[i];
                keyData2[i] = json.keyData2[i];
            } 
            drawKeyChart(keyData1, keyData2, "keyChart1");

            //第四個panel
            var dayPay = json.dayPay;
            $("#dayPay").html(dayPay);
            var payData1 = new Array(8);  
            for(var i=0; i<8; i++){
                payData1[i] = json.payData1[i];
            } 
            drawPayChart(payData1, "payChart1");

            //第五個panel
            var newAccountStay_1 = json.newAccountStay_1;
            $("#stay_1").html(newAccountStay_1);
            var newAccountStay_2 = json.newAccountStay_2;
            $("#stay_2").html(newAccountStay_2);  
            var newAccountStay_3 = json.newAccountStay_3;
            $("#stay_3").html(newAccountStay_3);                  
            var playerData1 = new Array(8);  
            var playerData2 = new Array(8); 
            var playerData3 = new Array(8); 
            for(var i=0; i<8; i++){
                playerData1[i] = json.playerData1[i];
                playerData2[i] = json.playerData2[i];
                playerData3[i] = json.playerData3[i];
            } 
            drawPlayerChart(playerData1, playerData2, playerData3, "playerChar1"); 

            //第六個panel
            var avgPlaytime = json.avgPlaytime;
            $("#avgPlaytime").html(avgPlaytime);           
            var playtimeData = new Array(8);  
            for(var i=0; i<8; i++){
                playtimeData[i] = json.playtimeData[i];
            }       
            drawPlaytimeChart(playtimeData, "playtimeChar1");      
        }
    });
});

function drawGaugeCanvas() {
    //畫字
    var gauge_ctx = document.getElementById("gaugeChart").getContext("2d");
    gauge_ctx.fillStyle = "#AAA";
    gauge_ctx.font = "12px Arial";
    gauge_ctx.fillText("平均ACU", 71, 25);

    gauge_ctx.fillStyle = "#333";
    gauge_ctx.font = "bold 40px Arial";
    gauge_ctx.fillText("341", 64, 62);

    //畫並填充灰色半圓
    gauge_ctx.beginPath();
    gauge_ctx.moveTo(100, 150);
    gauge_ctx.arc(100, 150, 80, Math.PI, Math.PI * 2, false);
    gauge_ctx.closePath();
    gauge_ctx.fillStyle = "#AAA";
    gauge_ctx.fill();

    //畫並填充綠色小角度圓
    gauge_ctx.beginPath();
    gauge_ctx.moveTo(100, 150);
    gauge_ctx.arc(100, 150, 80, Math.PI, 3.8, false);
    gauge_ctx.closePath();
    gauge_ctx.fillStyle = "green";
    gauge_ctx.fill();

    //畫並填充白色小半圓
    gauge_ctx.beginPath();
    gauge_ctx.moveTo(100, 150);
    gauge_ctx.arc(100, 150, 40, Math.PI, 2 * Math.PI, false);
    gauge_ctx.closePath();
    gauge_ctx.fillStyle = 'rgba(255,255,255,1)';
    gauge_ctx.fill();

    gauge_ctx.beginPath();
    gauge_ctx.fillStyle = "#AAA";
    gauge_ctx.lineWidth = 5;
    gauge_ctx.moveTo(100, 150);
    gauge_ctx.lineTo(30, 100);
    gauge_ctx.stroke();

    gauge_ctx.fillStyle = "#AAA";
    gauge_ctx.font = "18px Arial";
    gauge_ctx.fillText("Max", 82, 170);

    gauge_ctx.fillStyle = "#333";
    gauge_ctx.font = "bold 10px Arial";
    gauge_ctx.fillText("1527", 84, 190);
}

function setChartTitleClickFun() {
    $("#change1").click(function() {
        $("#playval_1").html("");
        $("#playval_1").html("<h5>SUM 设备 | 账户：</h5><h4>55411</h4> | <h4>65543</h4>&nbsp;&nbsp;&nbsp;&nbsp; <h5>AVG 设备 | 账户：</h5><h4>6926</h4> | <h4>8193</h4>");
        $(".panel_2").removeClass("choosed_1");  
        $(".panel_2").removeClass("choosed_2"); 
        $(".panel_2").removeClass("choosed_3"); 
        $(".panel_2").removeClass("choosed_4"); 
        $(".panel_2").addClass("choosed_1");          

        if($(".panel_2").hasClass("choosed_table")){
            $("#keyChar_1").hide();
            $("#keyChar_2").hide();
            $("#keyChar_3").hide();
            $("#keyChar_4").hide();           
        }   

        $("#keyCharttable1").hide();
        $("#keyCharttable2").hide();
        $("#keyCharttable3").hide();
        $("#keyCharttable4").hide(); 

        if($(".panel_2").hasClass("choosed_table")){
            if($(".panel_2").hasClass("choosed_1")){
                $("#keyCharttable1").show();
            }
            else if($(".panel_2").hasClass("choosed_2")){
                $("#keyCharttable2").show();
            }
            else if($(".panel_2").hasClass("choosed_3")){
                $("#keyCharttable3").show();
            }
            else if($(".panel_2").hasClass("choosed_4")){
                $("#keyCharttable4").show();
            }
        }
    });

    $("#change2").click(function() {
        $("#playval_1").html("");
        $("#playval_1").html("<h5>AVG ：</h5><h4>27151</h4>");
        $(".panel_2").removeClass("choosed_1");  
        $(".panel_2").removeClass("choosed_2"); 
        $(".panel_2").removeClass("choosed_3"); 
        $(".panel_2").removeClass("choosed_4"); 
        $(".panel_2").addClass("choosed_2"); 

        if($(".panel_2").hasClass("choosed_table")){
            $("#keyChar_1").hide();
            $("#keyChar_2").hide();
            $("#keyChar_3").hide();
            $("#keyChar_4").hide();           
        }      

        $("#keyCharttable1").hide();
        $("#keyCharttable2").hide();
        $("#keyCharttable3").hide();
        $("#keyCharttable4").hide(); 
        
        if($(".panel_2").hasClass("choosed_table")){
            if($(".panel_2").hasClass("choosed_1")){
                $("#keyCharttable1").show();
            }
            else if($(".panel_2").hasClass("choosed_2")){
                $("#keyCharttable2").show();
            }
            else if($(".panel_2").hasClass("choosed_3")){
                $("#keyCharttable3").show();
            }
            else if($(".panel_2").hasClass("choosed_4")){
                $("#keyCharttable4").show();
            }
        }
    });
    $("#change3").click(function() {
        $("#playval_1").html("");
        $("#playval_1").html("<h5>AVG ：</h5><h4>242</h4>");
        $(".panel_2").removeClass("choosed_1");  
        $(".panel_2").removeClass("choosed_2"); 
        $(".panel_2").removeClass("choosed_3"); 
        $(".panel_2").removeClass("choosed_4"); 
        $(".panel_2").addClass("choosed_3"); 

        if($(".panel_2").hasClass("choosed_table")){
            $("#keyChar_1").hide();
            $("#keyChar_2").hide();
            $("#keyChar_3").hide();
            $("#keyChar_4").hide();           
        }   

        $("#keyCharttable1").hide();
        $("#keyCharttable2").hide();
        $("#keyCharttable3").hide();
        $("#keyCharttable4").hide(); 
        
        if($(".panel_2").hasClass("choosed_table")){ 
            if($(".panel_2").hasClass("choosed_1")){
                $("#keyCharttable1").show();
            }
            else if($(".panel_2").hasClass("choosed_2")){
                $("#keyCharttable2").show();
            }
            else if($(".panel_2").hasClass("choosed_3")){
                $("#keyCharttable3").show();
            }
            else if($(".panel_2").hasClass("choosed_4")){
                $("#keyCharttable4").show();
            }   
        }
    });
    $("#change4").click(function() {
        $("#playval_1").html("");
        $("#playval_1").html("<h5>SUM ：</h5><h4>908.16</h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <h5>AVG ：</h5><h4>113.52</h4> ");
        $(".panel_2").removeClass("choosed_1");  
        $(".panel_2").removeClass("choosed_2"); 
        $(".panel_2").removeClass("choosed_3"); 
        $(".panel_2").removeClass("choosed_4"); 
        $(".panel_2").addClass("choosed_4"); 

        if($(".panel_2").hasClass("choosed_table")){
            $("#keyChar_1").hide();
            $("#keyChar_2").hide();
            $("#keyChar_3").hide();
            $("#keyChar_4").hide();           
        }   

        $("#keyCharttable1").hide();
        $("#keyCharttable2").hide();
        $("#keyCharttable3").hide();
        $("#keyCharttable4").hide(); 
        
        if($(".panel_2").hasClass("choosed_table")){
            if($(".panel_2").hasClass("choosed_1")){
                $("#keyCharttable1").show();
            }
            else if($(".panel_2").hasClass("choosed_2")){
                $("#keyCharttable2").show();
            }
            else if($(".panel_2").hasClass("choosed_3")){
                $("#keyCharttable3").show();
            }
            else if($(".panel_2").hasClass("choosed_4")){
                $("#keyCharttable4").show();
            }   
        }
    });
    $("#payChange1").click(function() {
        $("#payVal").html("");
        $("#payVal").html("<h5>AVG：</h5><h4>1%</h4>");

        $(".panel_3").removeClass("choosed_1");  
        $(".panel_3").removeClass("choosed_2"); 
        $(".panel_3").removeClass("choosed_3"); 
        $(".panel_3").addClass("choosed_1"); 
        if($(".panel_3").hasClass("choosed_table")){
            $("#payChar_1").hide();
            $("#payChar_2").hide();
            $("#payChar_3").hide();        
        }   

        $("#payCharttable1").hide();
        $("#payCharttable2").hide();
        $("#payCharttable3").hide();
        
        if($(".panel_3").hasClass("choosed_table")){
            if($(".panel_3").hasClass("choosed_1")){
                $("#payCharttable1").show();
            }
            else if($(".panel_3").hasClass("choosed_2")){
                $("#payCharttable2").show();
            }
            else if($(".panel_3").hasClass("choosed_3")){
                $("#payCharttable3").show();
            }  
        }
    });
    $("#payChange2").click(function() {
        $("#payVal").html("");
        $("#payVal").html("<h5>AVG：</h5><h4>&yen;0.00</h4>");

        $(".panel_3").removeClass("choosed_1");  
        $(".panel_3").removeClass("choosed_2"); 
        $(".panel_3").removeClass("choosed_3"); 
        $(".panel_3").addClass("choosed_2"); 

        if($(".panel_3").hasClass("choosed_table")){
            $("#payChar_1").hide();
            $("#payChar_2").hide();
            $("#payChar_3").hide();        
        }   

        $("#payCharttable1").hide();
        $("#payCharttable2").hide();
        $("#payCharttable3").hide();
        
        if($(".panel_3").hasClass("choosed_table")){
            if($(".panel_3").hasClass("choosed_1")){
                $("#payCharttable1").show();
            }
            else if($(".panel_3").hasClass("choosed_2")){
                $("#payCharttable2").show();
            }
            else if($(".panel_3").hasClass("choosed_3")){
                $("#payCharttable3").show();
            }  
        }
    });
    $("#payChange3").click(function() {
        $("#payVal").html("");
        $("#payVal").html("<h5>AVG：</h5><h4>&yen;0.47</h4>");

        $(".panel_3").removeClass("choosed_1");  
        $(".panel_3").removeClass("choosed_2"); 
        $(".panel_3").removeClass("choosed_3"); 
        $(".panel_3").addClass("choosed_3"); 

        if($(".panel_3").hasClass("choosed_table")){
            $("#payChar_1").hide();
            $("#payChar_2").hide();
            $("#payChar_3").hide();        
        }   

        $("#payCharttable1").hide();
        $("#payCharttable2").hide();
        $("#payCharttable3").hide();
        
        if($(".panel_3").hasClass("choosed_table")){
            if($(".panel_3").hasClass("choosed_1")){
                $("#payCharttable1").show();
            }
            else if($(".panel_3").hasClass("choosed_2")){
                $("#payCharttable2").show();
            }
            else if($(".panel_3").hasClass("choosed_3")){
                $("#payCharttable3").show();
            }  
        }
    });
    /*-------------------*/
    $("#playChange1").click(function() {
        $("#playerVal").html("");
        $("#playerVal").html("<h5>AVG：次日</h5><h4>15%</h4> <h5> | </h5> <h5>7日</h5> <h4> 6% </h4> <h5> | </h5>  <h5>30日</h5> <h4> 2%</h4>");

        $(".panel_4").removeClass("choosed_1");  
        $(".panel_4").removeClass("choosed_2"); 
        $(".panel_4").addClass("choosed_1"); 

        if($(".panel_4").hasClass("choosed_table")){
            $("#playerChar_1").hide();
            $("#playerChar_2").hide();      
        }   

        $("#playerCharttable1").hide();
        $("#playerCharttable2").hide();
        
        if($(".panel_4").hasClass("choosed_table")){
            if($(".panel_4").hasClass("choosed_1")){
                $("#playerCharttable1").show();
            }
            else if($(".panel_4").hasClass("choosed_2")){
                $("#playerCharttable2").show();
            }
        }  
            
    });
    $("#playChange2").click(function() {
        $("#playerVal").html("");
        $("#playerVal").html("<h5>AVG：</h5><h4>&yen;0.47</h4>");


        $(".panel_4").removeClass("choosed_1");  
        $(".panel_4").removeClass("choosed_2"); 
        $(".panel_4").addClass("choosed_2"); 

        if($(".panel_4").hasClass("choosed_table")){
            $("#playerChar_1").hide();
            $("#playerChar_2").hide();      
        }   

        $("#playerCharttable1").hide();
        $("#playerCharttable2").hide();
        
        if($(".panel_4").hasClass("choosed_table")){
            if($(".panel_4").hasClass("choosed_1")){
                $("#playerCharttable1").show();
            }
            else if($(".panel_4").hasClass("choosed_2")){
                $("#playerCharttable2").show();
            }
        }     
    });
}
function drawTrendChart(data1, data2, canvasID){
     var trendChartData = {
        labels: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"],
        datasets: [{
            label: "ACU",
            fillColor: "rgba(205,205,255,0.5)", //底邊OK
            strokeColor: "#49B8E4", //底邊線OK
            pointColor: "rgba(255,255,255,1)", //底邊線圓圈內層顏色、tooltip內部顏色
            pointStrokeColor: "rgba(79,198,210,1)", //底邊線圓圈外層顏色
            pointHighlightFill: "#FFFFFF", //移近時小圓圈裡面
            pointHighlightStroke: "rgba(79,198,210,1)", //移近時小圓圈外圍
            data: [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5], data1[6], data1[7]]
        }, {
            label: "PCU",
            fillColor: "rgba(151,187,205,0.10)",
            strokeColor: "rgba(54,232,32,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "rgba(54,232,32,1)",
            pointHighlightFill: "#FFFFFF",
            pointHighlightStroke: "rgba(54,232,32,1)",
            data: [data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7]]
        }]
    }; 
    var trendChart_ctx = document.getElementById(canvasID).getContext("2d");
    window.myLine = new Chart(trendChart_ctx).Line(trendChartData, {
        scaleOverride: true,
        responsive: false,
        scaleSteps: 2,
        scaleStepWidth: 1000,
        bezierCurve: false,
        multiTooltipTemplate: "<%= datasetLabel %>           <%= value %> 帳戶"

    });
}
function drawKeyChart(data1, data2, canvasID){
var keyChartData = {
        labels: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"],
        datasets: [{
            label: "新增玩家",

            fillColor: "rgba(205,205,255,0.5)", //底邊OK
            strokeColor: "#49B8E4", //底邊線OK
            pointColor: "rgba(255,255,255,1)", //底邊線圓圈內層顏色、tooltip內部顏色
            pointStrokeColor: "rgba(79,198,210,1)", //底邊線圓圈外層顏色
            pointHighlightFill: "#FFFFFF", //移近時小圓圈裡面
            pointHighlightStroke: "rgba(79,198,210,1)", //移近時小圓圈外圍

            data: [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5], data1[6], data1[7]]
        }, {
            label: "设备激活",
            fillColor: "rgba(151,187,205,0.10)",
            strokeColor: "rgba(54,232,32,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "rgba(54,232,32,1)",
            pointHighlightFill: "#FFFFFF",
            pointHighlightStroke: "rgba(54,232,32,1)",
            data: [data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7]]
        }]
    };   
    var keyChart1_ctx = document.getElementById(canvasID).getContext("2d");
    window.myLine = new Chart(keyChart1_ctx).Line(keyChartData, {
        scaleOverride: true,
        responsive: false,
        scaleSteps: 4,
        scaleStepWidth: 2500,
        bezierCurve: false,
        multiTooltipTemplate: "<%= datasetLabel %>           <%= value %> 帳戶"
    });
}

function drawPayChart(data1, canvasID){
   var payChartData = {
        labels: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"],
        datasets: [{
            label: "收入",
            fillColor: "rgba(205,205,255,0.5)", //底邊OK
            strokeColor: "#49B8E4", //底邊線OK
            pointColor: "rgba(255,255,255,1)", //底邊線圓圈內層顏色、tooltip內部顏色
            pointStrokeColor: "rgba(79,198,210,1)", //底邊線圓圈外層顏色
            pointHighlightFill: "#FFFFFF", //移近時小圓圈裡面
            pointHighlightStroke: "rgba(79,198,210,1)", //移近時小圓圈外圍
            data: [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5], data1[6], data1[7]]
        }]
    };
    var payChart1_ctx = document.getElementById(canvasID).getContext("2d");
    window.myLine = new Chart(payChart1_ctx).Line(payChartData, {
        scaleOverride: true,
        responsive: false,
        scaleSteps: 5,
        scaleStepWidth: 0.25,
        bezierCurve: false,
        tooltipTemplate: "<%= datasetLabel %>           <%= value %>"
    });
}
function drawPlayerChart(data1, data2, data3, canvasID){
    var playerChartData = {
        labels: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"],
        datasets: [{
            label: "次日留存率",
            fillColor: "rgba(205,205,255,0.5)", //底邊OK
            strokeColor: "#49B8E4", //底邊線OK
            pointColor: "rgba(255,255,255,1)", //底邊線圓圈內層顏色、tooltip內部顏色
            pointStrokeColor: "rgba(79,198,210,1)", //底邊線圓圈外層顏色
            pointHighlightFill: "#FFFFFF", //移近時小圓圈裡面
            pointHighlightStroke: "rgba(79,198,210,1)", //移近時小圓圈外圍
            data: [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5], data1[6], data1[7]]
        }, {
            label: "7日留存率",
            fillColor: "rgba(151,187,205,0.10)",
            strokeColor: "rgba(54,232,32,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "rgba(54,232,32,1)",
            pointHighlightFill: "#FFFFFF",
            pointHighlightStroke: "rgba(54,232,32,1)",
            data: [data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7]]
        }, {
            label: "30日留存率",
            fillColor: "rgba(151,187,205,0.10)",
            strokeColor: "rgba(54,232,32,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "rgba(54,232,32,1)",
            pointHighlightFill: "#FFFFFF",
            pointHighlightStroke: "rgba(54,232,32,1)",
            data: [data3[0], data3[1], data3[2], data3[3], data3[4], data3[5], data3[6], data3[7]]
        }]
    };   
    var playerChar1_ctx = document.getElementById(canvasID).getContext("2d");
    window.myLine = new Chart(playerChar1_ctx).Line(playerChartData, {
        scaleOverride: true,
        responsive: false,
        scaleSteps: 5,
        scaleStepWidth: 5,
        bezierCurve: false,
        tooltipTemplate: "<%= datasetLabel %>           <%= value %>"
    });
}
function drawPlaytimeChart(data1, canvasID){
    var playtimeData = {
        labels: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"],
        datasets: [{
            label: "次數",
            fillColor: "rgba(205,205,255,0.5)", //底邊OK
            strokeColor: "#49B8E4", //底邊線OK
            pointColor: "rgba(255,255,255,1)", //底邊線圓圈內層顏色、tooltip內部顏色
            pointStrokeColor: "rgba(79,198,210,1)", //底邊線圓圈外層顏色
            pointHighlightFill: "#FFFFFF", //移近時小圓圈裡面
            pointHighlightStroke: "rgba(79,198,210,1)", //移近時小圓圈外圍
            data: [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5], data1[6], data1[7]]
        }]
    };
    var playtimeChar1_ctx = document.getElementById(canvasID).getContext("2d");
    window.myLine = new Chart(playtimeChar1_ctx).Bar(playtimeData, {
        scaleOverride: true,
        responsive: false,
        scaleSteps: 5,
        scaleStepWidth: 1,
        barValueSpacing: 32,
        tooltipTemplate: "<%= datasetLabel %>           <%= value %>"
    });
}
function setPayChartAndTable(){
  $("#payChartShow").click(function() {
        $(".panel_3").addClass("choosed_chart");
        $(".panel_3").removeClass("choosed_table");
        $("#payCharttable1").hide();
        $("#payCharttable2").hide();
        $("#payCharttable3").hide();

        if($(".panel_3").hasClass("choosed_1")){
            $("#payChar_1").show();
        }
        else if($(".panel_3").hasClass("choosed_2")){
            $("#payChar_2").show();
        }
        else if($(".panel_3").hasClass("choosed_3")){
            $("#payChar_3").show();
        }
    });

    $("#payTableShow").click(function() {
        $(".panel_3").addClass("choosed_table");
        $(".panel_3").removeClass("choosed_chart");
        $("#payChar_1").hide();
        $("#payChar_2").hide();
        $("#payChar_3").hide();
        if($(".panel_3").hasClass("choosed_1")){
            $("#payCharttable1").show();
        }
        else if($(".panel_3").hasClass("choosed_2")){
            $("#payCharttable2").show();
        }
        else if($(".panel_3").hasClass("choosed_3")){
            $("#payCharttable3").show();
        }
    });
}

function setPlayerChartAndTable(){
  $("#playerChartShow").click(function() {
        $(".panel_4").addClass("choosed_chart");
        $(".panel_4").removeClass("choosed_table");
      $("#playerCharttable1").hide();
        $("#playerCharttable2").hide();

        if($(".panel_4").hasClass("choosed_1")){
            $("#playerChar_1").show();
        }
        else if($(".panel_4").hasClass("choosed_2")){
            $("#playerChar_2").show();
        }
    });

    $("#playerTableShow").click(function() {
        $(".panel_4").addClass("choosed_table");
        $(".panel_4").removeClass("choosed_chart");
        $("#playerChar_1").hide();
        $("#playerChar_2").hide();
        if($(".panel_4").hasClass("choosed_1")){
        
            $("#playerCharttable1").show();
        }
        else if($(".panel_4").hasClass("choosed_2")){
            $("#playerCharttable2").show();
        }
    });
}

function setPlaytimeChartAndTable(){
  $("#playtimeChartShow").click(function() {
        $(".panel_5").addClass("choosed_chart");
        $(".panel_5").removeClass("choosed_table");
        $("#playtimeCharttable1").hide();
        $("#playtimeChar_1").show();
    });

    $("#playtimeTableShow").click(function() {
        $(".panel_5").addClass("choosed_table");
        $(".panel_5").removeClass("choosed_chart");
        $("#playtimeChar_1").hide();
        $("#playtimeCharttable1").show();
    });
}

function setKeyChartAndTable(){
  $("#keyChartShow").click(function() {
        $(".panel_2").addClass("choosed_chart");
        $(".panel_2").removeClass("choosed_table");
        $("#keyCharttable1").hide();
        $("#keyCharttable2").hide();
        $("#keyCharttable3").hide();
        $("#keyCharttable4").hide();

        if($(".panel_2").hasClass("choosed_1")){
            $("#keyChar_1").show();
        }
        else if($(".panel_2").hasClass("choosed_2")){
            $("#keyChar_2").show();
        }
        else if($(".panel_2").hasClass("choosed_3")){
            $("#keyChar_3").show();
        }
        else if($(".panel_2").hasClass("choosed_4")){
            $("#keyChar_4").show();
        }
    });

    $("#keyTableShow").click(function() {
        $(".panel_2").addClass("choosed_table");
        $(".panel_2").removeClass("choosed_chart");
        $("#keyChar_1").hide();
        $("#keyChar_2").hide();
        $("#keyChar_3").hide();
        $("#keyChar_4").hide();
        if($(".panel_2").hasClass("choosed_1")){
            $("#keyCharttable1").show();
        }
        else if($(".panel_2").hasClass("choosed_2")){
            $("#keyCharttable2").show();
        }
        else if($(".panel_2").hasClass("choosed_3")){
            $("#keyCharttable3").show();
        }
        else if($(".panel_2").hasClass("choosed_4")){
            $("#keyCharttable4").show();
        }
    });
}

function initTable(){
    $("#keyCharttable1").hide();
    $("#keyCharttable2").hide();
    $("#keyCharttable3").hide();
    $("#keyCharttable4").hide();
    $("#payCharttable1").hide();
    $("#payCharttable2").hide();
    $("#payCharttable3").hide();
    $("#playerCharttable1").hide();
    $("#playerCharttable2").hide();
    $("#playtimeCharttable1").hide();   
}
