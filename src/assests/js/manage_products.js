const handleAllProducts = () => {
  const accessToken = localStorage.getItem("access");
  const searchInput = document.getElementById("product_filterField");
  const search_product = searchInput ? searchInput.value : "";
  let url = `http://127.0.0.1:8000/products/my-products/`;
  if (search_product) {
    url += `?search=${search_product}`;
  }
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        alert("No Product Found");
        return
      }

      const parent = document.getElementById("ProductsTableBody");
      parent.innerHTML = " ";
      data.forEach((ele) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${ele.id}</td>
            <td class="py-3 px-6 text-left">${ele.category_name}</td>
            <td class="py-3 px-6 text-left">${ele.name}</td>
            <td class="py-3 px-6 text-left">$${ele.price}</td>
            <td class="py-3 px-6 text-left">${ele.quantity}</td>
            <td class="py-3 px-6 text-left"><a href="${ele.image}">${ele.image}</a></td>
            <td class="py-3 px-6 text-left">${ele.is_available}</td>
            <td class="py-3 px-6 text-left">
            <a href="/src/pages/productDetails.html?product_id=${ele.id}" class="text-blue-600">Details</a>
            </td>
            
            <td class="py-3 px-6 text-left flex gap-2">
            <a href="/src/pages/update_products.html?product_id=${ele.id}">
            <button class="bg-green-200  text-green-600 py-1 px-3 rounded-full text-base">Edit</button>
            </a>
            
            <button class="bg-red-200  text-red-600 py-1 px-3 rounded-full text-base" onclick="DeleteProduct(${ele.id})">Delete</button>
            </td>

            `;
        parent.appendChild(tr);
      });
    });
};

const loadProductCategory = () => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    fetch("http://127.0.0.1:8000/products/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const categoryDiv = document.getElementById("category_filed");

        data.forEach((ele) => {
          const option = document.createElement("option");
          option.value = ele.id;
          option.textContent = ele.name;
          categoryDiv.appendChild(option);
        });
      });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  handleAllProducts();
  loadProductCategory();

  const form = document.getElementById("addProductForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      const accessToken = localStorage.getItem("access");

      if(!accessToken){
        alert('You are not logged in.!')
        return
      }
      const imageInput = formData.get("image");

      if (imageInput) {
        const imgFormData = new FormData();
        imgFormData.append("image", imageInput);
        fetch(
          `https://api.imgbb.com/1/upload?key=5d73580189900a06ec19f27044f747fe`,
          {
            method: "POST",
            body: imgFormData,
          }
        )
          .then((res) => res.json())
          .then((data) => {

            if (data.success) {
              const imageUrl = data.data.url;
              formData.delete("image");
              formData.append("image", imageUrl);

              fetch("http://127.0.0.1:8000/products/list/", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
              })
                .then((res) => {
                  if (res.ok) {
                    document.getElementById(
                      "product_add_massage"
                    ).style.display = "block";
                    document.getElementById(
                      "product_add_massage"
                    ).innerHTML = `<p>Product added successfully!</p>`;
                    return res.json();
                  } else {
                    document.getElementById(
                      "product_add_massage"
                    ).style.display = "block";
                    document.getElementById(
                      "product_add_massage"
                    ).innerHTML = `<p style="color:red;">Failed to add product!</p>`;
                    return Promise.reject("Failed");
                  }
                })
                .then((data) => {
                  handleAllProducts();
                  form.reset();
                });
            }
          });
      }
    });
  }
});

const showProductInfo = () => {
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    fetch(`http://127.0.0.1:8000/products/my-products/${product_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          document.getElementById("title").value = data.title;
          document.getElementById("name").value = data.name;
          document.getElementById("description").value = data.description;
          document.getElementById("category_filed").value = data.category;
          document.getElementById("price").value = data.price;
          document.getElementById("quantity").value = data.quantity;
          document.getElementById("discount").value = data.discount_percentages;
          document.getElementById("is_available").value =
            data.is_available.toString();
          document.getElementById("existing_image").src = data.image;
        }
      });
  }
};
showProductInfo();

const updateProduct = async (event) => {
  event.preventDefault();
  const product_id = new URLSearchParams(window.location.search).get(
    "product_id"
  );
  const accessToken = localStorage.getItem("access");
  const form = document.getElementById("updateProductForm");
  const formData = new FormData(form);
  const imgInput = formData.get("image");
  const msgDiv = document.getElementById("product_update_massage");

  msgDiv.innerHTML = "";
  msgDiv.style.display = "none";

  if (!accessToken) return alert("You are not logged in.!");

  try {
    if (imgInput?.name) {
      const imgFormData = new FormData();
      imgFormData.append("image", imgInput);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=5d73580189900a06ec19f27044f747fe`,
        {
          method: "POST",
          body: imgFormData,
        }
      );

      const imgData = await imgRes.json();

      if (!imgData.success) {
        alert("Image upload failed!");
        return;
      }

      formData.set("image", imgData.data.url);
    } else {
      formData.delete("image");
    }

    const res = await fetch(
      `http://127.0.0.1:8000/products/my-products/${product_id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      msgDiv.style.display = "block";
      msgDiv.innerHTML = `<p class="text-green-600">Product updated successfully!</p>`;
      console.log("Updated product:", data);

      setTimeout(() => {
        window.location.href = "/src/pages/manage_products.html";
      }, 2000);
    } else {
      msgDiv.style.display = "block";
      msgDiv.innerHTML = `<p class="text-red-600">Failed to update product!</p>`;
    }
  } catch (err) {
    console.error("Error:", err);
    msgDiv.style.display = "block";
    msgDiv.innerHTML = `<p class="text-red-600">Something went wrong!</p>`;
  }
};

const DeleteProduct = (id) => {
  const confirmDelete = confirm("Are you sure delete this product");
  if (!confirmDelete) {
    return;
  }
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    fetch(`http://127.0.0.1:8000/products/my-products/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Product delete successfull.");
          handleAllProducts();
        } else {
          alert("Failed to delete product.");
        }
      })
      .catch((error) => {
        alert("Something went wrong..");
      });
  }
};
