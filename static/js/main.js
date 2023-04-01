// 기능 및 API 위한 JavaScripts 시작
$(document).ready(function () {
    show_guestbook();
});

// 방명록 입력 JavaScript 시작
function guestbook_post() {
    let guest_name = $('#guest_name').val()
    let guest_password = $('#password').val().trim()
    let guest_comment = $('#guest_comment').val()

    if (guest_name.trim() == '') {
        alert('닉네임을 입력해주세요')
    } else if (guest_password.trim() == '') {
        alert('비밀번호를 입력해주세요')
    } else if (guest_comment.trim() == '') {
        alert('댓글내용을 입력해주세요')
    } else {
        let formData = new FormData();
        formData.append("guest_name_give", guest_name);
        formData.append("guest_password_give", guest_password);
        formData.append("guest_comment_give", guest_comment);


        fetch('/guestbook_post', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
            alert(data['msg'])
            window.location.reload()
        })
    }
}
// 방명록 입력 JavaScript 끝

// 작성된 방명록 보여주기 JavaScript 시작
function show_guestbook() {
    fetch('/guestbook_show').then(res => res.json()).then(data => {
        let rows = data['result']
        $('#guest_cards_wrap').empty()
        rows.forEach((a, index) => {
            let guest_name = a['guest_name']
            let guest_password = a['guest_password']
            let guest_comment = a['guest_comment']
            let num = a['num']

            let temp_html = `<div id="guestbox_${index}" class="guestbox">
            <p>
                ${guest_name}</p>
            <div class="comment_box">
                <p>
                    ${guest_comment}</p>
            </div><!-- e:comment_box -->
            <div class="pw">
                <input id="pw${index}" type="password" placeholder="삭제용비밀번호 입력" maxlength="4">
                <button onclick="del_check(${num}, ${index})">
                    삭제</button>
            </div><!-- e:pw -->
        </div><!-- e:guestbox -->`
                            
            $('#guest_cards_wrap').prepend(temp_html)
        })
    })
}
// 작성된 방명록 보여주기 JavaScript 끝

// 방명록 비밀번호 검사 JavaScript 시작
function del_check(num, index) {
    let pwd = $("#pw" + index).val();
    console.log("num : " + num)

    $.ajax({
        type: "GET",
        url: "/get_guestbook_data",
        data: {
            'num_give': num
        },
        success: function (response) {
            num_result = response.result

            for (let i = 0; i < num_result.length; i++) {
                let guestbook = num_result[i];
                let guestbook_num = guestbook.num
                if (num == guestbook_num) {
                    let guestbook_password = guestbook.guest_password
                    if (pwd == guestbook_password) {
                        del_box(num)
                    } else {
                        alert('❤️😍땡!!! 비밀번호를 다시 입력해주세요😍❤️')
                    }
                }
            }
        }
    });
}
// 방명록 비밀번호 검사 JavaScript 끝


// 방명록 삭제 JavaScript 시작
function del_box(num) {

    let formData = new FormData();
    formData.append("num_give", num);

    fetch('/guestbook_del', { method: "DELETE", body: formData }).then(res => res.json()).then(data => {
        alert(data['msg'])
        window.location.reload()
    })
}
// 방명록 삭제 JavaScript 끝

// 기능 및 API 위한 JavaScripts 끝





// CSS를 위한 JavaScripts 시작
// 글꼴 스크립트
(function (d) {
    var config = {
            kitId: 'tnq7lro',
            scriptTimeout: 3000,
            async: true
        },
        h = d.documentElement, t = setTimeout(function () {
            h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout), tk = d.createElement("script"), f = false,
        s = d.getElementsByTagName("script")[0], a;
    h.className += " wf-loading";
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || a && a != "complete" && a != "loaded") return;
        f = true;
        clearTimeout(t);
        try {
            Typekit.load(config)
        } catch (e) {
        }
    };
    s.parentNode.insertBefore(tk, s)
})(document);

// CSS를 위한 JavaScripts 끝