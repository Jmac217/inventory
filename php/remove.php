<?php include 'connect.php';
$id = $_POST['id'];
// get log information
$log = mysql_fetch_assoc(mysql_query("SELECT * FROM printer WHERE id='$id'"));
$model = $log['model'];
$toner = $log['toner'];
$drum = $log['drum'];
$ip = $log['ip'];
$toner_replaced = $log['toner_replaced'];
$drum_replaced = $log['drum_replaced'];
// remove row with id as $id from database.
mysql_query("DELETE FROM printer WHERE id='$id'");
// log the query into txt/log.txt
$file = fopen('../txt/log.txt', 'a');
// append ids less than 10
if ($id < 10){$id = '0'.$id;}
// prepend $log to log.txt
echo $log = 'Removed - printer[id="'.$id.'"] with Model="'.$model.'", Toner="'.$toner.'", Drum="'.$drum.'", IP="'.$ip.'", Toner Replaced="'.$toner_replaced.'", and Drum Replaced="'.$drum_replaced.'" on this date and time: '.date("m-d-Y | g:ia");
// write to file
fwrite($file, $log."\n");
// and it's gone...
fclose($file);
?>