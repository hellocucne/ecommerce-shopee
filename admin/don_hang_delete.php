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
        $transaction = $db->getById('transaction', $id);
        $info = $db->getAll("select * from `order` where transaction_id = $id");
        foreach ($info as $key => $value) {
            $sl = 0;
            //cộng số lượng size
            $size_detail = $db->getFirst("select * from sizedetail where product_id = {$value['product_id']} and size_id = {$value['size_id']}");
            $sl = $sl +  $value['qty'];
            if ($size_detail) {
                $id_update_size = $size_detail['id'];
                $amount = $size_detail['quantity'] + $value['qty'];
                $data2 = [
                    'product_id' => $value['product_id'],
                    'size_id' => $value['size_id'],
                    'quantity' => $amount,
                ];
                $db->update('sizedetail', $data2, $id_update_size);
            } else {
                $data3 = [
                    'product_id' => $value['product_id'],
                    'size_id' => $value['size_id'],
                    'quantity' => $value['qty'],
                ];
                $sl = $sl +  $value['qty'];
                $db->create('sizedetail', $data3);
            }
            //Trừ lượt mua
            $product = $db->getById('product', $value['product_id']);
            $data4 = [
                'buyed' => $product['buyed'] - $sl
            ];
            $db->update('product', $data4, $value->product_id);
            $db->delete('order', $value['id']);
        }
        $db->delete('transaction', $id);
        Flash::set('message_success', 'Xóa đơn đặt hàng thành công');
        header('location: ./don_hang.php');
    }
} else {
    header('location: ./don_hang.php');
}

?>