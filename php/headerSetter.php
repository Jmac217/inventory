<html>
<!--<script type='text/javascript' src='js/functions.js'></script>-->
</html>
<?php include 'connect.php';
if(isset($_POST['category'])){
	// receive the text from the dropdown menu.
	$category = strtolower($_POST['category']); // keep in mind the forced lower-case.
	// switch this
	switch ($category) {
		case 'printer':
		echo "
			<div id='add_printer_header'>
				<span id='add_printer_header_text'>Add A Printer</span>
			</div>
			<div id='view_printer_header'>
				<span id='view_printer_header_text'>Existing Printers</span>
			</div>
		";
		break;
		case 'paper':
		echo "
			<div id='add_paper_header'>
				<span id='add_paper_header_text'>Add Paper</span>
			</div>
			<div id='view_paper_header'>
				<span id='view_paper_header_text'>Paper Stock</span>
			</div>
		";
		break;
		case 'server':
		echo "
			<div id='add_server_header'>
				<span id='add_server_header_text'>Add a Server</span>
			</div>
			<div id='view_server_header'>
				<span id='view_server_header_text'>Existing Servers</span>
			</div>
		";
		break;
		case 'workstation':
		echo "
			<div id='add_workstation_header'>
				<span id='add_workstation_header_text'>Add a Workstation</span>
			</div>
			<div id='view_workstation_header'>
				<span id='view_workstation_header_text'>Workstations</span>
			</div>
		";
		break;
		case 'accessory':
		echo "
			<div id='add_accessory_header'>
				<span id='add_accessory_header_text'>Add Accessories</span>
			</div>
			<div id='view_accessory_header'>
				<span id='view_accessory_header_text'>List Accessories</span>
			</div>
		";
		break;
		default:
		break;
	}
}else{
// default view
// place default tabs here and call them from the index
// Default is Printers.
// could be set to something else if called in the profile? maybe store the following lines as a string and replace them when necessary? kind of dirty, but hacking is my style yo.
echo "
<div id='add_printer_header'>
	<span id='add_printer_header_text'>Add A Printer</span>
</div>
<div id='view_printer_header'>
	<span id='view_printer_header_text'>Existing Printers</span>
</div>
";
}

?>
