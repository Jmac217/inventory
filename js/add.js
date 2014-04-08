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

	// do something fancy with the displayed version information
	$('#version').mouseenter(function(){$(this).css({'color':'#555'});}).mouseleave(function(){$(this).css({'color':'#777'});});


	/***************************************/
	/* THIS IS THE BEGINNING OF TABS.JS 
	/***************************************/
	
	// this file is for tab click functions only, things are going to start getting more modular from here. I hope to remember my lesson from this project.
	// The thing about tabs.js that sets it out from the others is it contains click functions for each tab rather
	// that switching to display the correct tab, which could be good or bad later.
	// set up category if it's not set
	//if(typeof category === 'undefined'){
	//	var category = 'printer';
	//}

	//functions
	// setAdd

	// highlighted by default; do this in css?
	//	$('#add_printer_header').css({'background-color':'#222'});

	// Printers
	// When "Add A Printer" is selected
	$('#add_printer_header').click(function(){
		//category = 'printer';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#add_printer_header_text').css({'color':'#bbb'});
		$('#add_printer_body').css({'visibility':'visible'});
		$('#add_printer_footer').css({'visibility':'visible'});
		$('#add_printer').css({'visibility':'visible'});
		// other tab(s) are deselected
		$('#view_printer_header').css({'background-color':''});// remove background-color
		$('#view_printer_header_text').css({'color':'#333'});
		$('#view_printer').css({'visibility':'hidden'}); // view_printer was staying visible, but contained no information. This is what was causing the blackout!
		$('#view_printer_body').css({'visibility':'hidden'});
		$('#view_printer_footer').css({'visibility':'hidden'});
		/*
		 * This needs to be reconsidered
		 *
		$('#view_printer_footer').css({'visibility':'hidden'});
		$('.view_printer_model').css({'visibility':'hidden'});
		$('.view_printer_toner').css({'visibility':'hidden'});
		$('.view_printer_drum').css({'visibility':'hidden'});
		$('.view_printer_ip').css({'visibility':'hidden'});
		$('.view_printer_toner_replaced').css({'visibility':'hidden'});
		$('.view_printer_drum_replaced').css({'visibility':'hidden'});
		$('.view_printer_model_update').css({'visibility':'hidden'});
		$('.view_printer_toner_update').css({'visibility':'hidden'});
		$('.view_printer_drum_update').css({'visibility':'hidden'});
		$('.view_printer_ip_update').css({'visibility':'hidden'});
		$('.view_printer_toner_replaced_update').css({'visibility':'hidden'});
		$('.view_printer_drum_replaced_update').css({'visibility':'hidden'});
		*/
		add();
	});
	// When "Existing Printers" is selected
	$('#view_printer_header').click(function(){
//		category = 'printer';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		//$('#loading_tab').css({'visibility':'visible'});
		$('#view_printer_header_text').css({'color':'#bbb'});
		$('#view_printer_body').css({'visibility':'visible'});
		$('#view_printer_footer').css({'visibility':'visible'});
		// other tab(s) are deselected
		/*
		$('#view_paper').css({'visibility':'hidden'});
		$('#view_server').css({'visibility':'hidden'});
		$('#view_workstation').css({'visibility':'hidden'});
		$('#view_accessory').css({'visibility':'hidden'});
		$('#view_software').css({'visibility':'hidden'});
		*/
		$('#add_printer_header').css({'background-color':'transparent'});// remove background-color
		$('#add_printer_header_text').css({'color':'#333'});
		$('#add_printer_body').css({'visibility':'hidden'});
		$('#add_printer_footer').css({'visibility':'hidden'});
		view();
	});
////////////////////////////////////////////////////////////////////////////////////////////////	
	//Paper
	// When "Add Paper" is selected
	$('#add_paper_header').css({'background-color':'#222'}); // this can go into css...
	$('#add_paper_header').click(function(){
//		category = 'paper';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#add_paper_header_text').css({'color':'#bbb'});
		$('#add_paper_body').css({'visibility':'visible'});
		$('#add_paper_footer').css({'visibility':'visible'});
		// other tab(s) are deselected
		$('#view_paper').css({'visibility':'hidden'});
		$('#view_paper_header').css({'background-color':''});// remove background-color
		$('#view_paper_header_text').css({'color':'#333'});
		$('#view_paper_body').css({'visibility':'hidden'});
		$('#view_paper_footer').css({'visibility':'hidden'});
		$('.view_paper_type').css({'visibility':'hidden'});
		$('.view_paper_stock').css({'visibility':'hidden'});
		$('.view_paper_department').css({'visibility':'hidden'});
		$('.view_paper_timestamp').css({'visibility':'hidden'});
		$('.view_paper_type_update').css({'visibility':'hidden'});
		$('.view_paper_stock_update').css({'visibility':'hidden'});
		$('.view_paper_department_update').css({'visibility':'hidden'});
		$('.view_paper_timestamp_update').css({'visibility':'hidden'});
		add();
	});
	// When "Paper Stock" is selected
	$('#view_paper_header').click(function(){
//		category = 'paper';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#view_paper').css({'visibility':'visible'});
		$('#view_paper_header_text').css({'color':'#bbb'});
		// other tab(s) are deselected
		$('#add_paper_header').css({'background-color':''});// remove background-color
		$('#add_paper_header_text').css({'color':'#333'});
		$('#add_paper_body').css({'visibility':'hidden'});
		$('#add_paper_footer').css({'visibility':'hidden'});
		$('#view_paper_body').css({'visibility':'visible'});
		//$('#view_paper_footer').css({'visibility':'visible'});
		/*
		$.post('php/view_list.php',{category:category},function(data){
			$('#view').html(data);// set the returned html into #view_printer_list
			$('#view_paper').css({'visibility':'visible'});
		});
		*/
		view();
	});
	
	//Server
	// When "Add server" is selected
	$('#add_server_header').css({'background-color':'#222'});
	$('#add_server_header').click(function(){
		category = 'server';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#add_server_header_text').css({'color':'#bbb'});
		$('#add_server_body').css({'visibility':'visible'});
		$('#add_server_footer').css({'visibility':'visible'});
		// other tab(s) are deselected
		$('#view_server').css({'visibility':'hidden'});
		$('#view_server_header').css({'background-color':''});// remove background-color
		$('#view_server_header_text').css({'color':'#333'});
		$('#view_server_body').css({'visibility':'hidden'});
		$('#view_server_footer').css({'visibility':'hidden'});
		$('.view_server_name').css({'visibility':'hidden'});
		$('.view_server_model').css({'visibility':'hidden'});
		$('.view_server_hd').css({'visibility':'hidden'});
		$('.view_server_ram').css({'visibility':'hidden'});
		$('.view_server_os').css({'visibility':'hidden'});
		$('.view_server_version').css({'visibility':'hidden'});
		$('.view_server_ip').css({'visibility':'hidden'});
		$('.view_server_date').css({'visibility':'hidden'});
		$('.view_server_name_update').css({'visibility':'hidden'});
		$('.view_server_model_update').css({'visibility':'hidden'});
		$('.view_server_hd_update').css({'visibility':'hidden'});
		$('.view_server_ram_update').css({'visibility':'hidden'});
		$('.view_server_version_update').css({'visibility':'hidden'});
		$('.view_server_ip_update').css({'visibility':'hidden'});
		$('.view_server_date_update').css({'visibility':'hidden'});
		add();
	});
	// When "server Stock" is selected
	$('#view_server_header').click(function(){
		category = 'server';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#view_server_header_text').css({'color':'#bbb'});
		$('#view_server').css({'visibility':'visibile'});
		// other tab(s) are deselected
		$('#add_server_header').css({'background-color':''});// remove background-color
		$('#add_server_header_text').css({'color':'#333'});
		$('#view_server_body').css({'visibility':'visible'});
		$('#add_server_body').css({'visibility':'hidden'});
		$('#add_server_footer').css({'visibility':'hidden'});
		$('#view_server_footer').css({'visibility':'visible'});
		view();
	});
	
	//workstation
	// When "Add workstation" is selected
	$('#add_workstation_header').css({'background-color':'#222'});
	$('#add_workstation_header').click(function(){
		var category = 'workstation';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#add_workstation_header_text').css({'color':'#bbb'});
		$('#add_workstation_body').css({'visibility':'visible'});
		$('#add_workstation_footer').css({'visibility':'visible'});
		// other tab(s) are deselected
		$('#view_workstation').css({'visibility':'hidden'});
		$('#view_workstation_header').css({'background-color':''});// remove background-color
		$('#view_workstation_header_text').css({'color':'#333'});
		$('#view_workstation_body').css({'visibility':'hidden'});
		$('#view_workstation_footer').css({'visibility':'hidden'});
		$('.view_workstation_name').css({'visibility':'hidden'});
		$('.view_workstation_model').css({'visibility':'hidden'});
		$('.view_workstation_hd').css({'visibility':'hidden'});
		$('.view_workstation_ram').css({'visibility':'hidden'});
		$('.view_workstation_version').css({'visibility':'hidden'});
		$('.view_workstation_ip').css({'visibility':'hidden'});
		$('.view_workstation_user').css({'visibility':'hidden'});
		$('.view_workstation_extension').css({'visibility':'hidden'});
		$('.view_workstation_date').css({'visibility':'hidden'});
		$('.view_workstation_name_update').css({'visibility':'hidden'});
		$('.view_workstation_model_update').css({'visibility':'hidden'});
		$('.view_workstation_hd_update').css({'visibility':'hidden'});
		$('.view_workstation_ram_update').css({'visibility':'hidden'});
		$('.view_workstation_version_update').css({'visibility':'hidden'});
		$('.view_workstation_ip_update').css({'visibility':'hidden'});
		$('.view_workstation_user_update').css({'visibility':'hidden'});
		$('.view_workstation_extension_update').css({'visibility':'hidden'});
		$('.view_workstation_date_update').css({'visibility':'hidden'});
		add();
	});
	// When "workstation Stock" is selected
	$('#view_workstation_header').click(function(){
		category = 'workstation';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#view_workstation_header_text').css({'color':'#bbb'});
		$('#view_workstation').css({'visibility':'visibile'});
		$('#view_workstation_body').css({'visibility':'visible'});
		$('#view_workstation_footer').css({'visibility':'visible'});
		//$('#add_workstation').css({'visibility':'hidden'});
		// other tab(s) are deselected
		$('#add_workstation_header').css({'background-color':''});// remove background-color
		$('#add_workstation_header_text').css({'color':'#333'});
		$('#add_workstation_body').css({'visibility':'hidden'});
		$('#add_workstation_footer').css({'visibility':'hidden'});
		view();
	});
	
	//accessory
	// When "Add accessory" is selected
	$('#add_accessory_header').css({'background-color':'#222'});
	$('#add_accessory_header').click(function(){
		category = 'accessory';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#add_accessory_header_text').css({'color':'#bbb'});
		// other tab(s) are deselected
		$('#view_accessory_header').css({'background-color':''});// remove background-color
		$('#view_accessory_header_text').css({'color':'#333'});
		$('#add_accessory_body').css({'visibility':'visible'});
		$('#view_accessory_body').css({'visibility':'hidden'});
		$('#view_accessory_footer').css({'visibility':'hidden'});
		$('#add_accessory_footer').css({'visibility':'visible'});
		$('.view_accessory_category').css({'visibility':'hidden'});
		$('.view_accessory_type').css({'visibility':'hidden'});
		$('.view_accessory_length').css({'visibility':'hidden'});
		$('.view_accessory_stock').css({'visibility':'hidden'});
		$('.view_accessory_use').css({'visibility':'hidden'});
		$('.view_accessory_department').css({'visibility':'hidden'});
		$('.view_accessory_category_update').css({'visibility':'hidden'});
		$('.view_accessory_type_update').css({'visibility':'hidden'});
		$('.view_accessory_length_update').css({'visibility':'hidden'});
		$('.view_accessory_stock_update').css({'visibility':'hidden'});
		$('.view_accessory_use_update').css({'visibility':'hidden'});
		$('.view_accessory_department_update').css({'visibility':'hidden'});
		add();
	});
	// When "accessory Stock" is selected
	$('#view_accessory_header').click(function(){
		category = 'accessory';
		// this tab is selected
		$(this).css({'background-color':'#222'});
		$('#view_accessory_header_text').css({'color':'#bbb'});
		$('#view_accessory').css({'visibility':'visibile'});
		$('#view_accessory_footer').css({'visibility':'visible'});
		$('#view_accessory_body').css({'visibility':'visible'});
		// other tab(s) are deselected
		$('#add_accessory_header').css({'background-color':''});// remove background-color
		$('#add_accessory_header_text').css({'color':'#333'});
		$('#add_accessory_body').css({'visibility':'hidden'});
		$('#add_accessory_footer').css({'visibility':'hidden'});
		view();
	});
/***************************************/
/***************************************/
/*         THIS IS THE ENDING OF TABS.JS        */
/***************************************/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/***************************************/
/*      THIS IS THE BEGINNING OF ADD.JS       */
/***************************************/
/***************************************/


	// These are just indicators of which date selector you're using, since there is no direct name to point to them. Nothing too complicated.
	
	/*** TODO ************************************/
	/* This file is set up to only accommodate the printers */
	/* - it needs to take commands from each category */
	/* - it should be taking a global, and switch from it. */
	/* -- but that might be easier said, than done... */
	/***************************************END***/	

	// Date hovers
	$('.toner_replaced_hover').mouseenter(function(){
		$('#toner_replaced_feedback').css({'visibility':'visible'}).html("Toner Replacement Date");
	}).mouseleave(function(){
		$('#toner_replaced_feedback').css({'visibility':'hidden'});
	});
	$('.drum_replaced_hover').mouseenter(function(){
		$('#drum_replaced_feedback').css({'visibility':'visible'}).html("Drum Replacement Date");
	}).mouseleave(function(){
		$('#drum_replaced_feedback').css({'visibility':'hidden'});
	});

	// Inputs
	$('.input').focus(function(){
		// on focus if value is default
		if($(this).val()==$(this).attr('alt')){
			// remove value and set color to black
			$(this).val('').css({'color':'black'});
		}
	}).blur(function(){
		// When input has lost focus and is empty
		if($(this).val()==''){
			// set it's value to this input's alt attribute,
			var alt = $(this).attr('alt');
			// and it's color back to default gray.
			$(this).val(alt).css({'color':'gray'});
		// Otherwise leave the color black, because it's in use and not default.
		}else{$(this).css({'color':'black'});}
	});
	// This has a specialized focus on the IP field, because you wouldn't want the prefix to disappear if it's going to be the same for most every printer.
	$('.special_input').focus(function(){
		if($(this).val()==$(this).attr('alt')){
			$(this).css({'color':'black'});
		}
	}).blur(function(){
		// The only difference between this and the previous focus function is the default value in the following line.
		if($(this).val()=='10.0.0.'){
			var alt = $(this).attr('alt');
			$(this).css({'color':'gray'});
		}else{$(this).css({'color':'black'});}
	});
	
	/*************************************************************/
	// This is where the category switch needs to be implemented //
	/*************************************************************/
	/* pseudo: 
	/* * * * * *
	/* get category value and set as 'category'
	/* * switch category
	/* * * Starting Printers **/
	// manually setting category for now
	// This variable has more control than I'd like it to have.

	//	DEBUG
	//var category = 'server';
	//	alert(category);
	
//	alert(category);

		switch (category){
			case 'printer':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_printer_submit').css({'border':'solid 1px black'});
					$('#add_printer_submit').attr('disabled', false);
				}
				// submit button
				$('#add_printer_submit').click(function(){// if clicked
					//alert('clacked');
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><printers>';
					$.each($('.add_printer_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
						var thisIP = $(this).children('.add_printer_ip').val();
						var printer = '<printer id="'+id+'">';// encase each variable into xml starting with the printer[id]
						var model = '<model>'+$(this).children('.add_printer_model').val()+'</model>';// set model
						var name = '<name>'+$(this).children('.add_printer_name').val()+'</name>';// set name
						var network = '<network>'+$(this).children('.add_printer_network').val()+'</network>';// set network
						var branch = '<branch>'+$(this).children('.add_printer_branch').val()+'</branch>';// set branch
						var desk = '<desk>'+$(this).children('.add_printer_desk').val()+'</desk>';// set desk
						var ip = '<ip>'+$(this).children('.add_printer_ip').val()+'</ip>';// set ip
						var toner_type = '<toner_type>'+$(this).children('.add_printer_toner_type').val()+'</toner_type>';// set toner_type
						var drum_type = '<drum_type>'+$(this).children('.add_printer_drum_type').val()+'</drum_type>';// set drum_type
						var toner_amount = '<toner_amount>'+$(this).children('.add_printer_toner_amount').val()+'</toner_amount>';// set toner_amount
						var drum_amount = '<drum_amount>'+$(this).children('.add_printer_drum_amount').val()+'</drum_amount>';// set drum_amount
						
						// The dates are slightly different, because they're selectors instead of input fields.
						// ex. Toner = year-month-day
						var toner_replaced = '<toner_replaced>'+$(this).children('.add_printer_toner_replaced_year').val()+'-'+$(this).children('.add_printer_toner_replaced_month').val()+'-'+$(this).children('.add_printer_toner_replaced_day').val()+'</toner_replaced>';
						var drum_replaced = '<drum_replaced>'+$(this).children('.add_printer_drum_replaced_year').val()+'-'+$(this).children('.add_printer_drum_replaced_month').val()+'-'+$(this).children('.add_printer_drum_replaced_day').val()+'</drum_replaced>';
						
						var printer_amount ='<printer_amount>'+$(this).children('.add_printer_printer_amount').val()+'</printer_amount>';
						var maintenance_date = '<maintenance_date>'+$(this).children('.add_printer_maintenance_date_year').val()+'-'+$(this).children('.add_printer_maintenance_date_month').val()+'-'+$(this).children('.add_printer_maintenance_date_day').val()+'</maintenance_date>';
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_printer_toner_replaced').val()+'</toner_replaced>'; // These are staying here. I think I'm going to allow to swap back to them, if the user wants.
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_printer_drum_replaced').val()+'</drum_replaced>';
						var printerEnd = '</printer>';// close the printer xml so the next one can start
						var thisXML = printer+model+name+network+branch+desk+ip+toner_type+drum_type+toner_type+drum_type+toner_replaced+drum_replaced+printer_amount+maintenance_date+printerEnd;// set everything to be ready to be appended
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
					});
					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.
					if(check == '0'){
						xml = xml+'</printers></xml>';// when loop has fully completed, close the xml form as a string so it can be sent to PHP
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml,category:category},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_printer_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_printer_feedback').show();// show the feedback
								$('#add_printer_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_printer_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_printer_feedback').show();// show the feedback
								$('#add_printer_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_printer_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});//end of click function
				// set add_printer_field cloner variables
				// clone add_printer fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_printer_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_printer_field[id="0"]').clone(true).appendTo('#add_printer_form_clones').css({'top':top}).attr('id', forms);
					}
				}
				// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_printer_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_printer_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_printer_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_printer_forms_number').val())+1; $('#add_printer_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_printer_forms_number').val())-1; $('#add_printer_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_printer_field_button').click(function(){
					addForms();
				});
			//});
			// end printers //
			/*** break printers */
			break;
			case 'paper':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_paper_submit').css({'border':'solid 1px black'});
					$('#add_paper_submit').attr('disabled', false);
				}
				// submit button
				$('#add_paper_submit').click(function(){// if clicked
					resetSubmit();
					//alert('clacked');

					// start function submit()
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><papers>';
					var xmlEnd = '</papers></xml>';
					$.each($('.add_paper_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
						//var thisIP = $(this).children('.add_paper_ip').val();
						var paper = '<paper id="'+id+'">';// encase each variable into xml starting with the paper[id]
						var type = '<type>'+$(this).children('.add_paper_type').val()+'</type>';// set model
						var stock = '<stock>'+$(this).children('.add_paper_stock').val()+'</stock>';// set model
						var department = '<department>'+$(this).children('.add_paper_department').val()+'</department>';// set toner
//						var timestamp = '<timestamp>'+$(this).children('.add_paper_timestamp').val()+'</timestamp>';// set drum
						// The dates are slightly different, because they're selectors instead of input fields.
						var paperEnd = '</paper>';// close the paper xml so the next one can start
						thisXML = paper+type+stock+department+paperEnd;// set everything to be ready to be appended
						xml = xml+thisXML;
						check = parseInt(0);
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						// develop new check method!!! Paper doesn't have IP lol
						/*
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
						*/
					});
					// end submit();

					// close xml
					xml = xml + xmlEnd;

					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.
					if(check == '0'){
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml,category:category},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_paper_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_paper_feedback').show();// show the feedback
								$('#add_paper_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_paper_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_paper_feedback').show();// show the feedback
								$('#add_paper_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_paper_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});
				// set add_paper_field cloner variables
				// clone add_paper fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_paper_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_paper_field[id="0"]').clone(true).appendTo('#add_paper_form_clones').css({'top':top}).attr('id', forms);
					}
				}
				// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_paper_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_paper_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_paper_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_paper_forms_number').val())+1; $('#add_paper_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_paper_forms_number').val())-1; $('#add_paper_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_paper_field_button').click(function(){
					addForms();
				});
			//});
			// end papers //
			/*** break papers */
			break;
			case 'accessory':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_accessory_submit').css({'border':'solid 1px black'});
					$('#add_accessory_submit').attr('disabled', false);
				}
				// submit button
				$('#add_accessory_submit').click(function(){// if clicked
					//alert('clacked');
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><accessories>';
					$.each($('.add_accessory_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
//						var thisIP = $(this).children('.add_accessory_ip').val();
						var accessory = '<accessory id="'+id+'">';// encase each variable into xml starting with the accessory[id]
						var db_category = '<category>'+$(this).children('.add_accessory_category').val()+'</category>';// set model
						var type = '<type>'+$(this).children('.add_accessory_type').val()+'</type>';// set toner
						var length = '<length>'+$(this).children('.add_accessory_length').val()+'</length>';// set drum
						var in_stock = '<in_stock>'+$(this).children('.add_accessory_in_stock').val()+'</in_stock>';// set ip
						var in_use = '<in_use>'+$(this).children('.add_accessory_in_use').val()+'</in_use>';// set ip
						// The dates are slightly different, because they're selectors instead of input fields.
						// ex. Toner = year-month-day
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_accessory_toner_replaced').val()+'</toner_replaced>'; // These are staying here. I think I'm going to allow to swap back to them, if the user wants.
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_accessory_drum_replaced').val()+'</drum_replaced>';
						var accessoryEnd = '</accessory>';// close the accessory xml so the next one can start
						var thisXML = accessory+db_category+type+length+in_stock+in_use+accessoryEnd;// set everything to be ready to be appended
						xml = xml + thisXML;
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						// NO IP
						// Q: Does this accessory have an IP?
						/*
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
						*/
					});
					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.

					check=parseInt(0);
					if(check == '0'){
						xml = xml+'</accessories></xml>';// when loop has fully completed, close the xml form as a string so it can be sent to PHP
//						alert(xml);
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml,category:category},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_accessory_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_accessory_feedback').show();// show the feedback
								$('#add_accessory_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_accessory_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_accessory_feedback').show();// show the feedback
								$('#add_accessory_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_accessory_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});
				// set add_accessory_field cloner variables
				// clone add_accessory fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_accessory_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_accessory_field[id="0"]').clone(true).appendTo('#add_accessory_form_clones').css({'top':top}).attr('id', forms);
					}
				}
				// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_accessory_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_accessory_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_accessory_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_accessory_forms_number').val())+1; $('#add_accessory_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_accessory_forms_number').val())-1; $('#add_accessory_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_accessory_field_button').click(function(){
					addForms();
				});
				//});
				// end accessories //
				/*** break accessories */
			break;
			case 'workstation':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_workstation_submit').css({'border':'solid 1px black'});
					$('#add_workstation_submit').attr('disabled', false);
				}
				// submit button
				$('#add_workstation_submit').click(function(){// if clicked
					//alert('clacked');
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><workstations>';
					$.each($('.add_workstation_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
						var thisIP = $(this).children('.add_workstation_ip').val();
						var workstation = '<workstation id="'+id+'">';// encase each variable into xml starting with the workstation[id]
						var name = '<name>'+$(this).children('.add_workstation_name').val()+'</name>';// set model
						var model = '<model>'+$(this).children('.add_workstation_model').val()+'</model>';// set toner
						var hd = '<hd>'+$(this).children('.add_workstation_hd').val()+'</hd>';// set drum
						var ram = '<ram>'+$(this).children('.add_workstation_ram').val()+'</ram>';// set ip
						var version = '<version>'+$(this).children('.add_workstation_version').val()+'</version>';// set ip
						var ip = '<ip>'+$(this).children('.add_workstation_ip').val()+'</ip>';// set ip
						var user = '<user>'+$(this).children('.add_workstation_user').val()+'</user>';// set ip
						var extension = '<extension>'+$(this).children('.add_workstation_extension').val()+'</extension>';// set ip
						var date = '<date>'+$(this).children('.add_workstation_date').val()+'</date>';// set ip
						// The dates are slightly different, because they're selectors instead of input fields.
						// ex. Toner = year-month-day
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_workstation_toner_replaced_year').val()+'-'+$(this).children('.add_workstation_toner_replaced_month').val()+'-'+$(this).children('.add_workstation_toner_replaced_day').val()+'</toner_replaced>';
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_workstation_drum_replaced_year').val()+'-'+$(this).children('.add_workstation_drum_replaced_month').val()+'-'+$(this).children('.add_workstation_drum_replaced_day').val()+'</drum_replaced>';
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_workstation_toner_replaced').val()+'</toner_replaced>'; // These are staying here. I think I'm going to allow to swap back to them, if the user wants.
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_workstation_drum_replaced').val()+'</drum_replaced>';
						var workstationEnd = '</workstation>';// close the workstation xml so the next one can start
						var thisXML = workstation+name+model+hd+ram+version+ip+user+extension+date+workstationEnd;// set everything to be ready to be appended
						//alert(thisXML);
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
					});
					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.
					if(check == '0'){
						xml = xml+'</workstations></xml>';// when loop has fully completed, close the xml form as a string so it can be sent to PHP
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml,category:category},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_workstation_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_workstation_feedback').show();// show the feedback
								$('#add_workstation_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_workstation_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_workstation_feedback').show();// show the feedback
								$('#add_workstation_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_workstation_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});
				// set add_workstation_field cloner variables
				// clone add_workstation fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_workstation_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_workstation_field[id="0"]').clone(true).appendTo('#add_workstation_form_clones').css({'top':top}).attr('id', forms);
					}
				}
				// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_workstation_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_workstation_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_workstation_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_workstation_forms_number').val())+1; $('#add_workstation_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_workstation_forms_number').val())-1; $('#add_workstation_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_workstation_field_button').click(function(){
					addForms();
				});
				//});
				// end printers //
				/*** break printers */
			break;
			case 'server':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_server_submit').css({'border':'solid 1px black'});
					$('#add_server_submit').attr('disabled', false);
				}
				// submit button
				$('#add_server_submit').click(function(){// if clicked
					//alert('clacked');
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><servers>';
					$.each($('.add_server_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
						var thisIP = $(this).children('.add_server_ip').val();
						var server = '<server id="'+id+'">';// encase each variable into xml starting with the server[id]
						var name = '<name>'+$(this).children('.add_server_name').val()+'</name>';// set model
						var model = '<model>'+$(this).children('.add_server_model').val()+'</model>';// set model
						var hd = '<hd>'+$(this).children('.add_server_hd').val()+'</hd>';// set toner
						var ram = '<ram>'+$(this).children('.add_server_ram').val()+'</ram>';// set drum
						var os = '<os>'+$(this).children('.add_server_os').val()+'</os>';// set ip
						var version = '<version>'+$(this).children('.add_server_version').val()+'</version>';// set ip
						var ip = '<ip>'+$(this).children('.add_server_ip').val()+'</ip>';// set ip
//						var date = '<date>'+$(this).children('.add_server_date').val()+'</date>';// set ip

						// The dates are slightly different, because they're selectors instead of input fields.
						// ex. Toner = year-month-day
//						var toner_replaced = '<toner_replaced>'+$(this).children('.add_server_toner_replaced_year').val()+'-'+$(this).children('.add_server_toner_replaced_month').val()+'-'+$(this).children('.add_server_toner_replaced_day').val()+'</toner_replaced>';
//						var drum_replaced = '<drum_replaced>'+$(this).children('.add_server_drum_replaced_year').val()+'-'+$(this).children('.add_server_drum_replaced_month').val()+'-'+$(this).children('.add_server_drum_replaced_day').val()+'</drum_replaced>';
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_server_toner_replaced').val()+'</toner_replaced>'; // These are staying here. I think I'm going to allow to swap back to them, if the user wants.
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_server_drum_replaced').val()+'</drum_replaced>';
						var serverEnd = '</server>';// close the server xml so the next one can start
						var thisXML = server+name+model+hd+ram+os+version+ip+serverEnd;// set everything to be ready to be appended
//						alert('js thisXML: '+thisXML);
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> waits for callback; What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
					});
					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.
					if(check == '0'){
						xml = xml+'</servers></xml>';// when loop has fully completed, close the xml form as a string so it can be sent to PHP
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml,category:category},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
						alert(data);
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_server_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_server_feedback').show();// show the feedback
								$('#add_server_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_server_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_server_feedback').show();// show the feedback
								$('#add_server_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_server_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});
				// set add_server_field cloner variables
				// clone add_server fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_server_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_server_field[id="0"]').clone(true).appendTo('#add_server_form_clones').css({'top':top}).attr('id', forms);
					}
				}
				// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_server_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_server_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_server_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_server_forms_number').val())+1; $('#add_server_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_server_forms_number').val())-1; $('#add_server_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_server_field_button').click(function(){
					addForms();
				});
				//});
				// end servers //
				/*** break servers */

			break;
			case 'software':
				function resetSubmit(){// this could be moved outside of this click function if it was necessary, and it'd probably make more sense, if were more functions, to move all functions to the top of the page to be defined like variables.
					$('#add_software_submit').css({'border':'solid 1px black'});
					$('#add_software_submit').attr('disabled', false);
				}
				// submit button
				$('#add_software_submit').click(function(){// if clicked
					//alert('clacked');
					$(this).css({'border':'solid 2px #05A'});// border blue
					$(this).attr('disabled', true);// button disabled
					// get variables as XML
					var check = '1';// set to one unless specified, 1 = error
					var errors = '';// append all errors to var errors
					var xml = '<xml><softwares>';
					$.each($('.add_software_field'),function(){// for each class
						var id = parseInt($(this).attr('id'));// get the id
						var thisIP = $(this).children('.add_software_ip').val();
						var software = '<software id="'+id+'">';// encase each variable into xml starting with the software[id]
						var model = '<model>'+$(this).children('.add_software_model').val()+'</model>';// set model
						var toner = '<toner>'+$(this).children('.add_software_toner').val()+'</toner>';// set toner
						var drum = '<drum>'+$(this).children('.add_software_drum').val()+'</drum>';// set drum
						var ip = '<ip>'+$(this).children('.add_software_ip').val()+'</ip>';// set ip
						// The dates are slightly different, because they're selectors instead of input fields.
						// ex. Toner = year-month-day
						var toner_replaced = '<toner_replaced>'+$(this).children('.add_software_toner_replaced_year').val()+'-'+$(this).children('.add_software_toner_replaced_month').val()+'-'+$(this).children('.add_software_toner_replaced_day').val()+'</toner_replaced>';
						var drum_replaced = '<drum_replaced>'+$(this).children('.add_software_drum_replaced_year').val()+'-'+$(this).children('.add_software_drum_replaced_month').val()+'-'+$(this).children('.add_software_drum_replaced_day').val()+'</drum_replaced>';
						//var toner_replaced = '<toner_replaced>'+$(this).children('.add_software_toner_replaced').val()+'</toner_replaced>'; // These are staying here. I think I'm going to allow to swap back to them, if the user wants.
						//var drum_replaced = '<drum_replaced>'+$(this).children('.add_software_drum_replaced').val()+'</drum_replaced>';
						var softwareEnd = '</software>';// close the software xml so the next one can start
						var thisXML = software+model+toner+drum+ip+toner_replaced+drum_replaced+softwareEnd;// set everything to be ready to be appended
						// check database for this IP - it makes the log work much smoother, and also prevents overlapping IPs - well sort of. If you enter the same IP in the same upload form it will still write both to the database... but at least you can see what the hell you're doing, and then it's just your fault. xD
						$.ajax({
							type:'POST',
							url:'php/checkIP.php',
							data:{ip:thisIP},
							async:false, // saves the day -> What this does is allow for asynchronous posting within the $.each loop. This is bad, for it creates chaos when organization is key. When set to false posts are synced with the loop and things go smoothly.
							success:function(data){
								if(data != thisIP){
									// 1 has been returned as to show the existance of passed IP into DB.
									// check should be appended to display error
									errors = errors+'\n Input Row: '+(id+1)+', IP: '+thisIP+' exists in the database!';
								}else{
									check = '0';
									xml = xml+thisXML;// append xml from this loop to the existing xml
								}//alert(xml);// just a nice debugger
							}
						});
					});
					// timer was actually unnecessary after $.ajax(post) was synced up. That thing really came in handy. I actually went from starting to hate jQ back to loving it again... That would actually come in handy for VWS if I wanted to finish that up.
					if(check == '0'){
						xml = xml+'</softwares></xml>';// when loop has fully completed, close the xml form as a string so it can be sent to PHP
						//alert(xml);
						// declare function to reset the submit button
						// resetSubmit is just an easy way to bring back the disabled submit button.
						// post xml to php -> php/uploadXML.php
						$.post('php/uploadXML.php',{xml:xml},function(data){//alert(data);// send data as an argument (as with most other posts, see jQuery documentation).
							if (data != '0'){// if anything other than a 0 is returned from PHP then something did not process correctly.
								// error
								// as an abstraction layer, just print Query Failure - instead of the actual mysql_error().
								$('#add_software_submit').css({'border':'solid 2px #881111'});// border red
								//$('#add_software_feedback').show();// show the feedback
								$('#add_software_feedback').show().html('Query Failure.').css({'color':'#881111'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}else if(data == '0'){// if data = 0 then processing succeeded
								// success
								// again, just as an abstraction print out that it was successful
								$('#add_software_submit').css({'border':'solid 2px #118811'});// border red
								//$('#add_software_feedback').show();// show the feedback
								$('#add_software_feedback').show().html('Addition Was Successful!').css({'color':'#118811'}).fadeOut(3500, function(){// fade the message and reset the submit button
									resetSubmit();
								});
							}
						});
					}else{
						// resetSubmit buttons and display, the existance of IPs
						// show errors
						alert(errors);// this could be the only alert that isn't a debug script
						// display feedback error, maybe.
						// Duplicate IP addresses found while attempting to add rows to database.
						// reset submit
						resetSubmit();
						$('#add_software_feedback').show().html('IP exists in DB').css({'color':'471111'}).fadeOut(4500, function(){resetSubmit();});
					}
				});
					// set add_software_field cloner variables
				// clone add_software fields -- If you poke it too hard it'll bite you.
				var forms = parseInt(1); // for some damned reason vars, even when numbers, are stored as strings... So there is this garbage to fix that.
				var formCap = parseInt(17); // cap the forms off, for now it is a fixed value, this could change...
				var height = parseInt(30); // height including white space
				function addForms(){
					var addNumber = parseInt($('#add_software_forms_number').val());
					var addedForms = addNumber+forms;
					// set addedForms equal to formCap if addedForms > formCap
					if(addedForms>formCap){addedForms=formCap;}
					// while forms < addedForms, increment forms and display a clone with a varied top
					for(forms;forms<addedForms;forms++){
						var top=(forms*height)+'px';
						$('.add_software_field[id="0"]').clone(true).appendTo('#add_software_form_clones').css({'top':top}).attr('id', forms);
					}
				}
					// show description of addNumber when hovered, and when enter has been pressed - add a form.
				$('#add_software_forms_number').click(function(){$(this).select();}).mouseenter(function(){
					$('#add_software_forms_number_description').css({'visibility':'visible'});
				}).mouseleave(function(){$('#add_software_forms_number_description').css({'visibility':'hidden'});}).bind('keypress', function(e){
					if(e.keyCode	 == 38){var newNumber=parseInt($('#add_software_forms_number').val())+1; $('#add_software_forms_number').val(newNumber);}// 38 = [up]
					if(e.keyCode	 == 40){var newNumber=parseInt($('#add_software_forms_number').val())-1; $('#add_software_forms_number').val(newNumber);}// 40 = [down]
					if(e.keyCode	 == 13){addForms();}// 13 = [enter]
				});
				// if [+] button is pressed
				$('#add_software_field_button').click(function(){
					addForms();
				});
				// end softwares //
				/*** break softwares */
			break;
			default:
				alert('add.js default');
			break;	
		}
	});
/***************************************/
/***************************************/
/*         THIS IS THE ENDING OF ADD.JS        */
/***************************************/
