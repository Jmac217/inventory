<?/*******************************************************

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

***********************************************************/?>

<?php include 'connect.php'; // shebang!
// for each printer in xml, collect variables and insert them.
$xml = $_POST['xml'];
//echo $xml;

// will get category from post as well as the xml now
$category = $_POST['category'];
//echo "category --->>>> : ".$category." |||";

// reset xml to XML object from recent string
$xml = simplexml_load_string($xml);

// start switching for category

//echo $xml;
switch ($category){
	case 'printer':

		// call for $printers to load each printer
		$printers = $xml->printers->printer;

		// for each printer
		foreach ($printers as $printer){

			$model = $printer->model; // get this model
			$name = $printer->name;
			$network = $printer->network;
			$branch = $printer->branch;
			echo $desk = $printer->desk;
			$ip = $printer->ip; // get this ip
			$toner_type = $printer->toner_type; // get this toner
			$drum_type = $printer->drum_type; // get this drum
			$toner_amount = $printer->toner_amount; // get this toner_amount
			$drum_amount = $printer->drum_amount; // get this drum_amount
			$toner_replaced = $printer->toner_replaced; // get this toner_replaced
			$drum_replaced = $printer->drum_replaced; // get this drum_replaced
			$printer_amount = $printer->printer_amount; // get printer amount
			$maintenance_date = $printer->maintenance_date; // get maintenance date
			
			// once this printer's variables have been loaded, place them into the database.
			// - This function may not be scalable, so consider that. On a small scale such as this application it is perfectly fine though.
			// Notice that dates are not inserted as 'N/A' like one could assume by the view_printer_list.php form, but that is done on the fly by JS if value is = 2013-01-01
			
			// if toner doesn't exist in the database then insert it into both this database and the toner_amount database.
			// This is a problem right now 
			
			/*
			$toner_model = mysql_fetch_assoc(mysql_query("SELECT * FROM toner_amount WHERE model='$toner'"));
			$drum_model = mysql_fetch_assoc(mysql_query("SELECT * FROM drum_amount WHERE model='$drum'"));
			$date = date('Y-m-d');

			if (!isset($toner_model['model'])){
				// toner doesn't exist in the database yet so add it
				mysql_query("INSERT INTO toner_amount(model,amount,date) VALUES('$toner','1','$date')");
			}else{
				// update amount in the database by 1
				//echo ' toner amount: '.
				$toner_amount = $toner_model['amount']+1;
				$id = $toner_model['id'];
				mysql_query("UPDATE toner_amount SET amount=$toner_amount WHERE id=$id");
			}
			if (!isset($drum_model['model'])){
				// drum doesn't exist in the database yet so add it
				mysql_query("INSERT INTO drum_amount(model,amount,date) VALUES('$drum','1','$date')");
			}else{
				// update amount in the database by 1
				//echo ' drum amount: '.
				$drum_amount = $drum_model['amount']+1;
				$id = $drum_model['id'];
				mysql_query("UPDATE drum_amount SET amount=$drum_amount WHERE id=$id");
			}*/
			
			mysql_query("INSERT INTO printer(model,name,network,branch,desk,ip,toner_type,drum_type,toner_amount,drum_amount,toner_replaced,drum_replaced,printer_amount,maintenance_date) VALUES('$model','$name','$network','$branch','$desk','$ip','$toner_type','$drum_type','$toner_amount','$drum_amount','$toner_replaced','$drum_replaced','$printer_amount','$maintenance_date')")or die(mysql_error());
			
			// log the query
			
			$id = mysql_fetch_assoc(mysql_query("SELECT id FROM printer WHERE ip='$ip'"));
			$id = $id['id'];
			
			// open txt/log.txt
			$file = fopen('../txt/log.txt', 'a');
			// prepend ids less than 10
			if ($id < 10){$id = '0'.$id;}
			// append $log to log.txt
			//$log = $toner_model['model'].' || '.$drum_model['model'];
			$log = 'Added - printer[id="'.$id.'"] with Model="'.$model.'", Name="'.$name.'", Network="'.$network.'", Branch="'.$branch.'", Desk="'.$desk.'", IP="'.$ip.'", Toner_Type="'.$toner_type.'", Drum_Type="'.$drum_type.'", Toner_amount="'.$toner_amount.'", Drum_Amount="'.$drum_amount.'", Toner_Replaced="'.$toner_replaced.'", Drum_Replaced="'.$drum_replaced.'", Printer_Amount="'.$printer_amount.'", Maintenance_Date="'.$maintenance_date.'" on this date and time: '.date("m-d-Y | g:ia");
			fwrite($file, $log."\n");
			fclose($file);
		}echo '0'; // this tells JS that everything is good to go.
	break;

case 'paper':

// call for $papers to load each paper
$papers = $xml->papers->paper;

// for each paper

//echo 'not 0';
foreach ($papers as $paper){

	$type = $paper->type; // get this model
	$stock = $paper->stock; // get this model
	$department = $paper->department; // get this toner
//	$timestamp = $paper->timestamp; // get this drum
	$timestamp = '0000-00-00';// default until dates are set up near the end

	mysql_query("INSERT INTO paper(type,stock,department,timestamp) VALUES('$type','$stock','$department','$timestamp')")or die(mysql_error());
	
	$id = mysql_fetch_assoc(mysql_query("SELECT id FROM paper WHERE type='$type'"));
	$id = $id['id'];

	// open txt/log.txt
	$file = fopen('../txt/log.txt', 'a');

	// prepend ids less than 10
	if ($id < 10){$id = '0'.$id;}

	// append $log to log.txt
	//$log = $toner_model['model'].' || '.$drum_model['model'];
	$log = 'Added - paper[id="'.$id.'"] with Type="'.$type.'", Stock="'.$stock.'", Department="'.$department.'", Timestamp="'.$timestamp.'" on : '.date("m-d-Y | g:ia");
	fwrite($file, $log."\n");
	fclose($file);
}echo '0'; // this tells JS that everything is good to go.
break;
case 'server':

// call for $servers to load each server
$servers = $xml->servers->server;

// for each server
foreach ($servers as $server){

	$name = $server->name; // get this model
	$model = $server->model; // get this model
	$hd = $server->hd; // get this toner
	$ram = $server->ram; // get this drum
	$os = $server->os; // get this ip
	$version = $server->version;
	$ip = $server->ip; // get this ip
	//$date = $server->date;
	$date = '0000-00-00';//default
//	echo $name.$model.$hd.$ram.$os.$version.$ip.$date;
//	mysql_query("INSERT INTO server(name,model,hd,ram,os,version,ip,date) VALUES('$name','$model','$hd','$hd','$ram','$os','$version','$ip','$date')")or die("Server Query ".mysql_error());
mysql_query("INSERT INTO server(name,model,hd,ram,os,version,ip,date) VALUES('$name','$model','$hd','$ram','$os','$version','$ip','$date')");
	
	// log the query
	
	$id = mysql_fetch_assoc(mysql_query("SELECT id FROM server WHERE ip='$ip'"));
	$id = $id['id'];
	
	// open txt/log.txt
	$file = fopen('../txt/log.txt', 'a');
	// prepend ids less than 10
	if ($id < 10){$id = '0'.$id;}
	// append $log to log.txt
	//$log = $toner_model['model'].' || '.$drum_model['model'];
	$log = 'Added - server[id="'.$id.'"] with Name="'.$name.'", Model="'.$model.'", HD="'.$hd.'", Ram="'.$ram.'", OS="'.$os.'", Version="'.$version.'", IP="'.$ip.'", Date="'.$date.'" on : '.date("m-d-Y | g:ia");
	fwrite($file, $log."\n");
	fclose($file);
}echo '0'; // this tells JS that everything is good to go.
break;
case 'workstation':
// call for $workstations to load each workstation
$workstations = $xml->workstations->workstation;

// for each workstation

foreach ($workstations as $workstation){

	$name = $workstation->name; // get this model
	$model = $workstation->model; // get this toner
	$hd = $workstation->hd; // get this drum
	$ram = $workstation->ram; // get this ip
	$version = $workstation->version; // get this toner_replaced
	$ip = $workstation->ip; // get this drum_replaced
	$user = $workstation->user; // get this toner
	$extension = $workstation->extension; // get this toner
	$date = $workstation->date; // get this toner
	
	mysql_query("INSERT INTO workstation(name,model,hd,ram,version,ip,user,extension,date) VALUES('$name','$model','$hd','$ram','$version','$ip','$user','$extension','$date')")or die(mysql_error());
	
	// log the query
	
	$id = mysql_fetch_assoc(mysql_query("SELECT id FROM workstation WHERE ip='$ip'"));
	$id = $id['id'];
	
	// open txt/log.txt
	$file = fopen('../txt/log.txt', 'a');
	// prepend ids less than 10
	if ($id < 10){$id = '0'.$id;}
	// append $log to log.txt
	//$log = $toner_model['model'].' || '.$drum_model['model'];
	$log = 'Added - workstation[id="'.$id.'"] with Name="'.$name.'", Model="'.$model.'", HD="'.$hd.'", Ram="'.$ram.'", Version="'.$version.'", IP="'.$ip.'", User="'.$user.'", Extension="'.$extension.'", and Date="'.$date.'" on : '.date("m-d-Y | g:ia");
	fwrite($file, $log."\n");
	fclose($file);
}echo '0'; // this tells JS that everything is good to go.
break;

case 'accessory':
// call for $accessories to load each accessory
$accessories = $xml->accessories->accessory;

// for each accessory

foreach ($accessories as $accessory){

	$db_category = $accessory->category; // get this model
	$type = $accessory->type; // get this toner
	$length = $accessory->length; // get this drum
	$in_stock = $accessory->in_stock; // get this ip
	$in_use = $accessory->in_use; // get this toner_replaced

//	echo $db_category.' '.$type.' '.$length.' '.$in_stock.' '.$in_use;
	
	mysql_query("INSERT INTO accessory(category,type,length,in_stock,in_use) VALUES('$db_category','$type','$length','$in_stock','$in_use')")or die('accessory error '.mysql_error());
	
	// log the query
	
	$id = mysql_fetch_assoc(mysql_query("SELECT id FROM accessory WHERE type='$type'"));
	$id = $id['id'];
	
	// open txt/log.txt
	$file = fopen('../txt/log.txt', 'a');
	// prepend ids less than 10
	if ($id < 10){$id = '0'.$id;}
	// append $log to log.txt
	//$log = $toner_model['model'].' || '.$drum_model['model'];
	$log = 'Added - accessory[id="'.$id.'"] with Category="'.$db_category.'", Type="'.$type.'", Length="'.$length.'", In_Stock="'.$in_stock.'", In_Use="'.$in_use.'" on : '.date("m-d-Y | g:ia");
	fwrite($file, $log."\n");
	fclose($file);
}echo '0'; // this tells JS that everything is good to go.
break;

case 'software':
// call for $softwares to load each software
$softwares = $xml->softwares->software;

// for each software

foreach ($softwares as $software){

	$model = $software->model; // get this model
	$toner = $software->toner; // get this toner
	$drum = $software->drum; // get this drum
	$ip = $software->ip; // get this ip
	$toner_replaced = $software->toner_replaced; // get this toner_replaced
	$drum_replaced = $software->drum_replaced; // get this drum_replaced
	
	$toner_model = mysql_fetch_assoc(mysql_query("SELECT * FROM toner_amount WHERE model='$toner'"));
	$drum_model = mysql_fetch_assoc(mysql_query("SELECT * FROM drum_amount WHERE model='$drum'"));
	$date = date('Y-m-d');
	if (!isset($toner_model['model'])){
		// toner doesn't exist in the database yet so add it
		mysql_query("INSERT INTO toner_amount(model,amount,date) VALUES('$toner','1','$date')");
	}else{
		// update amount in the database by 1
		//echo ' toner amount: '.
		$toner_amount = $toner_model['amount']+1;
		$id = $toner_model['id'];
		mysql_query("UPDATE toner_amount SET amount=$toner_amount WHERE id=$id");
	}
	if (!isset($drum_model['model'])){
		// drum doesn't exist in the database yet so add it
		mysql_query("INSERT INTO drum_amount(model,amount,date) VALUES('$drum','1','$date')");
	}else{
		// update amount in the database by 1
		//echo ' drum amount: '.
		$drum_amount = $drum_model['amount']+1;
		$id = $drum_model['id'];
		mysql_query("UPDATE drum_amount SET amount=$drum_amount WHERE id=$id");
	}
	
	mysql_query("INSERT INTO software(model,toner,drum,ip,toner_replaced,drum_replaced) VALUES('$model','$toner','$drum','$ip','$toner_replaced','$drum_replaced')")or die(mysql_error());
	
	// log the query
	
	$id = mysql_fetch_assoc(mysql_query("SELECT id FROM software WHERE ip='$ip'"));
	$id = $id['id'];
	
	// open txt/log.txt
	$file = fopen('../txt/log.txt', 'a');
	// prepend ids less than 10
	if ($id < 10){$id = '0'.$id;}
	// append $log to log.txt
	//$log = $toner_model['model'].' || '.$drum_model['model'];
	$log = 'Added - software[id="'.$id.'"] with Model="'.$model.'", Toner="'.$toner.'", Drum="'.$drum.'", IP="'.$ip.'", Toner Replaced="'.$toner_replaced.'", and Drum Replaced="'.$drum_replaced.'" on this date and time: '.date("m-d-Y | g:ia");
	fwrite($file, $log."\n");
	fclose($file);
}echo '0'; // this tells JS that everything is good to go.
break;

default:
echo "Upload XML Default";
break;
}// end of switch
?>
