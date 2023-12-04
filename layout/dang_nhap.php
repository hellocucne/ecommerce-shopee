<?php
include ('../core/database.php');
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <title>Đăng nhập</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <script src="assets/js/bootstrap.bundle.js"></script>
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

</head>

<body>
<div id="header">
    <div class="header-container">

        <!-- LogIn -->
        <div class="flex-item header-login" onclick="document.querySelector('#login').classList.remove('d-none')"
            style="cursor: pointer;">
            <a style="text-decoration: none;">
                <span class="text-span">Đăng nhập</span>
            </a>
        </div>


<div id="login" class="d-none">
    <div class="overlay"></div>
    <div class="card px-4 py-5" style="width: 25rem;">
        <div class="d-flex justify-content-center error_pass d-none">
            <span style="color: red;">Sai tài khoản mật khẩu!</span>
        </div>
        <div class="d-flex justify-content-center login_pass d-none">
            <span style="color: #00AB6B">Đăng ký thành công!</span>
        </div>
        <div class="card-body">
            <div class="position-relative">
                <i class="fa-solid fa-xmark position-absolute" style="top: -2.8rem; left: 20.8rem; cursor: pointer;"
                    onclick="document.querySelector('#login').classList.add('d-none')"></i>
            </div>
            <div class="d-flex justify-content-center login">
                <a class="mx-2 clicked" style="cursor: pointer;" >
                    Đăng nhập
                </a>
                <a class="mx-2" style="cursor: pointer;" >
                    Tham gia
                </a>
                <hr>
            </div>
            <style>
                .justify-content-center a {
                    color: rgb(117, 117, 117);
                    text-decoration: none;
                    margin: 0 10px;
                    position: relative;
                }

                .justify-content-center a.clicked {
                    color: #0A88D3;
                }

                a.clicked::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: -2px;
                    /* Điều chỉnh khoảng cách giữa chữ và gạch chân */
                    left: 0;
                    width: 100%;
                    border-bottom: 2px solid #0A88D3;
                }

                #login__email,
                #login__pass,
                #register__email,
                #register__user_name,
                #register__pass {
                    box-shadow: inset 0 1px 3px #ddd;
                }
            </style>
            <form class="mt-3 row" action="auth.php" method="POST">
                <div class="mb-4">
                    <input type="text" class="form-control" id="login__email" placeholder="Email"
                        name="email">
                </div>
                <div class="mb-4">
                    <input type="password" class="form-control toggle-password" id="login__pass" placeholder="Mật khẩu"
                        name="password">
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" style="border-radius: 2rem; width: 50%;">Đăng
                        nhập</button>
                </div>
            </form>
            <form class="d-none row mt-3" action="backend/add.php?user=true" method="post">
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="Họ và tên" name="name" required>
                </div>
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="Tên đăng nhập" name="user_name" required>
                </div>
                <div class="mb-4">
                    <input type="email" class="form-control" placeholder="Địa chỉ Email" name="email" required>
                </div>
                <div class="mb-4">
                    <input type="password" class="form-control toggle-password" id="register__pass" name="password" required
                        placeholder="Mật khẩu">
                </div>
                <div id="passwordConditions">
                    <i class="fa-solid fa-circle-check" style="color: red;"></i> Có 1 ký tự đặc biệt
                    <br>
                    <i class="fa-solid fa-circle-check" style="color: red;"></i> Ít nhất 1 số
                    <br>
                    <i class="fa-solid fa-circle-check" style="color: red;"></i> Đủ 8 ký tự
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <button type="submit" class="btn btn-primary" style="border-radius: 2rem; width: 50%;" disabled>Đăng
                        ký</button>
                </div>
            </form>
        </div>
    </div>
    <style>
        #login .card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        }

        #login .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            /* Màu nền mờ */
            backdrop-filter: blur(5px);
            /* Đặt mức độ mờ */
        }

        a {
            text-decoration: none;
        }
    </style>
</div>

<div id="h_profile" class="d-none">
    <div class="overlay"></div>
    <div class="card py-4" style="width: 30rem;">
        <div class="d-flex justify-content-center p_update d-none">
            <span style="color: #00AB6B">Cập nhật thành công!</span>
        </div>
        <div class="card-body d-flex justify-content-center">
            <div class="my-2 col-md-8">
                <form class="row" action="backend/edit.php?user=true" method="post" enctype="multipart/form-data">
                    <div class="position-relative">
                        <i class="fa-solid fa-xmark position-absolute"
                            style="top: 0.6rem; left: 23rem; cursor: pointer;"
                            onclick="document.querySelector('#h_profile').classList.add('d-none')"></i>
                    </div>
                    <h4 class="d-flex justify-content-center">Chỉnh sửa hồ sơ</h4>
                    <div class="mb-3 ">
                        <label class="form-label" for="avatar"> Avatar </label><br>
                        <input type="file" class="form-control" id="avatar" name="img">
                    </div>
                    <div class="mb-3">
                        <label for="p_1" class="form-label">Tên tài khoản</label>
                        <input type="text" class="form-control" id="p_1" name="user_name">
                    </div>
                    <div class="mb-3">
                        <label for="p_2" class="form-label">Email</label>
                        <input type="email" class="form-control" id="p_2" name="email">
                    </div>
                    <div class="mb-3">
                        <label for="p_3" class="form-label">Họ tên</label>
                        <input type="text" class="form-control" id="p_3" name="name">
                    </div>
                    <div class="mb-3 ">
                        <label class="form-label" for="p_dateofbirth"> Ngày sinh </label><br>
                        <input type="date" name="dateOB" class="form-control" id="p_dateofbirth">
                    </div>
                    <div class="mb-3 ">
                        <label class="form-label col-md-12">Giới tính</label>
                        <div class="form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="Nam" id="p__g_1">
                            <label class="form-check-label" for="p__g_1">
                                Nam
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="Nữ" id="p__g_2">
                            <label class="form-check-label" for="p__g_2">
                                Nữ
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="Khác" id="p__g_3">
                            <label class="form-check-label" for="p__g_3">
                                Khác
                            </label>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary rounded-5" style="width: 37%;">Lưu</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
    <style>
        #h_profile .card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        }

        #h_profile .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            /* Màu nền mờ */
            backdrop-filter: blur(5px);
            /* Đặt mức độ mờ */
        }

        a {
            text-decoration: none;
        }
    </style>
</div>
<script>
    var login = document.querySelectorAll('.justify-content-center.login a');
var login1 = document.querySelectorAll('#login form');

login[0].addEventListener('click', () => {
    // Xử lý khi người dùng nhấp vào "Đăng nhập"
});

login[1].addEventListener('click', () => {
    // Xử lý khi người dùng nhấp vào "Tham gia"
});

const passwordInput = document.getElementById('register__pass');
passwordInput.addEventListener('input', checkPasswordConditions);
function checkPasswordConditions() {
    // Kiểm tra điều kiện mật khẩu và cập nhật trạng thái nút "Đăng ký"
}

const togglePasswordInputs = document.querySelectorAll('.toggle-password');
togglePasswordInputs.forEach(function (input) {
    // Xử lý sự kiện khi người dùng nhấp vào biểu tượng mắt để hiển thị/ẩn mật khẩu
});
</script>
    </body>
    </html>