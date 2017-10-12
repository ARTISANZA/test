/**
 * Created by zhoua on 2017/9/11.
 */
$(function () {
    drawMap();
    drawShadow();
});
function drawMap(){
    var data = [
        {name: '河北', value: 9},
        {name: '山西', value: 12},
        {name: '辽宁', value: 12},
        {name: '吉林', value: 12},
        {name: '黑龙江', value: 14},
        {name: '江苏', value: 15},
        {name: '浙江', value: 16},
        {name: '安徽', value: 18},
        {name: '福建', value: 18},
        {name: '江西', value: 19},
        {name: '山东', value: 21},
        {name: '河南', value: 21},
        {name: '湖北', value: 21},
        {name: '湖南', value: 22},
        {name: '广东', value: 23},
        {name: '海南', value: 24},
        {name: '四川', value: 24},
        {name: '贵州', value: 25},
        {name: '云南', value: 25},
        {name: '陕西', value: 25},
        {name: '甘肃', value: 25},
        {name: '青海', value: 25},
        {name: '台湾', value: 25},
        {name: '北京', value: 26},
        {name: '上海', value: 26},
        {name: '重庆', value: 26},
        {name: '天津', value: 70},
        {name: '广西', value: 27},
        {name: '宁夏', value: 107},
        {name: '西藏', value: 28},
        {name: '新疆', value: 29},
        {name: '内蒙古', value: 130},
        {name: '香港', value: 52},
        {name: '澳门', value: 20},
        {name: '南海诸岛', value:20},
        {name: '钓鱼岛', value:20}
    ];
    var geoCoordMap = {
        '河北':[114.52,38.05],
        '山西':[112.55,37.87],
        '辽宁':[123.43,41.80],
        '吉林':[125.32,43.90],
        '黑龙江':[126.53,45.80],
        '江苏':[118.78,32.07],
        '浙江':[120.15,30.28],
        '安徽':[117.25,31.83],
        '福建':[119.30,26.08],
        '江西':[115.85,28.68],
        '山东':[116.98,36.67],
        '河南':[113.62,34.75],
        '湖北':[114.30,30.60],
        '湖南':[112.93,28.23],
        '广东':[113.27,23.13],
        '海南':[110.32,20.03],
        '四川':[104.07,30.67],
        '贵州':[106.63,26.65],
        '云南':[102.72,25.05],
        '陕西':[108.93,34.27],
        '甘肃':[103.82,36.07],
        '青海':[101.78,36.62],
        '台湾':[121.50,25.03],
        '北京':[116.40,39.90],
        '上海':[121.47,31.23],
        '重庆':[106.55,29.57],
        '天津':[117.20,39.12],
        '广西':[108.37,22.82],
        '宁夏':[106.28,38.47],
        '西藏':[91.13,29.65],
        '新疆':[87.62,43.82],
        '内蒙古':[111.73,40.83],
        '香港':[114.08000,22.40000],
        '澳门':[113.33333,22.03333],
        '南海诸岛':[128.75,21.13],
        '钓鱼岛':[123.34,26.40]
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
        backgroundColor:  'rgba(0,0,0,0)' ,
        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['装机容量'],
            textStyle: {
                color: '#F4F4F4'
            }
        },
        geo: {
            map: 'china',
            label: {
                normal:{
                    show:false,
                    color:'#F4F4F4',
                    position:'right'
                },
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#058ECC',
                    borderColor: '#50A4CC',
                    borderWidth: 1.5
                },
                emphasis: {
                    areaColor: '#3FA7D7'
                }
            }
        },
        series : [
            {
                name: '装机容量',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'top',
                        show: true,
                        offset:[0,-8],
                        textBorderColor:'#939B9D',
                        textBorderWidth:1.5
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                }
            },
            {
                name: '装机容量',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {return b.value - a.value;}).slice(0, 35)),
                symbolSize: function (val) {
                    return val[2] / 6;
                },
                tooltip:{
                    trigger:'item',
                    formatter: function(params) {
                        var res = params.name+'<br/>';
                        var myseries = option.series;
                        for (var i = 1; i < myseries.length; i++) {
                            res+= myseries[i].name;
                            for(var j=0;j< myseries[i].data.length ;j++){
                                if(myseries[i].data[j].name==params.name){
                                    res+=' : '+myseries[i].data[j].value[2]+' MW';
                                }
                            }
                        }
                        return res;
                    }
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#23D865',
                        shadowBlur: 10,
                        shadowColor: '#fff'
                    }
                },
                zlevel: 1
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
function drawShadow(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('shadow'));

    var option = {
        backgroundColor: '#F4F4F4',
        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['装机容量'],
            textStyle: {
                color: '#F4F4F4'
            }
        },
        geo: {
            map: 'chinaShadow',
            label: {
                normal:{
                    show: false,
                    color:'#F4F4F4',
                    position:'right'
                },
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#0372A6',
                    borderColor: '#50A4CC',
                    borderWidth: 0
                }
            },
            center: [104.85, 36.30]
        },
        series : [
            {
                name: '装机容量',
                type: 'scatter',
                coordinateSystem: 'geo',
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'top',
                        show: true,
                        offset:[0,-8],
                        textBorderColor:'#939B9D',
                        textBorderWidth:1.5
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                }
            },
            {
                name: '装机容量',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                tooltip:{
                    enabled:false
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#23D865',
                        shadowBlur: 10,
                        shadowColor: '#fff'
                    }
                },
                zlevel: 1
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
