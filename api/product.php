<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$connection = mysqli_connect("localhost", "root", "", "react_php_crud");

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET": 
        $url = explode('/', $_SERVER['REQUEST_URI']);

        if(isset($url[3]) && is_numeric($url[3])){
            $id = $url[3];

            $query_get = mysqli_query($connection, "SELECT * FROM product WHERE id='$id'");

            while($row=mysqli_fetch_array($query_get)){
                $single_product['s_product'] = array(
                    'id'=>$row['id'],
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'image'=>$row['image']
                ); 
            }
            echo json_encode($single_product['s_product']);
        } 
        else {
            $query_get = mysqli_query($connection, "SELECT * FROM product");

            while($row=mysqli_fetch_array($query_get)){
                $all_product['products'][] = array(
                    'id'=>$row['id'],
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'image'=>$row['image']
                ); 
            }
            echo json_encode($all_product['products']);
        }
        break;

        case "POST":
            if (isset($_POST['id'])) {
                // Update product
                $product_id = $_POST['id'];
                $product_name = $_POST['product_name'];
                $product_price = $_POST['product_price'];
        
                // Retrieve the old image filename from the database
                $old_image_query = mysqli_query($connection, "SELECT image FROM product WHERE id='$product_id'");
                $old_image_data = mysqli_fetch_assoc($old_image_query);
                $old_image_filename = $old_image_data['image'];
        
                if (isset($_FILES['product_image']) && $_FILES['product_image']['error'] === 0) {
                    // New image uploaded
                    $product_image = time() . '_' . $_FILES['product_image']['name'];
                    $temp_product_image = $_FILES['product_image']['tmp_name'];
                    $destination = $_SERVER['DOCUMENT_ROOT'] . '/api/images/' . $product_image;
        
                    // Update product with new image
                    $query_update = mysqli_query($connection, "UPDATE product SET name='$product_name', price='$product_price', image='$product_image' WHERE id='$product_id'");
        
                    if ($query_update) {
                        // Move new image to the destination
                        move_uploaded_file($temp_product_image, $destination);
        
                        // Delete old image from the server
                        $old_image_path = $_SERVER['DOCUMENT_ROOT'] . '/api/images/' . $old_image_filename;
                        if (file_exists($old_image_path)) {
                            if (unlink($old_image_path)) {
                                echo json_encode(['message' => 'Product updated successfully, old image deleted']);
                            } else {
                                echo json_encode(['error' => 'Failed to delete old image']);
                            }
                        } else {
                            echo json_encode(['message' => 'Product updated successfully, but old image not found']);
                        }
                    } else {
                        echo json_encode(['error' => 'Failed to update product']);
                    }
                } else {
                    // Update product without changing image
                    $query_update = mysqli_query($connection, "UPDATE product SET name='$product_name', price='$product_price' WHERE id='$product_id'");
        
                    if ($query_update) {
                        echo json_encode(['message' => 'Product updated successfully (image unchanged)']);
                    } else {
                        echo json_encode(['error' => 'Failed to update product']);
                    }
                }
            } else {
                // Handle new product creation
                if (isset($_FILES['product_image'])) {
                    $product_name = $_POST['product_name'];
                    $product_price = $_POST['product_price'];
                    $product_image = time() . $_FILES['product_image']['name'];
                    $temp_product_image = $_FILES['product_image']['tmp_name'];
                    $destination = $_SERVER['DOCUMENT_ROOT'] . '/api/images/' . $product_image;
        
                    $query = mysqli_query($connection, "INSERT INTO product (name, price, image) VALUES ('$product_name', '$product_price', '$product_image')");
                    if ($query) {
                        move_uploaded_file($temp_product_image, $destination);
                        echo json_encode(['message' => 'Product created successfully']);
                    } else {
                        echo json_encode(['error' => 'Failed to create product']);
                    }
                }
            }
            break;
    case "DELETE":
        $id = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($id[3]) && is_numeric($id[3])){
            $photo_query = mysqli_query($connection, "SELECT image FROM product WHERE id='$id[3]'");
            $query_delete = mysqli_query($connection, "DELETE FROM product WHERE id='$id[3]'");
            if($query_delete){
                $photo_data = mysqli_fetch_array($photo_query);
                $photo_name = $photo_data['image'];
                $photo_destination = $_SERVER['DOCUMENT_ROOT'].'/api/images/'.$photo_name;
                unlink($photo_destination);
            }
        }
       break;
}

?>