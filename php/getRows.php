<?php include 'connect.php';

if(isset($_POST['category'])){
	$category = $_POST['category'];
	$numRows = mysql_fetch_assoc(mysql_query("SELECT MAX(id) AS max FROM ".$category)); // This number is the number of all rows in DB
	echo $numRows['max'];
}

?>
