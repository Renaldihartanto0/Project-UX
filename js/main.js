// ======================================
// SLATEMARKET - MAIN JAVASCRIPT
// ======================================


// ======================================
// FORMAT RUPIAH
// ======================================

const money = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);


// ======================================
// GLOBAL VARIABLES
// ======================================

// Membaca kategori dari URL, misalnya ?category=Elektronik
const params = new URLSearchParams(window.location.search);

let category = params.get("category") || "";
let term = "";

const grid = document.querySelector("#product-grid");


// ======================================
// RENDER CATEGORY
// ======================================

document.querySelector("#category-list").innerHTML =
    CATEGORIES.map(
        ([name, icon]) => `
            <button
                data-cat="${name}"
                class="rounded-2xl border bg-white p-4 text-left transition hover:border-slate-500 hover:shadow-lg"
            >

                <span class="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-2xl">
                    ${icon}
                </span>

                <b class="mt-3 block text-sm">
                    ${name}
                </b>

                <span class="text-xs text-slate-500">
                    Jelajahi kategori
                </span>

            </button>
        `
    ).join("");


// ======================================
// CATEGORY BUTTON
// ======================================

document.querySelectorAll("[data-cat]").forEach((button) => {

    button.onclick = () => {

        category =
            category === button.dataset.cat
                ? ""
                : button.dataset.cat;

        render();

        document.querySelector("#products").scrollIntoView({
            behavior: "smooth",
        });

    };

});


// ======================================
// RENDER PRODUCTS
// ======================================

function render() {

    // Filter produk berdasarkan kategori dan pencarian
    let list = PRODUCTS.filter(
        (product) =>
            (!category || product.category === category) &&
            product.name.toLowerCase().includes(term.toLowerCase())
    );


    // Sorting produk
    const sort = document.querySelector("#sort").value;


    if (sort === "low") {
        list.sort((a, b) => a.price - b.price);
    }


    if (sort === "high") {
        list.sort((a, b) => b.price - a.price);
    }


    // Render product cards
    grid.innerHTML = list
        .map(
            (product) => `

                <article
                    class="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >

                    <!-- PRODUCT DETAIL LINK -->
                    <a
                        href="pages/product-detail.html?id=${product.id}"
                        class="block"
                    >

                        <!-- Product Image -->
                        <img
                            class="product-img w-full bg-slate-100"
                            loading="lazy"
                            alt="${product.name}"
                            src="https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=600&q=80"
                            onerror="this.src='https://placehold.co/500x500/f1f5f9/334155?text=Product'"
                        >


                        <!-- Product Information -->
                        <div class="p-3">

                            <h3 class="min-h-10 text-sm font-semibold">
                                ${product.name}
                            </h3>

                            <b class="mt-2 block">
                                ${money(product.price)}
                            </b>


                            <!-- Rating and Sold -->
                            <div class="mt-2 flex justify-between text-xs text-slate-500">

                                <span>
                                    ⭐ ${product.rating}
                                </span>

                                <span>
                                    ${product.sold} terjual
                                </span>

                            </div>


                            <!-- Seller -->
                            <p class="mt-2 text-xs text-slate-500">
                                ${product.seller}
                            </p>

                        </div>

                    </a>


                    <!-- WISHLIST AND CART BUTTON -->
                    <div class="flex gap-2 px-3 pb-3">

                        <!-- Wishlist Button -->
                        <button
                            data-wishlist="${product.id}"
                            class="flex-1 rounded-lg border border-slate-300 py-2 text-xs font-bold transition hover:border-red-500 hover:text-red-500"
                        >
                            ♡ Favorit
                        </button>


                        <!-- Add to Cart Button -->
                        <button
                            data-add="${product.id}"
                            class="flex-1 rounded-lg border py-2 text-xs font-bold transition hover:bg-slate-900 hover:text-white"
                        >
                            + Keranjang
                        </button>

                    </div>

                </article>

            `
        )
        .join("");


    // Empty state
    document.querySelector("#empty").classList.toggle(
        "hidden",
        list.length > 0
    );


    // Filter label
    document.querySelector("#filter-label").textContent = [
        category,
        term ? `Pencarian: ${term}` : "",
    ]
        .filter(Boolean)
        .join(" · ");


    // ======================================
    // EVENT BUTTON ADD TO CART
    // ======================================

    grid.querySelectorAll("[data-add]").forEach((button) => {

        button.onclick = () => {

            add(Number(button.dataset.add));

        };

    });


    // ======================================
    // EVENT BUTTON WISHLIST
    // ======================================

    grid.querySelectorAll("[data-wishlist]").forEach((button) => {

        button.onclick = () => {

            toggleWishlist(Number(button.dataset.wishlist));

        };

    });

}


// ======================================
// ADD TO CART
// ======================================

function add(id) {

    let cart = JSON.parse(
        localStorage.getItem("slatemarket-cart") || "[]"
    );


    // Cari produk di keranjang
    let item = cart.find(
        (product) => product.id === id
    );


    // Jika produk sudah ada, tambah quantity
    if (item) {

        item.qty++;

    } else {

        // Jika belum ada, masukkan produk baru
        cart.push({
            id: id,
            qty: 1,
        });

    }


    // Simpan keranjang
    localStorage.setItem(
        "slatemarket-cart",
        JSON.stringify(cart)
    );


    // Update cart counter
    count();


    // Notifikasi
    toast("Produk ditambahkan ke keranjang");

}


// ======================================
// TOGGLE WISHLIST
// ======================================

function toggleWishlist(id) {

    let wishlist = JSON.parse(
        localStorage.getItem("slatemarket-wishlist") || "[]"
    );


    // Cek apakah produk sudah ada di wishlist
    if (wishlist.includes(id)) {

        // Hapus produk dari wishlist
        wishlist = wishlist.filter(
            (productId) => productId !== id
        );

        toast("Produk dihapus dari Wishlist");

    } else {

        // Tambahkan produk ke wishlist
        wishlist.push(id);

        toast("Produk ditambahkan ke Wishlist");

    }


    // Simpan wishlist
    localStorage.setItem(
        "slatemarket-wishlist",
        JSON.stringify(wishlist)
    );

}


// ======================================
// CART COUNTER
// ======================================

function count() {

    let cart = JSON.parse(
        localStorage.getItem("slatemarket-cart") || "[]"
    );


    const total = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );


    document.querySelector("#cart-count").textContent =
        total;

}


// ======================================
// TOAST NOTIFICATION
// ======================================

let timer;


function toast(message) {

    let element = document.querySelector("#toast");


    element.textContent = message;

    element.classList.remove("opacity-0");

    element.classList.add("opacity-100");


    clearTimeout(timer);


    timer = setTimeout(() => {

        element.classList.add("opacity-0");

        element.classList.remove("opacity-100");

    }, 2200);

}


// ======================================
// SEARCH
// ======================================

function search(value) {

    term = value.trim();

    render();

}


// ======================================
// DESKTOP SEARCH
// ======================================

document.querySelector("#search-form").onsubmit = (event) => {

    event.preventDefault();


    search(
        document.querySelector("#search-input").value
    );


    document.querySelector("#products").scrollIntoView({
        behavior: "smooth",
    });

};


// ======================================
// MOBILE SEARCH
// ======================================

document.querySelector("#mobile-search").onsubmit = (event) => {

    event.preventDefault();


    search(
        document.querySelector("#mobile-input").value
    );


    document.querySelector("#products").scrollIntoView({
        behavior: "smooth",
    });

};


// ======================================
// REALTIME DESKTOP SEARCH
// ======================================

document.querySelector("#search-input").oninput = (event) => {

    document.querySelector("#mobile-input").value =
        event.target.value;


    search(event.target.value);

};


// ======================================
// REALTIME MOBILE SEARCH
// ======================================

document.querySelector("#mobile-input").oninput = (event) => {

    document.querySelector("#search-input").value =
        event.target.value;


    search(event.target.value);

};


// ======================================
// SORTING
// ======================================

document.querySelector("#sort").onchange = render;


// ======================================
// RESET FILTER
// ======================================

document.querySelector("#reset").onclick = () => {

    term = "";

    category = "";


    document.querySelector("#search-input").value = "";

    document.querySelector("#mobile-input").value = "";


    render();

};


// ======================================
// MOBILE MENU
// ======================================

document.querySelector("#menu-button").onclick = (event) => {

    let menu = document.querySelector("#mobile-menu");


    let opened =
        menu.classList.toggle("hidden") === false;


    event.currentTarget.setAttribute(
        "aria-expanded",
        String(opened)
    );


    event.currentTarget.setAttribute(
        "aria-label",
        opened ? "Tutup menu" : "Buka menu"
    );

};


// ======================================
// INITIALIZE
// ======================================

render();

count();


// ======================================
// CATEGORY FROM URL
// ======================================

// Scroll ke bagian produk jika kategori berasal dari halaman kategori.
if (category) {

    document.querySelector("#products").scrollIntoView({
        behavior: "smooth",
    });

}