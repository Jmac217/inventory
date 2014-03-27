<?php include 'connect.php';
// get a post variable, can be either 'toner' or 'drum' right now...
$global = $_POST['post'];
// include stylesheet
//echo "<link rel='stylesheet' type='text/css' href='../css/index.css' />";// Debug for when working on this file as a standalone
// on first loop how far down the page do you want to set the first row.
$first = 100;
// space between rows
$height = 20;
// rows top after the first
$other = $first-$height;
// get the string to query from using the global variable
$query = "SELECT * FROM ".$global."_amount";
// get num rows from query string
$numRows = mysql_num_rows(mysql_query($query));
// start looping through rows
for ($i = 0; $i <= $numRows; $i++){
	// get row with id of i
	$row = mysql_fetch_assoc(mysql_query($query." WHERE id='$i'"));
	// if this row is the first row
	if ($i==1){
		// set top var to $first for span's inline style'd top
		$top = $first.'px';
	}else{
		// other rows get normal styling
		$top = (($height * $i)+$other).'px';
	}
	echo "
		<!-- Eventually this should be replaced with the enhanced loop that is featured everywhere else, in case all of the toners get removed at some point, but for now I don't think there is any use in it. -->
		<span id='".$i."' class='filter_row' style='top:$top'>
			<span class='filter_model'>".$row['model']."</span>
			<span class='filter_amount'>".$row['amount']."</span>
			<span class='filter_date'>".$row['date']."</span>
		</span><br />
	";
}
// more things are sure to come, such as better styling and more options, but for now you can see what's there and it's fine...
?>