
$( document ).ready(function() {
var templateCounter = 0; //counter for numbers of pages (used to readjust size of leftbar)
var text = true;
var pageHTML = $(".page-content").html();
var pageArray = ["PAGE"];
var pageCounter = {};

//Returns an ID for a given page
function getID(pageName) {
    if (pageArray.indexOf(pageName) == -1){
    	pageArray.push(pageName);
    	pageCounter[pageName] = 0;
    	return pageName;
    }else{
    	pageCounter[pageName] += 1;
    	return getID(pageName+pageCounter[pageName]);
    }
}
//Makes an element droppable
function makeDroppable(element){
	element.droppable( {
	over: function(){
		var pageID = "." + $(".selected").attr('class').split(' ')[0];
		var width = $(".article-text" + pageID).width() / 2;
		$(".article-text" + pageID).css("width" , width);
		$(".input-box-container" + pageID).fadeIn();
	},
	out: function(){
		var pageID = "." + $(".selected").attr('class').split(' ')[0];
		$(".input-box-container" + pageID).fadeOut();
		setTimeout(function() {
			var width = $(".article-text" + pageID).width() * 2;
			$(".article-text" + pageID).css("width" , width);
		}, 500);

	}
})}

//Make article section droppable
makeDroppable($(".article-container"));

//Enable file upload event listener
fileUpload(".Page");

//ADD PAGE FUNCTION
 $(".add-page-logo").click(function(){
 	if (text) {
 		alert("Please enter a name for your page.")
 	} else {
 	if (templateCounter > 1) {
 		var templatesHeight = $(".templates").height();
 		var leftbarHeight = $(".left-bar").height();
 		templatesHeight += $(".page-button").height() + 10;
 		leftbarHeight += $(".page-button").height() + 10;
 		$(".templates").css("height", templatesHeight);
 		$(".left-bar").css("height", leftbarHeight);
 	};
 	var pageName = $(".add-page-input").val();
 	var id = getID(pageName);
 	var pageContent = "<div class='"+ id + " page-content current-page'>"+ pageHTML +"</div>";
 	var previousPage = $(".last-page");
 	var page = '<div class="'+ id +' page-button darkgray last-page"><div class="page-button-text">' + pageName + '</div><div class="remove-button"><img class="remove-logo"src="assets/images/remove.png"></div></div>';
	$(".last-page").after(page);
 	previousPage.removeClass("last-page"); //update "last-page" pointer
 	var pageTab = '<div class="'+ id +' added page-tab last-tab"><div class="page-tab-text">'+ pageName + '</div></div>';
 	var previousTab = $(".last-tab");
 	$(".last-tab").after(pageTab);
 	previousTab.removeClass("last-tab");
 	templateCounter++;

 	//reset ADD NEW PAGE button
 	$(".add-page-input").val("");
 	$(".add-page-button-text").text("ADD NEW PAGE");
 	text = true;

 	//Initialize new page
 	$(".current-page").hide();
 	$(".current-page").removeClass("current-page");
 	$(".main").append(pageContent);
 	$(".selected").removeClass("selected");
 	$(".last-tab").addClass("selected");

 	//Initialize IDs of new page
 	update = [".file-input",".display-image",".add-image-container", ".image-draggable-zone",".article-text",".input-box-container"];
 	var pageSelector = "." + id +".page-content";
 	for (var i = 0; i < update.length; i++) {
 		$(pageSelector).find(update[i]).attr("class",update[i].replace(".", "") + " " + id);
 	};
 	
 	//Make article section droppable & and event listener for file upload
 	setTimeout(function() {
	 	makeDroppable($(".article-container"));
	 	fileUpload("."+id);
 	}, 0);
 }});

//Pressing enter clicks on add-page + button
 $(".add-page-input").keydown(function(e) {
 	setTimeout(function() {
   		var input = $(".add-page-input").val();
 		if (input.length > 0) {
 			$(".add-page-button-text").text("");
 			text = false
 		} else if (input.length == 0 && !text) {
 			$(".add-page-button-text").text("ADD NEW PAGE");
 			text = true;
 		}
     }, 0);
 	if (e.keyCode == 13) {
 		if (text) {
 			alert("Please enter a name for your page.")
 		}
 		else {
 		$(".add-page-logo").click(); }
 	};

 });

//Page tab selector function
$('body').on('click', '.page-tab', function(){
	if(!($(this).hasClass("selected"))){
		$(".current-page").fadeOut(300);
		$(".current-page").removeClass("current-page");
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var page = ".page-content."+ $(this).attr('class').split(' ')[0];
		setTimeout(function() {
			$(page).fadeIn(300);
			$(page).addClass("current-page");
	},300)
	}	
});

//Make page red when hover over X
$('body').on("mouseenter", ".remove-button", function(e) {

    $(this).parent().addClass("remove");
    $(this).css("opacity", "1");
});
//Undo red hover effect
$('body').on("mouseleave", ".remove-button", function(e) {

    $(this).parent().removeClass("remove");
    $(this).css("opacity", "0");
});

//Page deletion function
$('body').on('click', '.remove-button', function(){
	//Adjust height of bar
	if (templateCounter > 2) {
 		var templatesHeight = $(".templates").height();
 		var leftbarHeight = $(".left-bar").height();
 		templatesHeight -= $(".page-button").height() + 10;
 		leftbarHeight -= $(".page-button").height() + 10;
 		$(".templates").css("height", templatesHeight);
 		$(".left-bar").css("height", leftbarHeight);
 	};
 	templateCounter--;
 	if ($(this).parent().hasClass("last-page")) {
 		$(this).parent().prev().addClass("last-page");
 	};
 	var tabIndex = $(this).parent().index();
 	$(this).parent().remove();
 	var tabList = $(".page-tabs").children();
 	var numTabs = tabList.length;
 	var tabToRemove = tabList[tabIndex];
 	tabList[tabIndex].remove();
 	//Update "last-tab" pointer
 	if (tabIndex == (numTabs - 1)) {
 		var previousClasses = tabList[tabIndex - 1].className;
 		tabList[tabIndex - 1].setAttribute("class", previousClasses+ " last-tab");
 	};
 	setTimeout(function() {
		$(".last-tab").click();
	},0)
 	

});
//Hide default input-box text
$(".input-text").click(function(){
	var text = jQuery.trim($(this).text());
	if (text == "Start typing here.") {
		$("#input-text").text(" ");
	};
});
//Show default input-box text
$("body").click(function(e){
	if (e.target.id != "input-text" ) {
		var text = jQuery.trim($(".input-text").text());
		if (text.length == 0) {
			$(".input-text").text("Start typing here.");
		};
	
	};

});

//Make panel buttons draggable
$(".text-button").draggable( {
    revert : true
  } );



//Make text box red when hovering over the X
$('body').on('mouseenter', '.corner-hover', function(){
		$(".left-border img").attr("src","assets/images/resize-remove.png");
		$(".right-border img").attr("src","assets/images/resize-remove.png");
		$(".bottom-border img").attr("src","assets/images/resize-remove.png");
		$(".corner img").attr("src","assets/images/corner-delete.png");
		var redborder = "2px solid rgb(239, 122, 116)";
		$(".input-box").css("border", redborder);
	});

//Undo red box effect
$('body').on('mouseleave', '.corner-hover', function(){
		$(".left-border img").attr("src","assets/images/resize-bar.png");
		$(".right-border img").attr("src","assets/images/resize-bar.png");
		$(".bottom-border img").attr("src","assets/images/resize-bar.png");
		$(".corner img").attr("src","assets/images/corner-test.png");
		var blueborder = "2px solid #8fc7ff";
		$(".input-box").css("border", blueborder);
	});
//remove text box when clicking on X
$('body').on('click', '.corner-hover', function(){
	var pageID = "." + $(".selected").attr('class').split(' ')[0];
	var width = $(".article-text" + pageID).width() * 2;
	$(".input-box-container" + pageID).hide();
	$(".article-text" + pageID).css("width" , width);

	});
//Input box resizable function
$(".input-box").resizable({
	 handles: {
        'w': '.left-resize',
        'e': '.right-resize',
        's': '.bottom-resize'
    },
	cancel: ".input-box",
	
});

//Clicking add-image logo triggers file upload
  

	$('body').on('click', ".add-image-logo, .add-image-text", function(){
		var pageID = "." + $(".selected").attr('class').split(' ')[0];
    	$(".file-input" + pageID).click(); //file upload handled by file-upload.js

	}); 




 });