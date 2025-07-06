const loadCategory = () => {
  fetch("http://127.0.0.1:8000/products/category/")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("cat_loader").style.display = "none";
      const parent = document.getElementById("all_category");
      data.forEach((element) => {
        const categoryCard = document.createElement("div");
        categoryCard.className =
          "border w-40 p-2 h-36 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer";
        categoryCard.innerHTML = `
                <img class="w-full h-24" src="${element.icon}" alt="">
                <h3 class="font-semibold">${element.name}</h3>
            `;
        parent.appendChild(categoryCard);

        categoryCard.addEventListener("click", () => {
          window.location.href = `./src/pages/categoryDetails.html?product_category=${element.name}`;
        });
      });
    });
};

const loadProductCategoryWise = () => {
  const searchValue = new URLSearchParams(window.location.search).get("search");
  const product_category = new URLSearchParams(window.location.search).get(
    "product_category"
  );
  const min_price = new URLSearchParams(window.location.search).get(
    "min_price"
  );
  const max_price = new URLSearchParams(window.location.search).get(
    "max_price"
  );

  // let url = `http://127.0.0.1:8000/products/list/?category=${product_category}`
  let url = `http://127.0.0.1:8000/products/list/?`;

  if (product_category && searchValue) {
    url += `category=${product_category}&search=${searchValue}`;
  } else if (searchValue) {
    url += `search=${searchValue}`;
  } else {
    url += `category=${product_category}`;
  }

  if (min_price & max_price) {
    url += `&min_price=${min_price}&max_price=${max_price}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const parent = document.getElementById("category_wise_product");
      if (data.length == 0) {
        parent.innerHTML = `<p class="text-2xl sm:text-center italic flex justify-center"> No Product Found</p>`;
      }
      data.forEach((product) => {
        const catwise_productCard = document.createElement("div");
        catwise_productCard.className =
          "w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white";

        catwise_productCard.innerHTML = `
            <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${product.name}</h2>
            <img src="${product.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${product.price}</h4>
            </div>
            `;
        parent.appendChild(catwise_productCard);

        catwise_productCard.addEventListener("click", () => {
          window.location.href = `/src/pages/productDetails.html?product_id=${product.id}`;
        });
      });
    });
};

const handleFilter = () => {
  const MinValue = document.getElementById("min_value").value;
  const MaxValue = document.getElementById("max_value").value;
  const product_category = new URLSearchParams(window.location.search).get(
    "product_category"
  );
  const searchValue = new URLSearchParams(window.location.search).get("search");

  if (searchValue) {
    if (MinValue && MaxValue) {
      window.location.href = `/src/pages/categoryDetails.html?search=${searchValue}&min_price=${MinValue}&max_price=${MaxValue}`;
    }
  } else if (MinValue && MaxValue) {
    window.location.href = `/src/pages/categoryDetails.html?product_category=${product_category}&min_price=${MinValue}&max_price=${MaxValue}`;
  }
};

const handleSearchField = () => {
  const searchValue = document.getElementById("searchField").value;
  if (searchValue) {
    window.location.href = `/src/pages/categoryDetails.html?search=${searchValue}`;
  }
};

loadCategory();
loadProductCategoryWise();
