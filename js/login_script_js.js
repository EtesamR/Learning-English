function login_user(inp1,inp2,inp3) {

    const fname = document.getElementById(inp1).value
    const password = document.getElementById(inp2).value
    const age = document.getElementById(inp3).value

    const user_info = [fname, password, age]
    localStorage.setItem("user_inf", user_info)
    window.location.href = "../html/menu.html"

}