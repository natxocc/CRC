<?php
defined('SECURITY_TOKEN') or exit('No direct script access allowed');

class db
{
    // Declaracion de variables
    private $Type;
    private $Host;
    private $DBName;
    private $DBUser;
    private $DBPassword;
    private $DBPort;
    private $showcolumns;
    private $db;

    // Construct
    //----------
    public function __construct($Type = mysql, $Host, $DBName, $DBUser, $DBPassword, $DBPort = 3306)
    {
        $this->Type = $Type;
        $this->Host = $Host;
        $this->DBName = $DBName;
        $this->DBUser = $DBUser;
        $this->DBPassword = $DBPassword;
        $this->DBPort = $DBPort;
        $this->connect();
    }

    public function __destruct()
    {
        if ($this->db == null) {
            return;
        }

        if ($this->Type == 'mysql') {
            @mysqli_close($this->db);
        }
    }

    /**
     * connect
     *
     * @return void
     */
    public function connect()
    {
        // Crear conexion de datos
        try {
            $this->db = new PDO($this->Type . ":host=" . $this->Host . ";dbname=" . $this->DBName, $this->DBUser, $this->DBPassword);
            $this->db->SetAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "ERROR: " . $e->GetMessage();
        }
    }

    /**
     * getRealIP
     *
     * @return void
     */
    public function getRealIP()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        return $_SERVER['REMOTE_ADDR'];
    }

    /**
     * login
     *
     * @param  mixed $post (user, pass) or (sid)
     *
     * @return void result or true/false
     */
    function login($post)
    {
        require_once("class-syno.php");
        $syno = new syno();
        $result = $syno->login($post);
        if ($result->success) {
            $_SESSION['sid'] = $result->data->sid;
            $_SESSION['IPaddress'] = $this->getRealIP();
            $_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
            $_SESSION['logged'] = $result->success;
            $this->db->exec("UPDATE Usuarios SET sid='" . $_SESSION['sid'] . "' WHERE Usuario='" . $post['user'] . "'");
            if ($result->users) {
                foreach ($result->users->data->users as $key => $value) {
                    try {
                        $this->db->exec(" INSERT INTO Usuarios(Usuario, Nombre, Correo) VALUES('" . $value->name . "', '" . $value->description . "', '" . $value->email . "') ");
                    } catch (Exception $e) {
                        $this->db->exec(" UPDATE Usuarios SET Correo = '" . $value->email . "', Nombre = '" . $value->description . "' WHERE Usuario = '" . $value->name . "' ");
                    }
                }
            }
            echo json_encode($result);
            exit();
        } else {
            echo json_encode($result);
            session_unset();
            session_destroy();
            session_start();
            session_regenerate_id(true);
            exit();
        }
    }

    /**
     * logout
     *
     * @param  mixed $post (sid)
     *
     * @return void
     */
    public function logout($post)
    {
        require_once(" class - syno
            . php ");
        $syno = new syno();
        $result = $syno->logout($post);
        session_unset();
        session_destroy();
        session_start();
        session_regenerate_id(true);
        echo json_encode($result);
    }

    function updateUsers($users)
    {
        echo json_encode($users);
    }
    /**
     * isLogged
     *
     * @param  mixed $post
     *
     * @return void
     */
    function isLogged($post)
    {
        if (!isset($_SESSION['logged'])) return false;
        if ($_SESSION['logged'] == true && $_SESSION['userAgent'] == $_SERVER['HTTP_USER_AGENT'] && $_SESSION['IPaddress'] == $this->getRealIP() && $post['sid'] == $_SESSION['sid']) {
            return true;
        } else {
            return false;
        }
        exit();
    }

    /**
     * sendMail
     *
     * @param  mixed $post (to, subject, message) OPTIONAL: (desc, date)
     *
     * @return void
     */
    function sendMail($post)
    {
        $subject = $post['subject'];
        $to = $post['to'];
        $headers = " MIME - version : 1.0 \r\n ";
        $headers .= " Content - type : text / html;
            charset = iso - 8859 - 1 \r\n ";
        $body = " ";
        // Include event ? 
        if (isset($post['desc']) && isset($post['date'])) {
            $dini = date('YmdHis', strtotime($post['date']));
            $dend = date('YmdHis', strtotime($post['date']));
            $dini = date('Ymd', strtotime($dini)) . 'T' . date('His', strtotime($dini));
            $dend = date('Ymd', strtotime($dend)) . 'T' . date('His', strtotime($dend));
            $headers .= " Content - class : urn
            : content - classes : calendarmessage\r\n ";
            $headers .= " Content - type : text / calendar;
            method = REQUEST;
            charset = UTF - 8 \r\n ";
            $body .= " BEGIN : VCALENDAR\r\n ";
            $body .= " VERSION : 2.0 \r\n ";
            $body .= " PRODID : PHP\r\n ";
            $body .= " METHOD : REQUEST\r\n ";
            $body .= " BEGIN : VEVENT\r\n ";
            $body .= " DTSTART : " . $dini . " \r\n ";
            $body .= " DTEND : " . $dend . " \r\n ";
            $body .= " CATEGORIES : CRC\r\n ";
            $body .= " DESCRIPTION : " . $post['desc'] . " \r\n ";
            $body .= " SUMMARY : Sumario\r\n ";
            $body .= " ORGANIZER;
            CN = \"Servidor\":mailto: natxocc@verallia.com\r\n";
            $body .= "LOCATION: Servidor\r\n";
            $body .= "UID:" . date(" Ymd\TGis ", strtotime($dini)) . rand() . " @natxocc.com\r\n ";
            $body .= "SEQUENCE:0\r\n";
            $body .= "DTSTAMP:" . date('Ymd') . 'T' . date('His') . "\r\n";
            $body .= "BEGIN:VALARM\r\n";
            $body .= "TRIGGER:-PT15M\r\n";
            $body .= "ACTION:DISPLAY\r\n";
            $body .= "DESCRIPTION: Informacion:" . $post['subject'] . "\r\n";
            $body .= "END:VALARM\r\n";
            $body .= "END:VEVENT\r\n";
            $body .= "END:VCALENDAR\r\n";
        }
        $body .= $post['message'];
        $send = mail($to, $subject, $body, $headers);
        echo $send;
        exit();
    }

    /**
     * sanitize
     *
     * @param  mixed $string, $full
     *
     * @return void
     */
    function sanitize($string, $full = true)
    {
        if ($full) $invalid = array(" ", ":", "$", "#", ";", "'", "`", ",", "(", ")", "{", "}", "SELECT ", "DROP ", "INSERT ", "DELETE ", "WHERE ", "IN ", "UPDATE ", "DELAYED ", "TRUNCATE ", "REPLACE ", "LOAD ", "JOIN ", "UNION ", "LEFT ", "RIGHT ", "HAVING ", "DISTINCT ");
        if (!$full) $invalid = array("  ", "`", "SELECT ", "DROP ", "INSERT ", "DELETE ", "WHERE ", "IN ", "UPDATE ", "DELAYED ", "TRUNCATE ", "REPLACE ", "LOAD ", "JOIN ", "UNION ", "LEFT ", "RIGHT ", "HAVING ", "DISTINCT ");
        $string = str_replace($invalid, "", $string);
        return $string;
    }

    /**
     * getColumns
     *
     * @param  mixed $post (table) OPTIONAL: [lang]
     *
     * @return columns
     * @return :type, hide, pinned, headerName, headerTooltip, field, tooltipField OPTIONS: 
     */
    public function getColumns($table, $lang = false)
    {
        //var_dump($lang);
        $sql = $this->db->prepare("SHOW FULL COLUMNS FROM $table");
        $sql->execute();
        $fetch = $sql->fetchAll(PDO::FETCH_ASSOC);
        foreach ($fetch as $key => $value) {
            $result[$key]['type'] = "generalColumn";
            $result[$key]['headerTooltip'] = $fetch[$key]['Field'];
            $result[$key]['tooltipField'] = "";
            $result[$key]['field'] = $fetch[$key]['Field'];
            $columnName = explode("|", $fetch[$key]['Comment']);
            $result[$key]['headerName'] = isset($lang[$fetch[$key]['Field']]) ? $lang[$fetch[$key]['Field']] : $columnName[0];
            if (isset($columnName[1])) {
                if (strstr($columnName[1], "H")) $result[$key]['hide'] = true;
                if (strstr($columnName[1], "L")) $result[$key]['pinned'] = 'left';
                if (strstr($columnName[1], "R")) $result[$key]['pinned'] = 'right';
                if (strstr($columnName[1], "E")) $result[$key]['cellRenderer'] = "agGroupCellRenderer";
                if (strstr($columnName[1], "C")) {
                    $result[$key]['headerCheckboxSelection'] = true;
                    $result[$key]['headerCheckboxSelectionFilteredOnly'] = true;
                    $result[$key]['checkboxSelection'] = true;
                }
                if (strstr($columnName[1], "W")) {
                    $result[$key]['minWidth'] = substr($columnName[1], strpos($columnName[1], "W") + 1, 2) * 16;
                }
            }
            if (isset($columnName[2])) {
                if (strstr($columnName[2], "R")) $result[$key]['tooltipField'] .= 'Required';
                if (strstr($columnName[2], "A")) $result[$key]['tooltipField'] .= 'Autocomplete';
                if (strstr($columnName[2], "H")) $result[$key]['tooltipField'] .= 'Hidden';
            }
            if (strstr($fetch[$key]['Type'], "float") || strstr($fetch[$key]['Type'], "int")) $result[$key]['type'] = "numberColumn";
            if (strstr($fetch[$key]['Type'], "char") || strstr($fetch[$key]['Type'], "text")) $result[$key]['type'] = "textColumn";
            if (strstr($fetch[$key]['Type'], "date")) $result[$key]['type'] = "dateColumn";
            if (strstr($fetch[$key]['Type'], "bit")) $result[$key]['type'] = "bitColumn";
        }
        // echo json_encode($result, JSON_PRETTY_PRINT);
        return $result;
    }

    /**
     * getRecords
     *
     * @param  mixed $post (table, where, subtable, id)
     *
     * @return void
     */
    function getRecords($post)
    {
        $table = $this->sanitize($post['table']);
        $lang = isset($post['lang']) ? $post['lang'] : false;
        $result['columns'] = $this->getColumns($table, $lang);
        $sqlquery = "SELECT * FROM `" . $post['table'] . "`";
        $where = isset($post['where']) ? " WHERE " . $this->sanitize($post['where'], false) : "";
        $sqlquery .= $where;
        //echo $sqlquery;
        $sql = $this->db->prepare($sqlquery);
        try {
            $sql->execute();
            $result['data'] = $sql->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo $e;
            exit();
        }
        if (isset($post['subtable'])) {
            $table = $this->sanitize($post['subtable']);
            $result['columnsSub'] = $this->getColumns($table);
            $sqlquery = " SELECT * FROM `" . $table . "`";
            $id = $this->sanitize($post['id']);
            $sql = $this->db->prepare($sqlquery);
            $sql->execute();
            $subdata = $sql->fetchAll(PDO::FETCH_ASSOC);
            $subresult = array();
            foreach ($result['data'] as $rowkey1 => $rowvalue1) {
                foreach ($subdata as $rowkey2 => $rowvalue2) {
                    if ($rowvalue1[$id] == $rowvalue2[$id]) {
                        $subresult[] = $rowvalue2;
                    }
                }
                $subtable['temp'][$rowkey1] = $rowvalue1;
                $subtable['temp'][$rowkey1]['callRecords'] = $subresult;
                $subresult = array();
            }
            $result['data'] = $subtable['temp'];
        }
        echo json_encode($result, JSON_NUMERIC_CHECK);
        return $result['data'];
        exit();
    }

    /**
     * updateRecord
     *
     * @param  mixed $post (table, data[], idkey, idvalue) 
     *
     * @return void
     */
    function updateRecord($post)
    {
        $table = $this->sanitize($post['table']);
        $idkey = $this->sanitize($post['idkey']);
        $sqlquery = "UPDATE `" . $table . "` SET ";
        $comma = "";
        foreach ($post['data'] as $key => $value) {
            $key = $this->sanitize($key, false);
            $value = $this->sanitize($value, false);
            $sqlquery .= $comma . "`" . $key . "`" . "='" . $value . "'";
            $comma = ",";
        }
        $sqlquery .= " WHERE `" . $idkey . "` = :idvalue";
        $sql = $this->db->prepare($sqlquery);
        $sql->bindParam(":idvalue", $post['idvalue']);
        try {
            $result = $sql->execute();
            return true;
        } catch (Exception $e) {
            //echo $e;
            return false;
        }
        exit('End');
    }

    /**
     * deleteRecord
     *
     * @param  mixed $post (table, idkey, idvalue)
     *
     * @return void
     */
    function deleteRecord($post)
    {
        $table = $this->sanitize($post['table']);
        $idkey = $this->sanitize($post['idkey']);
        $user = $this->sanitize($post['user']);
        $sqlquery = "DELETE FROM `" . $table . "` WHERE `" . $idkey . "` = :idvalue";
        if ($_SESSION['isAdmin'] <> 1) {
            $sqlquery .= " AND `Usuario` ='$user'";
        }
        $sql = $this->db->prepare($sqlquery);
        $sql->bindParam(":idvalue", $post['idvalue']);
        try {
            $sql->execute();
            return true;
        } catch (Exception $e) {
            //echo $e;
            return false;
        }
        exit();
    }

    /**
     * insertRecord
     *
     * @param  mixed $post (table, data:[])
     *
     * @return void
     */
    function insertRecord($post)
    {
        $table = $this->sanitize($post['table']);
        $comma = $fields = $values = "";
        foreach ($post['data'] as $key => $value) {
            $fields .= $comma . $key;
            $values .= $comma . "'" . $value . "'";
            $comma = ",";
        }
        $sqlquery = "INSERT INTO `" . $table . "` ($fields) VALUES ($values)";
        $sql = $this->db->prepare($sqlquery);
        try {
            $sql->execute();
            return true;
        } catch (Exception $e) {
            //echo $e;
            return false;
        }
        exit();
    }

    // $syno->saveConfig(['data' => ['pepe' => ['uno' => 'ii', 'dos' => 'dos'], 'juan' => 'oo'], 'file' => '../../Config.php']);

    // Hay que crear un Config.php en la raiz y darles permisos de escritura
    /**
     * loadConfig
     *
     * @param  mixed $post
     *
     * @return void
     */
    function loadConfig($post)
    {
        $config = parse_ini_file($post['file'], true);
        $_SESSION['Config'] = $config;
    }

    /**
     * saveConfig
     *
     * @param  mixed $post
     *
     * @return void
     */
    function saveConfig($post)
    {
        $config = $post['data'];
        $file = $post['file'];
        $fileContent = '';
        if (!empty($config)) {
            foreach ($config as $i => $v) {
                if (is_array($v)) {
                    foreach ($v as $t => $m) {
                        $fileContent .= $i . "[" . $t . "] = " . (is_numeric($m) ? $m : '"' . $m . '"') . "\n\r";
                    }
                } else $fileContent .= $i . " = " . (is_numeric($v) ? $v : '"' . $v . '"') . "\n\r";

            }
        }
        return file_put_contents($file, $fileContent, LOCK_EX);
    }
}