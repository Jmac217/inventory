<?php include 'connect.php';

// needs to get omitted fields

// I'm just going to keep using 2 as the ommittedFields number

$omittedFields = 2;

if(isset($_POST['category'])){
	$category = $_POST['category'];
	echo mysql_num_fields(mysql_query("SELECT * FROM ".$category))-$omittedFields;
}

?>
