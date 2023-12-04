<?php
require('../core/database.php');
require('../core/upload.php');
require('../core/flash.php');
require('./middleware.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    if (!$db->getById('product', $id)) {
        Flash::set('message_fail', 'Sản phẩm không tồn tại');
    } else {
        $product = $db->getById('product', $id);
        $upload = new Upload;
        $image_link = $product['image_link'];
        $image_list = json_decode($product['image_list']);
        foreach ($image_list as $item) {
            $upload->delete($item);
        }
        $upload->delete($image_link);
        $kq = $db->delete('product', $id);
        $kq1 = $db->query("delete from sizedetail where product_id = {$product['id']}");
        if ($kq && $kq1) {
            Flash::set('message_success', 'Xóa danh mục thành công');
        } else {
            Flash::set('message_fail', 'Xóa danh mục thất bại');
        }
    }
    header('location: ./san_pham.php');
} else {
    header('location: ./san_pham.php');
}
session_write_close();
