;(function($, window, document, undefiend){
	//定义类名
	var pluginName = "tab";
	//默认值
	var defaults = {
		header: '',
		content: '',
		activeName: null
	}
	
	function Plugin(element, options){
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this.defaults = defaults;
		this.init();
	}
	
	Plugin.prototype.init = function(){
		var $header = $(this.options.header);
		var $tab_header = $header.find(".tab-header-item");
		var $content = $(this.options.content);
		var $this = $(this.ele);
		var active = this.options.activeName;
		
		$tab_header.on("click","span", function(){
			var i = $tab_header.find("span").index(this);
			$(this).addClass(active).parent().siblings().find("span").removeClass(active);
			$content.find(".tab-content-item").removeClass(active).eq(i).addClass(active);
		})
	}
	
	$.fn[pluginName] = function(options){
		//遍历所有，链式操作
		return this.each(function(){
			new Plugin(this,options);
		})
	}
})(jQuery, window, document);

;(function($) {
   	$.fn.touchWipe = function(option) {
     	var defaults = {
        	itemDelete: '.item-delete', //删除元素
     	};
     	var opts = $.extend({}, defaults, option); //配置选项
 
    	 var delWidth = $(opts.itemDelete).width();
 
     	var initX; //触摸位置
     	var moveX; //滑动时的位置
     	var X = 0; //移动距离
     	var objX = 0; //目标对象位置
     	$(this).on('touchstart', function(event) {
     		$(this).siblings().each(function(i, obj){
     			obj.style.WebkitTransform = "translateX(" + 0 + "px)"
     		});
	        var obj = this;
	        initX = event.originalEvent.targetTouches[0].pageX;
	        objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
	        if (objX == 0) {
	       		$(this).on('touchmove', function(event) {
		        	// event.preventDefault();
		            var obj = this;
		            moveX = event.originalEvent.targetTouches[0].pageX;
		            X = moveX - initX;
		            if (X >= 0) {
		                obj.style.WebkitTransform = "translateX(" + 0 + "px)";
		            } else if (X < 0) {
		                var l = Math.abs(X);
		                obj.style.WebkitTransform = "translateX(" + -l + "px)";
		                if (l > delWidth) {
		            	    l = delWidth;
		            	    obj.style.WebkitTransform = "translateX(" + -l + "px)";
		         	    }
		            }
	        	});
	       } else if (objX < 0) {
				$(this).on('touchmove', function(event) {
					// event.preventDefault();
					var obj = this;
					moveX = event.originalEvent.targetTouches[0].pageX;
					X = moveX - initX;
					if (X >= 0) {
						var r = -delWidth + Math.abs(X);
						obj.style.WebkitTransform = "translateX(" + r + "px)";
						if (r > 0) {
							r = 0;
							obj.style.WebkitTransform = "translateX(" + r + "px)";
						}
					} else { //向左滑动
						obj.style.WebkitTransform = "translateX(" + -delWidth + "px)";
					}
				});
			}
	 
	     })

	    $(this).on('touchend', function(event) {
	    	// event.preventDefault();
	        var obj = this;
			objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
			if(X > 0){
				tranlates(obj,objX,delWidth, 1.2)
			}else{
				tranlates(obj,objX,delWidth, 4)
			}
	    })
	    var _this = $(this);
 		$(document).on("click", function(){
 			_this.each(function(index, obj){
 				obj.style.WebkitTransform = "translateX(" + 0 + "px)"
 			})
 		})
 		function tranlates(obj,objX,delWidth, r){
 			if (objX > -delWidth / r) {
				obj.style.WebkitTransform = "translateX(" + 0 + "px)";
				objX = 0;
			} else {
				obj.style.WebkitTransform = "translateX(" + -delWidth + "px)";
				objX = -delWidth;
			}
 		}
     //链式返回
    	return this;
   	};
 
})(jQuery);