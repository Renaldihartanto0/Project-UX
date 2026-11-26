// ======================================
// SLATEMARKET - ORDER HISTORY
// ======================================


// ======================================
// ELEMENTS
// ======================================

const orderList = document.querySelector("#order-list");

const emptyState = document.querySelector("#empty-state");


// ======================================
// FORMAT RUPIAH
// ======================================

function money(n) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);

}


// ======================================
// FORMAT TANGGAL
// ======================================

function formatDate(date) {

    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

}


// ======================================
// GET ORDERS
// ======================================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("slatemarket-orders") || "[]"
    );

}


// ======================================
// RENDER ORDERS
// ======================================

function renderOrders() {

    const orders = getOrders();


    // Jika belum ada pesanan
    if (orders.length === 0) {

        orderList.innerHTML = "";

        emptyState.classList.remove("hidden");

        return;

    }


    emptyState.classList.add("hidden");


    // Render setiap pesanan
    orderList.innerHTML = orders
        .slice()
        .reverse()
        .map((order) => {


            // Ambil produk dari data PRODUCTS
            const productsHTML = order.products
                .map((item) => {

                    const product = PRODUCTS.find(
                        (product) => product.id === item.id
                    );


                    if (!product) {
                        return "";
                    }


                    return `
                        <div class="flex items-center gap-4 border-b py-4 last:border-b-0">

                            <img
                                src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=200&q=80"
                                alt="${product.name}"
                                class="h-16 w-16 rounded-xl bg-slate-100 object-cover"
                                onerror="this.src='https://placehold.co/200x200/f1f5f9/334155?text=Product'"
                            >

                            <div class="flex-1">

                                <h3 class="text-sm font-semibold text-slate-900">
                                    ${product.name}
                                </h3>

                                <p class="mt-1 text-xs text-slate-500">
                                    ${item.qty} barang
                                </p>

                                <p class="mt-1 text-sm font-bold">
                                    ${money(product.price * item.qty)}
                                </p>

                            </div>

                        </div>
                    `;

                })
                .join("");


            return `
                <article class="overflow-hidden rounded-2xl border bg-white shadow-sm">

                    <!-- ORDER HEADER -->
                    <div class="flex flex-wrap items-center justify-between gap-3 border-b bg-slate-50 p-5">

                        <div>

                            <p class="text-xs text-slate-500">
                                Nomor Pesanan
                            </p>

                            <h2 class="mt-1 font-bold text-slate-900">
                                ${order.orderId}
                            </h2>

                            <p class="mt-1 text-xs text-slate-500">
                                ${formatDate(order.orderDate)}
                            </p>

                        </div>


                        <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                            ${order.status}
                        </span>

                    </div>


                    <!-- ORDER PRODUCTS -->
                    <div class="p-5">

                        <h3 class="mb-2 text-sm font-bold text-slate-700">
                            Produk Pesanan
                        </h3>

                        ${productsHTML}

                    </div>


                    <!-- SHIPPING INFORMATION -->
                    <div class="border-t p-5">

                        <h3 class="mb-3 text-sm font-bold text-slate-700">
                            Informasi Pengiriman
                        </h3>

                        <div class="space-y-2 text-sm">

                            <p>
                                <span class="font-semibold">Nama:</span>
                                ${order.customer.name}
                            </p>

                            <p>
                                <span class="font-semibold">Telepon:</span>
                                ${order.customer.phone}
                            </p>

                            <p>
                                <span class="font-semibold">Alamat:</span>
                                ${order.customer.address}
                            </p>

                            <p>
                                <span class="font-semibold">Pembayaran:</span>
                                ${order.paymentMethod}
                            </p>

                            ${
                                order.customer.notes
                                    ? `
                                        <p>
                                            <span class="font-semibold">Catatan:</span>
                                            ${order.customer.notes}
                                        </p>
                                    `
                                    : ""
                            }

                        </div>

                    </div>


                    <!-- ORDER SUMMARY -->
                    <div class="border-t bg-slate-50 p-5">

                        <h3 class="mb-3 text-sm font-bold text-slate-700">
                            Ringkasan Pembayaran
                        </h3>

                        <div class="space-y-2 text-sm">

                            <div class="flex justify-between">
                                <span class="text-slate-500">
                                    Subtotal
                                </span>

                                <span>
                                    ${money(order.subtotal)}
                                </span>
                            </div>


                            <div class="flex justify-between">
                                <span class="text-slate-500">
                                    Ongkir
                                </span>

                                <span>
                                    ${money(order.shippingCost)}
                                </span>
                            </div>


                            <div class="flex justify-between border-t pt-3">

                                <span class="font-bold">
                                    Total Pembayaran
                                </span>

                                <span class="text-lg font-extrabold text-slate-900">
                                    ${money(order.total)}
                                </span>

                            </div>

                        </div>

                    </div>

                </article>
            `;

        })
        .join("");

}


// ======================================
// INITIALIZE
// ======================================

renderOrders();