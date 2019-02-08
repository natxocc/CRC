<?php
// Define el Token
define('SECURITY_TOKEN', 'Ntx');
define("DBTYPE", "mysql");
define("DBHOST", "localhost");
define("DBNAME", "Reale");
define("DBUSER", "root");
define("DBPASS", "noabril");
// Inicia la sesion
session_start();
header("Content-Type: application/json;charset=utf-8");
// ---------------INICIO
// Esta parte a eliminar en produccion
error_reporting(E_ALL);
ini_set("display_errors", 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
// FIN DE BLOQUE
// ---------------FIN
// Captura los datos enviados
$data = json_decode(file_get_contents("php://input"), true);
$REQUEST = $_REQUEST;
if ($data) {
    $REQUEST = $data;
}
if (!$REQUEST) exit('Sin Datos');
$coma = $cmd = "";
foreach ($REQUEST as $key => $value) {
    $post[$key] = $value;
}
$cmd = $post['cmd'];

// Call class db
require_once "class-db.php";
$db = new db(DBTYPE, DBHOST, DBNAME, DBUSER, DBPASS);
// Consultas Reale
require_once "class-reale.php";
$reale = new reale();
if ($cmd == "updateRecibos") $reale->updateRecibos();
if ($cmd == "updatePolizas") $reale->updatePolizas();
if ($cmd == "reportRecibos") $reale->reportRecibos($post);

// Consultas db
if ($cmd == "login") $db->login($post);
// Comprueba si está conectado
// ---------------INICIO
// Comentar durante el desarrollo
//if (!$db->isLogged($post)) exit("Usuario no conectado");
// FIN DE BLOQUE
// ---------------FIN
// Resto de consultas
if ($cmd == "isLogged") $db->isLogged($post);
if ($cmd == "logout") $db->logout($post);
if ($cmd == "sendMail") $db->sendMail($post);
if ($cmd == "getRecords") $db->getRecords($post);
if ($cmd == "updateRecord") $db->updateRecord($post);
if ($cmd == "deleteRecord") $db->deleteRecord($post);
if ($cmd == "insertRecord") $db->insertRecord($post);
exit();