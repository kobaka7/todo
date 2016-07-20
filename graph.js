$(function () {
    $('#container').highcharts({
        chart: {
            type: 'column',
            events: {
                afterPrint : function(evt) {
                    alert();
                }
            }
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            max: 6,
            categories: ['月', '火', '水', '木', '金',"土","日"]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            //ジャンルの場所
            // align: 'right',
            // x: -30,
            // verticalAlign: 'top',
            // y: 25,
            // floating: true,
            // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            // borderColor: '#CCC',
            // borderWidth: 1,
            // shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointWidth: 10,
                // dataLabels: {
                //     enabled: true,
                //     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                //     style: {
                //         // textShadow: '0 0 3px black'
                //         textShadow: false
                //     }
                // }
            }
        },
        series: [{
            name: '国語',
            data: [5, 3, 4, 7, 2, 1, 4]
        }, {
            name: '数学',
            data: [2, 2, 3, 2, 1, 1, 1]
        }, {
            name: '理科',
            data: [3, 4, 4, 2, 5, 1, 5]
        },
        ]
    });
    $(".highcharts-axis").remove();
    $(".highcharts-tracker rect").css({strokeWidth:"0"});
    $(".highcharts-button").remove();
    $(".highcharts-series-0 rect").css({fill:"#f00"});
    $(".highcharts-legend-item rect").eq(0).css({fill:"#f00"});
    $(".highcharts-container").css({position:"relative"});
    $(".highcharts-container").css({left:"-5%"});
    $(".highcharts-grid > path").css({stroke:"#ddd"}).css({opacity:0.4})

});