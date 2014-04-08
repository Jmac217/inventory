<?php /*******************************************************

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

********************************************************** */?>

<?php include 'php/connect.php';

echo "<script type='text/javascript' src='js/view.js'></script>";

// get post and switch for each database



/* 

	This file will, at some point, use mostly classes and before many things happen SQL will be transfered into JSON objects for JS -> soon there will be no need for the SQL database.
	

*/


if (isset($_POST['category'])){
	$category = stripslashes(strtolower($_POST['category']));
	$numRowQuery = "SELECT MAX(id) AS max FROM ".$category;
	$numRows = mysql_fetch_assoc(mysql_query($numRowQuery));
	$numRows = $numRows['max'];
	$omittedFields=2;// will be dependant on the selection
	$numFields = mysql_num_fields(mysql_query("SELECT * FROM ".$category)) - $omittedFields;
	$reference = 1;
	$i = $reference;
	$t = $reference;
	$height = 30;
	$row_id = 0;
	if ($numRows == 0){echo '<div id="view_nothing"><span id="view_list_nothing"><i>There doesn\'t seem to be anything here...</i><br /><span id="small">I seriously can\'t see a damned thing in there!</span></span></div>';mysql_query("ALTER TABLE paper AUTO_INCREMENT=1");}
	else{
		echo "<div id='view_list_container'>";
		switch ($category){
		// NEEDS REDBUILT TO SUSTAIN CHANGE
			case 'printer':
				echo "
					<div id='view_printer'>
						<div class='view_list_container'><!-- the start of the dynamism -->
							<span id='loading'></span>
							<span id='view_printer_categories'>
								<!-- the following COULD become classes, and use a switch statement to get values for filters, but it would almost be nonsensical at this point. Just something to think about. -->
								<span id='view_printer_category_model'>Model</span>
								<span id='view_printer_category_name'>Name</span>
								<span id='view_printer_category_network'>Network</span>
								<span id='view_printer_category_branch'>Branch</span>
								<span id='view_printer_category_desk'>Desk</span>
								<span id='view_printer_category_ip'>IP</span>
								<span id='view_printer_category_toner_type'>Toner</span>
								<span id='view_printer_category_drum_type'>Drum</span>
								<span id='view_printer_category_toner_amount'>Toner Amount</span>
								<span id='view_printer_category_drum_amount'>Drum Amount</span>
								<span id='view_printer_category_toner_replaced'>Toner Replaced</span>
								<span id='view_printer_category_drum_replaced'>Drum Replaced</span>
								<span id='view_printer_category_printer_amount'>Printer Amount</span>								
								<span id='view_printer_category_maintenance_date'>Maintenance Date</span>
							</span>
							<div class='view_field_container'>
				";
				while($i<=$numRows){ // loop through all rows
					$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'")); // select only the rows where user exists and that are unread
					//$row = mysql_fetch_assoc(mysql_query("SELECT * FROM paper WHERE id='$i'")); // select only the rows where user exists and that are unread
					if(isset($row['id'])){// if 'id' is set, continue.
						if($row['id']==$i){// if 'id' is equal to the current loop value, continue.
							$top = ($t*$height).'px'; // dynamically set message top value.
							$id = $row['id'];
										
							// correct default dates, also, even though this only happened once during a bug, correct for dates of '0000-00-00'.
							$toner_replaced = $row['toner_replaced'];
							$drum_replaced = $row['drum_replaced'];
							
							if($toner_replaced == '2013-01-01' || $toner_replaced == '0000-00-00'){
								$toner_replaced = 'N/A';
							}
							if($drum_replaced == '2013-01-01' || $drum_replaced == '0000-00-00'){
								$drum_replaced = 'N/A';
							}
							
							/* THIS IS BEING DEPRICATED
							// get toner amount
							
							$toner_amount = mysql_fetch_assoc(mysql_query("SELECT amount AS toner_amount FROM toner_amount WHERE model='".$row['toner_amount']."'"));
							$toner_amount = $toner_amount['toner_amount'];
							
							// get drum amount
							$drum_amount = mysql_fetch_assoc(mysql_query("SELECT amount AS drum_amount FROM drum_amount WHERE model='".$row['drum_amount']."'"));
							$drum_amount = $drum_amount['drum_amount'];
							*/
							
							// needs logic or removed
							//$printer_amount='3';

							echo "
								<span class='view_printer_field' style='top:$top' id='$id' row_id='$row_id'><!-- Top is styled in-line dynamically. -->
									<span id='0' class='view_printer_model'>".$row['model']."</span>
									<span id='1' class='view_printer_name'>".$row['name']."</span>
									<span id='2' class='view_printer_network'>".$row['network']."</span>
									<span id='3' class='view_printer_branch'>".$row['branch']."</span>
									<span id='4' class='view_printer_desk'>".$row['desk']."</span>
									<span id='5' class='view_printer_ip'>".$row['ip']."</span>
									<span id='6' class='view_printer_toner_type'>".$row['toner_type']."</span>
									<span id='7' class='view_printer_drum_type'>".$row['drum_type']."</span>
									<span id='8' class='view_printer_toner_amount'>".$row['toner_amount']."</span>
									<span id='9' class='view_printer_drum_amount'>".$row['drum_amount']."</span>
									<span id='10' class='view_printer_toner_replaced'>".$toner_replaced."</span>
									<span id='11' class='view_printer_drum_replaced'>".$drum_replaced."</span>
									<span id='12' class='view_printer_printer_amount'>".$row['printer_amount']."</span>
									<span id='13' class='view_printer_maintenance_date'>".$row['maintenance_date']."</span>
									<span class='view_printer_options'>
										<span class='view_printer_options_remove'></span>
										<span class='view_printer_options_update'></span>
									</span>
									<span class='view_printer_field_update' id='$id'>
										<input id='0' class='view_printer_model_update view_printer_field_update_input' alt='".$row['model']."' value='".$row['model']."'/>
										<input id='1' class='view_printer_name_update view_printer_field_update_input' alt='".$row['name']."' value='".$row['name']."'/>
										<input id='2' class='view_printer_network_update view_printer_field_update_input' alt='".$row['network']."' value='".$row['network']."'/>
										<input id='3' class='view_printer_branch_update view_printer_field_update_input' alt='".$row['branch']."' value='".$row['branch']."'/>
										<input id='4' class='view_printer_desk_update view_printer_field_update_input' alt='".$row['desk']."' value='".$row['desk']."'/>
										<input id='5' class='view_printer_ip_update view_printer_field_update_input' alt='".$row['ip']."' value='".$row['ip']."'/>
										<input id='6' class='view_printer_toner_type_update view_printer_field_update_input' alt='".$row['toner_type']."' value='".$row['toner_type']."'/>
										<input id='7' class='view_printer_drum_type_update view_printer_field_update_input' alt='".$row['drum_type']."' value='".$row['drum_type']."'/>
										<input id='8' class='view_printer_toner_amount_update' maxlength='2' alt='".$row['toner_amount']."' value='".$row['toner_amount']."'/>
										<input id='9' class='view_printer_drum_amount_update' maxlength='2' alt='".$row['drum_amount']."' value='".$row['drum_amount']."'/>
										<input id='10' class='view_printer_toner_replaced_update view_printer_field_update_input' alt='".$toner_replaced."' value='".$toner_replaced."'/>
										<input id='11' class='view_printer_drum_replaced_update view_printer_field_update_input' alt='".$drum_replaced."' value='".$drum_replaced."'/>
										<input id='12' class='view_printer_printer_amount_update view_printer_field_update_input' alt='".$row['printer_amount']."' value='".$row['printer_amount']."'/>
										<input id='13' class='view_printer_maintenance_date_update view_printer_field_update_input' alt='".$row['maintenance_date']."' value='".$row['maintenance_date']."'/>
									</span>
								</span>
							";
							
							// Once the pass is complete increment the variables used by one.
							$i++;
							$t++;
							$row_id++;

						}
					}else{$i++;}// if row doesn't exist just increment the row variable, leaving the top variable safely the same for next pass.
				}
				echo "
							</div> <!-- field container -->
						</div> <!-- list container -->
						<div id='view_printer_footer'>
							<div id='view_printer_footer_content'>
								<span id='view_printer_cancel'><input id='view_printer_cancel_button' type='button' value='Cancel'/></span>
								<span id='view_printer_update'><input id='view_printer_update_button' type='button' value='Update'/></span>
								<span id='view_printer_feedback'></span>
							</div>
						</div>
					</div>
				";
			break;
			
			case 'paper':
				echo "
					<div id='view_paper'>
						<div class='view_list_container'>
							<span id='loading'></span>
							<span id='view_paper_categories'>
								<span id='view_paper_category_type'>type</span>
								<span id='view_paper_category_stock'>stock</span>
								<span id='view_paper_category_department'>department</span>
								<span id='view_paper_category_timestamp'>Replaced</span>
							</span>
							<div class='view_field_container'>
				";
				while($i<=$numRows){
					$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'"));
					if(isset($row['id'])){
						if($row['id']==$i){
							$top = ($t*$height).'px';
							$id = $row['id'];
							$paper_replaced = $row['timestamp'];
							if($paper_replaced == '2013-01-01' || $paper_replaced == '0000-00-00'){
								$paper_replaced = 'N/A';
							}
							echo "
								<span class='view_paper_field' style='top:$top' id='$id' row_id='$row_id'>
									<span id='0' class='view_paper_type'>".$row['type']."</span>
									<span id='1' class='view_paper_stock'>".$row['stock']."</span>
									<span id='2' class='view_paper_department'>".$row['department']."</span>
									<span id='3' class='view_paper_timestamp'>".$row['timestamp']."</span>
									<span class='view_paper_options'>
										<span class='view_paper_options_remove'></span>
										<span class='view_paper_options_update'></span>
									</span>						
									<span class='view_paper_field_update' id='$id'>
										<input id='0' class='view_paper_type_update view_paper_field_update_input' alt='".$row['type']."' value='".$row['type']."'/>
										<input id='1' class='view_paper_stock_update view_paper_field_update_input' alt='".$row['stock']."' value='".$row['stock']."'/>
										<input id='2' class='view_paper_department_update view_paper_field_update_input' alt='".$row['department']."' value='".$row['department']."'/>
										<input id='3' class='view_paper_timestamp_update view_paper_field_update_input' alt='".$row['timestamp']."' value='".$row['timestamp']."'/>
									</span>
								</span>
							";
							$i++;
							$t++;
							$row_id++;
						}
					}else{$i++;}
				}
				
				echo "
						</div><!-- end field container -->
						</div><!-- end list container -->
						</div>
						<div id='view_paper_footer'>
							<div id='view_paper_footer_content'>
								<span id='view_paper_cancel'><input id='view_paper_cancel_button' type='button' value='Cancel'/></span>
								<span id='view_paper_update'><input id='view_paper_update_button' type='button' value='Update'/></span>
								<span id='view_paper_feedback'></span>
							</div>
						</div>
					</div>
				";
				
			break;
			case 'server':
			
			echo "
				<div id='view_server'>
					<div class='view_list_container'>
						<span id='loading'></span>
						<span id='view_server_categories'>
							<span id='view_server_category_name'>Name</span>
							<span id='view_server_category_model'>Model</span>
							<span id='view_server_category_hd'>HDD</span>
							<span id='view_server_category_ram'>RAM</span>
							<span id='view_server_category_os'>OS</span>
							<span id='view_server_category_version'>Version</span>
							<span id='view_server_category_ip'>IP</span>
						</span>
							<div class='view_field_container'>
			";
			while($i<=$numRows){
				$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'"));
				if(isset($row['id'])){
					if($row['id']==$i){
						$top = ($t*$height).'px';
						$id = $row['id'];
						
						/*
						$paper_replaced = $row['date'];
						if($paper_replaced == '2013-01-01' || $paper_replaced == '0000-00-00'){
							$paper_replaced = 'N/A';
						}						
						 */
						echo "
							<span class='view_server_field' style='top:$top' id='$id' row_id='$row_id'>
								<span id='0' class='view_server_name'>".$row['name']."</span>
								<span id='1' class='view_server_model'>".$row['model']."</span>
								<span id='2' class='view_server_hd'>".$row['hd']."</span>
								<span id='3' class='view_server_ram'>".$row['ram']."</span>
								<span id='4' class='view_server_os'>".$row['os']."</span>
								<span id='5' class='view_server_version'>".$row['version']."</span>
								<span id='6' class='view_server_ip'>".$row['ip']."</span>
								<span class='view_server_options'>
									<span class='view_server_options_remove'></span>
									<span class='view_server_options_update'></span>
								</span>
								<span class='view_server_field_update' id='$id'>
									<input id='0' class='view_server_name_update view_server_field_update_input' alt='".$row['name']."' value='".$row['name']."'/>
									<input id='1' class='view_server_model_update view_server_field_update_input' alt='".$row['model']."' value='".$row['model']."'/>
									<input id='2' class='view_server_hd_update view_server_field_update_input'  alt='".$row['hd']."' value='".$row['hd']."'/>
									<input id='3' class='view_server_ram_update view_server_field_update_input' alt='".$row['ram']."' value='".$row['ram']."'/>
									<input id='4' class='view_server_os_update view_server_field_update_input' alt='".$row['os']."' value='".$row['os']."'/>
									<input id='5' class='view_server_version_update view_server_field_update_input' alt='".$row['version']."' value='".$row['version']."'/>
									<input id='6' class='view_server_ip_update view_server_field_update_input' alt='".$row['ip']."' value='".$row['ip']."'/>
								</span>
							</span>
						";
						$i++;
						$t++;
						$row_id++;
					}
				}else{$i++;}
			}
			
			echo "
			</div> <!-- field container -->
			</div> <!-- list container -->
				</div>
				<div id='view_server_footer'>
					<div id='view_server_footer_content'>
						<span id='view_server_cancel'><input id='view_server_cancel_button' type='button' value='Cancel'/></span>
						<span id='view_server_update'><input id='view_server_update_button' type='button' value='Update'/></span>
						<span id='view_server_feedback'></span>
					</div>
				</div>
			</div>	
			";
				
			break;
			case 'accessory':
			
			echo "
				<div id='view_accessory'>
					<div id='view_accessory_body'>
						<span id='loading'></span>
						<span id='view_accessory_categories'>
							<span id='view_accessory_category_category'>Category</span>
							<span id='view_accessory_category_type'>Type</span>
							<span id='view_accessory_category_length'>Length</span>
							<span id='view_accessory_category_in_stock'>In Stock</span>
							<span id='view_accessory_category_in_use'>In Use</span>
							<span id='view_accessory_category_department'>Department</span>
						</span>
							<div class='view_list_container'>
							<div class='view_field_container'>
			";
				while($i<=$numRows){
					$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'"));
					if(isset($row['id'])){
						if($row['id']==$i){
							$top = ($t*$height).'px';
							$id = $row['id'];
//							$paper_replaced = $row['timestamp'];
/*							if($paper_replaced == '2013-01-01' || $paper_replaced == '0000-00-00'){
								$paper_replaced = 'N/A';
							}
 */
							echo "
								<span class='view_accessory_field' style='top:$top' id='$id' row_id='$row_id'>
									<span id='0' class='view_accessory_category'>".$row['category']."</span>
									<span id='1' class='view_accessory_type'>".$row['type']."</span>
									<span id='2' class='view_accessory_length'>".$row['length']."</span>
									<span id='3' class='view_accessory_in_stock'>".$row['in_stock']."</span>
									<span id='4' class='view_accessory_in_use'>".$row['in_use']."</span>
									<span class='view_accessory_options'>
										<span class='view_accessory_options_remove'></span>
										<span class='view_accessory_options_update'></span>
									</span>						
									<span class='view_accessory_field_update' id='$id'>
										<input id='0' class='view_accessory_category_update view_accessory_field_update_input' alt='".$row['category']."' value='".$row['category']."'/>
										<input id='1' class='view_accessory_type_update view_accessory_field_update_input' alt='".$row['type']."' value='".$row['type']."'/>
										<input id='2' class='view_accessory_length_update view_accessory_field_update_input' alt='".$row['length']."' value='".$row['length']."'/>
										<input id='3' class='view_accessory_in_stock_update view_accessory_field_update_input' alt='".$row['in_stock']."' value='".$row['in_stock']."'/>
										<input id='4' class='view_accessory_in_use_update view_accessory_field_update_input' alt='".$row['in_use']."' value='".$row['in_use']."'/>
									</span>
								</span>
							";
							$i++;
							$t++;
							$row_id++;
						}
					}else{$i++;}
				}
				echo "
					</div> <!-- field container -->
					</div> <!-- list container -->
					</div>
					<div id='view_accessory_footer'>
						<div id='view_accessory_footer_content'>
							<span id='view_accessory_cancel'><input id='view_accessory_cancel_button' type='button' value='Cancel'/></span>
							<span id='view_accessory_update'><input id='view_accessory_update_button' type='button' value='Update'/></span>
							<span id='view_accessory_feedback'></span>
						</div>
					</div>
				</div>
				";
			break;
			case 'workstation':
			echo "
				<div id='view_workstation'>
					<div class='view_list_container'>
						<span id='loading'></span>
						<span id='view_workstation_categories'>
							<span id='view_workstation_category_name'>Name</span>
							<span id='view_workstation_category_model'>Model</span>
							<span id='view_workstation_category_hd'>HD</span>
							<span id='view_workstation_category_ram'>RAM</span>
							<span id='view_workstation_category_version'>Version</span>
							<span id='view_workstation_category_ip'>IP</span>
							<span id='view_workstation_category_user'>User</span>
							<span id='view_workstation_category_extension'>Extension</span>
							<span id='view_workstation_category_date'>Date</span>
						</span>
							<div class='view_field_container'>
			
			";
				while($i<=$numRows){ // loop through all rows
					$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'"));
					if(isset($row['id'])){
						if($row['id']==$i){
							$top = ($t*$height).'px';
							$id = $row['id'];
							/*
							$paper_replaced = $row['timestamp'];
							if($paper_replaced == '2013-01-01' || $paper_replaced == '0000-00-00'){
								$paper_replaced = 'N/A';
							}
							 */
							echo "
								<span class='view_workstation_field' style='top:$top' id='$id' row_id='$row_id'>
									<span id='0' class='view_workstation_name'>".$row['name']."</span>
									<span id='1' class='view_workstation_model'>".$row['model']."</span>
									<span id='2' class='view_workstation_hd'>".$row['hd']."</span>
									<span id='3' class='view_workstation_ram'>".$row['ram']."</span>
									<span id='4' class='view_workstation_version'>".$row['version']."</span>
									<span id='5' class='view_workstation_ip'>".$row['ip']."</span>
									<span id='6' class='view_workstation_user'>".$row['user']."</span>
									<span id='7' class='view_workstation_extension'>".$row['extension']."</span>
									<span id='8' class='view_workstation_date'>".$row['date']."</span>
									<span class='view_workstation_options'>
										<span class='view_workstation_options_remove'></span>
										<span class='view_workstation_options_update'></span>
									</span>						
									<span class='view_workstation_field_update' id='$id'>
										<input id='0' class='view_workstation_name_update view_workstation_field_update_input' alt='".$row['name']."' value='".$row['name']."'/>
										<input id='1' class='view_workstation_model_update view_workstation_field_update_input' alt='".$row['model']."' value='".$row['model']."'/>
										<input id='2' class='view_workstation_hd_update view_workstation_field_update_input' alt='".$row['hd']."' value='".$row['hd']."'/>
										<input id='3' class='view_workstation_ram_update view_workstation_field_update_input' alt='".$row['ram']."' value='".$row['ram']."'/>
										<input id='4' class='view_workstation_version_update view_workstation_field_update_input' alt='".$row['version']."' value='".$row['version']."'/>
										<input id='5' class='view_workstation_ip_update view_workstation_field_update_input' alt='".$row['ip']."' value='".$row['ip']."'/>
										<input id='6' class='view_workstation_user_update view_workstation_field_update_input' alt='".$row['user']."' value='".$row['user']."'/>
										<input id='7' class='view_workstation_extension_update view_workstation_field_update_input' alt='".$row['extension']."' value='".$row['extension']."'/>
										<input id='8' class='view_workstation_date_update view_workstation_field_update_input' alt='".$row['date']."' value='".$row['date']."'/>
									</span>
								</span>
							";
							$i++;
							$t++;
							$row_id++;
						}
					}else{$i++;}
				}
				echo "
				</div> <!-- field container -->
				</div> <!-- list container -->
				</div>
					<div id='view_workstation_footer'>
						<div id='view_workstation_footer_content'>
							<span id='view_workstation_cancel'><input id='view_workstation_cancel_button' type='button' value='Cancel'/></span>
							<span id='view_workstation_update'><input id='view_workstation_update_button' type='button' value='Update'/></span>
							<span id='view_workstation_feedback'></span>
						</div>
					</div>
				</div>
				";
			break;		
			case 'software':
			echo "
				<div id='view_software'>
					<div class='view_list_container'>
						<span id='loading'></span>
						<span id='view_software_categories'>
							<!-- the following COULD become classes, and use a switch statement to get values for filters, but it would almost be nonsensical at this point. Just something to think about. -->
							<span id='view_software_category_model'>Model</span>
							<span id='view_software_category_toner'>Toner</span>
							<span id='view_software_category_ip'>IP</span>
							<span id='view_software_category_drum'>Drum</span>
							<span id='view_software_category_toner_replaced'>Toner Replaced</span>
							<span id='view_software_category_drum_replaced'>Drum Replaced</span>
						</span>
							<div class='view_field_container'>
			
			";
				while($i<=$numRows){
					$row = mysql_fetch_assoc(mysql_query("SELECT * FROM ".$category." WHERE id='$i'"));
					if(isset($row['id'])){
						if($row['id']==$i){
							$top = ($t*$height).'px';
							$id = $row['id'];
							$paper_replaced = $row['timestamp'];
							if($paper_replaced == '2013-01-01' || $paper_replaced == '0000-00-00'){
								$paper_replaced = 'N/A';
							}
							echo "
								<span class='view_software_field' style='top:$top' id='$id' row_id='$row_id'><!-- Top is styled in-line dynamically. -->
									<span id='0' class='view_software_type'>".$row['type']."</span>
									<span id='1' class='view_software_name'>".$row['name']."</span>
									<span id='2' class='view_software_version'>".$row['version']."</span>
									<span id='3' class='view_software_keys'>".$row['keys']."</span>
									<span id='4' class='view_software_department'>".$row['department']."</span>
									<span id='5' class='view_software_restriction'>".$row['restriction']."</span>
									<span id='6' class='view_software_location'>".$row['location']."</span>
									<span id='7' class='view_software_note'>".$row['note']."</span>
									<span id='8' class='view_software_arch'>".$row['arch']."</span>
									<span class='view_software_options'>
										<span class='view_software_options_remove'></span>
										<span class='view_software_options_update'></span>
									</span>						
									<span class='view_software_field_update' id='$id'>
										<input id='0' class='view_software_type_update view_software_field_update_input' alt='".$row['type']."' value='".$row['type']."'/>
										<input id='1' class='view_software_name_update view_software_field_update_input' alt='".$row['update']."' value='".$row['update']."'/>
										<input id='2' class='view_software_version_update' alt='".$row['version']."' value='".$row['version']."'/>
										<input id='3' class='view_software_keys_update view_software_field_update_input' alt='".$row['keys']."' value='".$row['keys']."'/>
										<input id='4' class='view_software_department_update view_software_field_update_input' alt='".$row['department']."' value='".$row['department']."'/>
										<input id='5' class='view_software_restriction_update view_software_field_update_input' alt='".$row['restriction']."' value='".$row['restriction']."'/>
										<input id='6' class='view_software_location_update view_software_field_update_input' alt='".$row['location']."' value='".$row['location']."'/>
										<input id='7' class='view_software_note_update view_software_field_update_input' alt='".$row['note']."' value='".$row['note']."'/>
										<input id='8' class='view_software_arch_update view_software_field_update_input' alt='".$row['arch']."' value='".$row['arch']."'/>
									</span>
								</span>
							";
							$i++;
							$t++;
							$row_id++;
						}
					}else{$i++;}
				}
				echo "
					</div> <!-- field container -->
					</div> <!-- list container -->
					</div>
					<div id='view_software_footer'>
						<div id='view_software_footer_content'>
							<span id='view_software_cancel'><input id='view_software_cancel_button' type='button' value='Cancel'/></span>
							<span id='view_software_update'><input id='view_software_update_button' type='button' value='Update'/></span>
							<span id='view_software_feedback'></span>
						</div>
					</div>
				</div>
				";
			break;
		}
		echo "</div>"; // break the view_list_container div
	}
}
?>
