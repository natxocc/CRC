<?php
defined('SECURITY_TOKEN') or exit('No direct script access allowed');

class synology
{
    
    // SYNOLOGY 

    /**
     * login
     *
     * @param  mixed $post
     *
     * @return void
     */
    function login($post)
    {
        if (!isset($post['user']) && !isset($post['pass'])) exit('No users and password');
        $user = $post['user'];
        $pass = $post['pass'];
        $return = array();
        $data = file_get_contents('http://localhost:5000/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=' . $user . '&passwd=' . $pass . '&session=FileStation&format=sid');
        if ($data) {
            $result = json_decode($data);
            $success = $result->success;
            $ip = $this->getRealIP();
            if ($success) {
                $sid = $result->data->sid;
                $_SESSION['sid'] = $result->data->sid;
                $_SESSION['user'] = $user;
                $_SESSION['pass'] = $pass;
                $_SESSION['IPaddress'] = $ip;
                $_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
                $_SESSION['logged'] = $success;
                $return['sid'] = $sid;
                $return['success'] = $success;
                echo json_encode($return);
            } else {
                echo false;
                session_unset();
                session_destroy();
                session_start();
                session_regenerate_id(true);
                exit();
            }
        }

    }
    

    /**
     * logout
     *
     * @param  mixed $post
     *
     * @return void
     */
    public function logout($post)
    {
        if (!isset($post['sid'])) exit('No sid');
        $sid = $post['sid'];
        $data = file_get_contents('http://localhost:5000/webapi/auth.cgi?api=SYNO.API.Auth&version=1&method=logout&_sid=' . $sid);
        session_unset();
        session_destroy();
        session_start();
        session_regenerate_id(true);
        echo "Desconectado";
    }
    // get User information
    function getUserInfo($post)
    {
        if (!isset($post['sid'])) exit('No sid');
        $sid = $post['sid'];
        $return = array();
        $data = file_get_contents('http://localhost:5000/webapi/entry.cgi?api=SYNO.Core.NormalUser&method=get&version=1&_sid=' . $sid);
        $result = json_decode($data);
        if ($result->success) {
            $return['user'] = $result->data->username;
            $return['name'] = $result->data->fullname;
            $return['mail'] = $result->data->email;
            $return['success'] = $result->success;
            echo json_encode($return);
            return $result->success;
        } else {
            echo "Error";
            return false;
            exit();
        }

    }

    /**
     * getUserType
     *
     * @param  mixed $post
     *
     * @return void
     */
    function getUserType($post)
    {
        if (!isset($post['sid'])) exit('No sid');
        $sid = $post['sid'];
        $return = array();
        $data = file_get_contents('http://localhost:5000/webapi/entry.cgi?api=SYNO.FileStation.Info&version=2&session=FileStation&method=get&_sid=' . $sid);
        if ($data) {
            $result = json_decode($data);
            $return['admin'] = $result->data->is_manager;
            $return['groups'] = $result->data->items;
            $return['success'] = $result->success;
            echo json_encode($return);
            return $result->success;
        } else {
            echo "Error";
            return false;
            exit();
        }

    }


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

    // save config

    // require_once "class-synology.php";
    // $syno = new synology();
    // $syno->saveConfig(['data' => ['pepe' => ['uno' => 'ii', 'dos' => 'dos'], 'juan' => 'oo'], 'file' => '../../Config.php']);
    // Hay que crear un Config.php en la raiz y darles permisos de escritura

    /**
     * saveConfig
     *
     * @param  mixed $post
     *
     * @return void
     */
    function saveConfig($post)
    {
        $config=$post['data'];
        $file=$post['file'];
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

