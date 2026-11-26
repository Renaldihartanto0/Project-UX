// ======================================
// CART PAGE
// ======================================


// Mengambil data keranjang dari localStorage
function getCart() {
    return JSON.parse(
        localStorage.getItem("slatemarket-cart")
    ) || [];
}


// Menyimpan data keranjang ke localStorage
function saveCart(cart) {
    localStorage.setItem(
        "slatemarket-cart",
        JSON.stringify(cart)
    );
}


// Format harga menjadi Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}


// Mengambil elemen HTML
const cartItemsContainer = document.getElementById("cartItems");

const cartItemCount = document.getElementById("cartItemCount");

const selectedItemCount = document.getElementById("selectedItemCount");

const subtotalElement = document.getElementById("subtotal");

const totalElement = document.getElementById("total");

const selectAllCheckbox = document.getElementById("selectAll");

const checkoutButton = document.getElementById("checkoutButton");


// Menyimpan produk yang dipilih
let selectedProducts = [];


// ======================================
// RENDER CART
// ======================================

function renderCart() {

    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    let totalQuantity = 0;

    cart.forEach(item => {

        const product = PRODUCTS.find(
            product => product.id === item.id
        );

        // Jika produk tidak ditemukan
        if (!product) {
            return;
        }

        totalQuantity += item.qty;

        const isSelected = selectedProducts.includes(item.id);

        const productElement = document.createElement("div");

        productElement.className =
            "rounded-xl border border-slate-200 bg-white p-4";

        productElement.innerHTML = `

            <div class="flex flex-col gap-4 sm:flex-row">

                <!-- Checkbox -->
                <div class="flex items-start">

                    <input
                        type="checkbox"
                        class="product-checkbox mt-2 h-4 w-4 accent-slate-900"
                        data-id="${product.id}"
                        ${isSelected ? "checked" : ""}
                    >

                </div>


                <!-- Product Image -->
                <img
                    src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=300&q=80"
                    alt="${product.name}"
                    class="h-28 w-full rounded-lg object-cover sm:w-28"
                >


                <!-- Product Information -->
                <div class="flex flex-1 flex-col justify-between">

                    <div>

                        <p class="mb-1 text-xs text-slate-500">
                            ${product.category}
                        </p>

                        <h3 class="font-semibold text-slate-900">
                            ${product.name}
                        </h3>

                        <p class="mt-2 font-bold text-slate-900">
                            ${formatRupiah(product.price)}
                        </p>

                    </div>


                    <!-- Quantity and Delete -->
                    <div class="mt-4 flex items-center justify-between">

                        <div class="flex items-center rounded-lg border border-slate-200">

                            <button
                                class="quantity-button px-3 py-1 hover:bg-slate-100"
                                data-id="${product.id}"
                                data-action="decrease"
                                aria-label="Kurangi jumlah"
                            >
                                −
                            </button>

                            <span class="px-3 text-sm font-medium">
                                ${item.qty}
                            </span>

                            <button
                                class="quantity-button px-3 py-1 hover:bg-slate-100"
                                data-id="${product.id}"
                                data-action="increase"
                                aria-label="Tambah jumlah"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="delete-button text-sm font-medium text-red-500 hover:text-red-700"
                            data-id="${product.id}"
                        >
                            Hapus
                        </button>

                    </div>

                </div>

            </div>

        `;

        cartItemsContainer.appendChild(productElement);

    });


    // Jika keranjang kosong
    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="rounded-xl border border-slate-200 bg-white p-10 text-center">

                <div class="mb-4 text-5xl">
                    🛒
                </div>

                <h2 class="text-xl font-bold text-slate-900">
                    Keranjangmu masih kosong
                </h2>

                <p class="mt-2 text-sm text-slate-500">
                    Yuk, temukan produk yang kamu inginkan.
                </p>

                <a
                    href="../index.html"
                    class="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
                >
                    Mulai Belanja
                </a>

            </div>

        `;

    }


    // Update jumlah produk
    cartItemCount.textContent =
        `${totalQuantity} produk`;


    // Update checkbox select all
    selectAllCheckbox.checked =
        cart.length > 0 &&
        cart.every(item => selectedProducts.includes(item.id));


    // Update ringkasan
    updateSummary();

}


// ======================================
// UPDATE SUMMARY
// ======================================

function updateSummary() {

    const cart = getCart();

    let subtotal = 0;

    let quantity = 0;

    cart.forEach(item => {

        if (!selectedProducts.includes(item.id)) {
            return;
        }

        const product = PRODUCTS.find(
            product => product.id === item.id
        );

        if (!product) {
            return;
        }

        subtotal += product.price * item.qty;

        quantity += item.qty;

    });


    selectedItemCount.textContent =
        `${quantity} produk`;

    subtotalElement.textContent =
        formatRupiah(subtotal);

    totalElement.textContent =
        formatRupiah(subtotal);


    // Checkout hanya aktif jika ada produk yang dipilih
    checkoutButton.disabled = quantity === 0;

}


// ======================================
// SELECT PRODUCT
// ======================================

cartItemsContainer.addEventListener("change", function(event) {

    if (!event.target.classList.contains("product-checkbox")) {
        return;
    }

    const productId = Number(
        event.target.dataset.id
    );

    if (event.target.checked) {

        if (!selectedProducts.includes(productId)) {
            selectedProducts.push(productId);
        }

    } else {

        selectedProducts = selectedProducts.filter(
            id => id !== productId
        );

    }

    renderCart();

});


// ======================================
// SELECT ALL
// ======================================

selectAllCheckbox.addEventListener("change", function() {

    const cart = getCart();

    if (selectAllCheckbox.checked) {

        selectedProducts = cart.map(
            item => item.id
        );

    } else {

        selectedProducts = [];

    }

    renderCart();

});


// ======================================
// CHANGE QUANTITY
// ======================================

cartItemsContainer.addEventListener("click", function(event) {

    const button = event.target.closest(".quantity-button");

    if (!button) {
        return;
    }

    const productId = Number(
        button.dataset.id
    );

    const action = button.dataset.action;

    let cart = getCart();

    cart = cart.map(item => {

        if (item.id === productId) {

            if (action === "increase") {
                item.qty++;
            }

            if (action === "decrease") {
                item.qty--;
            }

        }

        return item;

    });


    // Hapus produk jika jumlahnya 0
    cart = cart.filter(
        item => item.qty > 0
    );


    // Jika produk dihapus karena jumlah 0
    if (!cart.some(item => item.id === productId)) {

        selectedProducts = selectedProducts.filter(
            id => id !== productId
        );

    }


    saveCart(cart);

    renderCart();

});


// ======================================
// DELETE PRODUCT
// ======================================

cartItemsContainer.addEventListener("click", function(event) {

    const button = event.target.closest(".delete-button");

    if (!button) {
        return;
    }

    const productId = Number(
        button.dataset.id
    );

    let cart = getCart();


    // Menghapus produk dari keranjang
    cart = cart.filter(
        item => item.id !== productId
    );


    // Menghapus produk dari daftar pilihan
    selectedProducts = selectedProducts.filter(
        id => id !== productId
    );


    saveCart(cart);

    renderCart();

});


// ======================================
// CHECKOUT
// ======================================

checkoutButton.addEventListener("click", function() {

    if (selectedProducts.length === 0) {
        return;
    }

    // Simpan produk yang dipilih
    localStorage.setItem(
        "slatemarket-checkout",
        JSON.stringify(selectedProducts)
    );

    // Pindah ke halaman checkout
    window.location.href = "checkout.html";

});


// ======================================
// INITIALIZE
// ======================================

renderCart();