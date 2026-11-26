function renderAccountNavigation() {
  const accountNav = document.getElementById("account-nav");
  const mobileAccount = document.getElementById("mobile-account");

  if (!accountNav || !mobileAccount) {
    console.warn("Elemen navbar akun tidak ditemukan.");
    return;
  }

  // Baca sesi terbaru setiap kali fungsi dijalankan
  const currentUser = JSON.parse(
    localStorage.getItem("slatemarket-current-user") || "null"
  );

  // Jika belum login
  if (!currentUser) {
    accountNav.innerHTML = `
      <a href="pages/login.html"
         class="text-sm font-semibold hover:text-slate-500">
        Masuk
      </a>
    `;

    mobileAccount.innerHTML = `
      <a href="pages/login.html" class="block py-2">
        Masuk / Daftar
      </a>
    `;

    return;
  }

  // Navbar desktop
  accountNav.innerHTML = `
    <a href="pages/profile.html"
       class="text-sm font-semibold hover:text-slate-500">
      Profil
    </a>

    <a href="pages/orders.html"
       class="text-sm font-semibold hover:text-slate-500">
      Pesanan Saya
    </a>

    <button id="logoutButton"
       class="text-sm font-semibold hover:text-red-500">
      Keluar
    </button>
  `;

  // Navbar mobile
  mobileAccount.innerHTML = `
    <a href="pages/profile.html" class="block py-2">
      Profil Saya
    </a>

    <a href="pages/orders.html" class="block py-2">
      Pesanan Saya
    </a>

    <button id="mobileLogoutButton"
       class="block py-2 font-semibold text-red-500">
      Keluar
    </button>
  `;

  // Tombol logout desktop dan mobile
  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("mobileLogoutButton").addEventListener("click", logout);
}

// Logout
function logout() {
  localStorage.removeItem("slatemarket-current-user");

  // Kembali ke homepage
  window.location.href = "../index.html";
}

// Jalankan saat halaman selesai dimuat
// Jalankan render navbar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderAccountNavigation);
} else {
  renderAccountNavigation();
}