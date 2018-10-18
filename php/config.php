<?php
DEFINE("DB_SERVER", "localhost");
DEFINE("DB_USERNAME", "root");
DEFINE("DB_PASSWORD", "");
DEFINE("DB_DATABASE", "mamma_bilder");
// Create connection
$conn = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE, 3307);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql_main = "SET NAMES 'utf8'";

$sql_second ="CHARSET 'utf8'";

$result = $conn->query($sql_main);

$result = $conn->query($sql_second);
?>