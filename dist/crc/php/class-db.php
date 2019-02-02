<?php
defined('SECURITY_TOKEN') or exit('No direct script access allowed');
// Class DB

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
     * @param  mixed $post (user,pass)
     *
     * @return void
     */
    public function login($post)
    {
        $return = array();
        if (!isset($post['user']) || !isset($post['pass'])) exit();
        $logged = $sql = $result = "";
        $_SESSION['isAdmin'] = $_SESSION['sid'] = $_SESSION['userAgent'] = $_SESSION['ipAddress'] = $_SESSION['logged'] = false;
        $sql = $this->db->prepare("SELECT Clave,Adm from Usuarios WHERE Usuario=:user");
        $sql->bindParam(":user", $post['user']);
        $sql->execute();
        $result = $sql->fetchAll();
        $logged = password_verify($post['pass'], $result[0]['Clave']);
        if ($logged) {
            $sql = $this->db->prepare("SELECT Usuario,Correo FROM Usuarios");
            $sql->execute();
            $result = $sql->fetchAll();
            foreach ($result as $key => $value) {
                $return['users'][$key]['user'] = $value['Usuario'];
                $return['users'][$key]['mail'] = $value['Correo'];
            }
            $_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
            $_SESSION['sid'] = bin2hex(random_bytes(12));
            $_SESSION['ipAddress'] = $this->getRealIP();
            $_SESSION['LastActivity'] = $_SERVER['REQUEST_TIME'];
            $_SESSION['isAdmin'] = $result[0]['Clave'];
            $_SESSION['logged'] = true;
            $return['ip'] = $_SESSION['ipAddress'];
            $return['logged'] = $_SESSION['logged'];
            $return['success'] = true;
            $return['sid'] = $_SESSION['sid'];
            echo json_encode($return);
        } else {
            echo "Usuario Incorrecto";
        }
        exit();
    }


    /**
     * logout
     *
     * @return void
     */
    public function logout()
    {
        $_SESSION['isAdmin'] = $_SESSION['sid'] = $_SESSION['userAgent'] = $_SESSION['ipAddress'] = $_SESSION['logged'] = false;
        session_unset();
        session_destroy();
        session_start();
        session_regenerate_id(true);
        $return['sid'] = "";
        echo $return['sid'];
        exit();
    }

    /**
     * createUser
     *
     * @param  mixed $post (user,pass)
     *
     * @return void
     */
    public function createUser($post)
    {
        // PONER CONDICION QUE SOLO ADMIN PUEDE REGISTRAR
        if (!isset($post['user']) && !isset($post['pass']) && $_SESSION['isAdmin'] <> 1) exit();
        $pass = password_hash($post['pass'], PASSWORD_DEFAULT);
        $sql = $this->db->prepare("REPLACE INTO Usuarios(Usuario,Clave) VALUES(:user, :pass)");
        $sql->bindParam(":user", $post['user']);
        $sql->bindParam(":pass", $pass);
        $sql->execute();
        exit();
    }


    /**
     * getUser
     *
     * @param  mixed $post (user, sid)
     *
     * @return void
     */
    function getUser($post)
    {
        $return = array();
        if (!isset($post['user']) || !isset($post['sid'])) exit();
        $logged = $sql = $result = "";
        if (isset($_SESSION['logged'])) {
            if ($_SESSION['logged'] == true && $_SESSION['userAgent'] == $_SERVER['HTTP_USER_AGENT'] && $_SESSION['IPaddress'] == $this->getRealIP() && $post['sid'] == $_SESSION['sid']) {
                $sql = $this->db->prepare("SELECT Correo, Adm, Ramo, SubMediador from Usuarios WHERE Usuario=:user");
                $sql->bindParam(":user", $post['user']);
                $sql->execute();
                $result = $sql->fetchAll();
                $return['correo'] = $result[0]['Correo'];
                $return['adm'] = $result[0]['Adm'];
                $return['ramo'] = $result[0]['Ramo'];
                $return['sm'] = $result[0]['SubMediador'];
                $return['success'] = true;
                echo json_encode($return);
                return true;
            } else {
                return false;
            }
        }
        exit();
    }

    /**
     * isLogged
     *
     * @param  mixed $post (sid)
     *
     * @return void
     */
    function isLogged($post)
    {
        if (!isset($post['sid'])) exit('Falta sid');
        $logged = $sql = $result = "";
        if (isset($_SESSION['logged'])) {
            if ($_SESSION['logged'] == true && $_SESSION['userAgent'] == $_SERVER['HTTP_USER_AGENT'] && $_SESSION['ipAddress'] == $this->getRealIP() && $post['sid'] == $_SESSION['sid']) {
                return true;
            } else {
                return false;
            }
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
        $headers = "MIME-version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
        $body = "";
        // Include event ? 
        if (isset($post['desc']) && isset($post['date'])) {
            $dini = date('YmdHis', strtotime($post['date']));
            $dend = date('YmdHis', strtotime($post['date']));
            $dini = date('Ymd', strtotime($dini)) . 'T' . date('His', strtotime($dini));
            $dend = date('Ymd', strtotime($dend)) . 'T' . date('His', strtotime($dend));
            $headers .= "Content-class: urn:content-classes:calendarmessage\r\n";
            $headers .= "Content-type: text/calendar; method=REQUEST; charset=UTF-8\r\n";
            $body .= "BEGIN:VCALENDAR\r\n";
            $body .= "VERSION:2.0\r\n";
            $body .= "PRODID:PHP\r\n";
            $body .= "METHOD:REQUEST\r\n";
            $body .= "BEGIN:VEVENT\r\n";
            $body .= "DTSTART:" . $dini . "\r\n";
            $body .= "DTEND:" . $dend . "\r\n";
            $body .= "CATEGORIES:CRC\r\n";
            $body .= "DESCRIPTION: " . $post['desc'] . "\r\n";
            $body .= "SUMMARY: Sumario\r\n";
            $body .= "ORGANIZER; CN=\"Servidor\":mailto: natxocc@verallia.com\r\n";
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
     * @param  mixed $post (table)
     *
     * @return columns
     * @return :type, hide, pinned, headerName, headerTooltip, field, tooltipField 
     */
    public function getColumns($table)
    {
        $sql = $this->db->prepare("SHOW FULL COLUMNS FROM $table");
        $sql->execute();
        $fetch = $sql->fetchAll(PDO::FETCH_ASSOC);
        foreach ($fetch as $key => $value) {
            $result[$key]['type'] = "generalColumn";
            $columnName = explode("|", $fetch[$key]['Comment']);
            $result[$key]['headerName'] = $columnName[0];
            $result[$key]['headerTooltip'] = $fetch[$key]['Field'];
            $result[$key]['tooltipField'] = "";
            $result[$key]['field'] = $fetch[$key]['Field'];
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
     * @param  mixed $post (table, where, orderby, subtable, id)
     *
     * @return void
     */
    function getRecords($post)
    {
        $table = $this->sanitize($post['table']);
        $result['columns'] = $this->getColumns($table);
        $sqlquery = "SELECT * FROM `" . $post['table'] . "`";
        $where = $post['where'] ? " WHERE " . $this->sanitize($post['where'], false) : "";
        $sqlquery .= $where;
        $orderby = $post['orderby'] ? " ORDER BY " . $this->sanitize($post['orderby'], false) : "";
        $sqlquery .= $orderby;
        // echo $sqlquery;
        $sql = $this->db->prepare($sqlquery);
        try {
            $sql->execute();
            $result['data'] = $sql->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo $e;
            exit();
        }
        if ($post['subtable']) {
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
        // $user = $this->sanitize($post['user']);
        $sqlquery = "UPDATE `" . $table . "` SET ";
        $comma = "";
        foreach ($post['data'] as $key => $value) {
            $key = $this->sanitize($key, false);
            $value = $this->sanitize($value, false);
            $sqlquery .= $comma . "`" . $key . "`" . "='" . $value . "'";
            $comma = ",";
        }
        $sqlquery .= " WHERE `" . $idkey . "` = :idvalue";
        // if ($_SESSION['isAdmin'] <> 1) {
        //     $sqlquery .= " AND `Usuario` ='$user'";
        // }
        $sql = $this->db->prepare($sqlquery);
        $sql->bindParam(":idvalue", $post['idvalue']);
        try {
            $sql->execute();
        } catch (Exception $e) {
            echo $e;
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
        } catch (Exception $e) {
            echo $e;
        }
        exit();
    }


    /**
     * insertRecord
     *
     * @param  mixed $post (table, user, data:[])
     *
     * @return void
     */
    function insertRecord($post)
    {
        $table = $this->sanitize($post['table']);
        $user = $this->sanitize($post['user']);
        $comma = $fields = $values = "";
        foreach ($post['data'] as $key => $value) {
            $fields .= $comma . $key;
            $values .= $comma . "'" . $value . "'";
            $comma = ",";
        }
        $sqlquery = "INSERT INTO `" . $table . "` ($fields) VALUES ($values)";
        if ($_SESSION['isAdmin'] <> 1) {
            $sqlquery .= " WHERE Usuario ='$user'";
        }
        $sql = $this->db->prepare($sqlquery);
        try {
            $sql->execute();
        } catch (Exception $e) {
            echo $e;
        }
        exit();
    }




    /// REALE ---------------------------------------








    /**
     * updateRecibos (empresa) = 4 o 10
     *
     * @return void
     */
    function updateRecibos($empresa)
    {
        // Actualiza Fecha inicial y final
        $dateini = date("Y-m", strtotime("-1 month", strtotime(date('Y-m-d')))) . "-01";
        $dateend = date("Y-m-d");
        $wsdl = "https://lba.realeonline.net/Reale.B2b.Services.Multitarificadores.IisHost/DescargaCompletaRecibos.svc?wsdl";
        $consulta = new SoapClient($wsdl, array(
            'uri' => "",
            'location' => $wsdl,
            'trace' => true,
            'exceptions' => false
        ));
        $parametros = array(
            'Empresa' => $empresa,
            'Clave' => '12345',
            'Identificador' => 'ag34764w@TTLY9XPR',
            'FechaInicial' => $dateini,
            'FechaFinal' => $dateend,
            'IncluirPendientes' => true,
            'IncluirAnulados' => true,
            'IncluirCobrados' => true,
            'IncluirDevueltos' => true,
            'IncluirNuevos' => true,
        );
        $resultado = $consulta->DescargarNew($parametros);
        //echo json_encode($resultado);
        $resultado = $resultado->ListaRecibos->ReciboAmpliado;
        // var_dump($resultado);
        //echo json_encode($resultado);
        foreach ($resultado as $key => $value) {
            // Conversiones de Fechas
            $FE = $value->FechaEfecto;
            $FS = $value->Situacion;
            $FV = $value->FechaVencimiento;
            $FechaEfecto = substr($FE, 6, 4) . "-" . substr($FE, 3, 2) . "-" . substr($FE, 0, 2);
            $FechaSituacion = substr($FS, 6, 4) . "-" . substr($FS, 3, 2) . "-" . substr($FS, 0, 2);
            $FechaVencimiento = substr($FV, 0, 4) . "-" . substr($FV, 5, 2) . "-" . substr($FV, 8, 2);
            // Prueba de insertar nuevos registros
            try {
                $sql = $this->db->prepare("INSERT INTO Recibos(
                CodigoPoliza,
                CodigoRamo,
                CodigoRecibo,
                NombreTomador,
                FechaEfecto,
                Importe,
                Situacion,
                Estado,
                CodigoMediador,
                SubCodigoMediador,
                CodigoGestor,
                FechaVencimiento,
                ImporteBonificacion,
                ImporteNeto,
                FormaPago
            ) VALUES(
                \"$value->CodigoPoliza\",
                \"$value->CodigoRamo\",
                \"$value->CodigoRecibo\",
                \"$value->NombreTomador\",
                \"$FechaEfecto\",
                \"$value->Importe\",
                \"$FechaSituacion\",
                \"$value->Estado\",
                \"$value->CodigoMediador\",
                \"$value->SubCodigoMediador\",
                \"$value->CodigoGestor\",
                \"$FechaVencimiento\",
                \"$value->ImporteBonificacion\",
                \"$value->ImporteNeto\",
                \"$value->FormaPago\"
                )");
                $sql->execute();
                $result['success'] = true;
                $result['type'] = 'insert';
                // Prueba de actualizar el registro actual
            } catch (Exception $e) {
                $sql = $this->db->prepare("UPDATE Recibos SET 
                CodigoPoliza = \"$value->CodigoPoliza\",
                CodigoRamo = \"$value->CodigoRamo\",
                CodigoRecibo = \"$value->CodigoRecibo\",
                NombreTomador = \"$value->NombreTomador\",
                FechaEfecto = \"$FechaEfecto\",
                Importe = \"$value->Importe\",
                Situacion = \"$FechaSituacion\",
                Estado = \"$value->Estado\",
                CodigoMediador = \"$value->CodigoMediador\",
                SubCodigoMediador = \"$value->SubCodigoMediador\",
                CodigoGestor = \"$value->CodigoGestor\",
                FechaVencimiento = \"$FechaVencimiento\",
                ImporteBonificacion = \"$value->ImporteBonificacion\",
                ImporteNeto = \"$value->ImporteNeto\",
                FormaPago = \"$value->FormaPago\"
                WHERE CodigoRecibo = \"$value->CodigoRecibo\"
                ");
                $sql->execute();
                $result['success'] = true;
                $result['type'] = 'update';
            }
        }
        echo "Fin de actualización de Recibos";
        exit();
    }


    /**
     * getRecibos
     *
     * @param  mixed $post (poliza)
     *
     * @return void
     */
    function getRecibos($post)
    {
        $wsdl = "https://lba.realeonline.net/Reale.B2b.Services.Multitarificadores.IisHost/ConsultaRecibos.svc?wsdl";
        $consulta = new SoapClient($wsdl, array(
            'uri' => "",
            'location' => $wsdl,
            'trace' => true,
            'exceptions' => false
        ));
        $parametros = array(
            'Empresa' => 4,
            'Identificador' => 'ag34764w@TTLY9XPR',
            'CodigoPoliza' => $post['poliza'],
        );
        $resultado = $consulta->ObtenerListaRecibosPoliza($parametros);
        // var_dump($resultado);
        echo json_encode($resultado);
        exit();
    }
 
    // Actualizar Polizas
    function updatePolizas()
    {
        $dateini = date("Y-m", strtotime("-1 month", strtotime(date('Y-m-d')))) . "-01";
        $dateend = date("Y-m-d");
        $wsdl = "https://lba.realeonline.net/Reale.B2b.Services.Multitarificadores.IisHost/DescargaPolizas.svc?wsdl";
        $consulta = new SoapClient($wsdl, array(
            'uri' => "",
            'location' => $wsdl,
            'trace' => true,
            'exceptions' => false
        ));
        $parametros = array(
            'Empresa' => 4,
            'Clave' => '12345',
            'Identificador' => 'ag34764w@TTLY9XPR',
            'FechaInicial' => $dateini,
            'FechaFinal' => $dateend,
            'TipoSuplemento1' => "NP"
        );
        $resultado = $consulta->Descargar($parametros);
        $resultado = $resultado->ListaPolizas->Poliza;
        echo json_encode($resultado, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
        foreach ($resultado as $key => $value) {
            // Conversiones de Fechas
            $TD = array("CIF ", "NIF ", "NIE ");
            $FechaAlta = substr($value->DatosGenerales->FechaAlta, 0, 10);
            $FechaBaja = substr($value->DatosGenerales->FechaBaja, 0, 10);
            $FechaVencimientoSuplemento = substr($value->DatosGenerales->FechaVencimientoSuplemento, 0, 10);
            $OrigenUsuario = 'Auto';
            $Documento = str_replace($TD, '', $value->DatosGenerales->DatosTomador->Documento);
            $CodigoPoliza = $value->DatosGenerales->CodigoPoliza;
            $CodigoRecibo = $value->DatosGenerales->CodigoRecibo;
            $Apellidos = $value->DatosGenerales->DatosTomador->Apellidos;
            $Nombre = $value->DatosGenerales->DatosTomador->Nombre;
            $NombreCompleto = $value->DatosGenerales->DatosTomador->Nombre . " " . $value->DatosGenerales->DatosTomador->Apellidos;
            $CodigoMediador = $value->DatosGenerales->CodigoMediador;
            $Ramo = $value->DatosGenerales->Ramo;
            $Modalidad = $value->DatosGenerales->Modalidad;
            $CodigoModelo = $value->DatosAutos->CodigoModelo;
            $Matricula = $value->DatosAutos->Matricula;
            $SubCodigoMediador = $value->DatosGenerales->SubCodigoMediador;
            $Importe = $value->DatosGenerales->ImporteNetoRecibo + $value->DatosGenerales->ImporteBonificacionRecibo;
            $TipoInformacion = $value->DatosGenerales->TipoInformacion;
            // Prueba de insertar nuevos registros
            try {
                $sql = $this->db->prepare("INSERT INTO Polizas(
                FechaAlta,
                FechaBaja,
                FechaVencimientoSuplemento,
                OrigenUsuario,
                Documento,
                CodigoPoliza,
                CodigoRecibo,
                Apellidos,
                Nombre,
                NombreCompleto,
                CodigoMediador,
                Ramo,
                Modalidad,
                CodigoModelo,
                Matricula,
                SubCodigoMediador,
                Importe,
                TipoInformacion
            ) VALUES(
                \"$FechaAlta\",
                \"$FechaBaja\",
                \"$FechaVencimientoSuplemento\",
                \"$OrigenUsuario\",
                \"$Documento\",
                \"$CodigoPoliza\",
                \"$CodigoRecibo\",
                \"$Apellidos\",
                \"$Nombre\",
                \"$NombreCompleto\",
                \"$CodigoMediador\",
                \"$Ramo\",
                \"$Modalidad\",
                \"$CodigoModelo\",
                \"$Matricula\",
                \"$SubCodigoMediador\",
                \"$Importe\",
                \"$TipoInformacion\"
                )");
                $sql->execute();
                $result['success'] = true;
                $result['type'] = 'insert';
                // Prueba de actualizar el registro actual
            } catch (Exception $e) {
                $sql = $this->db->prepare("UPDATE Polizas SET 
                FechaAlta=\"$FechaAlta\",
                FechaBaja=\"$FechaBaja\",
                FechaVencimientoSuplemento=\"$FechaVencimientoSuplemento\",
                OrigenUsuario=\"$OrigenUsuario\",
                Documento=\"$Documento\",
                CodigoPoliza=\"$CodigoPoliza\",
                CodigoRecibo=\"$CodigoRecibo\",
                Apellidos=\"$Apellidos\",
                Nombre=\"$Nombre\",
                NombreCompleto=\"$NombreCompleto\",
                CodigoMediador=\"$CodigoMediador\",
                Ramo=\"$Ramo\",
                Modalidad=\"$Modalidad\",
                CodigoModelo=\"$CodigoModelo\",
                Matricula=\"$Matricula\",
                SubCodigoMediador=\"$SubCodigoMediador\",
                Importe=\"$Importe\",
                TipoInformacion=\"$TipoInformacion\"
                WHERE CodigoPoliza = \"$CodigoPoliza\"
                ");
                $sql->execute();
                $result['success'] = true;
                $result['type'] = 'update';
            }
        }

        echo "Fin de actualización de Pólizas";
        exit();
    }


    /**
     * polizasMediador
     *
     * @return void
     */
    function polizasMediador()
    {

        $wsdl = "https://lba.realeonline.net/Reale.B2b.Services.Multitarificadores.IisHost/ConsultaPolizas.svc?wsdl";
        $consulta = new SoapClient($wsdl, array(
            'uri' => "",
            'location' => $wsdl,
            'trace' => true,
            'exceptions' => false
        ));
        $parametros = array(
            'Empresa' => 4,
            'Identificador' => 'ag34764w@TTLY9XPR',
            'CodigoMediador' => "34764"
        );
        $resultado = $consulta->ObtenerListaPolizasMediador($parametros);
        //$resultado = $resultado->ListaPolizas->Poliza;
        echo json_encode($resultado, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
        echo "Fin de actualización de Pólizas";
        exit();
    }


    /**
     * reportRecibos
     *
     * @param  mixed $post (days, to, subject, message, lang)
     *
     * @return void
     */
    function reportRecibos($post)
    {
        header("Content-Type: application/json;charset=utf-8");
        $defaultLang = isset($post['lang']) ? $post['lang'] : 'es';
        require_once $defaultLang . '.php';
        $date = $this->sanitize($post['days']);
        $today = date('Y-m-d', strtotime('-' . $date . ' day', strtotime(date('Y-m-d'))));
        //Recibos Urgentes
        $sqlquery = "SELECT * from Recibos WHERE (FechaEfecto<'$today') AND (Estado LIKE 'PENDIENTE%') AND (MIEstado = '' OR MIEstado LIKE 'PENDIENTE%') ORDER BY FechaEfecto DESC";
        $sql = $this->db->prepare($sqlquery);
        $sql->execute();
        $fetch = $sql->fetchAll(PDO::FETCH_ASSOC);
        $result['count']['Urgentes'] = $sql->rowCount();
        $result['data']['Urgentes'] = $fetch;
        //
        $sqlquery = "SELECT * from Recibos WHERE (FechaEfecto<'$today') AND (Estado LIKE 'COBRADO%') AND (MIEstado LIKE 'ANULADO%') ORDER BY FechaEfecto DESC";
        $sql = $this->db->prepare($sqlquery);
        $sql->execute();
        $fetch = $sql->fetchAll(PDO::FETCH_ASSOC);
        $result['count']['Anulados'] = $sql->rowCount();
        $result['data']['Anulados'] = $fetch;
        // Template
        $post['message'] = '<font face="calibri"><h3><strong>' . $lang['Resumen'] . '</strong></h3><p>' . $lang['Recibos'] . '<strong><span style="text-decoration: underline;"><span style="color: #ff0000;"><em>' . $lang['Urgentes'] . '</em></span></span></strong>:</p><ul>';
        foreach ($result['data']['Urgentes'] as $key => $value) {
            $post['message'] .= "<li>" . $lang['Fecha'] . $value['FechaEfecto'] . " || " . $lang['Recibo'] . "<a href='http://totsegur.synology.me/recibos/" . $value['CodigoRecibo'] . "'>" . $value['CodigoRecibo'] . "</a> || " . $lang['Poliza'] . $value['CodigoPoliza'] . " || " . $lang['Cliente'] . $value['NombreTomador'] . "</li>";
        }
        $post['message'] .= '</ul><p>' . $lang['Recibos'] . '<span style="text-decoration: underline; color: #800080;"><strong><em><span>' . $lang['Anulados'] . '</span></em></strong></span>:</p><ul>';
        foreach ($result['data']['Anulados'] as $key => $value) {
            $post['message'] .= "<li>" . $lang['Fecha'] . $value['FechaEfecto'] . " || " . $lang['Recibo'] . "<a href='http://totsegur.synology.me/recibos/" . $value['CodigoRecibo'] . "'>" . $value['CodigoRecibo'] . "</a> || " . $lang['Poliza'] . $value['CodigoPoliza'] . " || " . $lang['Cliente'] . $value['NombreTomador'] . "</li>";
        }
        $post['message'] .= '</ul><p>&nbsp;</p><p><strong><span style="color: #008000;">CRC Reale</span></strong></p></font>';
        $post['subject'] .= $lang['Resumen']." (" . date('Y-m-d') . ")";
        $this->sendMail($post);
        //echo json_encode($post['message'], JSON_PRETTY_PRINT);
    }
}