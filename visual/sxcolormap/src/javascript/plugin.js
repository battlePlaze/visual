$.fn.eModel = function(){
	var arg = arguments;
	init()
	function init(){
		createDom(arg[0].container,arg[0].str);
	};
	//tab change
	function tabChange(ele,oclass){
		document.on("delegate","div",function(){
			alert()
			$(this).toggleClass(oclass).siblings().removeClass(oclass);
		});
	};
	//echart create
	function charts(ele,data,options){
		ele.setOption(options);
	}
	
	//dom create
	function createDom(ele,str){
		ele.html(str);
		tabChange(ele,oclass)
	}
	
}
