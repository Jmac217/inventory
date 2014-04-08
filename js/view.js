/*******************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

***********************************************************/

$(document).ready(function(){

	// JSON globals
	var id = '';
	// get loop parameters, both the row_number and col_number
	var row_cap = 0; // will loop through rows
	var col_cap = 0; // will loop through cols
	var row = []; // sets up row to be used directly in flags
	var rows = {}; // this object holds column and this_id
	var col = {}; // col object holds the values for columns
	var this_id = 0; // Instantiate this_id to 0, it will always be changed before usage.
	var columns = {}; // columns is an object that holds arrays of values and bools
	var flags = {}; // flags is the object that is called on and holds all other objects and arrays
	//var fDebug = []; // just an array for flag debugging
	
	// these functions will take category and get* files will be switch enabled.
	// - as for now they'll just get printer rows/columns

	// since the following two ajax requests take a few seconds to load, it may be helpful to call the loading gif
	// - or at very least try to asyncronise one or both.
	$.ajax({
		type:'POST',
		url: 'php/getRows.php',
		data:{category:category},
		async: true,
		success: function(data){
			row_cap = data;
		}
	});
	
	// generated.js will be written by php using database global variables. the will be a *generateJS.php* that scrapes databases database for globals and plugs them into functions. It will be awesome.
	/*
	$.ajax({
		url:'js/generated.js',
		dataType:'script',
		success:function(){
			alert('generated.js ajax');
		}
	});
	*/
	
	// THESE NEED CHANGED BACK TO FALSE IMEDIATELY

	$.ajax({
		type:'POST',
		url: 'php/getCols.php',
		data:{category:category},
		async: false,
		success: function(data){
			//var amounts = 2; // hard coded number of extra amounts to add to fields. Comes from toner_amount and drum_amont
			col_cap = data;// number of colums - 1 for ID and - 1 more to start at 0
			//col_cap = parseInt(col_cap) + parseInt(amounts);
		}
	});
//	alert(row_cap);

	// this really is just for debugging purposes, but it wouldn't hurt to leave it in. If only to show Tom what's happening under the hood.
	function getJSON(){
		var string = '';
		var i = 0;
		var t = 0;
		while(i <= row_cap){
			 // this is the same as in PHP -> isset(value) => Very useful
			if(i in flags.row){// NixNinja from Stack Overflow is a nice guy: http://stackoverflow.com/questions/2613192/check-if-an-array-item-is-set-in-js
				string = string+'True ID(i, row_id): ('+i+'), DB ID: ('+flags.row[i].id+'), Values: ('+flags.row[i].columns.values+'), Bools: ('+flags.row[i].columns.bools+')\n';
				i++;
				t++;
			}else{i++;}
		}
		console.log(string);
	}

			// hover over nothing, and get something.
			$('#view_list_nothing').click(function(){/*alert('click');*/}).mouseenter(function(){$('#small').css({'visibility':'visible'});}).mouseleave(function(){$('#small').css({'visibility':'hidden'});});


//  alert(category);

	// will be switch enabled
	// takes category

	// filter categories
	// this doesn't matter much right now
	/*
	$('#view_printer_catagory_model').click(function(){
		var model_filter = 'model';
		$.post('php/view_printer_list.php',{model_filter:model_filter},function(data){// pass model_filter to PHP -> php/view_printer_list.php
			$('#view_printer_list').html(data);// and view list
		});
	});
	// toner and drum should get mutable variables to be passed into them
	$('#view_printer_catagory_toner').click(function(){
		$.post('php/get_filter.php',{post:'toner'},function(data){
			$('#view_printer_list').html(data);
		});
	});
	$('#view_printer_catagory_drum').click(function(){
		$.post('php/get_filter.php',{post:'drum'},function(data){
			$('#view_printer_list').html(data);
		});
	});
	$('#view_printer_catagory_ip').click(function(){
		var ip_filter = 'ip';
		$.post('php/view_printer_list.php',{ip_filter:ip_filter},function(data){
			$('#view_printer_list').html(data);
		});
	});
	$('#view_printer_catagory_toner_replaced').hover(function(){$(this).css({'cursor':'pointer'});}).click(function(){
		var toner_replaced_filter = 'toner_replaced';
		$.post('php/view_printer_list.php',{toner_replaced_filter:toner_replaced_filter},function(data){
			$('#view_printer_list').html(data);
		});
	});
	$('#view_printer_catagory_drum_replaced').hover(function(){$(this).css({'cursor':'pointer'});}).click(function(){
		var drum_replaced_filter = 'drum_replaced';
		$.post('php/view_printer_list.php',{drum_replaced_filter:drum_replaced_filter},function(data){
			$('#view_printer_list').html(data);
		});
	});
	*/

	// The following AJAX calls, while not the most efficient, return the number of rows and columns of the view list
	// something has to be done about these load times, for now I just turned off the asynchronism since there isn't an actual for loop call to generate JSON. By time a user will actually edit a field these calls will have been made... I think :P
//	alert(category);
	switch (category){

/*

	* Going through with comments and revising
	* This is going to be kind of big, but I should be able to cut this down using functions.

	! comment everything but don't delete it

	# functions could use switch statements

*/


		case 'printer':
			// for each printer field
			$.each($('.view_printer_field'), function(){
				// instantiate this fields ID, and set up arrays for values and bools to be pushed onto.
				var this_id = $(this).attr('id');
				var col_values = [];
				var col_bools   = [];
				// get this row's columns' values
				// set default values by pushing row's spans' text into col_values[]
				// :NOTICE: That "toner" versus the "toners"

				col_values.push($(this).children('.view_printer_model').text());
				col_values.push($(this).children('.view_printer_name').text());
				col_values.push($(this).children('.view_printer_network').text());
				col_values.push($(this).children('.view_printer_branch').text());
				col_values.push($(this).children('.view_printer_desk').text());
				col_values.push($(this).children('.view_printer_ip').text());
				col_values.push($(this).children('.view_printer_toner_type').text());
				col_values.push($(this).children('.view_printer_drum_type').text());
				col_values.push($(this).children('.view_printer_toner_amount').text());
				col_values.push($(this).children('.view_printer_drum_amount').text());
				col_values.push($(this).children('.view_printer_toner_replaced').text());
				col_values.push($(this).children('.view_printer_drum_replaced').text());
				col_values.push($(this).children('.view_printer_printer_amount').text());
				col_values.push($(this).children('.view_printer_maintenance_date').text());
				// get this row's columns' bools
				// set bools default values to 0 because they're unedited
				for (var i=0;i<=col_cap;i++){
					col_bools.push('0');
				}
				
				// piece together the object
				col = {values:col_values, bools:col_bools};// set up col to equal an object with this row's values and booleans
				rows = {id:this_id, columns:col};// set this row to contain this row's id and columns
				row.push(rows);// push this row onto the array
				flags = {row:row};// add this row to flags
			});
			

			// calling this function here is only viable when the ajax calls -> async is set to false.
			getJSON();
			
			var willBeUpdated = 0; // This guy still needs implementation, do I even need this?
			


			// dropdown hover and delete functions - these are all crazy and relative... "Don't hate; subscriptiate!" - BlumGum himself
			$('.view_printer_field').mouseenter(function(){ // field -> update -> model
				id = $(this).attr('id');
				$(this).children('.view_printer_options').css({'visibility':'visible'}); // oh yeah!
			}).mouseleave(function(){
				$(this).children('.view_printer_options').css({'visibility':'hidden'});
			}).children('.view_printer_model').click(function(){
				// get this row_id, set from PHP
				var row_id = String($(this).parent().attr('row_id'));// can be passed in post to PHP files
				// get this col_id
				var col_id = $(this).attr('id');
				// set this span to hidden to replace with the update
				$(this).css({'visibility':'hidden'});
				// show buttons
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				// set this input to visible and select its contents then call a blur function // used to be a mouseleave function
				// so hierarchical structure in command line listing is as follows (Warning: it's a little messy): ~/.view_printer_model: ../.view_printer_field/.view_printer_field_update/.view_printer_model_update/*
				$(this).parent().children('.view_printer_field_update').children('.view_printer_model_update').css({'visibility':'visible'}).select().blur(function(){// that parent's other grandchildren need to shut up when she leaves...
					// if value = alt then display original, otherwise leave the box for update // set model_update boolean to true, and otherwise return to false. // if this field has been blanked, then return the original value, and also later reset the update variable.
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					// INSTEAD of using 'alt' here, it would be more efficient to use the '.view_printer_*' value to check against for changed values, but, at least for now, this works.
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						// shows the update button if no other field has been updated!!! - needs implemented - will set a global variable as soon as a field is updated - willBeUpdated = true, and if true then do not hide button again.
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						// return the original div when finished
						$(this).parent().parent().children('.view_printer_model').css({'visibility':'visible'});
						// sets this boolean as 0 and this value to ''
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();// console debugger
						//alert('Value: '+flags.row[row_id].columns.values[col_id]+', Boolean: '+flags.row[row_id].columns.bools[col_id]);// cool little debug script
					}else{
						// this row's columns' equal these values and their corresponding booleans equal 1
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();// console debugger
					}
				}).click(function(){
					// select when clicked
					$(this).select();
				});
			}).siblings('.view_printer_toner_amount').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});			
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_toner_amount_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_toner_amount').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_name').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});			
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_name_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_name').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_network').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});			
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_network_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_network').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_branch').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});			
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_branch_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_branch').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_desk').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});			
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_desk_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_desk').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_ip').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_ip_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_ip').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){$(this).select();});			
			}).siblings('.view_printer_toner_type').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_toner_type_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_toner_type').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';		
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_drum_amount').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_drum_amount_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_drum_amount').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_drum_type').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_drum_type_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_drum_type').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_toner_replaced').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_toner_replaced_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_toner_replaced').css({'visibility':'visible'});		
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';	
						getJSON();
					}
				}).click(function(){$(this).select();});	
			}).siblings('.view_printer_drum_replaced').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_drum_replaced_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_drum_replaced').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';	
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_printer_amount').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_printer_amount_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_printer_amount').css({'visibility':'visible'});		
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';	
						getJSON();
					}
				}).click(function(){$(this).select();});
			}).siblings('.view_printer_maintenance_date').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_printer_field_update').children('.view_printer_maintenance_date_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_printer_update').css({'visibility':'hidden'});
						$('#view_printer_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_printer_maintenance_date').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';	
						getJSON();
					}
				}).click(function(){$(this).select();});
			});
			//$(this).css({'background-color':'#e0f2e8','cursor':'pointer'});// old blue theme, bring it back? Y or N: N; Remove this
			$('.view_printer_options').click(function(){
				/*
				 *
				 * Does anything really need to go here, or is this just a css class?
				 *
				 */
			});
			// When remove button is hovered over
			$('.view_printer_options_remove').mouseenter(function(){
				// change the image to *_hover.png,
				$(this).css({'background-image':'url("res/remove_hover.png")'});
			}).mouseleave(function(){
				// and when mouse has moved away, change it back to remove.png.
				$(this).css({'background-image':'url("res/remove.png")'});
			}).click(function(){
				// If the button is pressed remove the row associated with the id that will be passed
				$.post('php/remove.php',{id:id},function(){
					// and refresh the page.. Dual $.post functions - this is a little too slow.
					$.post('php/view_printer_list.php',function(data){
						$('#view_printer_list').html(data);
					});
				});
			});
			// when update button is hovered over
			$('.view_printer_options_update').mouseenter(function(){
				// change the image to *_hover.png,
				$(this).css({'background-image':'url("res/update_hover2.png")'});
			}).mouseleave(function(){
				// and when mouse has moved away, change it back to update.png.
				$(this).css({'background-image':'url("res/update3.png")'});
			}).click(function(){
				// again with the command line structure, it's just a lot easier to comprehend:
				//make hidden ../.././.view_printer_*model*
				//make visible ../../.view_printer_field_update/.view_printer_*model*_update
				// this just sets the row to be updated
				// there should be a conditional here to make sure the button will revert back, and also set the inputs to update with the updater.
				$(this).parent().parent().children('.view_printer_model').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_toner').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_drum').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_ip').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_toner_replaced').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_drum_replaced').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_model_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_toner_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_drum_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_ip_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_toner_replaced_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_printer_field_update').children('.view_printer_drum_replaced_update').css({'visibility':'visible'});
			});
			$('#view_printer_cancel').click(function(){
				$('#view_printer_list').load('php/view_printer_list.php');
			});
			$('#view_printer_update').click(function(){
				// start looping through 'flags' and convert JSON into XML
				var update_xml = ''; // set string to be appended
				for(var i=0;i<=row_cap;i++){
					if(i in flags.row){
						// start gathering values for xml; manually looping through this is cumbersome, but will work for now.
						var col = 0;
						var row = '<row id="'+flags.row[i].id+'">';
						var model = '<model><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></model>';
						col++;
						var name = '<name><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></name>';
						col++;
						var network = '<network><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></network>';
						col++;
						var branch = '<branch><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></branch>';
						col++;
						var desk = '<desk><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></desk>';
						col++;
						var ip = '<ip><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></ip>';
						col++;
						var toner_type = '<toner_type><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></toner_type>';
						col++;
						var drum_type = '<drum_type><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></drum_type>';
						col++;						
						var toner_amount = '<toner_amount><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></toner_amount>';
						col++;
						var drum_amount = '<drum_amount><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></drum_amount>';
						col++;
						var toner_replaced = '<toner_replaced><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></toner_replaced>';
						col++;
						var drum_replaced = '<drum_replaced><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></drum_replaced>';
						col++;
						var printer_amount = '<printer_amount><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></printer_amount>';
						col++;
						var maintenance_date = '<maintenance_date><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></maintenance_date>';
						var endRow = '</row>';
						update_xml = update_xml+row+model+name+network+branch+desk+ip+toner_type+drum_type+toner_amount+drum_amount+toner_replaced+drum_replaced+printer_amount+maintenance_date+endRow;
						alert('update_xml: '+update_xml);
					}
				}
				update_xml = '<xml><rows>'+update_xml+'</rows></xml>'; // encapsulate the row's in properly formatted XML
				console.log(update_xml);
				// send to PHP
				$.post('php/updateXML.php',{update_xml:update_xml,category:category},function(data){alert('data: '+data);
					//alert(data);
					// it works, so display some shit
					if(data=='x'){
						// display failure
						// check log needs to be added here once HTML view is set up
						$('#view_printer_feedback').show().html('Update has Failed').css({'color':'red'}).fadeOut(1800);
					}else{
						// display Success inside of the feedback div
						$('#view_printer_feedback').show().html('Update was Successful').css({'color':'green'}).fadeOut(1800);
						$('#view_printer_list').load('php/view_printer_list.php');
					}
				});
			});
		break; // break printer
		case 'paper':

		
		
		/*
		
		
				Since there is so much here, I believe it's possible to create functions for each section. I assume 5 functions will work for this, but for now paper works.

				it is possible to replace $('******') with variables, I tried it with "var type = '.view_paper_type'".

				It could be beneficial to create JSON objects from global database values... things are going to get more complicated and awesome.
		

				
				going through and scraping raw variables for global:
					- field: string
					-columns: value and string
					-options
					-children: number of columns, values, updates
					-xml
					
					JSON
															-- something like this anyway
					category{
						field = '',
						columns = { number, [values]},
						options = {},
						children = { 
							#columns,
							[values],	
							[updates]
						}
						xml = {
							[values]	
						}
					}

		
		*/
		
		
			// for each printer field
			$.each($('.view_paper_field'), function(){

				// instantiate this fields ID, and set up arrays for values and bools to be pushed onto.
				var this_id = $(this).attr('id');
				var col_values = [];
				var col_bools   = [];

				// get this row's columns' values
				// set default values by pushing row's spans' text into col_values[]
				col_values.push($(this).children('.view_paper_type').text());
				col_values.push($(this).children('.view_paper_stock').text());
				col_values.push($(this).children('.view_paper_department').text());
				col_values.push($(this).children('.view_paper_timestamp').text());

				
				
				/* * * * * * * * * 
				
					START HERE
					
					This case needs to be converted to paper, just like the above 


				getRows and getCols throw off the JSON, but that's okay for now
				^ That needs fixed before testing

				
				* * * * * * * * * */
				
				
				
				// get this row's columns' bools
				// set bools default values to 0 because they're unedited
				for (var i=0;i<=col_cap;i++){
					col_bools.push('0');
				}
				
				// piece together the object
				col = {values:col_values, bools:col_bools};// set up col to equal an object with this row's values and booleans
				rows = {id:this_id, columns:col};// set this row to contain this row's id and columns
				row.push(rows);// push this row onto the array
				flags = {row:row};// add this row to flags

			}); // end each

			/** could call ^ this ^ push(category){switch cases}**/
			
			// calling this function here is only viable when the ajax calls -> async is set to false.
			getJSON();
			
			/* ??? */ var willBeUpdated = 0; // This guy still needs implementation, do I even need this?
			
			// # hover over nothing, and get something.
			// !! This thing here is pretty global, keep that in mind during all of this
			$('#view_list_nothing').click(function(){/*alert('click');*/}).mouseenter(function(){$('#small').css({'visibility':'visible'});}).mouseleave(function(){$('#small').css({'visibility':'hidden'});});

			// dropdown hover and delete functions - these are all crazy and relative... "Don't hate; subscriptiate!" - BlumGum himself
			$('.view_paper_field').mouseenter(function(){ // field -> update -> model
				id = $(this).attr('id');
				$(this).children('.view_paper_options').css({'visibility':'visible'}); // oh yeah!
			}).mouseleave(function(){
				$(this).children('.view_paper_options').css({'visibility':'hidden'});

			// start the children click functions
			}).children('.view_paper_type').click(function(){

				// get this row_id, set from PHP
				var row_id = String($(this).parent().attr('row_id'));// can be passed in post to PHP files

				// get this col_id
				var col_id = $(this).attr('id');

				// set this span to hidden
				$(this).css({'visibility':'hidden'});

				// show buttons for edit mode
				$('#view_paper_update').css({'visibility':'visible'});
				$('#view_paper_cancel').css({'visibility':'visible'});

				// set this input to visible and select it's contents then call a blur function // used to be a mouseleave function
				// so hierarchical structure in command line listing is as follows (Warning: it's a little messy): ~/.view_printer_model: ../.view_printer_field/.view_printer_field_update/.view_printer_model_update/*


				// start field selection function

				// when paper type is selected swap to update field
				$(this).parent().children('.view_paper_field_update').children('.view_paper_type_update').css({'visibility':'visible'}).select().blur(function(){// that parent's other grandchildren need to shut up when she leaves...

					// if value = alt then display original, otherwise leave the box for update // set model_update boolean to true, and otherwise return to false. // if this field has been blanked, then return the original value, and also later reset the update variable.
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}

					// INSTEAD of using 'alt' here, it would be more efficient to use the '.view_printer_*' value to check against for changed values, but, at least for now, this works.
					if ($(this).val() == $(this).attr('alt')){

						$(this).css({'visibility':'hidden'});

						// shows the update button if no other field has been updated!!! - needs implemented - will set a global variable as soon as a field is updated - willBeUpdated = true, and if true then do not hide button again.
						$('#view_paper_update').css({'visibility':'hidden'});
						$('#view_paper_cancel').css({'visibility':'hidden'});

						// return the original div when finished
						$(this).parent().parent().children('.view_paper_type').css({'visibility':'visible'});

						// sets this boolean as 0 and this value to ''
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';

						getJSON();// console debugger

						//alert('Value: '+flags.row[row_id].columns.values[col_id]+', Boolean: '+flags.row[row_id].columns.bools[col_id]);// cool little debug script

					}else{

						// this row's columns' equal these values and their corresponding booleans equal 1



						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';

						getJSON();// console debugger

					}
				}).click(function(){
					// select when clicked
					$(this).select();
				});

				// end field selection

			}).siblings('.view_paper_stock').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_paper_field_update').children('.view_paper_stock_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_paper_update').css({'visibility':'hidden'});
						$('#view_paper_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_paper_stock').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						//alert(col_id);
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';		
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_paper_department').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_paper_update').css({'visibility':'visible'});
				$('#view_paper_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});
				$(this).parent().children('.view_paper_field_update').children('.view_paper_department_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_paper_update').css({'visibility':'hidden'});
						$('#view_paper_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_paper_department').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_paper_timestamp').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_paper_update').css({'visibility':'visible'});
				$('#view_paper_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_paper_field_update').children('.view_paper_timestamp_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_paper_update').css({'visibility':'hidden'});
						$('#view_paper_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_paper_timestamp').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			});
			//$(this).css({'background-color':'#e0f2e8','cursor':'pointer'});// old blue theme, bring it back? Y or N
			$('.view_paper_options').click(function(){
				/*
				 *
				 * Does anything really need to go here, or is this just a css class?
				 *
				 */
			});
			// When remove button is hovered over
			$('.view_paper_options_remove').mouseenter(function(){
				// change the image to *_hover.png,
				$(this).css({'background-image':'url("res/remove_hover.png")'});
			}).mouseleave(function(){
				// and when mouse has moved away, change it back to remove.png.
				$(this).css({'background-image':'url("res/remove.png")'});
			}).click(function(){
				// If the button is pressed remove the row associated with the id that will be passed
				$.post('php/remove.php',{id:id},function(){
					// and refresh the page.. Dual $.post functions - this is a little too slow.
					alert('remove needs remade');
					/* EXCLUDED
					$.post('php/view_printer_list.php',function(data){
						$('#view_printer_list').html(data);
					});
					*/
					
				});
			});
			// when update button is hovered over
			$('.view_paper_options_update').mouseenter(function(){
				// change the image to *_hover.png,
				$(this).css({'background-image':'url("res/update_hover2.png")'});
			}).mouseleave(function(){
				// and when mouse has moved away, change it back to update.png.
				$(this).css({'background-image':'url("res/update3.png")'});
			}).click(function(){
				// again with the command line structure, it's just a lot easier to comprehend:
				//make hidden ../.././.view_printer_*model*
				//make visible ../../.view_printer_field_update/.view_printer_*model*_update
				// this just sets the row to be updated
				// there should be a conditional here to make sure the button will revert back, and also set the inputs to update with the updater.
				$(this).parent().parent().children('.view_paper_type').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_paper_stock').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_paper_department').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_paper_timestamp').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_paper_field_update').children('.view_paper_type_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_paper_field_update').children('.view_paper_stock_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_paper_field_update').children('.view_paper_department_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_paper_field_update').children('.view_paper_timestamp_update').css({'visibility':'visible'});
			});
			$('#view_paper_cancel').click(function(){
				alert('cancel needs remade');
				//$('#view_paper_list').load('php/view_paper_list.php');
			});
			$('#view_paper_update').click(function(){
				// start looping through 'flags' and convert JSON into XML
				var update_xml = ''; // set string to be appended
				for(var i=0;i<=row_cap;i++){
					if(i in flags.row){
						// start gathering values for xml
						var col = 0;
						var row = '<row id="'+flags.row[i].id+'">';
						var type = '<type><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></type>';
						col++;
						var stock = '<stock><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></stock>';
						col++;
						var department = '<department><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></department>';
						col++;
						var timestamp = '<timestamp><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></timestamp>';
						var endRow = '</row>';
						update_xml = update_xml+row+type+stock+department+timestamp+endRow;
						//alert(update_xml);
					}
				}
				update_xml = '<xml><rows>'+update_xml+'</rows></xml>'; // encapsulate the row's in properly formatted XML
				console.log(update_xml);
				// send to PHP
				$.post('php/updateXML.php',{update_xml:update_xml,category:category},function(data){//alert(data);
					if(data=='x'){
						// display failure
						// check log needs to be added here once HTML view is set up
						$('#view_paper_feedback').show().html('Update has Failed').css({'color':'red'}).fadeOut(1800);
					}else{
						// display Success inside of the feedback div
						$('#view_paper_feedback').show().html('Update was Successful').css({'color':'green'}).fadeOut(1800);
						$('#view_paper_list').load('php/view_printer_list.php');
					}
				});
			});

		break; // break paper
		case 'workstation':

		// these functions do work, so I'm leaving them here for reference.
		// I want these functions to be revised and regenerative via JSON.

		// By the way: This is all v3 type stuff... Yeah I'm paving the way already

		function init(){
		
			$.each($('.view_workstation_field'), function(){
				var this_id = $(this).attr('id');
				var col_values = [];
				var col_bools   = [];
				col_values.push($(this).children('.view_workstation_name').text());
				col_values.push($(this).children('.view_workstation_model').text());
				col_values.push($(this).children('.view_workstation_hd').text());
				col_values.push($(this).children('.view_workstation_ram').text());
				col_values.push($(this).children('.view_workstation_version').text());
				col_values.push($(this).children('.view_workstation_ip').text());
				col_values.push($(this).children('.view_workstation_user').text());
				col_values.push($(this).children('.view_workstation_extension').text());
				col_values.push($(this).children('.view_workstation_date').text());
				for (var i=0;i<=col_cap;i++){
					col_bools.push('0');
				}
				col = {values:col_values, bools:col_bools};
				rows = {id:this_id, columns:col};
				row.push(rows);
				flags = {row:row};
			});
		} init();

			getJSON();
			
			var willBeUpdated = 0;
			
		function view_nothing(){
			$('#view_list_nothing').click(function(){/*alert('click');*/}).mouseenter(function(){$('#small').css({'visibility':'visible'});}).mouseleave(function(){$('#small').css({'visibility':'hidden'});});
		}

		function children(){
			$('.view_workstation_field').mouseenter(function(){
				id = $(this).attr('id');
				$(this).children('.view_workstation_options').css({'visibility':'visible'});
			}).mouseleave(function(){
				$(this).children('.view_workstation_options').css({'visibility':'hidden'});

			}).children('.view_workstation_name').click(function(){

				var row_id = String($(this).parent().attr('row_id'));

				var col_id = $(this).attr('id');

				$(this).css({'visibility':'hidden'});

				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});

				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_name_update').css({'visibility':'visible'}).select().blur(function(){// that parent's other grandchildren need to shut up when she leaves...

					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}

					if ($(this).val() == $(this).attr('alt')){

						$(this).css({'visibility':'hidden'});

						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});

						$(this).parent().parent().children('.view_workstation_name').css({'visibility':'visible'});

						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';

						getJSON();

					}else{

						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';

						getJSON();

					}
				}).click(function(){
					$(this).select();
				});


			}).siblings('.view_workstation_model').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_model_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_model').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';		
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_workstation_hd').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_hd_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_hd').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_workstation_ram').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_ram_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_ram').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_workstation_version').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_version_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_version').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_workstation_ip').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_ip_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_ip').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_workstation_user').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_user_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_user').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_workstation_extension').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_extension_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_extension').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_workstation_date').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_workstation_update').css({'visibility':'visible'});
				$('#view_workstation_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_workstation_field_update').children('.view_workstation_date_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_workstation_update').css({'visibility':'hidden'});
						$('#view_workstation_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_workstation_date').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			});
			
		} children();

			$('.view_workstation_options').click(function(){});
			
		function remove(){
			$('.view_workstation_options_remove').mouseenter(function(){
				$(this).css({'background-image':'url("res/remove_hover.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/remove.png")'});
			}).click(function(){
				$.post('php/remove.php',{id:id},function(){
					alert('remove needs remade');
				});
			});
		} remove();
			
		function line_update(){
			$('.view_workstation_options_update').mouseenter(function(){
				$(this).css({'background-image':'url("res/update_hover2.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/update3.png")'});
			}).click(function(){
				$(this).parent().parent().children('.view_workstation_name').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_model').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_hd').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_ram').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_version').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_ip').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_user').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_extension').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_date').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_name_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_model_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_hd_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_ram_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_version_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_ip_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_user_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_extension_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_workstation_field_update').children('.view_workstation_date_update').css({'visibility':'visible'});
			});
			
		} line_update();
		
		function cancel(){
			$('#view_workstation_cancel').click(function(){
				alert('cancel needs remade');
			});
		}
		
		function submit(){
			$('#view_workstation_update').click(function(){ // NEEDS WORK
				var update_xml = '';
				for(var i=0;i<=row_cap;i++){
					if(i in flags.row){
						var col = 0;
						var row = '<row id="'+flags.row[i].id+'">';
						var name = '<name><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></name>';
						col++;
						var model = '<model><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></model>';
						col++;
						var hd = '<hd><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></hd>';
						col++;
						var ram = '<ram><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></ram>';
						col++;
						var version = '<version><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></version>';
						col++;
						var ip = '<ip><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></ip>';
						col++;
						var user = '<user><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></user>';
						col++;
						var extension = '<extension><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></extension>';
						col++;
						var date = '<date><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></date>';
						var endRow = '</row>';
						update_xml = update_xml+row+name+model+hd+ram+version+ip+user+extension+date+endRow;
					}
				}
				update_xml = '<xml><rows>'+update_xml+'</rows></xml>';
				console.log(update_xml);
				$.post('php/updateXML.php',{update_xml:update_xml,category:category},function(data){//alert(data);
					if(data=='x'){
						$('#view_workstation_feedback').show().html('Update has Failed').css({'color':'red'}).fadeOut(1800);
					}else{
						$('#view_workstation_feedback').show().html('Update was Successful').css({'color':'green'}).fadeOut(1800);
						$('#view_workstation_list').load('php/view_printer_list.php');
					}
				});
			});
		} submit();

		break; // break workstation
		case 'server':

		// these functions do work, so I'm leaving them here for reference.
		// I want these functions to be revised and regenerative via JSON.

		// By the way: This is all v3 type stuff... Yeah I'm paving the way already



		// set case variables
		var temp_array = ['.view_server_name','.view_server_model','.view_server_hd','.view_server_ram','.view_server_os','.view_server_version','.view_server_ip','.view_server_date',];		

		function init(cols_array){
		
		// takes an array of strings to be parsed into cols and rows

			$.each($('.view_server_field'), function(){

				var this_cols = cols_array;

				var this_id = $(this).attr('id');

				var col_values = [];
				var col_bools = [];

				var columns = this_cols.length;

				for (var i=0; i<columns; i++){	
					col_values.push($(this).children(String(this_cols[i])).text());
				}

				/*
				col_values.push($(this).children(array[0]).text());
				col_values.push($(this).children(array[1]).text());
				col_values.push($(this).children(array[2]).text());
				col_values.push($(this).children(array[3]).text());
				col_values.push($(this).children(array[4]).text());
				col_values.push($(this).children(array[5]).text());
				col_values.push($(this).children(array[6]).text());
				col_values.push($(this).children(array[7]).text());
				*/

				for (var i=0;i<=col_cap;i++){
					col_bools.push('0');
				}

				col = {values:col_values, bools:col_bools};
				rows = {id:this_id, columns:col};
				row.push(rows);
				flags = {row:row};

			});
		}init(temp_array);

			getJSON();
			
			var willBeUpdated = 0;
			
		function view_nothing(){
			$('#view_list_nothing').click(function(){/*alert('click');*/}).mouseenter(function(){$('#small').css({'visibility':'visible'});}).mouseleave(function(){$('#small').css({'visibility':'hidden'});});
		}

		function children(){
			$('.view_server_field').mouseenter(function(){
				id = $(this).attr('id');
				$(this).children('.view_server_options').css({'visibility':'visible'});
			}).mouseleave(function(){
				$(this).children('.view_server_options').css({'visibility':'hidden'});

			}).children('.view_server_name').click(function(){

				var row_id = String($(this).parent().attr('row_id'));

				var col_id = $(this).attr('id');

				$(this).css({'visibility':'hidden'});

				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});

				$(this).parent().children('.view_server_field_update').children('.view_server_name_update').css({'visibility':'visible'}).select().blur(function(){// that parent's other grandchildren need to shut up when she leaves...

					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}

					if ($(this).val() == $(this).attr('alt')){

						$(this).css({'visibility':'hidden'});

						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});

						$(this).parent().parent().children('.view_server_name').css({'visibility':'visible'});

						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';

						getJSON();

					}else{

						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';

						getJSON();

					}
				}).click(function(){
					$(this).select();
				});


			}).siblings('.view_server_model').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children('.view_server_field_update').children('.view_server_model_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_model').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';		
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_server_hd').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});
				$(this).parent().children('.view_server_field_update').children('.view_server_hd_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_hd').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings('.view_server_ram').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_server_field_update').children('.view_server_ram_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_ram').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_server_os').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_server_field_update').children('.view_server_os_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_os').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_server_version').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_server_field_update').children('.view_server_version_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_version').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_server_ip').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_server_field_update').children('.view_server_ip_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_ip').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings('.view_server_date').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_server_update').css({'visibility':'visible'});
				$('#view_server_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children('.view_server_field_update').children('.view_server_date_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_server_update').css({'visibility':'hidden'});
						$('#view_server_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children('.view_server_date').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			})			
		} children();

			$('.view_server_options').click(function(){});
			
		function remove(){
			$('.view_server_options_remove').mouseenter(function(){
				$(this).css({'background-image':'url("res/remove_hover.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/remove.png")'});
			}).click(function(){
				$.post('php/remove.php',{id:id},function(){
					alert('remove needs remade');
				});
			});
		} remove();
			
		function line_update(){
			$('.view_server_options_update').mouseenter(function(){
				$(this).css({'background-image':'url("res/update_hover2.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/update3.png")'});
			}).click(function(){
				$(this).parent().parent().children('.view_server_name').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_model').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_hd').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_ram').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_os').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_version').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_ip').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_date').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_name_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_model_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_hd_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_ram_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_os_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_version_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_ip_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_server_field_update').children('.view_server_date_update').css({'visibility':'visible'});
			});
			
		} line_update();
		
		function cancel(){
			$('#view_server_cancel').click(function(){
				alert('cancel needs remade');
			});
		}
		
		function submit(){
			$('#view_server_update_button').click(function(){
				var update_xml = '';
				for(var i=0;i<=row_cap;i++){
					if(i in flags.row){
						var col = 0;
						var row = '<row id="'+flags.row[i].id+'">';
						var name = '<name><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></name>';
						col++;
						var model = '<model><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></model>';
						col++;
						var hd = '<hd><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></hd>';
						col++;
						var ram = '<ram><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></ram>';
						col++;
						var os = '<os><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></os>';
						col++;
						var version = '<version><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></version>';
						col++;
						var ip = '<ip><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></ip>';
						col++;
						var date = '<date><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></date>';
						var endRow = '</row>';
						update_xml = update_xml+row+name+model+hd+ram+os+version+ip+date+endRow;
					}
				}
				update_xml = '<xml><rows>'+update_xml+'</rows></xml>';
				console.log(update_xml);
				$.post('php/updateXML.php',{update_xml:update_xml,category:category},function(data){alert(data);
					if(data=='x'){
						$('#view_server_feedback').show().html('Update has Failed').css({'color':'red'}).fadeOut(1800);
					}else{
						$('#view_server_feedback').show().html('Update was Successful').css({'color':'green'}).fadeOut(1800);
						$('#view_server_list').load('php/view_printer_list.php');
					}
				});
			});
		} submit();


		break; // break server
		case 'accessory':

		// prototype init function, probably could end up going into a larger set of functions to become sort of a mega function object thing with more parameters.
		function init(cols_array){
			$.each($('.view_accessory_field'), function(){ // <-- This could be tried as a function? It could take "var this_category" after being normalized.

				// get and set variables;
				var this_cols = cols_array;
				var this_id = $(this).attr('id');
				var col_values = [];
				var col_bools = [];
				var columns = this_cols.length;
				for (var i=0; i<columns; i++){	
					col_values.push($(this).children(String(this_cols[i])).text());
				}

				// set up the appropriate booleans; 0 for Unchanged (probably could use true/false boolean)
				for (var i=0;i<=col_cap;i++){
					col_bools.push('0');
				}

				// set up flags object
				col = {values:col_values, bools:col_bools};
				rows = {id:this_id, columns:col};
				row.push(rows);
				flags = {row:row};

			});
		}
		
		// global function I'm almost sure of it
		function view_nothing(){
			$('#view_list_nothing').click(function(){/*alert('click');*/}).mouseenter(function(){$('#small').css({'visibility':'visible'});}).mouseleave(function(){$('#small').css({'visibility':'hidden'});});
		}

		// sets the category up for js parsing
		function normalizer(string){
			// returns category as a formatted class value
			return string = String('.view_'+string);	
		}
		
		// start main... I'm going to use c terms ._.
		var temp_array = ['.view_accessory_category','.view_accessory_type','.view_accessory_length','.view_accessory_in_stock','.view_accessory_in_use'];
		init(temp_array); // call the init() function with the temp_array string that will get pulled from a database.

		getJSON();
		
		// // // // // // // // // // // // // // // // // // // // //
		// '.view_', 'category', and '_*' will all be separate
		// // // // // // // // // // // // // // // // // // // // // 

		// alright I've done enough damage here, once databases are finished it will be necessary to come back to view.js to fix alignment/hidden update fields/ and double check JSON population
		// once that is done it will be time to create the databases database... (that's a mouth full) ... Using the table names to generate the other aspects of the children() function and pretty much just things and stuff.:w
		
		// setting up a global array
		var global = 'accessory';

		// normalize the category
		var this_category = normalizer(global);

		// I believe the same type of thing could happen here, but on a larger level.
		function children(){
			$(this_category+'_field').mouseenter(function(){
				id = $(this).attr('id');
				$(this).children(this_category+'_options').css({'visibility':'visible'});
			}).mouseleave(function(){
				$(this).children(this_category+'_options').css({'visibility':'hidden'});
			}).children(this_category+'_category').click(function(){
				var row_id = String($(this).parent().attr('row_id'));
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_accessory_update').css({'visibility':'visible'});
				$('#view_accessory_cancel').css({'visibility':'visible'});
				$(this).parent().children(this_category+'_field_update').children(this_category+'_category_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_accessory_update').css({'visibility':'hidden'});
						$('#view_accessory_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children(this_category+'_category').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings(this_category+'_type').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$(this).css({'visibility':'hidden'});
				$('#view_printer_update').css({'visibility':'visible'});
				$('#view_printer_cancel').css({'visibility':'visible'});
				$(this).parent().children(this_category+'_field_update').children(this_category+'_type_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_accessory_update').css({'visibility':'hidden'});
						$('#view_accessory_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children(this_category+'_type').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';		
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings(this_category+'_length').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_accessory_update').css({'visibility':'visible'});
				$('#view_accessory_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});
				$(this).parent().children(this_category+'_field_update').children(this_category+'_length_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_accessory_update').css({'visibility':'hidden'});
						$('#view_accessory_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children(this_category+'_length').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();
					}
				}).click(function(){
					$(this).select();
				});
			}).siblings(this_category+'_in_stock').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_accessory_update').css({'visibility':'visible'});
				$('#view_accessory_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children(this_category+'_field_update').children(this_category+'_in_stock_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_accessory_update').css({'visibility':'hidden'});
						$('#view_accessory_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children(this_category+'_in_stock').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			}).siblings(this_category+'_in_use').click(function(){
				var row_id = $(this).parent().attr('row_id');
				var col_id = $(this).attr('id');
				$('#view_accessory_update').css({'visibility':'visible'});
				$('#view_accessory_cancel').css({'visibility':'visible'});
				$(this).css({'visibility':'hidden'});				
				$(this).parent().children(this_category+'_field_update').children(this_category+'_in_use_update').css({'visibility':'visible'}).select().blur(function(){
					if ($(this).val() == ''){$(this).val($(this).attr('alt'));}
					if ($(this).val() == $(this).attr('alt')){
						$(this).css({'visibility':'hidden'});
						$('#view_accessory_update').css({'visibility':'hidden'});
						$('#view_accessory_cancel').css({'visibility':'hidden'});
						$(this).parent().parent().children(this_category+'_in_use').css({'visibility':'visible'});
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '0';
						getJSON();					
					}else{
						flags.row[row_id].columns.values[col_id] = $(this).val();
						flags.row[row_id].columns.bools[col_id] = '1';
						getJSON();					
					}
				}).click(function(){
					$(this).select();
				});			
			});		
		} children();

			$('.view_accessory_options').click(function(){});
			
		function remove(){
			$('.view_accessory_options_remove').mouseenter(function(){
				$(this).css({'background-image':'url("res/remove_hover.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/remove.png")'});
			}).click(function(){
				$.post('php/remove.php',{id:id},function(){
					alert('remove needs remade');
				});
			});
		} remove();
			
		function line_update(){
			$('.view_accessory_options_update').mouseenter(function(){
				$(this).css({'background-image':'url("res/update_hover2.png")'});
			}).mouseleave(function(){
				$(this).css({'background-image':'url("res/update3.png")'});
			}).click(function(){
				$(this).parent().parent().children('.view_accessory_category').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_type').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_length').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_in_stock').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_in_use').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_department').css({'visibility':'hidden'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_category_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_type_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_length_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_in_stock_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_in_use_update').css({'visibility':'visible'});
				$(this).parent().parent().children('.view_accessory_field_update').children('.view_accessory_department_update').css({'visibility':'visible'});
			});
		} line_update();
		
		function cancel(){
			$('#view_accessory_cancel').click(function(){
				alert('cancel needs remade');
			});
		}
		
		function submit(){
			$('#view_accessory_update').click(function(){ // needs to become a class -> .view_update, it will take category for it's functionality
				var update_xml = '';
				for(var i=0;i<=row_cap;i++){
					if(i in flags.row){
						var col = 0;
						var row = '<row id="'+flags.row[i].id+'">';
						var this_category = '<category><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></category>';
						col++;
						var type = '<type><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></type>';
						col++;
						var length = '<length><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></length>';
						col++;
						var in_stock = '<in_stock><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></in_stock>';
						col++;	
						var in_use = '<in_use><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></in_use>';
						col++;
						var department = '<department><value>'+flags.row[i].columns.values[col]+'</value><bool>'+flags.row[i].columns.bools[col]+'</bool></department>';
						var endRow = '</row>';
						update_xml = update_xml+row+this_category+type+length+in_stock+in_use+department+endRow;
					}
				}
				update_xml = '<xml><rows>'+update_xml+'</rows></xml>';
				//alert(category);
				console.log(update_xml);
				$.post('php/updateXML.php',{update_xml:update_xml,category:category},function(data){//alert(data);
					if(data=='x'){
						$('#view_accessory_feedback').show().html('Update has Failed').css({'color':'red'}).fadeOut(1800);
					}else{
						$('#view_accessory_feedback').show().html('Update was Successful').css({'color':'green'}).fadeOut(1800);
						$('#view_accessory_list').load('php/view_printer_list.php');
					}
				});
			});
		} submit();

		break; // break accessory
		case 'software':
		break; // break software
	} //end switch
});
