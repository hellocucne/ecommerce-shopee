<?php
// Kết nối tới cơ sở dữ liệu
require('../../core/database.php');

$db = new Database;
$connect = $db->getConnect();

// Lấy thông tin từ biểu mẫu đăng nhập
$email = $_POST['email'];
$password = $_POST['password'];

    // Log để kiểm tra liệu dữ liệu có đến hay không
    error_log("Email: $email, Password: $password");

    // Debugging
    echo "Email: $email, Password: $password"; // Kiểm tra giá trị của biến
    var_dump($_POST); // In ra cấu trúc của mảng $_POST

if (isset($_GET['admin'])){
    if ($email=="admin@gmail.com" && $password=="admin"){
        setcookie("admin", "true", time() + 3600, "/"); 
        header("Location: ../admin/index.php");
    } else {
        header("Location: ../admin/dang_nhap.php?error=true");
    }
    
} else {
    // Kiểm tra thông tin đăng nhập trong cơ sở dữ liệu
    $sql = "SELECT * FROM user WHERE `email` = '$email' AND `password` = '$password'";
    $result = $db->getConnect()->query($sql);

    if ($result->num_rows > 0) {
        // Lấy thông tin hàng đầu tiên từ kết quả truy vấn
        $row = $result->fetch_assoc();
        $id = $row["id"];
        // Đăng nhập thành công, thiết lập cookie với tên dựa trên "name"
        setcookie("user_id", $id, time() + 3600, "/");
        header("Location: ../index.php"); // Chuyển hướng đến trang index.php
    } else {
        header("Location: ../index.php?error=$email");
    }
}
    $db->getConnect()->close();

?>
