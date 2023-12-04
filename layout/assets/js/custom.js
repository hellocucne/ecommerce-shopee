document.addEventListener('DOMContentLoaded', () => {
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data

            document.querySelector('#header').innerHTML = div.querySelector('#header').innerHTML
            document.querySelector('#footer').innerHTML = div.querySelector('#footer').innerHTML
            document.querySelector('body').appendChild(div.querySelector('#login'))
            document.querySelector('body').appendChild(div.querySelector('#h_profile'))
            var login = document.querySelectorAll('.justify-content-center.login a')
            var login1 = document.querySelectorAll('#login form')
            login[0].addEventListener('click', () => {
                login[0].classList.add('clicked');
                login[1].classList.remove('clicked');
                login1[0].classList.remove('d-none')
                login1[1].classList.add('d-none')
            })
            login[1].addEventListener('click', () => {
                login[1].classList.add('clicked');
                login[0].classList.remove('clicked');
                login1[1].classList.remove('d-none')
                login1[0].classList.add('d-none')
            })

            const passwordInput = document.getElementById('register__pass');
            passwordInput.addEventListener('input', checkPasswordConditions);
            function checkPasswordConditions() {
                const password = passwordInput.value;
                // Biến để theo dõi trạng thái của từng điều kiện
                let hasSpecialChar = /\W/.test(password);
                let hasNumberChar = /\d/.test(password);
                let hasMinLength = password.length >= 8;

                // Kiểm tra điều kiện và thay đổi màu sắc và gạch chân
                document.querySelectorAll('#passwordConditions i')[0].style.color = /\W/.test(password) ? 'green' : 'red';
                document.querySelectorAll('#passwordConditions i')[1].style.color = /\d/.test(password) ? 'green' : 'red';
                document.querySelectorAll('#passwordConditions i')[2].style.color = password.length >= 8 ? 'green' : 'red';

                if (hasSpecialChar && hasNumberChar && hasMinLength)
                    login1[1].querySelector('button').disabled = false
                else login1[1].querySelector('button').disabled = true
            }

            const togglePasswordInputs = document.querySelectorAll('.toggle-password');
            togglePasswordInputs.forEach(function (input) {
                const togglePassword = document.createElement('div');
                togglePassword.classList.add('position-relative');
                togglePassword.style.cursor = 'pointer';
                togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash position-absolute" style="top: -1.6rem; right: 0.8rem;"></i>`
                input.parentNode.appendChild(togglePassword);

                togglePassword.addEventListener('click', function () {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);

                    // Toggle eye icon
                    if (type === 'password') {
                        togglePassword.querySelector('i').classList.remove('fa-eye');
                        togglePassword.querySelector('i').classList.add('fa-eye-slash');
                    } else {
                        togglePassword.querySelector('i').classList.remove('fa-eye-slash');
                        togglePassword.querySelector('i').classList.add('fa-eye');
                    }
                });
            });

            if (window.location.href.includes('?error')) {
                document.querySelector('.error_pass').classList.remove('d-none')
                document.querySelector('#login').classList.remove('d-none')
            } else if (window.location.href.includes('?login')) {
                document.querySelector('.login_pass').classList.remove('d-none')
                document.querySelector('#login').classList.remove('d-none')
            } else if (window.location.href.includes('?p_update')) {
                document.querySelector('.p_update').classList.remove('d-none')
                document.querySelector('#h_profile').classList.remove('d-none')
            } else {
                document.querySelector('.error_pass').classList.add('d-none')
                document.querySelector('#login').classList.add('d-none')
            }

            if (getCookie('user_id')) {
                document.querySelector('.header-login').classList.add('d-none')
                document.querySelector('.header-user').classList.remove('d-none')
                fetch('backend/get_data.php?table=user&id=' + getCookie('user_id'))
                    .then(response => response.json())
                    .then(data => {
                        item = data[0]
                        document.querySelector('.header-user img').src = item.img
                        document.querySelector('.header-user b').textContent = item.name

                        let profile = document.querySelectorAll('#h_profile input')
                        profile[1].value = item.user_name
                        profile[2].value = item.email
                        profile[3].value = item.name
                        profile[4].value = item.dateOB
                        document.querySelector(`.form-check-inline [value="${item.gender}"]`).checked = true

                        if (window.location.href.includes('image_details.html'))
                            document.querySelector('img[alt="my_cmt"]').src = item.img

                    })
            } else {
                document.querySelector('.header-user').classList.add('d-none')
                document.querySelector('.header-login').classList.remove('d-none')
            }

            // Tìm kiếm nội dung 
            document.querySelectorAll('button.search_button').forEach(item => {
                item.addEventListener('click', (event) => {
                    var search = event.target.parentNode.parentNode.querySelector('.search_input').value
                    window.location.href = 'home.html?q=' + search
                })
            })
            document.querySelectorAll('.search_input').forEach(item => {
                item.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        window.location.href = 'home.html?q=' + this.value
                    }
                });
            })
        })

    // Trang chủ - show toàn bộ img 
    if (window.location.href.includes('home.html')) {
        fetch('backend/get_data.php?table=img_all')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item => {
                    return item.status == "done"
                })
                var q = new URLSearchParams(window.location.search).get('q')
                if (q) {
                    data = data.filter(item => {
                        return item.content.toLowerCase().includes(q.toLowerCase())
                    })
                }
                var main = [...data]
                var divtoClone = document.querySelector('.container.masonry_img .box').cloneNode(true)
                document.querySelector('.container.masonry_img .box').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.source
                    cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                    cloneDiv.setAttribute('img_id', item.id)
                    document.querySelector('.container.masonry_img').appendChild(cloneDiv)
                });

                function sort_by(d) {
                    d.forEach(item => {
                        var cloneDiv = divtoClone.cloneNode(true)
                        cloneDiv.querySelector('img').src = item.source
                        cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                        cloneDiv.setAttribute('img_id', item.id)
                        document.querySelector('.container.masonry_img').appendChild(cloneDiv)
                    });
                }

                document.querySelector('.dropdown-item.size').addEventListener('click', () => {
                    document.querySelector('.container.masonry_img').innerHTML = ''
                    sort_by(main.sort((a, b) => {
                        const getSize = (str) => {
                            const [width, height] = str.split(' x ').map(Number);
                            return width * height;
                        };

                        const areaA = getSize(a.size);
                        const areaB = getSize(b.size);

                        // Sắp xếp giảm dần theo diện tích
                        return areaB - areaA;
                    }))
                })

                document.querySelector('.dropdown-item.like').addEventListener('click', () => {
                    document.querySelector('.container.masonry_img').innerHTML = ''
                    sort_by(main.sort((a, b) => {
                        return b.like - a.like;
                    }))
                })

                document.querySelector('.dropdown-item.save').addEventListener('click', () => {
                    document.querySelector('.container.masonry_img').innerHTML = ''
                    sort_by(main.sort((a, b) => {
                        return b.save - a.save;
                    }))
                })
            })

        // Trang chủ - show tag
        fetch('backend/get_data.php?table=tags')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var div = document.createElement('div')
                    div.classList.add('popular-search-item')
                    div.style.cursor = 'pointer'
                    div.innerHTML = `<a class="popular-search-link">${item.name}</a>`
                    div.setAttribute('onclick', `window.location.href="home.html?q=${item.name}"`)
                    document.querySelector('.popular-search-box').appendChild(div)
                });
            })
    }

    if (window.location.href.includes('image_details.html')) {
        var id = new URLSearchParams(window.location.search).get('id')
        if (getCookie('admin'))
            document.querySelector('.fa-solid.fa-trash').classList.remove('d-none')
        else
            document.querySelector('.fa-solid.fa-trash').classList.add('d-none')

        // Chi tiết ảnh - show main 
        fetch('backend/get_data.php?img_info=' + id)
            .then(response => response.json())
            .then(data => {
                item = data[0]
                document.querySelector('img[alt="img_main"]').src = item.source
                document.querySelector('.user-details img').src = item.user_img
                document.querySelector('.my_cmt').src = item.user_img
                document.querySelector('.user-details b').textContent = item.name
                document.querySelector('.details .value').textContent = item.size
                document.querySelector('.form-label.content').textContent += item.content
                document.querySelector('.details .count').textContent = item.save
                document.querySelector('#likebtn').innerHTML += item.like
                let date = item.date.split('-')
                document.querySelector('.details .date').textContent = `${date[2]} Th${date[1]}, ${date[0]}`

                document.querySelector('.row.main').style.opacity = '1'
            })

        // Chi tiết ảnh - show tag
        fetch('backend/get_data.php?table=tags')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var a = document.createElement('a')
                    a.textContent = item.name
                    a.style.cursor = 'pointer'
                    a.setAttribute('onclick', `window.location.href="home.html?q=${item.name}"`)
                    document.querySelector('.popular-search .d-flex').appendChild(a)
                });
            })

        // Chi tiết ảnh - show ảnh xem thêm 
        fetch('backend/get_data.php?table=img')
            .then(response => response.json())
            .then(data => {
                var divtoClone = document.querySelector('.masonry_img .box').cloneNode(true)
                document.querySelector('.masonry_img .box').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.source
                    cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                    cloneDiv.setAttribute('img_id', item.id)
                    document.querySelector('.masonry_img').appendChild(cloneDiv)
                })
            })

        // Chi tiết ảnh - show bình luận 
        fetch('backend/get_data.php?comment=' + id)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.q_cmt').textContent = data.length + ' bình luận'
                var divtoClone = document.querySelector('.cmt.mt-4 .list').cloneNode(true)
                document.querySelector('.cmt.mt-4 .list').remove()
                document.querySelector('.cmt form').action += id
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.user_img
                    cloneDiv.querySelector('strong').textContent = item.name
                    cloneDiv.querySelector('.row span').textContent = item.content
                    cloneDiv.querySelector('a').href = `backend/delete.php?img_id=${id}&comment=${item.id}`
                    document.querySelector('.cmt.mt-4').appendChild(cloneDiv)
                })
            })
    }

    if (window.location.href.includes('user.html')) {
        // Show hình ảnh đã đăng
        fetch('backend/get_data.php?my_img=true')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var divtoClone = document.querySelector('.upload .container.masonry_img .box').cloneNode(true)
                document.querySelector('.upload .container.masonry_img .box').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.source
                    cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                    document.querySelector('.upload .container.masonry_img').appendChild(cloneDiv)
                });
            })

        // show hình ảnh đã thích
        fetch('backend/get_data.php?table=linking_like')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var divtoClone = document.querySelector('.like .container.masonry_img .box').cloneNode(true)
                document.querySelector('.like .container.masonry_img .box').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.source
                    cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                    document.querySelector('.like .container.masonry_img').appendChild(cloneDiv)
                });
            })

        // show hình ảnh đã lưu
        fetch('backend/get_data.php?table=linking_save')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var divtoClone = document.querySelector('.save .container.masonry_img .box').cloneNode(true)
                document.querySelector('.save .container.masonry_img .box').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('img').src = item.source
                    cloneDiv.setAttribute('onclick', `window.location.href="image_details.html?id=${item.id}"`)
                    document.querySelector('.save .container.masonry_img').appendChild(cloneDiv)
                });
            })
    }
})