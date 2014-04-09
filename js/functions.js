// globals
var category = 'printer';
var reloaded = parseInt(0);// to cap the reloads.. Things can get messy


// functions

function add(){
	$('#add').css({'visibility':'visible'});
	$('#view').css({'visibility':'hidden'});
	if (reloaded == 0){
	$.ajax({
		type:'POST',
		data:{category:category},
		url:'add.php',
		async:'true',
		success: function(data){
			$('#add').html(data).css({'visibility':'visible'});	
			$('#view').css({'visibility':'hidden'});
			//alert('data set: '+data+' after add_pages in tabs.js'); // debug
		}
	});
	reloaded = parseInt(1);
	}
}

function view(){
	$.ajax({
		type:'POST',
		data:{category:category},
		url:'view.php',
		async:'true',
		success: function(data){
			//alert(data);
			$('#view').html(data).css({'visibility':'visible'});
			$('#add').css({'visibility':'hidden'});
		}
	});
}

// Dropdown menu
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
	// Dropdown.click is the only place that needs to set category. Everything else follows this.
	// ^--- Right here ---v
	category = $(this).text(); // reset category to this selection
	$('#title').html(category); // replace last db with this category
	category = category.toLowerCase();// normalize the string
	$.post('php/headerSetter.php',{category:category},function(data){
		$('#tabs').html(data);	
		reloaded = parseInt(0);	// reset reloaded
		add();
	});

// Search functions
	$('#search_field').click(function(){
		// view_header tab is selected
		$('#view_printer_header').css({'background-color':'#222'});
		$('#view_printer_header_text').css({'color':'#bbb'});
		// other tab(s) are deselected
		$('#add_printer_header').css({'background-color':''});
		$('#add_printer_header_text').css({'color':'#333'});
		$('#view_printer_body').css({'visibility':'visible'});
		$('#add_printer_body').css({'visibility':'hidden'});
		$('#add_printer_footer').css({'visibility':'hidden'});
		$('#view_printer_footer').css({'visibility':'visible'});
		// if search field.val() == this.alt -> reload page
		if ($(this).val() == ''){
			$.post('php/view_printer_list.php',function(data){
				$('#view_printer_list').html(data);
			});
		}
	}).bind('keypress',function(e){
		if(e.keyCode == 13){//alert('enter');// DEBUG
			// keyup was causing some typing issues when trying to load on every keyup. This probably wouldn't have been the case on Ubuntu Server, but just the same it's almost nicer to be able to press [enter] to search.
			// start loading.gif
			// On keyup grab option value and run it against a switch->post method - calling different files for different search standards to meet filter specifications.
			// These filter files can also be used in [filter].click(functions) when the time comes and they're finished.
			// create a case:switch statement for values of dropdown. ( if model: post to view_printer_model_search.php with model passed as value )
			// keep in mind the caps.
			var search = $('#search_selector option:selected').text();// thank you Stack Overflow.
			$('#view_printer_list').html('<span id="loading"><img src="res/ajax-loader.gif" /></span>');// thanks to ajaxload.info
			switch(search){
				case 'Model':
					// set search box value to model
					var model = $('#search_field').val();
					$.post('php/view_printer_list.php',{model:model},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				case 'Toner':
					// set search box value to model
					var toner = $('#search_field').val();
					$.post('php/view_printer_list.php',{toner:toner},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				case 'Drum':
					// set search box value to model
					var drum = $('#search_field').val();
					$.post('php/view_printer_list.php',{drum:drum},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				case 'IP':
					// set search box value to model
					var ip = $('#search_field').val();
					$.post('php/view_printer_list.php',{ip:ip},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				case 'Drum Replaced':
					// set search box value to model
					var drum_replaced = $('#search_field').val();
					$.post('php/view_printer_list.php',{drum_replaced:drum_replaced},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				case 'Toner Replaced':
					// set search box value to model
					var toner_replaced = $('#search_field').val();
					$.post('php/view_printer_list.php',{toner_replaced:toner_replaced},function(data){
						$('#view_printer_list').html(data);
					});
				break;
				default:
					// error case
					alert('Error'); // this shouldn't occur, obviously.
				break;
			}
		}
	});

	$('#known_issues_return').click(function(){
		$(this).css({'visibility':'hidden'});
		$('#known_issues').css({'visibility':'hidden'});
	});

});
