<?php echo "

<span id='list_known_issues'>Known Issues</span>

	<div id='known_issues'>
		::TODO::<br/><br/>

			mysql will need to be looked at for search and database creation, other database types should be based on the mysql structure.<br/>
			Implement permissions: Admin=>add,view,change,destroy; Manager=>Add,View,Request; Employee=>View.<br/><br/>

		[View]<br/><br/>

			Revise siblings functions, when finished, into parametric functions; taking possibly only a row_id and class.<br/>
			Values are still sticky when selecting Add, to change this, divs only need to be declared hidden.<br/>
			The update fields need resized.<br/>
			The footer is still misaligned.<br/>
			Does it matter that dates are not selectors here?<br/>
			Footers can more-than-likely be combined, however they will remain separated for now<br/><br/>

		[Add]<br/><br/>

			Field position relativity is going to be a problem soon: those dimensions are mostly correct at so just figure their pixel density.<br/>
			'maintenance_date' will need to be turned into a date selector eventually. This will affect: add.php -> add.js -> uploadXML.php<br/>
			date selectors should be made into class based functions<br/>
			There seems to be a new problem with the dates being added. This probably has something to do with the change in scope. I just realized it hadn't been tested since it was changed.<br/>
			`Amount` Fields need to have 'feedback', be set at 0, and use the same functionality as the `field_number` selection for up and down arrow key increments and decrements.<br/><br/>

		[General CSS]<br/><br/>
			
			Relativity will need to go very soon. (Should there be a separate sheet for relativity? - Would that even work in smaller resolutions than 16x9)<br/>
			All of those hover things that do the same thing should be condensed into a single class obviously.<br/>
			Seems like headers and footers could be separated into add and view classes too, but that will need more consideration. That will surely involve functions and things, which I'm still a ways off from revising.<br/><br/>

		[Bugs]<br/><br/>

			A few things to note going in<br/><br/>

				update fields are out of whack, those will be aligned with the columns...<br/>
				omitted fields in databases are untrackable. The default being used is 2 - set in php/getRows.php. I'm almost certain it doesn't matter if the bool field is longer than the number of values.<br/>
				selecting a dropdown field does not remove current view field. Maybe as simple as adding a css hidden.<br/>
				search needs to be disabled for now. It throws things off and is outdated.<br/>
				assets are still in need of an update.<br/>
				'omittedFields' will be a global variable - so right now it can stay hard-coded at a value of 2.<br/>
				'headerSetter.php' is still being used to reset tabs on category selection, but the javascript version still exists in its broken state - it's just commented out. This will be used to replace the PHP eventually.<br/><br/>
				
			Aesthetics<br/><br/>

				try and rework the width of the body at some point.<br/>
				figure out if the line between view and the footer is going or staying.<br/>
				Set up outline for the settings panel and figure out its location.<br/>
				make non-labeled fields clickable.<br/>
				get a jquery scrollbar in here.<br/>
				make drop-down scrollable for lengthy applications.<br/><br/>
	</div>
	
	<a id='known_issues_return'>Return</a>
	
	<script type='text/javascript'>
	$('#list_known_issues').click(function(){
		$('#known_issues').css({'visibility':'visible'});
		$('#known_issues_return').css({'visibility':'visible'});
	});
	$('#known_issues_return').click(function(){
		$(this).css({'visibility':'hidden'});
		$('#known_issues').css({'visibility':'hidden'});
	});	
	</script>
	
";?>
