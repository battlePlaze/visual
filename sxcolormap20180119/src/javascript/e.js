(function($, window, document) {
	var pluginName = "echartsModel",
		areaArr = [],
		colorAttTemp = [],
		_def_ = {
			y: "2015", //时间轴初始化年份
			tp: "人口", //数据类型初始化
			tabbtn: $(".e_rf_c").children("div"), //人房切换按钮
			em: document.getElementById("Emap"), //地图
			ec1: echarts.init(document.getElementById("chart")), //
			ec2: echarts.init(document.getElementById("Eradar")), //雷达图
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
		};

	function Echarts(ele, opts) {
		this.ele = ele;
		this.opt = $.extend({}, _def_, opts);
		this.tp = _def_.tp;
		this.name = pluginName;
		this.init();
	};
	Echarts.prototype = {
		mapdataSet: {
			"sample": _def_.legend,
			//地图点击事件
			"click": function(event, t, d) {
				if(d.rid) {
					$("#Emap").colorMap(d.rid, this.mapdataSet);
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
				var str_color_temp = (areaArr.length - 1) != 2 ? _def_.colorarr[areaArr.length] : _def_.colorarr[areaArr.length - 1];
				$(".add_list").append("<li attribute='" + _def_.colorarr[areaArr.length - 1] + "'><span style='background:" + _def_.colorarr[areaArr.length - 1] + " url(./styles/s1/images/bi.png) no-repeat center center;'></span><a style='color:" + _def_.colorarr[areaArr.length - 1] + "' href='###'>" + d.name + "</a></li>");
				colorAttTemp.push(_def_.colorarr[areaArr.length - 1]);
				console.log(Echarts.prototype.r);
				Echarts.prototype.r(_def_.ec2, areaArr, _def_.tp,_def_.y);
			},
			"popWin": function(t, data) {
				return "<div class='tipes' style='background-color:#000;opacity:0.5;color:#fff;border-radius:5px;z-index:999;'><span>" + data.name + "</span><br/><span>" + doHandleDataByNameAndYear(json_data, "get_per_area_data", _def_.tp, data.name, _def_.y) + "</span></div>"
			}
		},
		init: function() {
			this.dom();
			this.del();
			this.e(_def_.ec1,_def_.tp,_def_.y);
			this.r(_def_.ec2,[],_def_.tp,_def_.y);
			$(this.opt.em).colorMap("110108000000", this.mapdataSet);
		},
		dom: function() {
			//			console.log(this.ele);
			/*var str = '<ul class="add_list"><li class="add_btn"><span>+</span><a href="###"></a></li>'+
						'<li class="add_btn"><span>+</span><a href="###"></a></li>'+
						'<li class="add_btn"><span>+</span><a href="###"></a></li>'+
						'</ul>';
			this.ele.innerHTML = str;*/
			//			console.log(this.del);
		},
		del: function() {
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
					console.log(colorArr)
					r(ec2, areaArr, tp, y);

				}
			})
		},
		index: function(params) {
			for(var n = 0; n < radarParams.length; n++) {
				if(radarParams[n].name == params) {
					return n;
				}
			}
		},
		e: function(ele, t, y) { //ele代表dom元素，t代表人房分类，y代表时间年份
			var option = {
				baseOption: {
					animationDurationUpdate: 1000,
					animationEasingUpdate: 'quinticInOut',
					timeline: { //时间轴
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
					xAxis: {
						show: false,
					},
					yAxis: {
						type: 'category',
						data: [],
					},

				},
				options: []
			};
			//时间轴生成
			for(var i = 0; i < doHandleDataByNameAndYear(json_data, "timeline", t).length; i++) {
				option.options.push({
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
										return _def_.colorlist[params.dataIndex];
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
										return _def_.colorlist[params.dataIndex];
									}
								}
							},
							data: doHandleDataByNameAndYear(json_data, "pie", t, [], y, "total_population").slice(0, 10).reverse().map(function(ele) {
								//							ele.selected = 'true';
								return ele
							}),
						}
					]
				});
			}
			ele.setOption(option);
			ele.on('brushSelected', function(params) {})
		},
		r: function r(ele, area, t, y) { //ele代表dom，area代表要对比的区域，t代表人房分类，y代表事件年份
			//类型转换
			var obj_get_classfy = {
				"男女平衡": "sex_rate",
				"劳动适龄": "sex_rate",
				"充分就业": "employee",
				"文化程度": "sex_rate",
			};
			var radar_data = [{
				tooltip: {
					textStyle: {
						fontSize: 10,
					},
					//				position:['50%','50%']
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
			var default_dimension = doHandleDataByNameAndYear(json_data, "bar", t, area, y, obj_get_classfy['男女平衡']);
			//		console.log(default_dimension)
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
				color: _def_.colorArr,
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
					indicator: _def_.radarParams,
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
				//			params.event.target.style.textFill = '#f00';
				//			params.event.target.style.fontSize = '50';
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
		},
		tab: function(ele, ec1, ec2, areaArr, y) { //ele代表切换按钮ec1代表图表一dom，y代表时间年份
			ele.click(function() {
				var classArr = $(this).siblings().attr("class").split(" ");
				var h = $(this).attr("i");
				$(this).addClass(h).children("div").show().parent().siblings('div').removeAttr("class").addClass(classArr[0]).children("div").hide();

				if(h != "ren_h") {
					tp = $(this).children("div").html();
					e(ec1, tp, y);
					r(ec2, areaArr, tp, y);
				} else {
					tp = $(this).children("div").html();
					e(ec1, tp, y);
					r(ec2, areaArr, tp, y);
				};
			});
		}

	};
	$.fn[pluginName] = function(opts) {
		var e = this;
		e.each(function() {
			if(!$.data(e, "plugin_" + pluginName)) {
				$.data(e, "plugin_" + pluginName, new Echarts(this, opts));
			}

		});
		// chain jQuery functions
		return e;
	}
})($, window, document);