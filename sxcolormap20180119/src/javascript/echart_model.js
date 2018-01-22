//参数，人房、地区、年份、三个dom节点（地图、数据展示、数据对比），图例数据，默认色值，初始化年份、类型，
! function(opt) {
	//默认参数
	var _def_ = {};
	var opt = $.extend({}, _def_, opt),
		y = opt.y, //默认年份
		tp = opt.tp, //默认类型
		areaArr = [],
		em = opt.em, //初始化地图DOM
		tabBtn = opt.tabbtn, //初始化地图DOM
		ec1 = echarts.init(opt.ec1, null, {
			renderer: 'canvas'
		}), //初始化图表DOM
		ec2 = echarts.init(opt.ec2, null, {
			renderer: 'canvas'
		}), //初始化图表DOM 
		ec3 = echarts.init(opt.ec3, null, {
			renderer: 'canvas'
		}), //初始化图表DOM 
		legend = opt.legend, //图表配色
		colorArr = opt.colorarr, //图表配色
		colorAttTemp = [],
		colorList = opt.colorlist, //图表配色
		radarParams = opt.radarparams, //图表配色
		chartType = opt.chartType, //图表类型
		//色温图生成
		mapdataSet = {
			"sample": legend,
			//地图点击事件
			"click": function(event, t, d) {
				if(d.rid) {
					$(em).colorMap(d.rid, mapdataSet);
				}
				if($.inArray(d.name, areaArr) != -1) {
					return;
				}
				if(areaArr.length >= 3) {
					return
				} else {
					areaArr.push(d.name)
				}
				$(".add_btn").remove();
				var str_color_temp = (areaArr.length - 1) != 2 ? colorArr[areaArr.length] : colorArr[areaArr.length - 1];
				$(".add_list").append("<li attribute='" + colorArr[areaArr.length - 1] + "'><span style='background:" + colorArr[areaArr.length - 1] + " url(./styles/s1/images/bi.png) no-repeat center center;'></span><a style='color:" + colorArr[areaArr.length - 1] + "' href='###'>" + d.name + "</a></li>");
				colorAttTemp.push(colorArr[areaArr.length - 1]);
				r(ec3, areaArr, tp, y);
			},
			"popWin": function(t, data) {
				return "<div class='tipes' style='background-color:#000;opacity:0.5;color:#fff;border-radius:5px;z-index:999;'><span>" + data.name + "</span><br/><span style='width:100%;display:block;text-align:center;'>" + doHandleDataByNameAndYear(json_data, "get_per_area_data", tp, data.name, y) + "</span></div>"
			}
		};
	init();

	function createDom(ele) {

	}
	//初始化echarts
	function init() {
		$(em).colorMap(doHandleDataByNameAndYear(json_data, "colormap", tp, [], y), mapdataSet); //地图
		e(ec1, tp, y); //柱状图、环形图
		r(ec3, [], tp, y); //雷达图
		tab(tabBtn, ec1, ec2, areaArr, y); //人房数据切换
		t(ec2,tp,y);
		timeLine(); //时间轴变化
	}
	//时间轴变化,默认2015为初始年份
	function timeLine() {
		ec2.on('timelinechanged', function(params) {
			y = doHandleDataByNameAndYear(json_data, "timeline", tp)[params.currentIndex];
			e(ec1, tp, y);
			r(ec3, areaArr, tp, y);
		})
	}
	//人房数据切换
	function tab(ele, ec1, ec2, areaArr, y) { //ele代表切换按钮ec1代表图表一dom，y代表时间年份
		ele.click(function() {
			var classArr = $(this).siblings().attr("class").split(" ");
			var h = $(this).attr("i");
			$(this).addClass(h).children("div").show().parent().siblings('div').removeAttr("class").addClass(classArr[0]).children("div").hide();
			//判断人房
			if(h != "ren_h") {
				tp = $(this).children("div").html();
				mapdataSet.sample = [{ //地图图例、分类、色值
					"name": "1万套以下",
					"color": "#ffffff"
				}, {
					"name": "1-2万套",
					"color": "#ebebff"
				}, {
					"name": "3-4万套",
					"color": "#99ccff "
				}, {
					"name": "4-5万套",
					"color": "#5596ff"
				}, {
					"name": "5万套以上",
					"color": "#4f6eed"
				}];
				$(em).colorMap(doHandleDataByNameAndYear(json_data, "colormap", tp, [], y), mapdataSet); //地图
				radarParams = [{ //雷达图类目、最大值、色值
					name: '房屋类型',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '土地性质',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '隐患房屋类型',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '出租用途',
					max: 5000,
					color: "#cdd3dc"
				}]
				e(ec1, tp, y);
				r(ec2, areaArr, tp, y);
			} else {
				tp = $(this).children("div").html();
				mapdataSet.sample = [{ //地图图例、分类、色值
					"name": "1万人以下",
					"color": "#ffffff"
				}, {
					"name": "1-2万人",
					"color": "#ebebff"
				}, {
					"name": "3-4万人",
					"color": "#99ccff "
				}, {
					"name": "4-5万人",
					"color": "#5596ff"
				}, {
					"name": "5万人以上",
					"color": "#4f6eed"
				}];
				$(em).colorMap(doHandleDataByNameAndYear(json_data, "colormap", tp, [], y), mapdataSet); //地图
				radarParams = [{ //雷达图类目、最大值、色值
					name: '男女平衡',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '劳动适龄',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '充分就业',
					max: 5000,
					color: "#cdd3dc"
				}, {
					name: '文化程度',
					max: 5000,
					color: "#cdd3dc"
				}]
				e(ec1, tp, y);
				r(ec2, areaArr, tp, y);
			};
		});
	};

	function t(ele,t, y) {
		console.log(y);
		var option = {
			baseOption: {
				animationDurationUpdate: 5000,
				animationEasingUpdate: 'quinticInOut',
				timeline: {
					show: true,
					axisType: 'category',
					loop: true,
					playInterval: 2000,
					realtime: true,
					symbol: 'circle',
					bottom: '0',
					left: "3%",
					right: "3%",
					lineStyle: {
						width: 6,
						color: '#e7ecf0',
					},

					label: {
						normal: {
							backgroundColor: '#43aaef',
							color: '#fff',
							borderRadius: 5,
							padding: 5,
							position: -15
						}
					},
					itemStyle: {
						color: '#42abef'
					},
					checkpointStyle: {
						symbol: 'circle',
						color: '#43aaef'
					},
					controlStyle: {
						show: false,
						/*playIcon: path,
						prevIcon: pre,
						nextIcon: next,
						position: 'right'*/
					},
					data: doHandleDataByNameAndYear(json_data, "timeline", t).map(function(ele) {
						return ele;
					})

				},

			},

		};
		ele.setOption(option)
	}

	function e(ele, t, y) { //ele代表dom元素，t代表人房分类，y代表时间年份
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: [{
				right: '0',
				top: '20',
				width: '30%',
				height: '60%',
				containLabel: true
			}],
			xAxis: { //x轴
				show: false,
				type: 'value',
				boundaryGap: [0, 0.01],
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitLine: {
					show: false
				}
			},
			yAxis: { //y轴
				type: 'category',
				data: doHandleDataByNameAndYear(json_data, "sort_bar", t, [], y, "total_population").map(function(ele) {
					return ele.name
				}).slice(0, 10).reverse(),
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				}
			},
			series: [{
					type: 'bar',
					barWidth: 10,
					barGap: '-100%',
					avoidLabelOverlap: false,
					tooltip: {
						show: false
					},
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false,
						}
					},
					itemStyle: {
						normal: {
							color: '#e5ecf0'
						}
					},
					data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] //default data
				},
				{
					type: 'bar',
					barWidth: 10, //柱图宽度
					barGap: '-100%',
					avoidLabelOverlap: false,
					label: {
						normal: {
							position: 'right',
							show: false
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'normal'
							},
						}
					},
					itemStyle: {
						normal: {
							color: function(params) { //柱状图色彩修改
								return colorList[params.dataIndex];
							}
						}
					},
					data: doHandleDataByNameAndYear(json_data, "sort_bar", t, [], y, "total_population").map(function(ele) {
						return ele.value
					}).slice(0, 10).reverse(),
				},
				{
					type: 'pie',
					radius: ['15%', '20%'],
					center: ['84%', '75%'],
					avoidLabelOverlap: false,
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '16',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: function(params) { //柱状图色彩修改
								return colorList[params.dataIndex];
							}
						}
					},
					data: doHandleDataByNameAndYear(json_data, "pie", t, [], y, "total_population").slice(0, 10).reverse(),
				}
			]
		}
		ele.setOption(option);
	}
	//	}
	//雷达图生成
	function r(ele, area, t, y) { //ele代表dom，area代表要对比的区域，t代表人房分类，y代表事件年份
		var radar_data = [{
			tooltip: {
				textStyle: {
					fontSize: 10,
				},
			},
			type: 'radar',
			areaStyle: {
				normal: {
					color: "#4a7cd7",
					opacity: 0.2
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ["red"] // 图表背景网格的颜色
				}
			},
			axisLabel: {
				verticalAlign: 'middle'
			},
			data: area != undefined ? doHandleDataByNameAndYear(json_data, "radar", t, area, y) : []
		}];
		//初始化柱状图数据
		var default_dimension = doHandleDataByNameAndYear(json_data, "bar", t, area, y, "sex_rate");
		//重新生成折线图
		var option = {
			title: {
				subtext: '单位：万人',
				right: 0
			},
			tooltip: {
				show: true,
				trigger: 'item'
			},
			itemStyle: {
				emphasis: {
					show: true,
					color: '#f00'
				}
			},
			color: colorArr,
			xAxis: {
				type: 'category',
				name: '月份',
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					//					show:false,
					lineStyle: {
						color: '#ccc'
					}
				},
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12月']
			},
			grid: {
				right: '0%',
				bottom: "10%",
				width: "60%",
				height: "80%",
				containLabel: true
			},
			yAxis: {
				type: 'log',
				axisLine: {
					lineStyle: {
						color: '#ccc'
					}
				},
			},
			splitNumber: 12,
			radar: {
				indicator: radarParams,
				splitArea: {
					show: true,
				},
				name: {
					formatter: function(v) {
						return v;
					}
				},

				radius: "60%",
				center: ['25%', '50%'],
				triggerEvent: true
			},
			series: default_dimension.concat(radar_data)
		};
		//绘制图表
		ele.clear()

		ele.setOption(option);
		//添加点击事件
		ele.on('click', function(params) {
			if(area != undefined) {
				var radar_text = [{
					type: 'radar',
					textStyle: {
						color: 'red'
					},
				}];
				ele.setOption({
					series: radar_text.concat(doHandleDataByNameAndYear(json_data, chartType[index(params.name)], t, area, y, obj_get_classfy[radarParams[index(params.name)].name]))
				});
			} else {
				return;
			}

		});
	}

	function index(params) {
		for(var n = 0; n < radarParams.length; n++) {
			if(radarParams[n].name == params) {
				return n;
			}
		}
	};
	//删除所选地区
	function del() {
		$(".add_list").delegate("li", "click", function() {
			var $this = $(this);
			var $color = $this.attr('attribute');
			if($this.children('a').html() != '') {
				removeByValue(areaArr, $this.children('a').text())
				$this.children('a').html('');
				$this.addClass('add_btn').children('span').css({
					'background': '#eee',
				}).html('+');
				changeColorArray(colorArr, $color);
				r(ec2, areaArr, tp, y);

			}
		})
	};
}({
	y: "2015", //时间轴初始化年份
	tp: "人口", //数据类型初始化
	tabbtn: $(".e_rf_c").children("div"), //人房切换按钮
	em: document.getElementById("Emap"), //地图
	ec1: document.getElementById("chart"), //
	ec2: document.getElementById("EtimeLine"), //
	ec3: document.getElementById("Eradar"), //雷达图
	colorarr: ["#4a7cd7", "#fec837", "#60ff00"], //区域选着按钮配色
	colorlist: ["#4a7cd7", "#32a8fc", "#3dcbc9", "#fec837", "#a29c92", "#97b552", "#f59873", "#2cdd75", "#84aaef", "#77c2f7", "#5bd8dd", "#f8c5b1", "#faeba7", "#c3d696", "#b2a09e", "#cdbdee"], //排序柱状图图表配色
	legend: [{ //地图图例、分类、色值
		"name": "1万人以下",
		"color": "#ffffff"
	}, {
		"name": "1-2万人",
		"color": "#ebebff"
	}, {
		"name": "3-4万人",
		"color": "#99ccff "
	}, {
		"name": "4-5万人",
		"color": "#5596ff"
	}, {
		"name": "5万人以上",
		"color": "#4f6eed"
	}],
	radarparams: [{ //雷达图类目、最大值、色值
			name: '男女平衡',
			max: 5000,
			color: "#cdd3dc"
		},
		{
			name: '劳动适龄',
			max: 5000,
			color: "#cdd3dc"
		},
		{
			name: '充分就业',
			max: 5000,
			color: "#cdd3dc"
		},
		{
			name: '文化程度',
			max: 5000,
			color: "#cdd3dc"
		}
	],
	chartType: ["bar", "line", "bar", "line"]
})