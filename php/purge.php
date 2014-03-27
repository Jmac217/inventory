<?php include 'connect.php';

// Purge all databases relative to Printers

// THIS FILE IS DANGEROUS IN PRODUCTION!!!!!
// DO NOT USE UNLESS YOU MEAN TO DELETE ALL DATA FROM EVERY TABLE!!!!!

/*
mysql_query("TRUNCATE TABLE printer");
mysql_query("TRUNCATE TABLE toner_amount");
mysql_query("TRUNCATE TABLE drum_amount");
*/

?>