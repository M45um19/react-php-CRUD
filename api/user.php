<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$connection = mysqli_connect("localhost", "root", "", "react_php_crud");

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET": 
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $id = $path[3];
            $query_single_user = mysqli_query($connection, "SELECT * FROM user WHERE id='$id'");

            while($single_user = mysqli_fetch_array($query_single_user)){
                $json_array['single_user'] = array(
                    "id"=>$single_user['id'],
                    "name"=>$single_user['name'],
                    "email"=>$single_user['email'],
                    "contact"=>$single_user['contact'],
                    "address"=>$single_user['address']
                );
            }
            echo json_encode($json_array['single_user']);

        } else{
            $query = mysqli_query($connection, "SELECT * FROM user");
            $json_array = array();
    
            while($row = mysqli_fetch_assoc($query)){
                $json_array['users'][] = array(
                    "id" => $row['id'],
                    "name" => $row['name'],
                    "email" => $row['email'],
                    "contact" => $row['contact'],
                    "address" => $row['address']
                );
            }
    
            echo json_encode($json_array);
        }
        break;

    case "POST":
        $user_data = json_decode(file_get_contents("php://input"));
        $name = $user_data->name;
        $email = $user_data->email;
        $contact = $user_data->contact;
        $address = $user_data->address;

        $query_add = mysqli_query($connection, "INSERT INTO user (name, email, contact, address) VALUES ('$name', '$email', '$contact', '$address')");
        break;
    case "PUT":
        $user_data = json_decode(file_get_contents("php://input"));
        $id = $user_data->id;
        $name = $user_data->name;
        $email = $user_data->email;
        $contact = $user_data->contact;
        $address = $user_data->address;
        $query_edit = mysqli_query($connection, "UPDATE user SET name='$name', email='$email', contact='$contact', address='$address' WHERE id='$id'");

        break;
    case "DELETE":
        $id = explode("/",  $_SERVER['REQUEST_URI']);
        $query_delete = mysqli_query($connection, "DELETE FROM user WHERE id='$id[3]'");
        break;
}

?>