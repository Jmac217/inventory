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

<?php include 'connect.php';
// this file will probably be moved into uploadXML.php

// set up an error variable to be checked later
$error = NULL;
function setError(){
	die('x'); // standard
	//die(mysql_error()); // debug
}

// update will send an XML string here to be parsed and have corresponding database fields updated with new values
if (isset($_POST['update_xml'])){

	// set posted xml as $xml
	$xml = $_POST['update_xml'];
	$xml = simplexml_load_string($xml);
	$rows = $xml->rows->row;
	if(isset($_POST['category'])){$category = $_POST['category'];}else{setError();}
	
	foreach ($rows as $row){
	
		switch($category){
		
			case 'printer':

				$id = $row['id']; // get this row_id value
				$model_value = $row->model->value; // get this model value
				$name_value = $row->name->value; // get this name value
				$network_value = $row->network->value; // get this network value
				$branch_value = $row->branch->value; // get this branch value
				$desk_value = $row->desk->value; // get this desk value
				$ip_value = $row->ip->value; // get this ip value
				$toner_type_value = $row->toner_type->value; // get this toner_type value
				$drum_type_value = $row->drum_type->value; // get this drum_type value
				$toner_amount_value = $row->toner_amount->value; // get this toner_amount value
				$drum_amount_value = $row->drum_amount->value; // get this drum_amount value
				$toner_replaced_value = $row->toner_replaced->value; // get this toner_replaced value
				$drum_replaced_value = $row->drum_replaced->value; // get this drum_replaced value
				$printer_amount_value = $row->printer_amount->value; // get this printer_amount value
				$maintenance_date_value = $row->maintenance_date->value; // get this maintenance_date value
				$model_bool = $row->model->bool; // get this model bool
				$name_bool = $row->name->bool; // get this name bool
				$network_bool = $row->network->bool; // get this network bool
				$branch_bool = $row->branch->bool; // get this branch bool
				$ip_bool = $row->ip->bool; // get this ip bool
				$desk_bool = $row->model->bool; // get this model bool
				$toner_type_bool = $row->toner_type->bool; // get this toner_type bool
				$toner_amount_bool = $row->toner_amount->bool; // get this toner_amount bool
				$drum_type_bool = $row->drum_type->bool; // get this drum_type bool
				$drum_amount_bool = $row->drum_amount->bool; // get this drum_amount bool
				$toner_replaced_bool = $row->toner_replaced->bool; // get this toner_replaced
				$drum_replaced_bool = $row->drum_replaced->bool; // get this drum_replaced
				$printer_amount_bool = $row->printer_amount->bool; // get this printer_amount bool
				$maintenance_date_bool = $row->maintenance_date->bool; // get this maintenance_date bool

				echo $debug = $id.': '.$model_value.' => '.$model_bool.', '.$name_value.' => '.$name_bool.', '.$network_value.' => '.$network_bool.', '.$branch_value.' => '.$branch_bool.', '.$desk_value.' => '.$desk_bool.', '.$ip_value.' => '.$ip_bool.', '.$toner_type_value.' => '.$toner_type_bool.', '.$drum_type_value.' => '.$drum_type_bool.', '.$toner_replaced_value.' => '.$toner_replaced_bool.', '.$drum_replaced_value.' => '.$drum_replaced_bool.', '.$printer_amount_value.' => '.$printer_amount_bool.', '.$maintenance_date_value.' => '.$maintenance_date_bool.'<br />';

				// update this database row with these values
				
				//mysql_query("UPDATE printer SET model='".$model_value."', toner='".$toner_value."', drum='".$drum_value."', ip='".$ip_value."', toner_replaced='".$toner_replaced_value."', drum_replaced='".$drum_replaced_value."' WHERE id='".$id."'")or die('x');
				// once this printer's variables have been loaded, place them into the database.
				// - This function may not be scalable, so consider that. On a small scale such as this application it is perfectly fine though.
				/* Notice that dates are not inserted as 'N/A' like one could assume by the view_printer_list.php form, but that is done on the fly by JS if value is = 2013-01-01 */
				//mysql_query("INSERT INTO printer(model,toner,drum,ip,toner_replaced,drum_replaced) VALUES('$model','$toner','$drum','$ip','$toner_replaced','$drum_replaced')")or die(mysql_error());
				
				//echo $toners_value.' + '. $toner_value;
				
				
				// This is the contraption I was working on.. DO NOT DELETE
				// dynamically set up a query string using conditions
				if ($model_bool == '1'){
					$model = 'model="'.$model_value.'"';
				}else{$model = NULL;}
				if ($name_bool == '1'){
					$name = 'name="'.$name_value.'"';
				}else{$name = NULL;}
				if ($network_bool == '1'){
					$network = 'network="'.$network_value.'"';
				}else{$network = NULL;}
				if ($branch_bool == '1'){
					$branch = 'branch="'.$branch_value.'"';
				}else{$branch = NULL;}
				if ($desk_bool == '1'){
					$desk = 'desk="'.$desk_value.'"';
				}else{$branch = NULL;}
				if ($toner_type_bool == '1'){
					$toner_type = 'toner_type="'.$toner_type_value.'"';
				}else{$toner_type = NULL;}
				if ($drum_type_bool == '1'){
					$drum_type = 'drum_type="'.$drum_type_value.'"';
				}else{$drum_type = NULL;}				
				if($toner_amount_bool == '1'){
					$toner_amount = 'toner_amount="'.$toner_amount_value.'"';
				}else{$toner_amount = NULL;}
				if($drum_amount_bool == '1'){
					$drum_amount = 'drum_amount="'.$drum_amount_value.'"';
				}else{$drum_amount = NULL;}
				if ($ip_bool == '1'){
					$ip = 'ip="'.$ip_value.'"';
				}else{$ip = NULL;}
				if ($toner_replaced_bool == '1'){
					$toner_replaced = 'toner_replaced="'.$toner_replaced_value.'"';
				}else{$toner_replaced = NULL;}
				if ($drum_replaced_bool == '1'){
					$drum_replaced = 'drum_replaced="'.$drum_replaced_value.'"';
				}else{$drum_replaced = NULL;}
				if ($printer_amount_bool == '1'){
					$printer_amount = 'printer_amount="'.$printer_amount_value.'"';
				}else{$printer_amount = NULL;}
				if ($maintenance_date_bool == '1'){
					$maintenance_date = 'maintenance_date="'.$maintenance_date_value.'"';
				}else{$maintenance_date = NULL;}

				
				// dynamically set up another query string for amounts
				
				// DEBUG
				//echo $toner_value.' => '.$toners.'; Update?:'.$toners_bool.' | ';
				
				/*
				if ($model == NULL){echo ' model = NULL';}
				if ($toner == NULL){echo ' toner = NULL';}
				if ($drum == NULL){echo ' drum = NULL';}
				if ($ip == NULL){echo ' ip = NULL';}
				if ($toner_replaced == NULL){echo ' toner_replaced = NULL';}
				if ($drum_replaced == NULL){echo ' drum_replaced = NULL';}
				*/
				
				// this should cover all cases... I know it's difficult to look at and I appologize.
				// this is just generating a dynamic sql query.
				//It's just checking, firstly, to see if anything has been set.
				
				// set file to be globally logged
				$file = fopen('../txt/log.txt', 'a');
				
				if (isset($model)||isset($name)||isset($network)||isset($branch)||isset($desk)||isset($ip)||isset($toner_type)||isset($drum_type)||isset($toner_amount)||isset($drum_amount)||isset($toner_replaced)||isset($drum_replaced)||isset($printer_amount)||isset($maintenance_date)){
					// Then it moves on to check each individual value against the previous, like a factorial, and appends a comma onto the end of the previous value if it exists.
					// Obviously there has to be a better way, but for now I'm leaving it like this.
					if (isset($name)){
						if(isset($model)){
							$model .= ', ';
						}
					}
					if (isset($network)){
						if(isset($name)||isset($model)){
							$name .= ', ';
						}
					}
					if (isset($branch)){
						if(isset($network)||isset($name)||isset($model)){
							$network .= ', ';
						}
					}
					if (isset($desk)){
						if(isset($branch)||isset($network)||isset($name)||isset($model)){
							$branch .= ', ';
						}
					}
					if (isset($ip)){
						if(isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$desk .= ', ';
						}
					}
					if (isset($toner_type)){
						if(isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$ip .= ', ';
						}
					}
					if (isset($drum_type)){
						if(isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$toner_type .= ', ';
						}
					}
					if (isset($toner_amount)){
						if(isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$drum_type .= ', ';
						}
					}
					if (isset($drum_amount)){
						if(isset($toner_amount)||isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$toner_amount .= ', ';
						}
					}
					if (isset($toner_replaced)){
						if(isset($drum_amount)||isset($toner_amount)||isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$drum_amount .= ', ';
						}
					}
					if (isset($drum_replaced)){
						if(isset($toner_replaced)||isset($drum_amount)||isset($toner_amount)||isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$toner_replaced .= ', ';
						}
					}
					if (isset($printer_amount)){
						if(isset($drum_replaced)||isset($toner_replaced)||isset($drum_amount)||isset($toner_amount)||isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$drum_replaced .= ', ';
						}
					}
					if (isset($maintenance_date)){
						if(isset($printer_amount)||isset($drum_replaced)||isset($toner_replaced)||isset($drum_amount)||isset($toner_amount)||isset($drum_type)||isset($toner_type)||isset($ip)||isset($desk)||isset($branch)||isset($network)||isset($name)||isset($model)){
							$printer_amount .= ', ';
						}
					}
					echo $query = 'UPDATE printer SET '.$model.$name.$network.$branch.$desk.$ip.$toner_type.$drum_type.$toner_replaced.$drum_replaced.$printer_amount.$maintenance_date.' WHERE id="'.$id.'"';
					mysql_query($query)or die(mysql_error());
					
					// Write Log
					if($id<10){$id = '0'.$id;}// just cleaner
					$log = 'Updated - printer[id="'.$id.'"] with '.$model.$name.$network.$branch.$desk.$ip.$toner_type.$drum_type.$toner_replaced.$drum_replaced.$printer_amount.$maintenance_date.' on '.date('m-d-Y').' | '.date('g:ia');
					fwrite($file, $log."\n");
					
				}else{echo ' Row: '.$id.' not set.';}	
					
				/* THIS FUNCTIONALITY HAS BEEN DEPRICATED AND MERGED INTO THE PRINTER DATABASE
				if (isset($toners)){
					// there needs to be a check here to see if this model is already in the database, if it's not then maybe add it, but probably just disregard the change.
					// - same for the drums
					mysql_query('UPDATE toner_amount SET '.$toners.' WHERE model="'.$toner_value.'"');
					
					// Write Log
					$log = 'Updated - toner_amount[model="'.$toner_value.'"] with '.$toners.' on '.date('m-d-Y').' | '.date('g:ia');
					fwrite($file, $log."\n");
				}
				
				if (isset($drums)){
					mysql_query('UPDATE drum_amount SET '.$drums.' WHERE model="'.$drum_value.'"');
					
					// Write Log
					$log = 'Updated - drum_amount[drum="'.$drum_value.'"] with '.$drums.' on '.date('m-d-Y').' | '.date('g:ia');
					fwrite($file, $log."\n");
				}
				// close global log
				fclose($file);
				*/
				
			break; // printer
			case 'paper':

				$id = $row['id'];
				$type_value = $row->type->value;
				$stock_value = $row->stock->value;
				$department_value = $row->department->value;
				$timestamp_value = $row->timestamp->value;

				$type_bool = $row->type->bool;
				$stock_bool = $row->stock->bool;
				$department_bool = $row->department->bool;
				$timestamp_bool = $row->timestamp->bool;

				if ($type_bool == '1'){
					$type = 'type="'.$type_value.'"';
				}else{$type = NULL;}
				if ($stock_bool == '1'){
					$stock = 'stock="'.$stock_value.'"';
				}else{$stock = NULL;}
				if ($department_bool == '1'){
					$department = 'department="'.$department_value.'"';
				}else{$department = NULL;}
				if ($timestamp_bool == '1'){
					$timestamp = 'timestamp="'.$timestamp_value.'"';
				}else{$timestamp = NULL;}
				
				if (isset($type)||isset($stock)||isset($department)||isset($timestamp)){
					if (isset($stock)){
						if(isset($type)){
							$type .= ', ';
						}
					}
					if (isset($department)){
						if(isset($stock)||isset($type)){
							$stock .= ', ';
						}
					}
					if (isset($timestamp)){
						if(isset($department)||isset($stock)||isset($type)){
							$department .= ', ';
						}
					}

					$query = 'UPDATE paper SET '.$type.$stock.$department.$timestamp.' WHERE id="'.$id.'"';
					mysql_query($query)or die(mysql_error());
				
				}else{echo ' Row: '.$id.' not set.';}

			
				// the log check MUST be included. This file might be the hardest to produce dynamically.
			
			break; // paper
			case 'workstation':

				$id = $row['id'];
				$name_value = $row->name->value;
				$model_value = $row->model->value;
				$hd_value = $row->hd->value;
				$ram_value = $row->ram->value;
				$version_value = $row->version->value;
				$ip_value = $row->ip->value;
				$user_value = $row->user->value;
				$extension_value = $row->extension->value;
				$date_value = $row->date->value;

				$name_bool = $row->name->bool;
				$model_bool = $row->model->bool;
				$hd_bool = $row->hd->bool;
				$ram_bool = $row->ram->bool;
				$version_bool = $row->version->bool; 
				$ip_bool = $row->ip->bool;
				$user_bool = $row->user->bool;
				$extension_bool = $row->extension->bool;
				$date_bool = $row->date->bool;

				if ($name_bool == '1'){
					$name = 'name="'.$name_value.'"';
				}else{$name = NULL;}				
				if ($model_bool == '1'){
					$model = 'model="'.$model_value.'"';
				}else{$model = NULL;}
				if ($hd_bool == '1'){
					$hd = 'hd="'.$hd_value.'"';
				}else{$hd = NULL;}
				if ($ram_bool == '1'){
					$ram = 'ram="'.$ram_value.'"';
				}else{$ram = NULL;}
				if ($version_bool == '1'){
					$version = 'version="'.$version_value.'"';
				}else{$version = NULL;}				
				if ($ip_bool == '1'){
					$ip = 'ip="'.$ip_value.'"';
				}else{$ip = NULL;}
				if ($user_bool == '1'){
					$user = 'user="'.$user_value.'"';
				}else{$user = NULL;}
				if ($extension_bool == '1'){
					$extension = 'extension="'.$extension_value.'"';
				}else{$extension = NULL;}
				if ($date_bool == '1'){
					$date = 'date="'.$date_value.'"';
				}else{$date = NULL;}

				if (isset($name)||isset($model)||isset($hd)||isset($ram)||isset($version)||isset($ip)||isset($user)||isset($extension)||isset($date)){
					if (isset($model)){
						if(isset($name)){
							$name .= ', ';
						}
					}
					if (isset($hd)){
						if(isset($model)||isset($name)){
							$model .= ', ';
						}
					}
					if (isset($ram)){
						if(isset($hd)||isset($model)||isset($name)){
							$hd .= ', ';
						}
					}
					if (isset($version)){
						if(isset($ram)||isset($hd)||isset($model)||isset($name)){
							$ram .= ', ';
						}
					}
					if (isset($ip)){
						if(isset($version)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$version .= ', ';
						}
					}
					if (isset($user)){
						if(isset($ip)||isset($version)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$ip .= ', ';
						}
					}
					if (isset($extension)){
						if(isset($user)||isset($ip)||isset($version)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$user .= ', ';
						}
					}
					if (isset($date)){
						if(isset($extension)||isset($user)||isset($ip)||isset($version)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$extension .= ', ';
						}
					}
					$query = 'UPDATE workstation SET '.$name.$model.$hd.$ram.$version.$ip.$user.$extension.$date.' WHERE id="'.$id.'"';
					//$query = 'UPDATE workstation SET date="0000-05-05" WHERE id="1"';
					mysql_query($query)or die(mysql_error());
				}else{echo ' Row: '.$id.' not set.';}

			break; // workstation
			case 'accessory':
			

				$id = $row['id'];
				$category_value = $row->category->value;
				$type_value = $row->type->value;
				$length_value = $row->length->value;
				$in_stock_value = $row->in_stock->value;
				$in_use_value = $row->in_use->value;
				$department_value = $row->department->value;

				$category_bool = $row->category->bool;
				$type_bool = $row->type->bool;
				$length_bool = $row->length->bool;
				$in_stock_bool = $row->in_stock->bool;
				$in_use_bool = $row->in_use->bool;
				$department_bool = $row->department->bool;

				if ($category_bool == '1'){
					$this_category = 'category="'.$category_value.'"';
				}else{$this_category = NULL;}				
				if ($type_bool == '1'){
					$type = 'type="'.$type_value.'"';
				}else{$type = NULL;}
				if ($length_bool == '1'){
					$length = 'length="'.$length_value.'"';
				}else{$length = NULL;}				
				if ($in_stock_bool == '1'){
					$in_stock = 'in_stock="'.$in_stock_value.'"';
				}else{$in_stock = NULL;}
				if ($in_use_bool == '1'){
					$in_use = 'in_use="'.$in_use_value.'"';
				}else{$in_use = NULL;}				
				if ($department_bool == '1'){
					$department = 'department="'.$department_value.'"';
				}else{$department = NULL;}
		
			
				// the log check MUST be included. This file might be the hardest to produce dynamically.
				
				
				if (isset($this_category)||isset($type)||isset($length)||isset($in_stock)||isset($in_use)||isset($department)){
					if (isset($type)){
						if(isset($category)){
							$category .= ', ';
						}
					}
					if (isset($length)){
						if(isset($type)||isset($this_category)){
							$type .= ', ';
						}
					}
					if (isset($in_stock)){
						if(isset($length)||isset($type)||isset($this_category)){
							$length .= ', ';
						}
					}
					if (isset($in_use)){
						if(isset($in_stock)||isset($length)||isset($type)||isset($this_categroy)){
							$in_stock .= ', ';
						}
					}
					if (isset($department)){
						if(isset($in_use)||isset($in_stock)||isset($length)||isset($type)||isset($this_category)){
							$in_use .= ', ';
						}
					}

				$query = 'UPDATE accessory SET '.$this_category.$type.$length.$in_stock.$in_use.$department.' WHERE id="'.$id.'"';
				mysql_query($query)or die(mysql_error());	
				
				}else{echo ' Row: '.$id.' not set.';}
			
			break; // paper
			case 'server':

				$id = $row['id'];
				$name_value = $row->name->value;
				$model_value = $row->model->value;
				$hd_value = $row->hd->value;
				$ram_value = $row->ram->value;
				$os_value = $row->os->value;
				$version_value = $row->version->value;
				$ip_value = $row->ip->value;
				$date_value = $row->date->value;

				$name_bool = $row->name->bool;
				$model_bool = $row->model->bool;
				$hd_bool = $row->hd->bool;
				$ram_bool = $row->ram->bool;
				$os_bool = $row->os->bool;
				$version_bool = $row->version->bool; 
				$ip_bool = $row->ip->bool;
				$date_bool = $row->date->bool;

				if ($name_bool == '1'){
					$name = 'name="'.$name_value.'"';
				}else{$name = NULL;}				
				if ($model_bool == '1'){
					$model = 'model="'.$model_value.'"';
				}else{$model = NULL;}
				if ($hd_bool == '1'){
					$hd = 'hd="'.$hd_value.'"';
				}else{$hd = NULL;}
				if ($ram_bool == '1'){
					$ram = 'ram="'.$ram_value.'"';
				}else{$ram = NULL;}
				if ($os_bool == '1'){
					$os = 'os="'.$os_value.'"';
				}else{$os = NULL;}
				if ($version_bool == '1'){
					$version = 'version="'.$version_value.'"';
				}else{$version = NULL;}				
				if ($ip_bool == '1'){
					$ip = 'ip="'.$ip_value.'"';
				}else{$ip = NULL;}
				if ($date_bool == '1'){
					$date = 'date="'.$date_value.'"';
				}else{$date = NULL;}

				if (isset($name)||isset($model)||isset($hd)||isset($ram)||isset($os)||isset($version)||isset($ip)||isset($date)){
					if (isset($model)){
						if(isset($name)){
							$name .= ', ';
						}
					}
					if (isset($hd)){
						if(isset($model)||isset($name)){
							$model .= ', ';
						}
					}
					if (isset($ram)){
						if(isset($hd)||isset($model)||isset($name)){
							$hd .= ', ';
						}
					}
					if (isset($os)){
						if(isset($ram)||isset($hd)||isset($model)||isset($name)){
							$ram .= ', ';
						}
					}
					if (isset($version)){
						if(isset($os)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$os .= ', ';
						}
					}
					if (isset($ip)){
						if(isset($version)||isset($os)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$version .= ', ';
						}
					}
					if (isset($date)){
						if(isset($ip)||isset($version)||isset($os)||isset($ram)||isset($hd)||isset($model)||isset($name)){
							$ip .= ', ';
						}
					}
					$query = 'UPDATE server SET '.$name.$model.$hd.$ram.$os.$version.$date.' WHERE id="'.$id.'"';
					//$query = 'UPDATE workstation SET date="0000-05-05" WHERE id="1"';
					mysql_query($query)or die(mysql_error());
				}else{echo ' Row: '.$id.' not set.';}
			
			break; // server
			case 'software':
			break; // software
			default:
				echo "DEFAULT";
			break;
				
		}
	}
}
?>
