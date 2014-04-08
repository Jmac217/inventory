Beta

	I'm in beta right now, just testing it myself really doesn't feel like much of a beta, but it is what it is, since other people *can* use it.
	
	Create users - panel, login area, settings area

	Optimize code for custom databases! *This is the kicker for 3.0*
		this will generate custom SQL for database creation.

	I was thinking about the implementation of custom databases and decided that there will be a `global` style database
		The database will be called 'databases', nice and simple.
			Each database will contain global information about the table
			id, name, columns(, ...) => submit to table creation
			(generate columns set)
			take filled forms to generate table columns

Structure
	
	Javascript
	index: sets global
	tabs: sets up header
	add: handles default view; completely client-side
	view: loads on tabs.tab.click depending on global; completely server-side
	
	PHP
	index: calls everything, as usual
	view_list: is located in php/ and needs to to be renamed to ../view.php
	add_pages: needs to be renamed to add.php

Future Implementations

	I intend on version 3 having some legit features including: users with settings and restrictions, customized categories, export/import/convert SQL/XML/JSON, Email alerts for certain variable values, stand-alone package for offline mode - Qt wrapper with JSON/XML database.

Documentations

	Users:
		This inventory system aims to allow you to keep tabs on your inventory supply.
		By clicking the downward arrow next to "Inventory" at the top right, you can select the appropriate category.
		From there you will be taken to a page that will allow you to add more information to the database, or you can select the view tab on the top left.
		The view tab shows you all of the information for the selected database, clicking on a field will allow you to edit the information.
		When you edit the field you will notice the appearance of two buttons in the bottom right: Update, and Cancel.
		By hovering over a row you'll see two buttons pop up at the end. The first is an update button, and the next is the removal button.
		These buttons will only act on the according row. Update will tag each column in the row to be edited, while remove will remove the entire row.
		If, by chance, you remove/edit/insert the wrong row you can check txt/log.txt for information on each query. This gives you some wiggle room for any life-threatening issues you may come up against.

	Development:
		This file is where I'm going to try and keep everything, but I've recreated this type of file a few times now.
		I've kept a back-log of everything I've put into these todo type files if you want to go through it, I promise you it's a mess.
		I have tried to keep comments up-to-date and frequent. There is no 'proper' documentation just yet, though there is documentation material scattered all throughout these files.
		I will go through and compile everything eventually, but for now you can start here.

Outline (badly outdated)

	file count: 21 files | +/- a few if they're not used
	meta : pages.css | headers.css
	main : index.php | index.css | index.js => category variable set
	js : add.js | view.js
	included : connect.php
	php : getCols.php | getRows.php | headerSetter.php | checkIP.php |  uploadXML.php | updateXML.php | view_list.php(../view.php)
	get : add_pages.php(add.php) | view_list.php(view.php)
	set : updateXML.php | uploadXML.php