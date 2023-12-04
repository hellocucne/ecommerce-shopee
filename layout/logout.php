<?php 
ob_start();
session_start();
include ('./core/database.php');
unset($_SESSION['user']);
header("location: ".BASE_URL.'login.php'); 
?>