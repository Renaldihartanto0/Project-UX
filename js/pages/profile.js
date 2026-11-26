
// ======================================
// SLATEMARKET - USER PROFILE
// ======================================


// ======================================
// GET CURRENT USER
// ======================================

const currentUser = JSON.parse(
    localStorage.getItem("slatemarket-current-user") || "null"
);


// ======================================
// CHECK LOGIN
// ======================================

if (!currentUser) {

    alert("Silakan login terlebih dahulu.");

    window.location.href = "login.html";

}


// ======================================
// ELEMENTS
// ======================================

const profileName = document.querySelector("#profile-name");

const profileEmail = document.querySelector("#profile-email");

const profileAvatar = document.querySelector("#profile-avatar");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const profileForm = document.querySelector("#profile-form");

const message = document.querySelector("#message");

const logoutButton = document.querySelector("#logout-button");


// ======================================
// DISPLAY PROFILE
// ======================================

function displayProfile() {

    profileName.textContent = currentUser.name;

    profileEmail.textContent = currentUser.email;


    // Avatar menggunakan huruf pertama nama
    profileAvatar.textContent =
        currentUser.name.charAt(0).toUpperCase();


    // Isi form
    nameInput.value = currentUser.name;

    emailInput.value = currentUser.email;

}


// ======================================
// SHOW MESSAGE
// ======================================

function showMessage(text, success = true) {

    message.textContent = text;

    message.classList.remove("hidden");

    message.className =
        "mb-4 rounded-xl p-3 text-sm " +
        (success
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700");

}


// ======================================
// UPDATE PROFILE
// ======================================

profileForm.onsubmit = (event) => {

    event.preventDefault();


    const newName = nameInput.value.trim();

    const newEmail = emailInput.value.trim().toLowerCase();


    // Ambil daftar akun
    let users = JSON.parse(
        localStorage.getItem("slatemarket-users") || "[]"
    );


    // Cek apakah email sudah digunakan akun lain
    const emailUsed = users.find(
        (user) =>
            user.email === newEmail &&
            user.id !== currentUser.id
    );


    if (emailUsed) {

        showMessage(
            "Email sudah digunakan akun lain.",
            false
        );

        return;

    }


    // Cari akun pengguna
    const userIndex = users.findIndex(
        (user) => user.id === currentUser.id
    );


    if (userIndex === -1) {

        showMessage(
            "Data akun tidak ditemukan.",
            false
        );

        return;

    }


    // Update data akun
    users[userIndex].name = newName;

    users[userIndex].email = newEmail;


    // Simpan daftar akun
    localStorage.setItem(
        "slatemarket-users",
        JSON.stringify(users)
    );


    // Update sesi pengguna
    currentUser.name = newName;

    currentUser.email = newEmail;


    localStorage.setItem(
        "slatemarket-current-user",
        JSON.stringify(currentUser)
    );


    // Update tampilan
    displayProfile();


    showMessage("Profil berhasil diperbarui.");

};


// ======================================
// LOGOUT
// ======================================

logoutButton.onclick = () => {

    const confirmation = confirm(
        "Apakah kamu yakin ingin logout?"
    );


    if (!confirmation) {
        return;
    }


    // Hapus sesi login
    localStorage.removeItem(
        "slatemarket-current-user"
    );


    // Kembali ke homepage
    window.location.href = "../index.html";

};


// ======================================
// INITIALIZE
// ======================================

if (currentUser) {

    displayProfile();

}