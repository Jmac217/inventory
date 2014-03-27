<?php

echo '
	<span id="list_known_issues">Known Issues</span>
	
	<div id="known_issues">
		<br />
		<h1>&nbsp&nbsp&nbspKnown Issues</h1>
		<br />
		<ul style="list-style-type:none">
			<li><h4>In Printers</h4></li><br />
			<li>Filters exist, and have functions in view_printer_list.php, but do not currently sort results as expected.</li><br />
			<li>&nbsp&nbsp&nbsp&nbsp - IP Filter has been hard coded.</li><br />
			<li>&nbsp&nbsp&nbsp&nbsp -- Cannot view IPs of 10.0.0.0*, only between 10.0.0.10 and 10.0.0.999... It\'s because of the hard coded loop, but it\'s no big deal because we don\'t have printers that low.</li><br />
			<li>Mysql Search should be given a regular expression to search for all endings of existing words with the given characters, instead of requiring the full value of the field. (ex. Brother* instead of Brother-123a)</li><br />
			<li><h4>Other</h4></li><br />
			<li>When cloned, the original input fields\'s values will be passed down to it\'s clones.</li><br />
			<li>View fields, though they work, are out of alignment.</li><br />
			<li>View is still visible when selecting another category from the dropdown menu.</li><br />
			<li>Blank fields are not selectable, they will not be possible in a few releases, but for now it\'s annoying.</li><br />
			<li>Empty view tables will throw errors when calling JSON, there should be a check in-place to resolve this issue.</li><br />
			<li><a href="TODO.txt" style="color:black; text-decoration:underline;">Read TODO for more information</a></li><br />
		</ul>
	</div>
	<a id="known_issues_return">Return</a>
';

?>
