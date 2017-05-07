module.exports = {
    init: function (statistic) {
        this.userGenderStatisticChartInit(statistic.user.gender);
        this.userAnswerCountStatisticChartInit(statistic.user.answer_count);
        this.userFollowerCountStatisticChartInit(statistic.user.follower_count);
        this.userFollowingCountStatisticChartInit(statistic.user.following_count);
        this.userLocationsStatisticChartInit(statistic.user.locations);
    },

    userGenderStatisticChartInit: function(statistic) {

        var statisticChart = echarts.init(document.getElementById('user_gender_statistic'));

        var option = {
             title : {
                 text: '性别比例',
                 subtext: '知乎用户数据分析',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 left: 'left',
                 data: ['男', '女']
             },
             series : [
                 {
                     name: '性别',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data:[
                         {value:statistic.male, name:'男'},
                         {value:statistic.female, name:'女'},
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
         };

        statisticChart.setOption(option);
    },

    userAnswerCountStatisticChartInit: function(statistic) {

        var statisticChart = echarts.init(document.getElementById('user_answer_count_statistic'));
        var statisticChart2 = echarts.init(document.getElementById('user_answer_count_statistic2'));

        var option = {
             title : {
                 text: '有无回答过问题',
                 subtext: '知乎用户数据分析',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 left: 'left',
                 data: ['有', '无']
             },
             series : [
                 {
                     name: '回答过问题',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data:[
                         {value:statistic.positive, name:'有'},
                         {value:statistic.zero, name:'无'},
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
         };
         statisticChart.setOption(option);

         var option2 = {
              title : {
                  text: '问题回答数目',
                  subtext: '知乎用户数据分析',
                  x:'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: ['0', '1-10', '11-100', '100+']
              },
              series : [
                  {
                      name: '回答过问题',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      data:[
                          {value:statistic.positive, name:'0'},
                          {value:statistic.one_to_ten, name:'1-10'},
                          {value:statistic.eleven_to_hundred, name:'11-100'},
                          {value:statistic.hundred_to_more, name:'100+'},
                      ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          };
          statisticChart2.setOption(option2);
    },

    userFollowerCountStatisticChartInit: function(statistic) {

        var statisticChart = echarts.init(document.getElementById('user_follower_count_statistic'));

        var option = {
             title : {
                 text: '用户粉丝数比例',
                 subtext: '知乎用户数据分析',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 left: 'left',
                 data: ['0', '1-10', '11-100', '100-1000', '1000+']

             },
             series : [
                 {
                     name: '用户粉丝数',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data:[
                         {value:statistic.zero, name:'0'},
                         {value:statistic.one_to_ten, name:'1-10'},
                         {value:statistic.eleven_to_hundred, name:'11-100'},
                         {value:statistic.hundred_to_thousand, name:'101-1000'},
                         {value:statistic.thousand_to_more, name:'1000+'},
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
         };

        statisticChart.setOption(option);
    },

    userFollowingCountStatisticChartInit: function(statistic) {

        var statisticChart = echarts.init(document.getElementById('user_following_count_statistic'));

        var option = {
             title : {
                 text: '用户关注数比例',
                 subtext: '知乎用户数据分析',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 left: 'left',
                 data: ['0', '1-10', '11-100', '100-1000', '1000+']

             },
             series : [
                 {
                     name: '用户关注数',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data:[
                         {value:statistic.zero, name:'0'},
                         {value:statistic.one_to_ten, name:'1-10'},
                         {value:statistic.eleven_to_hundred, name:'11-100'},
                         {value:statistic.hundred_to_thousand, name:'101-1000'},
                         {value:statistic.thousand_to_more, name:'1000+'},
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
         };

        statisticChart.setOption(option);
    },

    getLocationData: (statistic) => {
        let city = require('./city');
        let province = require('./province');
        var provinceData = {};

        $.each(province, (key, item) => {
            provinceData[item.proId] = item;
        });

        var cityData = $.map(city, (item, key) => {
            item['province'] = provinceData[item.proId];
            return item;
        });

        var mapData = {};
        $.each(statistic, (name, item) => {
            let flag = false;
            for (let prov in provinceData) {
                if (name.indexOf(prov['name']) >= 0) {
                    mapData[prov['name']] = {
                        name: prov['name'],
                        count: item['count']
                    };
                    console.log(name);

                    flag = true;
                    return;
                }
            }
            if (flag) {
                return;
            }
            for (let city of cityData) {
                if (name.indexOf(city['name']) >= 0) {
                    mapData[city['province']['name']] = {
                        name: city['province']['name'],
                        count: item['count']
                    };
                    return;
                }
            }
        });
        return mapData;
    },

    userLocationsStatisticChartInit: function(statistic) {

        var mapData = this.getLocationData(statistic);

        let statisticChart = echarts.init(document.getElementById('user_locations_statistic'));

        let legendData =  $.map(mapData, function(item, name) {
            return name;
        });
        let seriesData =  $.map(mapData, function(item, name) {
            return {
                name: name,
                value: item.count
            };
        });

        let option = {
             title : {
                 text: '地域分布',
                 subtext: '知乎用户数据分析',
                 x:'center'
             },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 left: 'left',
                 data: legendData

             },
             series : [
                 {
                     name: '地域分布',
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data: seriesData,
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
         };
        statisticChart.setOption(option);

        let statisticChart2 = echarts.init(document.getElementById('user_locations_statistic_map'));

        let option2 = {
            title: {
                text: '省份分布统计',
                subtext: '知乎用户数据分析',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:legendData
            },
            visualMap: {
                min: 0,
                max: this.getMaxLocationCount(statistic),
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '省份人数统计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: seriesData
                }
            ]
        };

        statisticChart2.setOption(option2);
    },
    getMaxLocationCount: (statistic)=> {
        var max = 0;
        $.each(statistic, (key, item) => {
            if (max < item.count) {
                max = item.count;
            }
        });
        return max;
    }
};
