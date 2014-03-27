<?php include 'connect.php'; // shebang#!
// grab ip from $_POST
$ip = $_POST['ip'];
// get all rows from database
$numRows = mysql_fetch_assoc(mysql_query("SELECT MAX(id) AS max FROM printer"));
// extract the value
$numRows = $numRows['max'];
// start loop to process numRows
for ($i=0;$i<=$numRows;$i++){
	// pull ip for check
	$row = mysql_fetch_assoc(mysql_query("SELECT ip FROM printer WHERE id='$i'"));
	// if an ip with the same value as the one we've posted it already exists
	if ($row['ip'] == $ip){
		// so kill it and shut it down
		die('1');
	}
}
// if the script got this far, it's a winner. Good job PHP...
echo $ip;
?>