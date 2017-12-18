(function($){
	$.fn.dropmenu = function(custom) {
		var defaults = {
		  	openAnimation: "slide",
			closeAnimation: "slide",
			openClick: false,
			openSpeed: 300,
			closeSpeed: 400,
			closeDelay:300,
			onHide: function(){},
			onHidden: function(){},
			onShow: function(){},
			onShown: function(){}
		  };
		var settings = $.extend({}, defaults, custom);
		
		var menu = this;
		var currentPage = 0;
		var delayTimer = "";
		
		// Trigger init
		init();
		
		/**
		 * Do preparation work
		 */
		function init(){

			// Add open button and class to parent of a subinner_item
			var items = menu.find(":has(li,div) > a").append('<span class="arrow"></span>');
			$.each(items, function(i, val) {
				if(items.eq(i).parent().is("li")){
					items.eq(i).next().addClass("subinner_item").parent().addClass("haschildren");
				}else{
					items.eq(i).parent().find("ul").show();
				}
			});
			
			if(settings.openClick){
				menu.find(".subinner_item").css("display", "none");
				menu.find(":has(li,div) > a").parent().bind("mouseleave",handleHover).bind("mouseenter",function(){ window.clearInterval(delayTimer); });
				menu.find("a span.arrow").bind("click", handleHover);
			}else{
				menu.find(":has(li,div) > a").bind("mouseenter",handleHover).parent().bind("mouseleave",handleHover).bind("mouseenter",function(){ window.clearInterval(delayTimer); });
			}
			
			
		}
		
		/**
		 * Handle mouse hover action
		 */
		function handleHover(e){
			if(e.type == "mouseenter" || e.type == "click"){
				window.clearInterval(delayTimer);
				var current_subinner_item = $(e.target).parent().find(".subinner_item:not(:animated):not(.open)");
				if(current_subinner_item.html() == null){
					current_subinner_item = $(e.target).parent().next(".subinner_item:not(:animated):not(.open)");
				}
				if(current_subinner_item.html() != null){
					settings.onShow.call(current_subinner_item);
					closeAllMenus();
					current_subinner_item.prev().addClass("selected");
					current_subinner_item.css("z-index", "90");
					current_subinner_item.stop().hide();
					openMenu(current_subinner_item);
				}
			}
			if(e.type == "mouseleave" || e.type == "mouseout"){
				current_subinner_item = $(e.target).parents(".subinner_item");
				if(current_subinner_item.length != 1){
					var current_subinner_item = $(e.target).parent().parent().find(".subinner_item");
					if(current_subinner_item.html() == null){
						var current_subinner_item = $(e.target).parent().find(".subinner_item");
						if(current_subinner_item.html() == null){
							var current_subinner_item = $(e.target).parent().parent().parent().find(".subinner_item");
						}
					}
				}
				if(current_subinner_item.html() != null){
					if(settings.closeDelay == 0){
						current_subinner_item.parent().find("a").removeClass("selected");
						closeMenu(current_subinner_item);
					}else{
						window.clearInterval(delayTimer);
						delayTimer = setInterval(function(){
							window.clearInterval(delayTimer);
							closeMenu(current_subinner_item);
						}, settings.closeDelay);	
					}
				}
			}
		}
		
		function openMenu(object){
			switch(settings.openAnimation){
				case "slide":
					openSlideAnimation(object);
					break;
				case "fade":
					openFadeAnimation(object);
					break;
				default:
					openSizeAnimation(object);
					break;
			}
		}
		
		function openSlideAnimation(object){
			object.addClass("open").slideDown(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function openFadeAnimation(object){
			object.addClass("open").fadeIn(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function openSizeAnimation(object){
			object.addClass("open").show(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function closeMenu(object){
			settings.onHide.call(object);
			switch(settings.closeAnimation){
				case "slide":
					closeSlideAnimation(object);
					break;
				case "fade":
					closeFadeAnimation(object);
					break;
				default:
					closeSizeAnimation(object);
					break;
			}
		}
		
		function closeSlideAnimation(object){
			object.slideUp(settings.closeSpeed, closeCallback);
		}
		
		function closeFadeAnimation(object){
			object.fadeOut(settings.closeSpeed, function(){ $(this).removeClass("open"); $(this).prev().removeClass("selected"); });
		}
		
		function closeSizeAnimation(object){
			object.hide(settings.closeSpeed, function(){ $(this).removeClass("open"); $(this).prev().removeClass("selected"); });
		}
		
		function closeAllMenus(){
			var subinner_items = menu.find(".subinner_item.open");
			$.each(subinner_items, function(i, val) {
				$(subinner_items[i]).css("z-index", "1");
				closeMenu($(subinner_items[i]));
			});
		}
		
		function closeCallback(object){
			$(this).removeClass("open"); 
			if($(this).prev().attr("class") == "selected") settings.onHidden.call(this);
			$(this).prev().removeClass("selected");
		}
			
		// returns the jQuery object to allow for chainability.
		return this;
	}
	
})(jQuery);
