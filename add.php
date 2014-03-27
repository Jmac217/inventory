<html>
<script type='text/javascript' src='js/add.js'></script>
</html>
<?php // no connection

// try throwing the script inclusions from index.php into the bottom of the body. I don't think it works.

if (!isset($_POST['category'])||strtolower($_POST['category'])=='printer'){

	echo "
	<!-- Printer -->
	<div id='add_printer'>
		<div id='add_printer_body'>
			<span id='toner_replaced_feedback'>Toner Replacement Date</span>
			<span id='drum_replaced_feedback'>Drum Replacement Date</span>
			<div id='add_printer_form'>
			<!-- include as a class -->
			<!-- 
		 
				suedo js:
					$(this).load('category'.'date_selector');

			-->
				<span class='add_printer_field' id='0'> <!-- This could turn out to be a problem, results looks like exponential growth -->
					<input type='text' class='add_printer_model input' alt='Model' value='Model' maxlength='44'/>
					<input type='text' class='add_printer_name input' alt='Name' value='Name' maxlength='44'/>
					<input type='text' class='add_printer_network input' alt='Network' value='Network' maxlength='44'/>
					<input type='text' class='add_printer_branch input' alt='Branch' value='Branch' maxlength='44'/>
					<input type='text' class='add_printer_desk input' alt='Desk' value='Desk' maxlength='44'/>
					<input type='text' class='add_printer_ip special_input' alt='10.0.0.' value='10.0.0.' maxlength='15'/>
					<input type='text' class='add_printer_toner_type input' alt='Toner Type' value='Toner Type'/>
					<input type='text' class='add_printer_drum_type input' alt='Drum Type' value='Drum Type'/>
					<input type='text' class='add_printer_toner_amount input' alt='Toner Amount' value='Toner Amount'/>
					<input type='text' class='add_printer_drum_amount input' alt='Drum Amount' value='Drum Amount'/>
					<!-- the following will be a function of classes to be called in-place of the recurring sets throughout this file -->
					<span class='add_printer_toner_replaced'>
						<select class='add_printer_toner_replaced_month toner_replaced_hover'>
							<option value='01'>Jan</option>
							<option value='02'>Feb</option>
							<option value='03'>Mar</option>
							<option value='04'>Apr</option>
							<option value='05'>May</option>
							<option value='06'>Jun</option>
							<option value='07'>Jul</option>
							<option value='08'>Aug</option>
							<option value='09'>Sep</option>
							<option value='10'>Oct</option>
							<option value='11'>Nov</option>
							<option value='12'>Dec</option>
						</select>
						<select class='add_printer_toner_replaced_day toner_replaced_hover'>
							<option>01</option>
							<option>02</option>
							<option>03</option>
							<option>04</option>
							<option>05</option>
							<option>06</option>
							<option>07</option>
							<option>08</option>
							<option>09</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
							<option>13</option>
							<option>14</option>
							<option>15</option>
							<option>16</option>
							<option>17</option>
							<option>18</option>
							<option>19</option>
							<option>20</option>
							<option>21</option>
							<option>22</option>
							<option>23</option>
							<option>24</option>
							<option>25</option>
							<option>26</option>
							<option>27</option>
							<option>28</option>
							<option>29</option>
							<option>30</option>
							<option>31</option>
						</select>
						<select class='add_printer_toner_replaced_year toner_replaced_hover'>
							<option value='2013'>13</option>
							<option value='2014'>14</option>
						</select>
					</span>
					<span class='add_printer_drum_replaced'>
						<select class='add_printer_drum_replaced_month drum_replaced_hover'>
							<option value='01'>Jan</option>
							<option value='02'>Feb</option>
							<option value='03'>Mar</option>
							<option value='04'>Apr</option>
							<option value='05'>May</option>
							<option value='06'>Jun</option>
							<option value='07'>Jul</option>
							<option value='08'>Aug</option>
							<option value='09'>Sep</option>
							<option value='10'>Oct</option>
							<option value='11'>Nov</option>
							<option value='12'>Dec</option>
						</select>
						<select class='add_printer_drum_replaced_day drum_replaced_hover'>
							<option>01</option>
							<option>02</option>
							<option>03</option>
							<option>04</option>
							<option>05</option>
							<option>06</option>
							<option>07</option>
							<option>08</option>
							<option>09</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
							<option>13</option>
							<option>14</option>
							<option>15</option>
							<option>16</option>
							<option>17</option>
							<option>18</option>
							<option>19</option>
							<option>20</option>
							<option>21</option>
							<option>22</option>
							<option>23</option>
							<option>24</option>
							<option>25</option>
							<option>26</option>
							<option>27</option>
							<option>28</option>
							<option>29</option>
							<option>30</option>
							<option>31</option>
						</select>
						<select class='add_printer_drum_replaced_year drum_replaced_hover'>
							<option value='2013'>13</option>
							<option value='2014'>14</option>
						</select>
					</span>
					<input type='text' class='add_printer_printer_amount input' alt='Printer Amount' value='Printer Amount' maxlength='44'/>
					<input type='text' class='add_printer_maintenance_date input' alt='Maintenance Date' value='Maintenance Date' maxlength='44'/>
				</span>	
			</div><!--/.add_printer_field-->
			<div id='add_printer_form_clones'></div>
		</div>
		<div class='footer'>
			<div class='footer_add'>
				<div id='add_printer_footer'>
					<div id='add_printer_footer_content'>
						<span id='add_printer_forms_number_description'>Add a custom number of forms: </span><input type='text' id='add_printer_forms_number' value='1' maxlength='2' max='16'/>
						<span id='add_printer_field_button'></span>
						<input type='button' class='add_submit' id='add_printer_submit' value='submit' />
						<span id='add_printer_feedback'></span>
						<span id='version'>";include'php/version.php';echo"</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- End Printer -->
	";
	}else{
	
		$page = strtolower($_POST['category']);
		
		switch ($page){
		
			case 'paper':
				// paper
				echo"
				<!-- Paper -->
				<div id='add_paper'>
					<div id='add_paper_body'>
						<span id='paper_replaced_feedback'>paper Replacement Date</span>
						<div id='add_paper_form'>
							<span class='add_paper_field' id='0'> <!-- This could turn out to be a problem, it looks like exponential growth -->
								<input type='text' class='add_paper_type input' alt='Type' value='Type' maxlength='44'/>
								<input type='text' class='add_paper_stock input' alt='Stock' value='Stock'/>
								<input type='text' class='add_paper_department input' alt='Department' value='Department'/>
								<select class='add_paper_replaced_month paper_replaced_hover'>
									<option value='01'>Jan</option>
									<option value='02'>Feb</option>
									<option value='03'>Mar</option>
									<option value='04'>Apr</option>
									<option value='05'>May</option>
									<option value='06'>Jun</option>
									<option value='07'>Jul</option>
									<option value='08'>Aug</option>
									<option value='09'>Sep</option>
									<option value='10'>Oct</option>
									<option value='11'>Nov</option>
									<option value='12'>Dec</option>
								</select>
								<select class='add_paper_replaced_day paper_replaced_hover'>
									<option>01</option>
									<option>02</option>
									<option>03</option>
									<option>04</option>
									<option>05</option>
									<option>06</option>
									<option>07</option>
									<option>08</option>
									<option>09</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
									<option>25</option>
									<option>26</option>
									<option>27</option>
									<option>28</option>
									<option>29</option>
									<option>30</option>
									<option>31</option>
								</select>
								<select class='add_paper_replaced_year paper_replaced_hover'><option value='2013'>13</option></select>					
							</span>	
						</div>
						<div id='add_paper_form_clones'></div>
					</div>
					<div id='add_paper_footer'>
						<div id='add_paper_footer_content'>
							<span id='add_paper_forms_number_description'>Add a custom number of forms: </span><input type='text' id='add_paper_forms_number' value='1' maxlength='2' max='16'/>
							<span id='add_paper_field_button'></span>
							<input type='button' class='add_submit' id='add_paper_submit' value='submit' />
							<span id='add_paper_feedback'></span>
							<span id='version'>";include'php/version.php';echo"</span>
						</div>
					</div>
				</div>
				<!-- End Paper -->
				";
			break;
			
			case 'workstation':
				// workstations
				echo"
				<!-- Workstations -->
				<div id='add_workstation'>
					<div id='add_workstation_body'>
						<span id='workstation_replaced_feedback'>paper Replacement Date</span>
						<div id='add_workstation_form'>
							<span class='add_workstation_field' id='0'> <!-- This could turn out to be a problem, it looks like exponential growth -->
								<input type='text' class='add_workstation_name input' alt='Name' value='Name' maxlength='44'/>
								<input type='text' class='add_workstation_model input' alt='Model' value='Model'/>
								<input type='text' class='add_workstation_hd input' alt='HDD' value='HDD'/>
								<input type='text' class='add_workstation_ram input' alt='RAM' value='RAM'/>
								<input type='text' class='add_workstation_version input' alt='Version' value='Version'/>
								<input type='text' class='add_workstation_ip special_input' alt='10.0.0.' value='10.0.0.' maxlength='15'/>		
								<input type='text' class='add_workstation_user input' alt='User' value='User'/>
								<input type='text' class='add_workstation_extension input' alt='Extension' value='Extension'/>
								<select class='add_workstation_replaced_month workstation_replaced_hover'>
									<option value='01'>Jan</option>
									<option value='02'>Feb</option>
									<option value='03'>Mar</option>
									<option value='04'>Apr</option>
									<option value='05'>May</option>
									<option value='06'>Jun</option>
									<option value='07'>Jul</option>
									<option value='08'>Aug</option>
									<option value='09'>Sep</option>
									<option value='10'>Oct</option>
									<option value='11'>Nov</option>
									<option value='12'>Dec</option>
								</select>
								<select class='add_workstation_replaced_day workstation_replaced_hover'>
									<option>01</option>
									<option>02</option>
									<option>03</option>
									<option>04</option>
									<option>05</option>
									<option>06</option>
									<option>07</option>
									<option>08</option>
									<option>09</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
									<option>25</option>
									<option>26</option>
									<option>27</option>
									<option>28</option>
									<option>29</option>
									<option>30</option>
									<option>31</option>
								</select>
								<select class='add_workstation_replaced_year paper_replaced_hover'><option value='2013'>13</option></select>					
							</span>	
						</div>
						<div id='add_workstation_form_clones'></div>
					</div>
					<div id='add_workstation_footer'>
						<div id='add_workstation_footer_content'>
							<span id='add_workstation_forms_number_description'>Add a custom number of forms: </span><input type='text' id='add_workstation_forms_number' value='1' maxlength='2' max='16'/>
							<span id='add_workstation_field_button'></span>
							<input type='button' class='add_submit' id='add_workstation_submit' value='submit' />
							<span id='add_workstation_feedback'></span>
							<span id='version'>";include'php/version.php';echo"</span>
						</div>
					</div>
				</div>
				<!-- End Paper -->
				";
			break;
			
			case 'server':
				// servers
				echo"
				<!-- Servers -->
				<div id='add_server'>
					<div id='add_server_body'>
						<span id='server_replaced_feedback'>server Replacement Date</span>
						<div id='add_server_form'>
							<span class='add_server_field' id='0'> <!-- This could turn out to be a problem, it looks like exponential growth -->
								<input type='text' class='add_server_name input' alt='Name' value='Name' maxlength='44'/>
								<input type='text' class='add_server_model input' alt='Model' value='Model'/>
								<input type='text' class='add_server_hd input' alt='HDD' value='HDD'/>
								<input type='text' class='add_server_ip special_input' alt='10.0.0.' value='10.0.0.' maxlength='15'/>
								<input type='text' class='add_server_ram input' alt='RAM' value='RAM'/>
								<input type='text' class='add_server_os input' alt='OS' value='OS'/>
								<input type='text' class='add_server_version input' alt='Version' value='Version'/>
								<select class='add_server_replaced_month server_replaced_hover'>
									<option value='01'>Jan</option>
									<option value='02'>Feb</option>
									<option value='03'>Mar</option>
									<option value='04'>Apr</option>
									<option value='05'>May</option>
									<option value='06'>Jun</option>
									<option value='07'>Jul</option>
									<option value='08'>Aug</option>
									<option value='09'>Sep</option>
									<option value='10'>Oct</option>
									<option value='11'>Nov</option>
									<option value='12'>Dec</option>
								</select>
								<select class='add_server_replaced_day server_replaced_hover'>
									<option>01</option>
									<option>02</option>
									<option>03</option>
									<option>04</option>
									<option>05</option>
									<option>06</option>
									<option>07</option>
									<option>08</option>
									<option>09</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
									<option>25</option>
									<option>26</option>
									<option>27</option>
									<option>28</option>
									<option>29</option>
									<option>30</option>
									<option>31</option>
								</select>
								<select class='add_server_replaced_year server_replaced_hover'><option value='2013'>13</option></select>					
							</span>	
						</div>
						<div id='add_server_form_clones'></div>
					</div>
					<div id='add_server_footer'>
						<div id='add_server_footer_content'>
							<span id='add_server_forms_number_description'>Add a custom number of forms: </span><input type='text' id='add_server_forms_number' value='1' maxlength='2' max='16'/>
							<span id='add_server_field_button'></span>
							<input type='button' class='add_submit' id='add_server_submit' value='submit' />
							<span id='add_server_feedback'></span>
							<span id='version'>";include'php/version.php';echo"</span>
						</div>
					</div>
				</div>
				<!-- End Paper -->
				";
			break;

			case 'accessory':
				// accessories
				echo"
				<div id='add_accessory'>
					<div id='add_accessory_body'>
						<span id='accessory_replaced_feedback'>accessory Replacement Date</span>
						<div id='add_accessory_form'>
							<span class='add_accessory_field' id='0'> <!-- This could turn out to be a problem, it looks like exponential growth -->
								<input type='text' class='add_accessory_category input' alt='Category' value='Category' maxlength='44'/>
								<input type='text' class='add_accessory_type input' alt='Type' value='Type'/>
								<input type='text' class='add_accessory_length input' alt='Length' value='Length'/>
								<input type='text' class='add_accessory_in_stock input' alt='In_Stock' value='In_Stock'/>
								<input type='text' class='add_accessory_in_use input' alt='In_Use' value='In_Use'/>
								<select class='add_accessory_replaced_month accessory_replaced_hover'>
									<option value='01'>Jan</option>
									<option value='02'>Feb</option>
									<option value='03'>Mar</option>
									<option value='04'>Apr</option>
									<option value='05'>May</option>
									<option value='06'>Jun</option>
									<option value='07'>Jul</option>
									<option value='08'>Aug</option>
									<option value='09'>Sep</option>
									<option value='10'>Oct</option>
									<option value='11'>Nov</option>
									<option value='12'>Dec</option>
								</select>
								<select class='add_accessory_replaced_day paper_replaced_hover'>
									<option>01</option>
									<option>02</option>
									<option>03</option>
									<option>04</option>
									<option>05</option>
									<option>06</option>
									<option>07</option>
									<option>08</option>
									<option>09</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
									<option>25</option>
									<option>26</option>
									<option>27</option>
									<option>28</option>
									<option>29</option>
									<option>30</option>
									<option>31</option>
								</select>
								<select class='add_accessory_replaced_year accessory_replaced_hover'><option value='2013'>13</option></select>					
							</span>	
						</div>
						<div id='add_accessory_form_clones'></div>
					</div>
					<div id='add_accessory_footer'>
						<div id='add_accessory_footer_content'>
							<span id='add_accessory_forms_number_description'>Add a custom number of forms: </span><input type='text' id='add_accessory_forms_number' value='1' maxlength='2' max='16'/>
							<span id='add_accessory_field_button'></span>
							<input type='button' class='add_submit' id='add_accessory_submit' value='submit' />
							<span id='add_accessory_feedback'></span>
							<span id='version'>";include'php/version.php';echo"</span>
						</div>
					</div>
				</div>
				<!-- End Paper -->
				";
			break;
		
			default:
				//other
				echo "There was an error: ROW[] has been set (back) to '".$_POST['category']."'";
			break;
		}
	}
