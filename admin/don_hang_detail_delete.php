<?php
require('../core/database.php');
require('../core/flash.php');
require('./middleware.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    if (!$db->getById('order', $id)) {
        Flash::set('message_fail', 'Order không tồn tại');
        header('location: ./don_hang.php');
    } else {
        $order = $db->getById('order', $id);
        $size_detail = $db->getFirst("select * from sizedetail where product_id = {$order['product_id']} and size_id = {$order['size_id']}");
        if ($size_detail) {
            $id_update_size = $size_detail['id'];
            $amount = $size_detail['quantity'] + $order['qty'];
            $data2 = [
                'product_id' => $order['product_id'],
                'size_id' => $order['size_id'],
                'quantity' => $amount,
            ];
            $db->update('sizedetail', $data2, $id_update_size);
        } else {
            $data3 = [
                'product_id' => $order['product_id'],
                'size_id' => $order['size_id'],
                'quantity' => $order['qty'],
            ];
            $db->create('sizedetail', $data3);
        }
        $db->delete('order', $id);
        $transaction = $db->getById('transaction', $order['transaction_id']);
        $data = [
            'amount' => $transaction['amount'] - $order['amount']
        ];
        $db->update('transaction', $data,  $transaction['id']);
        Flash::set('message_success', 'Xóa thành công');
        header("location: ./don_hang_detail.php?id={$order['transaction_id']}");
    }
} else {
    header('location: ./don_hang.php');
}
session_write_close();
?>
