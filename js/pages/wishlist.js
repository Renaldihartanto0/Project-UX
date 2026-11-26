// ======================================
// WISHLIST PAGE
// ======================================


// Format harga Rupiah
function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// Mengambil wishlist dari localStorage
function getWishlist() {

    return JSON.parse(
        localStorage.getItem("slatemarket-wishlist")
    ) || [];

}


// Menyimpan wishlist
function saveWishlist(wishlist) {

    localStorage.setItem(
        "slatemarket-wishlist",
        JSON.stringify(wishlist)
    );

}


// Elemen HTML
const wishlistGrid =
    document.getElementById("wishlist-grid");

const wishlistEmpty =
    document.getElementById("wishlist-empty");


// ======================================
// RENDER WISHLIST
// ======================================

function renderWishlist() {

    const wishlist = getWishlist();


    // Mencari data produk berdasarkan ID
    const wishlistProducts = PRODUCTS.filter(product =>
        wishlist.includes(product.id)
    );


    wishlistGrid.innerHTML = "";


    // Jika wishlist kosong
    if (wishlistProducts.length === 0) {

        wishlistEmpty.classList.remove("hidden");

        wishlistGrid.classList.add("hidden");

        return;

    }


    wishlistEmpty.classList.add("hidden");

    wishlistGrid.classList.remove("hidden");


    // Render produk
    wishlistGrid.innerHTML = wishlistProducts
        .map(product => `

            <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">


                <!-- PRODUCT DETAIL -->
                <a href="product-detail.html?id=${product.id}">

                    <img
                        src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=600&q=80"
                        alt="${product.name}"
                        class="product-img w-full bg-slate-100"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/500x500/f1f5f9/334155?text=Product'"
                    >


                    <div class="p-3">

                        <h3 class="min-h-10 text-sm font-semibold text-slate-900">
                            ${product.name}
                        </h3>

                        <b class="mt-2 block">
                            ${formatRupiah(product.price)}
                        </b>

                        <div class="mt-2 flex justify-between text-xs text-slate-500">

                            <span>
                                ⭐ ${product.rating}
                            </span>

                            <span>
                                ${product.sold} terjual
                            </span>

                        </div>

                        <p class="mt-2 text-xs text-slate-500">
                            ${product.seller}
                        </p>

                    </div>

                </a>


                <!-- ACTION BUTTONS -->
                <div class="flex gap-2 px-3 pb-3">

                    <button
                        data-remove="${product.id}"
                        class="flex-1 rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-500 hover:text-red-500"
                    >
                        Hapus
                    </button>

                    <button
                        data-add="${product.id}"
                        class="flex-1 rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                    >
                        + Keranjang
                    </button>

                </div>

            </article>

        `)
        .join("");


    // Event tombol hapus
    wishlistGrid.querySelectorAll("[data-remove]").forEach(button => {

        button.onclick = () => {

            removeWishlist(
                Number(button.dataset.remove)
            );

        };

    });


    // Event tombol tambah ke keranjang
    wishlistGrid.querySelectorAll("[data-add]").forEach(button => {

        button.onclick = () => {

            addToCart(
                Number(button.dataset.add)
            );

        };

    });

}


// ======================================
// REMOVE WISHLIST
// ======================================

function removeWishlist(id) {

    let wishlist = getWishlist();


    wishlist = wishlist.filter(
        productId => productId !== id
    );


    saveWishlist(wishlist);

    renderWishlist();

}


// ======================================
// ADD TO CART
// ======================================

function addToCart(id) {

    let cart = JSON.parse(
        localStorage.getItem("slatemarket-cart")
    ) || [];


    const existingProduct = cart.find(
        item => item.id === id
    );


    if (existingProduct) {

        existingProduct.qty++;

    } else {

        cart.push({
            id: id,
            qty: 1
        });

    }


    localStorage.setItem(
        "slatemarket-cart",
        JSON.stringify(cart)
    );


    alert("Produk berhasil ditambahkan ke keranjang.");

}


// ======================================
// INITIALIZE
// ======================================

renderWishlist();