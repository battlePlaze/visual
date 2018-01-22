//获取数据
var json_data;
/*var obj = function(url, opt) {
	$.ajax({
		type: "post",
		url: url,
		async: true,
		success: function(data) {
			//console.log(data);
			json_data = data;
		}
	});
}*/
function maopao(arr) {
	var shuzu = arr;
	for(var i = 0; i < shuzu.length - 1; i++) {
		for(var j = 0; j < shuzu.length - i - 1; j++) {
			var mao1 = shuzu[j].value;
			var mao2 = shuzu[j + 1].value;
			if(mao1 < mao2) {
				var mao = shuzu[j];
				shuzu[j] = shuzu[j + 1];
				shuzu[j + 1] = mao;
			}
		}

	}
	//console.log(shuzu);
	return shuzu;
}
/*
 
 * 处理函数，type为类型，分为radar、bar、line，theme为主题，人口和房屋
 * arr_area_name为区域名，比如XX镇
 * item为雷达图中的条目
 * 
 * */

function DoGetPerAreaData(dict_year_data, arr_area_name) {
	//console.log(arr_area_name)
	return dict_year_data[arr_area_name]["total_count"]

}

function DoGetLegendInfo(dict_color_map_legend) {
	//console.log(dict_color_map_legend)
	arr_temp = []
	obj_temp = {}
	for(var i = 0; i < dict_color_map_legend["legend_index_display"].length; i++) {

		index = dict_color_map_legend["legend_index_display"][i]
		obj_temp["describe"] = index
		obj_temp["color"] = dict_color_map_legend["legend"][index]["legend_color"]
		arr_temp.push(obj_temp)
		obj_temp = {}
	}
	//console.log(arr_temp)
	return arr_temp
}

/*
 * 处理雷达数据，返回格式为
 *  [{
			value: [4300, 10000, 28000, 35000],
				name: '预算分配'
			},
			{
				value: [5000, 14000, 28000, 31000],
				name: '实际开销'
			}
		]

 */
function DoHandleRadarData(dict_year_data, arr_area_name, type) {
	arr_radar_return_data = []
	for(var i = 0; i < arr_area_name.length; i++) {
		dict_radar_data = {}

		dict_radar_data["value"] = dict_year_data[arr_area_name[i]]["radar_data"]
		dict_radar_data["name"] = arr_area_name[i]

		arr_radar_return_data.push(dict_radar_data)

	}
	console.log(arr_radar_return_data)
	return arr_radar_return_data

}
/*
 * 处理line和bar数据，返回格式为
 */
function DoHandlelineOrBarData(dict_year_data, arr_area_name, type, item) {
	//console.log(arr_area_name)
	arr_return_data = []
	for(var i = 0; i < arr_area_name.length; i++) {
		dict_line_data = {}
		arr_temp_data = []
		dict_bar_data = {}
		month_data = dict_year_data[arr_area_name[i]]["month_data"]
		for(var k in month_data) {
			arr_temp_data.push(month_data[k][item])
		}

		dict_line_data["value"] = arr_temp_data
		dict_line_data["name"] = arr_area_name[i]
		dict_line_data["type"] = type

		arr_return_data.push(dict_line_data)

	}
	//console.log(arr_return_data)
	return arr_return_data
}

/*
 处理占比图的数据
 * */
function DoHandlePieData(dict_year_data, item) {

	arr_temp_data = []
	obj_temp_data = {}
	for(var i in dict_year_data) {

		obj_temp_data["name"] = i
		obj_temp_data["value"] = dict_year_data[i][item]
		arr_temp_data.push(obj_temp_data)
		obj_temp_data = {}
	}
	//console.log(maopao(arr_temp_data))
	return maopao(arr_temp_data)
}

function DoHandleTimeLineData(dict_time_line_data) {
	arr_temp_data = []
	for(var i in dict_time_line_data) {
		//console.log(i)
		arr_temp_data.push(i)

	}
	//console.log(arr_temp_data.sort())
	return arr_temp_data
}

function DoCalculateCorlor(data, dict_color_map_legend) {
	var dict_legend_data = dict_color_map_legend["legend"];
	var str_return_data = "";
	for(var i in dict_legend_data) {
		var arr_split = dict_legend_data[i]["formula"].split("-")
		if(arr_split[1] == "max") {
			if(data >= parseInt(arr_split[0])) {
				str_return_data = dict_legend_data[i]["legend_color"];
				//console.log(str_return_data);
			} else {}
		} else {
			if(data >= parseInt(arr_split[0]) && data <= parseInt(arr_split[1])) {
				str_return_data = dict_legend_data[i]["legend_color"]
				break;
			} else {

			}
		}
	}
	//console.log(str_return_data)

	return str_return_data
}

function DoGetMapColor(dict_year_data, dict_color_map_legend) {
	obj_rid_data = filterId()
	arr_temp_return = []
	obj_temp_return = {}
	for(var i in dict_year_data) {
		//console.log(DoCalculateCorlor(dict_year_data[i]["total_count"], dict_color_map_legend))
		obj_temp_return["rid"] = obj_rid_data[i]
		obj_temp_return["name"] = i
		obj_temp_return["fill"] = DoCalculateCorlor(dict_year_data[i]["total_count"], dict_color_map_legend)

		arr_temp_return.push(obj_temp_return)
		obj_temp_return = {}
	}
	return arr_temp_return
}

//获取所有维度的分析数据，形式为对象的形式
function DoGetRadarTotal(dict_year_data, arr_area_name) {
	arr_return_data = []
	for(var i = 0; i < arr_area_name.length; i++) {
		dict_line_data = {}
		arr_temp_data = []
		dict_bar_data = {}
		month_data = dict_year_data[arr_area_name[i]]["month_data"]
		for(var k in month_data) {
			arr_temp_data.push(month_data[k][item])
		}

		dict_line_data["value"] = arr_temp_data
		dict_line_data["name"] = arr_area_name[i]
		dict_line_data["type"] = type

		arr_return_data.push(dict_line_data)

	}
	//console.log(arr_return_data)
	return arr_return_data
}

function DoGetRadarInitData(dict_total) {
	//console.log(dict_total["type"]["radar"])
}

function DoGetLend(dict_theme_data) {
	//console.log(dict_theme_data["type"]["color_map"])
	arr_return = []
	for(var i in dict_theme_data["type"]["color_map"]["legend"]) {
		//console.log(dict_theme_data["type"]["color_map"]["legend"][i])
		dict_temp = {}
		dict_temp["name"] = dict_theme_data["type"]["color_map"]["legend"][i]["name"]
		dict_temp["color"] = dict_theme_data["type"]["color_map"]["legend"][i]["legend_color"]
		arr_return.push(dict_temp)
	}
	//				console.log(arr_return)
	return arr_return
}

//获取每一年的雷达数据
function DoGetRadarInfoByyear(arr_radar_data) {
	console.log(arr_radar_data)
	return arr_radar_data
}

function doHandleDataByNameAndYear(json_data, type, theme, arr_area_name, year, item) {
	//console.log(year)
	//console.log(json_data.data[theme].data)
	if(typeof(year) != "undefined") {
		dict_year_area_data = json_data.data[theme].data[year]["area_data"]
	}

	//dict_year_area_data = json_data.data[theme].data[year]["area_data"]
	dict_time_line_data = json_data.data[theme].data
	dict_color_map_legend = json_data.data[theme]["type"]["color_map"]
	if(type == "radar") {
		return DoHandleRadarData(dict_year_area_data, arr_area_name, type)
	} else if(type == "line" || type == "bar") {
		return DoHandlelineOrBarData(dict_year_area_data, arr_area_name, type, item)
	} else if(type == "pie" || type == "sort_bar") {
		return DoHandlePieData(dict_year_area_data, item)
	} else if(type == "timeline") {
		
		return DoHandleTimeLineData(dict_time_line_data)
	} else if(type == "colormap") {

		return DoGetMapColor(dict_year_area_data, dict_color_map_legend)
	} else if(type == "radar_total") {

		return DoGetRadarTotal(dict_year_area_data)
	} else if(type == "get_colormap_legend") {

		return DoGetLegendInfo(dict_color_map_legend)
	} else if(type == "get_per_area_data") {

		return DoGetPerAreaData(dict_year_area_data, arr_area_name)
	} else if(type == "radar_init") {

		return DoGetRadarInitData(json_data.data[theme])
	} else if(type == "get_legend") {

		return DoGetLend(json_data.data[theme])
	} else if(type == "per_year_radar_info_") {

		return DoGetRadarInfoByyear(json_data.data[theme].data[year]["radar"])
	}
}

//获取2016年中关村和上地的人口主题下的雷达图，type = radar
//doHandleDataByNameAndYear(json_data,"radar","人口", ["太阳宫地区","亚运村","左家庄"],"2016");
//获取2015年中关村和上地的人口主题下的性别，折线图
//doHandleDataByNameAndYear(json_data,"line","人口", ["太阳宫地区","亚运村","左家庄"],"2015","nvph");
//获取2015年中关村和上地的人口房屋下的就业情况，条形图
//doHandleDataByNameAndYear(json_data,"bar","房屋", ["太阳宫地区","亚运村","左家庄"],"2015","employee");
//获取2015年人口的占比，饼图
//doHandleDataByNameAndYear(json_data, "pie", "人口", [], "2015", "total_count")
//获取2015年人口的排名图，柱形图（排名）
//doHandleDataByNameAndYear(json_data, "sort_bar", "人口", [], "2015", "total_count")
//获取2015年人口的时间轴的数据
//doHandleDataByNameAndYear(json_data, "timeline", "人口", )
//色温图颜色数据
//doHandleDataByNameAndYear(json_data, "colormap", "人口", [], "2016");
//获取某个城镇的总人口数据
//doHandleDataByNameAndYear(json_data, "get_per_area_data", "人口", "太阳宫地区", "2016");
//获取2016年色温图的图例
//doHandleDataByNameAndYear(json_data, "get_legend", "人口", );
//获取2016年人口下的雷达图的基础数据
doHandleDataByNameAndYear(json_data, "per_year_radar_info_", "房屋",[],"2016" );