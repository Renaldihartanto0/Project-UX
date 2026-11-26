// ======================================
// PRODUCT DETAIL PAGE
// ======================================


// Format harga Rupiah
function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// Mengambil ID produk dari URL
const urlParams = new URLSearchParams(
    window.location.search
);

const productId = Number(
    urlParams.get("id")
);


// Mencari produk berdasarkan ID
const product = PRODUCTS.find(
    item => item.id === productId
);


// Elemen HTML
const productDetail =
    document.getElementById("productDetail");

const productDescription =
    document.getElementById("productDescription");

const breadcrumbCategory =
    document.getElementById("breadcrumbCategory");

const breadcrumbName =
    document.getElementById("breadcrumbName");


// ======================================
// PRODUCT NOT FOUND
// ======================================

if (!product) {

    productDetail.innerHTML = `

        <div class="py-12 text-center">

            <div class="mb-4 text-5xl">
                🔍
            </div>

            <h2 class="text-2xl font-bold text-slate-900">
                Produk tidak ditemukan
            </h2>

            <p class="mt-3 text-slate-500">
                Produk yang kamu cari mungkin sudah tidak tersedia.
            </p>

            <a
                href="../index.html"
                class="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
                Kembali ke Beranda
            </a>

        </div>

    `;

    productDescription.textContent =
        "Informasi produk tidak tersedia.";

} else {

    // ======================================
    // RENDER PRODUCT
    // ======================================

    document.title =
        `${product.name} | SlateMarket`;


    breadcrumbCategory.textContent =
        product.category;


    breadcrumbName.textContent =
        product.name;


    productDetail.innerHTML = `

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">


            <!-- PRODUCT IMAGE -->
            <div>

                <img
                    src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=900&q=80"
                    alt="${product.name}"
                    class="h-72 w-full rounded-xl object-cover md:h-96"
                >

            </div>



            <!-- PRODUCT INFORMATION -->
            <div class="flex flex-col">


                <!-- Category -->
                <p class="mb-2 text-sm text-slate-500">
                    ${product.category}
                </p>


                <!-- Name -->
                <h1 class="text-2xl font-bold text-slate-900 md:text-3xl">
                    ${product.name}
                </h1>


                <!-- Rating -->
                <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">

                    <span class="font-medium text-slate-900">
                        ★ ${product.rating}
                    </span>

                    <span class="text-slate-300">
                        |
                    </span>

                    <span class="text-slate-500">
                        ${product.sold} terjual
                    </span>

                </div>



                <!-- Price -->
                <div class="my-6 rounded-xl bg-slate-50 p-5">

                    <p class="mb-2 text-sm text-slate-500">
                        Harga Produk
                    </p>

                    <p class="text-3xl font-bold text-slate-900">
                        ${formatRupiah(product.price)}
                    </p>

                </div>



                <!-- Seller -->
                <div class="mb-6 flex items-center gap-3">

                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                        ${product.seller.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <p class="text-sm text-slate-500">
                            Dijual oleh
                        </p>

                        <p class="font-semibold text-slate-900">
                            ${product.seller}
                        </p>

                    </div>

                </div>



                <!-- Quantity -->
                <div class="mb-6">

                    <p class="mb-3 text-sm font-medium">
                        Jumlah
                    </p>

                    <div class="flex w-fit items-center rounded-lg border border-slate-300">

                        <button
                            id="decreaseQuantity"
                            class="px-4 py-2 hover:bg-slate-100"
                            aria-label="Kurangi jumlah"
                        >
                            −
                        </button>

                        <span
                            id="quantity"
                            class="min-w-12 text-center font-medium"
                        >
                            1
                        </span>

                        <button
                            id="increaseQuantity"
                            class="px-4 py-2 hover:bg-slate-100"
                            aria-label="Tambah jumlah"
                        >
                            +
                        </button>

                    </div>

                </div>



                <!-- Buttons -->
                <div class="mt-auto flex flex-col gap-3 sm:flex-row">

                    <!-- Wishlist Button -->
                    <button
                        id="wishlistButton"
                        class="flex-1 rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                    >
                        ♡ Tambah Wishlist
                    </button>

                    <!-- Add to Cart -->
                    <button
                        id="addToCartButton"
                        class="flex-1 rounded-lg border border-slate-900 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Tambah ke Keranjang
                    </button>

                    <!-- Buy Now -->
                    <button
                        id="buyNowButton"
                        class="flex-1 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        Beli Sekarang
                    </button>

                </div>


                <!-- Toast -->
                <p
                    id="productToast"
                    class="mt-4 hidden rounded-lg bg-green-50 p-3 text-sm text-green-700"
                >
                    Produk berhasil ditambahkan ke keranjang.
                </p>


            </div>

        </div>

    `;



    // ======================================
    // DESCRIPTION
    // ======================================

    productDescription.textContent =
        `${product.name} merupakan produk dari kategori ${product.category}. ` +
        `Produk ini dijual oleh ${product.seller} dengan rating ${product.rating} ` +
        `dan telah terjual sebanyak ${product.sold} kali.`;



    // ======================================
    // PRODUCT INFORMATION
    // ======================================

    document.getElementById("infoCategory").textContent =
        product.category;

    document.getElementById("infoRating").textContent =
        `★ ${product.rating}`;

    document.getElementById("infoSold").textContent =
        `${product.sold} produk`;

    document.getElementById("infoSeller").textContent =
        product.seller;



    // ======================================
    // QUANTITY
    // ======================================

    let quantity = 1;

    const quantityElement =
        document.getElementById("quantity");


    document.getElementById("increaseQuantity")
        .addEventListener("click", function() {

            quantity++;

            quantityElement.textContent =
                quantity;

        });


    document.getElementById("decreaseQuantity")
        .addEventListener("click", function() {

            if (quantity > 1) {

                quantity--;

                quantityElement.textContent =
                    quantity;

            }

        });



    // ======================================
    // ADD TO CART
    // ======================================

    function addToCart() {

        let cart = JSON.parse(
            localStorage.getItem("slatemarket-cart")
        ) || [];


        // Mencari produk yang sudah ada di cart
        const existingProduct = cart.find(
            item => item.id === product.id
        );


        if (existingProduct) {

            // Tambahkan jumlah produk
            existingProduct.qty += quantity;

        } else {

            // Tambahkan produk baru
            cart.push({

                id: product.id,

                qty: quantity

            });

        }


        // Simpan ke localStorage
        localStorage.setItem(
            "slatemarket-cart",
            JSON.stringify(cart)
        );


        // Tampilkan notifikasi
        const toast =
            document.getElementById("productToast");


        toast.classList.remove("hidden");

        toast.textContent =
            `${product.name} berhasil ditambahkan ke keranjang.`;


        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(function() {

            toast.classList.add("hidden");

        }, 3000);

    }

    // ======================================
    // WISHLIST
    // ======================================

    // Mengambil data Wishlist dari localStorage
    let wishlist = JSON.parse(
        localStorage.getItem("slatemarket-wishlist") || "[]"
    );


    // Elemen tombol Wishlist
    const wishlistButton =
        document.getElementById("wishlistButton");


    // Fungsi untuk memperbarui tampilan tombol
    function updateWishlistButton() {

        if (wishlist.includes(product.id)) {

            wishlistButton.textContent = "♥ Hapus dari Wishlist";

            wishlistButton.classList.add("bg-red-50");

        } else {

            wishlistButton.textContent = "♡ Tambah Wishlist";

            wishlistButton.classList.remove("bg-red-50");

        }

    }


    // Event tombol Wishlist
    wishlistButton.addEventListener("click", function() {

        // Jika produk sudah ada di Wishlist
        if (wishlist.includes(product.id)) {

            // Hapus produk dari Wishlist
            wishlist = wishlist.filter(
                id => id !== product.id
            );

            wishlistButton.textContent = "♡ Tambah Wishlist";

            wishlistButton.classList.remove("bg-red-50");

            toastWishlist("Produk dihapus dari Wishlist");

        } else {

            // Tambahkan produk ke Wishlist
            wishlist.push(product.id);

            wishlistButton.textContent = "♥ Hapus dari Wishlist";

            wishlistButton.classList.add("bg-red-50");

            toastWishlist("Produk ditambahkan ke Wishlist");

        }


        // Simpan Wishlist
        localStorage.setItem(
            "slatemarket-wishlist",
            JSON.stringify(wishlist)
        );

    });


    // Notifikasi Wishlist
    function toastWishlist(message) {

        const toast =
            document.getElementById("productToast");

        toast.classList.remove("hidden");

        toast.textContent = message;


        setTimeout(function() {

            toast.classList.add("hidden");

        }, 3000);

    }


    // Tampilkan status Wishlist saat halaman dibuka
    updateWishlistButton();

    // Tombol tambah ke keranjang
    document.getElementById("addToCartButton")
        .addEventListener("click", addToCart);



    // ======================================
    // BUY NOW
    // ======================================

    document.getElementById("buyNowButton")
        .addEventListener("click", function() {

            addToCart();


            // Pilih produk ini untuk checkout
            localStorage.setItem(
                "slatemarket-checkout",
                JSON.stringify([product.id])
            );


            // Arahkan ke checkout
            window.location.href =
                "checkout.html";

        });

}