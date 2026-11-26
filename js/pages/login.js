// ======================================
// SLATEMARKET - LOGIN & REGISTER
// ======================================


// ======================================
// ELEMENTS
// ======================================

const loginForm = document.querySelector("#login-form");

const registerForm = document.querySelector("#register-form");

const formTitle = document.querySelector("#form-title");

const formSubtitle = document.querySelector("#form-subtitle");

const switchText = document.querySelector("#switch-text");

const switchButton = document.querySelector("#switch-button");

const message = document.querySelector("#message");


// ======================================
// SWITCH LOGIN & REGISTER
// ======================================

let isLogin = true;


switchButton.onclick = () => {

    isLogin = !isLogin;


    // Reset message
    message.classList.add("hidden");


    if (isLogin) {

        // LOGIN MODE
        loginForm.classList.remove("hidden");

        registerForm.classList.add("hidden");


        formTitle.textContent = "Selamat Datang";

        formSubtitle.textContent =
            "Masuk ke akun SlateMarket kamu";


        switchText.textContent =
            "Belum punya akun?";

        switchButton.textContent =
            "Daftar sekarang";

    } else {

        // REGISTER MODE
        loginForm.classList.add("hidden");

        registerForm.classList.remove("hidden");


        formTitle.textContent = "Buat Akun";

        formSubtitle.textContent =
            "Daftar untuk mulai berbelanja";


        switchText.textContent =
            "Sudah punya akun?";

        switchButton.textContent =
            "Login sekarang";

    }

};


// ======================================
// SHOW MESSAGE
// ======================================

function showMessage(text, success = false) {

    message.textContent = text;

    message.classList.remove("hidden");

    message.className =
        "mb-4 rounded-xl p-3 text-sm " +
        (success
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700");

}


// ======================================
// GET USERS
// ======================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("slatemarket-users") || "[]"
    );

}


// ======================================
// REGISTER
// ======================================

registerForm.onsubmit = (event) => {

    event.preventDefault();


    const name =
        document.querySelector("#register-name").value.trim();


    const email =
        document.querySelector("#register-email").value.trim().toLowerCase();


    const password =
        document.querySelector("#register-password").value;


    let users = getUsers();


    // Check existing email
    const existingUser = users.find(
        (user) => user.email === email
    );


    if (existingUser) {

        showMessage("Email sudah terdaftar.");

        return;

    }


    // Create new account
    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

    };


    // Save account
    users.push(newUser);


    localStorage.setItem(
        "slatemarket-users",
        JSON.stringify(users)
    );


    // Save login session
    localStorage.setItem(
        "slatemarket-current-user",
        JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        })
    );


    showMessage(
        "Akun berhasil dibuat! Mengalihkan ke beranda...",
        true
    );


    setTimeout(() => {

        window.location.href = "../index.html";

    }, 1200);

};


// ======================================
// LOGIN
// ======================================

loginForm.onsubmit = (event) => {

    event.preventDefault();


    const email =
        document.querySelector("#login-email").value.trim().toLowerCase();


    const password =
        document.querySelector("#login-password").value;


    const users = getUsers();


    // Find account
    const user = users.find(
        (account) =>
            account.email === email &&
            account.password === password
    );


    // Invalid account
    if (!user) {

        showMessage("Email atau password salah.");

        return;

    }


    // Save login session
    localStorage.setItem(
        "slatemarket-current-user",
        JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    );


    showMessage(
        "Login berhasil! Mengalihkan ke beranda...",
        true
    );


    setTimeout(() => {

        window.location.href = "../index.html";

    }, 1200);

};


// ======================================
// SHOW / HIDE PASSWORD
// ======================================

document.querySelectorAll("[data-toggle]").forEach((button) => {

    button.onclick = () => {

        const inputId = button.dataset.toggle;

        const input = document.querySelector(`#${inputId}`);


        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Sembunyikan";

        } else {

            input.type = "password";

            button.textContent = "Lihat";

        }

    };

});