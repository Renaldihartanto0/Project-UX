// ======================================
// CHECKOUT PAGE
// ======================================


// Mengambil data keranjang
function getCart() {

    return JSON.parse(
        localStorage.getItem("slatemarket-cart")
    ) || [];

}


// Mengambil produk yang dipilih
function getSelectedProducts() {

    return JSON.parse(
        localStorage.getItem("slatemarket-checkout")
    ) || [];

}


// Format harga Rupiah
function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// Elemen HTML
const checkoutProducts =
    document.getElementById("checkoutProducts");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const shippingCostElement =
    document.getElementById("shippingCost");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const placeOrderButton =
    document.getElementById("placeOrderButton");


// Biaya pengiriman simulasi
const SHIPPING_COST = 15000;


// ======================================
// RENDER CHECKOUT
// ======================================

function renderCheckout() {

    const cart = getCart();

    const selectedIds = getSelectedProducts();


    // Mengambil produk yang dipilih saja
    const selectedItems = cart.filter(item =>
        selectedIds.includes(item.id)
    );


    checkoutProducts.innerHTML = "";


    // Jika tidak ada produk
    if (selectedItems.length === 0) {

        checkoutProducts.innerHTML = `

            <div class="py-6 text-center">

                <p class="font-medium text-slate-900">
                    Tidak ada produk untuk checkout.
                </p>

                <a
                    href="cart.html"
                    class="mt-3 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                    Kembali ke Keranjang
                </a>

            </div>

        `;


        placeOrderButton.disabled = true;

        checkoutSubtotal.textContent =
            formatRupiah(0);

        shippingCostElement.textContent =
            formatRupiah(0);

        checkoutTotal.textContent =
            formatRupiah(0);

        return;

    }


    let subtotal = 0;


    selectedItems.forEach(item => {

        const product = PRODUCTS.find(
            product => product.id === item.id
        );


        if (!product) {
            return;
        }


        const itemTotal = product.price * item.qty;

        subtotal += itemTotal;


        const productElement =
            document.createElement("div");


        productElement.className =
            "flex gap-3";


        productElement.innerHTML = `

            <img
                src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=200&q=80"
                alt="${product.name}"
                class="h-16 w-16 rounded-lg object-cover"
            >


            <div class="flex-1">

                <h3 class="text-sm font-medium text-slate-900">
                    ${product.name}
                </h3>

                <p class="mt-1 text-xs text-slate-500">
                    ${item.qty} produk
                </p>

                <p class="mt-1 text-sm font-semibold">
                    ${formatRupiah(itemTotal)}
                </p>

            </div>

        `;


        checkoutProducts.appendChild(productElement);

    });


    // Ongkos kirim
    const shippingCost = SHIPPING_COST;


    // Total pembayaran
    const total = subtotal + shippingCost;


    checkoutSubtotal.textContent =
        formatRupiah(subtotal);


    shippingCostElement.textContent =
        formatRupiah(shippingCost);


    checkoutTotal.textContent =
        formatRupiah(total);


    placeOrderButton.disabled = false;

}


// ======================================
// PLACE ORDER
// ======================================

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const cart = getCart();

    const selectedIds = getSelectedProducts();


    const selectedItems = cart.filter(item =>
        selectedIds.includes(item.id)
    );


    if (selectedItems.length === 0) {

        alert("Tidak ada produk yang dipilih.");

        return;

    }


    // Mengambil data form
    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const customerAddress =
        document.getElementById("customerAddress").value.trim();

    const customerNotes =
        document.getElementById("customerNotes").value.trim();


    const paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    // Validasi
    if (
        customerName === "" ||
        customerPhone === "" ||
        customerAddress === "" ||
        !paymentMethod
    ) {

        alert("Mohon lengkapi informasi checkout.");

        return;

    }


    // Hitung subtotal
    let subtotal = 0;


    selectedItems.forEach(item => {

        const product = PRODUCTS.find(
            product => product.id === item.id
        );


        if (product) {

            subtotal += product.price * item.qty;

        }

    });


    const total = subtotal + SHIPPING_COST;


    // Membuat data pesanan
    const order = {

        orderId: "SM" + Date.now(),

        customer: {

            name: customerName,

            phone: customerPhone,

            address: customerAddress,

            notes: customerNotes

        },

        paymentMethod: paymentMethod.value,

        products: selectedItems,

        subtotal: subtotal,

        shippingCost: SHIPPING_COST,

        total: total,

        status: "Menunggu Pembayaran",

        orderDate: new Date().toISOString()

    };


    // Mengambil pesanan sebelumnya
    const orders = JSON.parse(
        localStorage.getItem("slatemarket-orders")
    ) || [];


    // Menambahkan pesanan baru
    orders.push(order);


    // Menyimpan pesanan
    localStorage.setItem(
        "slatemarket-orders",
        JSON.stringify(orders)
    );


    // Menghapus produk yang sudah dibeli dari cart
    const remainingCart = cart.filter(item =>
        !selectedIds.includes(item.id)
    );


    localStorage.setItem(
        "slatemarket-cart",
        JSON.stringify(remainingCart)
    );


    // Menghapus data checkout sementara
    localStorage.removeItem(
        "slatemarket-checkout"
    );


    // Konfirmasi pesanan
    alert(
        "Pesanan berhasil dibuat!\n\n" +
        "Nomor Pesanan: " + order.orderId + "\n" +
        "Total: " + formatRupiah(total) + "\n" +
        "Metode Pembayaran: " + paymentMethod.value
    );


    // Kembali ke homepage
    window.location.href = "../index.html";

});


// ======================================
// INITIALIZE
// ======================================

renderCheckout();