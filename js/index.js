$(document).ready(function(){
	//	remove this thing
//	alert('index.js');

	/*********************************/
	
	// this was for non-php header setter
	//	$('#tabs').html("<div id='add_printer_header'><span id='add_printer_header_text'>Add A Printer</span></div><div id='view_printer_header'><span id='view_printer_header_text'>Existing Printers</span></div>");

	/******************************/
	// Dropdown menu
	/******************************/
	/*
	$('#title_drop_button').mouseenter(function(){
		$(this).css({'background-image':'url("res/arrow_small.png")','cursor':'pointer'});
	}).mouseleave(function(){
		$(this).css({'background-image':'url("res/arrow_outline.png")','cursor':'default'});
	}).click(function(){
		$('#title_drop_menu').css({'visibility':'visible'}).animate({'height':'100px'},150); // <- This is the place to edit drop height
	});
	$('#title_area').mouseleave(function(){
		$('#title_drop_menu').animate({'height':'0px'},150,function(){
			$(this).css({'visibility':'hidden'});
		});
	});
	$('.title_drop_field').mouseenter(function(){
		$(this).css({'background-color':'#555'});
	}).mouseleave(function(){
		$(this).css({'background-color':''});
	}).click(function(){
		category = $(this).text(); // set category to this selection
		$('#title').html(category); // replace last db with this category
		*/
		//alert(category);
		// JS header setter
		// Kind of messy, but it will be used
		/*
		switch(category){
			case "printer":// capitalized since I didn't use PHP / and wrote bad JS.
				$('#tabs').html("<div id='add_printer_header'><span id='add_printer_header_text'>Add A Printer</span></div><div id='view_printer_header'><span id='view_printer_header_text'>Existing Printers</span></div>");
			break;
			case 'paper':
				$('#tabs').html("<div id='add_paper_header'><span id='add_paper_header_text'>Add Paper</span></div><div id='view_paper_header'><span id='view_paper_header_text'>Paper Stock</span></div>");
			break;
			case 'server':
				$('#tabs').html("<div id='add_server_header'><span id='add_server_header_text'>Add a Server</span></div><div id='view_server_header'><span id='view_server_header_text'>Existing Servers</span></div>");
			break;
			case 'workstation':
				$('#tabs').html("<div id='add_workstation_header'><span id='add_workstation_header_text'>Add a Workstation</span></div><div id='view_workstation_header'><span id='view_workstation_header_text'>Workstations</span></div>");
			break;
			case 'accessory':
				$('#tabs').html("<div id='add_accessory_header'><span id='add_accessory_header_text'>Add Accessories</span></div><div id='view_accessory_header'><span id='view_accessory_header_text'>List Accessories</span></div>");
			break;
			default:
			// write printer
			$('#tabs').html("<div id='add_printer_header'><span id='add_printer_header_text'>Add A Printer</span></div><div id='view_printer_header'><span id='view_printer_header_text'>Existing Printers</span></div>");
			break;
		}
		*/

		/*

		$.post('php/headerSetter.php', {category:category}, function(data){ // make add_page for this category visible
			$('#tabs').html(data);
		});


		$.post('add_pages.php', {category:category}, function(data){ // make add_page for this category visible
			$('#add').html(data).css({'visibility':'visible'});
			$('#view').css({'visibility':'hidden'});
		});
	});
	*/
	

	// Misc.
	// just for fun I've added myself to this document including a link to my website. It's in the way and is inconvenient
	/*
	$('#author').mouseenter(function(){
		// this should be fun to chase around...
		$('#author_name').load('php/author.php').css({'visibility':'visible','cursor':'pointer'}).click(function(){window.location.href='';});
	}).mouseleave(function(){$('#author_name').css({'visibility':'hidden'});});
	// list out the known issues presented in this web application
	$('#list_known_issues').click(function(){
		$('#known_issues').css({'visibility':'visible'});
		$('#known_issues_return').css({'visibility':'visible'});
	});
	*/
	// closes the issues window

});
