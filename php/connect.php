<?php
date_default_timezone_set("America/Chicago");// this should be moved to the individual files that actually need it, because there are many more files that do not use this that are still including this file. Files that use this are only logs.
mysql_connect('localhost', 'root', '');
mysql_select_db('inventory');
?>