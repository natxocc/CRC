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
// if ($_SERVER['HTTP_REFERER'] == 'http://localhost:8080/') {
// if ($_SERVER['SERVER_NAME'] == 'http://localhost:8080/') {
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
// }
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

require_once "class-db.php";
$db = new db(DBTYPE, DBHOST, DBNAME, DBUSER, DBPASS);

// Consultas Reale
if ($cmd == "updateRecibos") $db->updateRecibos();
if ($cmd == "updatePolizas") $db->updatePolizas();
if ($cmd == "polizasMediador") $db->polizasMediador();
if ($cmd == "getRecibos") $db->getRecibos($post);
if ($cmd == "reportUrgents") $db->reportUrgents($post);

// Consultas db
if ($cmd == "login") $db->login($post);
// Comprueba si está conectado
// ---------------INICIO
// Comentar durante el desarrollo
//if (!$db->isLogged($post)) exit("Usuario no conectado");
// FIN DE BLOQUE
// ---------------FIN
// Resto de consultas
if ($cmd == "logout") $db->logout();
if ($cmd == "createUser") $db->createUser($post);
if ($cmd == "getUser") $db->getUser($post);
if ($cmd == "sendMail") $db->sendMail($post);
if ($cmd == "addEvent") $db->addEvent($post);
if ($cmd == "getRecords") $db->getRecords($post);
if ($cmd == "updateRecord") $db->updateRecord($post);
if ($cmd == "deleteRecord") $db->deleteRecord($post);
if ($cmd == "insertRecord") $db->insertRecord($post);
exit();