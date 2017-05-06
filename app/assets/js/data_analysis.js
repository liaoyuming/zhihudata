var dataAnalysis = {
    init: function (statistic) {

        // var $data = [];
        // var $normalColor =  '#EAE5D3';
        // var $emphasisColorArray = ['#8D7B61', '#C5A270', '#DDC89E', '#FFB63D', '#8D7B51'];
        var $this = this;

        $this.userGenderStatisticChartInit(statistic.user.gender);
        $this.userAnswerCountStatisticChartInit(statistic.user.answer_count);
        $this.userFollowerCountStatisticChartInit(statistic.user.follower_count);
        $this.userFollowingCountStatisticChartInit(statistic.user.following_count);
        $this.userLocationsStatisticChartInit(statistic.user.locations);

        // $.each($map, function (key, item) {
        //     $data.push({
        //         name: item.title,
        //         itemStyle: {
        //             emphasis: {
        //                 areaColor: $emphasisColorArray[$this.getRandomInt(0, 3)],
        //             }
        //         },
        //         label: {
        //             emphasis: {
        //                 show: true,
        //             },
        //         },
        //         selected: true,
        //     });
        // });
        //
        // var $chart = echarts.init($('.map-container')[0]);
        // $chart.setOption({
        //     series: [{
        //         type: 'map',
        //         map: 'china',
        //         zoom: 1.2,
        //         roam: true,
        //         scaleLimit:{
        //             min: 1,
        //             max: 3,
        //         },
        //         itemStyle: {
        //             normal: {
        //                 areaColor: $normalColor,
        //             },
        //             emphasis: {
        //                 areaColor: $normalColor,
        //             }
        //         },
        //         label: {
        //             emphasis: {
        //                 show: false,
        //             },
        //         },
        //         data: $data,
        //     }],
        // });
        //
        // $chart.on('click', function (params) {
        //     if ($map[params.data.name]) {
        //         window.location.href = $map[params.data.name].url;
        //     }
        // });
    },
    getRandomInt: function(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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

    userLocationsStatisticChartInit: function(statistic) {

        var statisticChart = echarts.init(document.getElementById('user_locations_statistic'));

        var legendData =  $.map(statistic, function(item, name) {
            return name;
        });
        var seriesData =  $.map(statistic, function(item, name) {
            return {
                name: name,
                value: item.count
            };
        });
        // console.log(seriesData,legendData);

        var option = {
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
                     data: statistic,
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

};
