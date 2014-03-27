<html>
<!-- It should be possible to actually change this filetype to HTML after a while -->
<head>
<link rel='stylesheet' type='text/css' href='css/index.css' />
<!--<link rel='stylesheet' type='text/css' href='css/headers.css' />-->
<link rel='stylesheet' type='text/css' href='css/pages.css' />
<link rel='shortcut icon' href='res/picon.png' />
<script type='text/javascript' src='js/jquery.js'></script>
<title>Inventory System</title>
</head>
<body>
<div id='doc'>
	<div id='header'><!-- haven't needed a css value for this yet -->
		<div id='tabs'>
		<!-- new headersetter for JS -->
		<!--
			<div id='tab_view'>
				<div class='add_tab'></div>
				<div class='view_tab'></div>
			</div>
		-->
		<?php include 'php/headerSetter.php'; ?>
		</div>
		<span id='search'>
			<input type='text' id='search_field' class='input' value='Search...' alt='Search...'/>
			<span id='search_drop'>
				<?php include 'php/search.php'; ?>
			</span>
		</span>
		<span id='title_drop'>
			<span id='title'>Inventory</span>
			<span id='title_drop_button'></span>
			<span id='title_area'>
				<span id='title_drop_menu'>
					<!-- This will probably be generated by PHP -->
					<span class='title_drop_field' id='printers'>Printer</span>
					<span class='title_drop_field' id='accessories'>Accessory</span>
					<span class='title_drop_field' id='workstations'>Workstation</span>
					<span class='title_drop_field' id='servers'>Server</span>
					<span class='title_drop_field' id='paper'>Paper</span>
				</span>
			</span>
		</span>
	</div><!-- end header -->

	<div id='body'>
		<div id='loading_tab'></div>
		<div id='add'>
		<div id='add_window'></div>
			<?php include 'add.php'; ?>
		</div>
		<div id='view'></div>
		<div id='panel'>
			<div id='panel_settings'></div>
			<div id='panel_login'></div>
		</div>
		<?php include 'php/known_issues.php'; ?><!-- This will only be here during the beta -->
	</div><!-- end body -->
	<!--
	<div class='footer'>
		<div clas='footer_add'></div>
		<div class='footer_view'></div>
	</div>
	-->
</div>
<!--<span id='author'><span id='author_name'></span></span>-->
<script type='text/javascript' src='js/functions.js'></script>
<script type='text/javascript' src='js/index.js'></script>
</body>
</html>
