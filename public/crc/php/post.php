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
if ($cmd == "logout") $db->logout($post);
if ($cmd == "checkUser") $db->checkUser($post);
// Comprueba si está conectado
//if (!$db->isLogged($post)) exit("Error Auth");
$_SESSION['tables'][$post['table']] = 3; // PROVISIONAL PARA SALTAR LA SEGURIDAD
// Resto de consultas
if ($cmd == "sendMail") $db->sendMail($post);
$result['success'] = false;
$resulta= false;
if (isset($_SESSION['tables'][$post['table']])) {
    if ($_SESSION['tables'][$post['table']] > 0) {
        if ($cmd == "getRecords") $result = $db->getRecords($post);
    }
    if ($_SESSION['tables'][$post['table']] > 1) {
        if ($cmd == "updateRecord") $resulta = $db->updateRecord($post);
        if ($cmd == "insertRecord") $resulta = $db->insertRecord($post);
    }
    if ($_SESSION['tables'][$post['table']] > 2) {
        if ($cmd == "deleteRecord") $resulta = $db->deleteRecord($post);
    }
    if ($resulta) $result = $resulta;
}
echo json_encode($result, JSON_NUMERIC_CHECK);
exit();