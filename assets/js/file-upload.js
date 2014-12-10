function fileUpload(pageID) {

	
    var fileInput = $('.file-input' + pageID)[0];
   
   

    fileInput.addEventListener('change', function(e) {
      	var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
		  var reader = new FileReader();

		  reader.onload = function(e) {
		  	$('.display-image' + pageID).css("display", "inline-block");
		  	 var fileDisplayArea = $('.display-image' + pageID)[0];
		    fileDisplayArea.innerHTML = "";

		    // Create a new image.
		    var img = new Image();
		    // Set the img src property using the data URL.
		    img.src = reader.result;


		    // Add the image to the page.
		    fileDisplayArea.appendChild(img);
		    $(".add-image-container" + pageID).hide();
		    $(".image-draggable-zone" + pageID).show()
			$( ".display-image" + pageID).draggable({
			  containment: "parent"
			});
			$(".display-image img").addClass("scaled");
		  }

		  reader.readAsDataURL(file); 
		} else {
		  fileDisplayArea.innerHTML = "File not supported!";
		}
    });
}