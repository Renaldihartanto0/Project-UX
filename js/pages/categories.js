// ======================================
// SLATEMARKET - CATEGORIES PAGE
// ======================================


// ======================================
// ELEMENTS
// ======================================

const categoryGrid = document.querySelector("#category-grid");


// ======================================
// RENDER CATEGORIES
// ======================================

function renderCategories() {

    categoryGrid.innerHTML = CATEGORIES
        .map(([name, icon]) => {

            // Hitung jumlah produk dalam kategori
            const totalProducts = PRODUCTS.filter(
                (product) => product.category === name
            ).length;


            return `
                <a
                    href="../index.html?category=${encodeURIComponent(name)}"
                    class="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg"
                >

                    <div class="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-3xl">
                        ${icon}
                    </div>

                    <h2 class="font-bold text-slate-900">
                        ${name}
                    </h2>

                    <p class="mt-2 text-sm text-slate-500">
                        ${totalProducts} produk
                    </p>

                    <span class="mt-4 inline-block text-sm font-bold text-slate-700">
                        Lihat Produk →
                    </span>

                </a>
            `;

        })
        .join("");

}


// ======================================
// INITIALIZE
// ======================================

renderCategories();