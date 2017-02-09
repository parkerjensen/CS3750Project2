
// http://regexlib.com/REDetails.aspx?regexp_id=26
var emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

function comparePasswords() {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    if(confirmPassword.value.length > 0 && password.value == confirmPassword.value) {
        console.log("equal!");
    }
}

function verifyEmail() {
    let email = this.value;
    if(emailRegex.test(email)) {
        console.log("valid email address");
    }
}

function initVerify() {
    document.getElementById("password").addEventListener("keyup", comparePasswords);
    document.getElementById("confirmPassword").addEventListener("keyup", comparePasswords);
    document.getElementById("email").addEventListener("keyup", verifyEmail);
}

window.onload = initVerify;