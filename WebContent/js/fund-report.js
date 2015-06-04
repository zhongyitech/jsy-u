/**
 * kk
 * Created by lioa on 2015/5/27.
 */
(function ($) {
    var Util = {
        render: function () {
            var data = $.project.domain(4, 'com.jsy.fundObject.Fund').getItem(4);
            console.log(data);
            $('#view_fundDetail').renderData('#table-fundDetail-template', data);
            $('#view_saleData').renderData('#table-saleData-template', data);
            $('#view_payAndTc').renderData('#table-payAndTc-template', data);
            $('#view_project').renderData('#table-project-template', data);
            //todo:从后台获取day的天数数据
            var month_categories = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            var day_categories = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
            //趋势及对比图
            $('#fund_chart_salse_01').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '比例',
                    data: [
                        ['实募', 26.8],
                        ['预募', 43.8],
                        //{
                        //    name: 'Chrome',
                        //    y: 12.8,
                        //    sliced: true,
                        //    selected: true
                        //}
                    ]
                }]
            });
            $('#fund_chart_salse_02').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: '金赛银B(F20140615010)--基金收付数据趋势及对比图'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'Billions'
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: '销售额',
                    data: [502, 635, 809, 947, 1402, 3634, 5268]
                }, {
                    name: '项目利息',
                    data: [106, 107, 111, 133, 221, 767, 1766]
                }, {
                    name: '兑付',
                    data: [163, 203, 276, 408, 547, 729, 1628]
                }, {
                    name: '提成',
                    data: [18, 31, 54, 156, 339, 818, 1201]
                }, {
                    name: '利润',
                    data: [2, 2, 2, 6, 13, 30, 46]
                }]
            });

            //金额业务数据
            $('#char_saleData').highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },
                subtitle: {},
                xAxis: [{
                    categories: month_categories
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}万元',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    title: {
                        text: '金额',
                        style: {
                            color: '#89A54E'
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: '业务数量',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    labels: {
                        format: '{value}个',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    align: 'right',
                    x: 10,
                    verticalAlign: 'top',
                    y: 10,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                series: [{
                    name: '业务数量',
                    color: '#4572A7',
                    type: 'column',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    tooltip: {
                        valueSuffix: '个'
                    }

                }, {
                    name: '金额',
                    color: '#89A54E',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    tooltip: {
                        valueSuffix: '万元'
                    }
                }]
            });

            //兑付-day
            $('#normal-tabs-1').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: day_categories
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '利息',
                    data: [53, 32, 42, 73, 24,24,34,54,23,24,544,24,57]
                }, {
                    name: '本金',
                    data: [22, 32, 23, 52, 91,23,122,44,12,31,1,4,12]
                }]
            });
            $('#normal-tabs-2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: month_categories
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '利息',
                    data: [53, 32, 42, 73, 24]
                }, {
                    name: '本金',
                    data: [22, 32, 23, 52, 91]
                }]
            });
            //提成
            $('#pay_normal-tabs-1').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: day_categories
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '业务提成',
                    data: [53, 32, 42, 73, 24]
                }, {
                    name: '管理提成',
                    data: [22, 32, 23, 52, 91]
                }]
            });
            $('#pay_normal-tabs-2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '业务提成',
                    data: [53, 32, 42, 73, 24]
                }, {
                    name: '管理提成',
                    data: [22, 32, 23, 52, 91]
                }]
            });

            //项目收益
            $('#project_normal-tabs-1').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: day_categories
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '利息',
                    data: [53, 32, 42, 73, 24]
                }, {
                    name: '本金',
                    data: [22, 32, 23, 52, 91]
                }]
            });
            $('#project_normal-tabs-2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: month_categories
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '利息',
                    data: [53, 32, 42, 73, 24]
                }, {
                    name: '本金',
                    data: [22, 32, 23, 52, 91]
                }]
            });
        }
    };
    Util.render();
})(jQuery);
