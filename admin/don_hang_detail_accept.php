<?php
require('../core/database.php');
require('../core/flash.php');
require('./middleware.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    if (!$db->getById('transaction', $id)) {
        Flash::set('message_fail', 'Đơn hàng không tồn tại');
        header('location: ./don_hang.php');
    } else {
        $data = [
            'status' => 1
        ];
        $kq = $db->update('transaction', $data, $id);
        Flash::set('message_success', 'Xác nhận đơn đặt hàng thành công');
        header('location: ./don_hang.php');
    }
} else {
    header('location: ./don_hang.php');
}
session_write_close();
?>
