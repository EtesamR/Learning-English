function login_or_no() {
    if (localStorage.getItem("user_inf")) {
        window.location.href = "../html/menu.html"
    }
}