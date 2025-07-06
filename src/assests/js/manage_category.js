const loadCategory = () => {
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
        console.log(data)
        if (data) {
          const parent = document.getElementById("categoryTableBody");
          data.forEach((ele) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td class="py-3 px-6 text-left whitespace-nowrap">${ele.id}</td>
                    <td class="py-3 px-6 text-left">${ele.name}</td>
                    <td class="py-3 px-6 text-left">
                    <img class="w-20 h-16" src="${ele.icon}">
                    </td>

                    <td class="py-3 px-6 text-left">
                    <div class="flex gap-2">
                    <a href="/src/pages/update_category.html?category_id=${ele.id}" class="bg-green-200  text-green-600 py-1 px-3 rounded-md ">Edit</a>
                    <button class="bg-red-200  text-red-600 py-1 px-3 rounded-md " onclick="deleteCategory(${ele.id})">Delete</button>
                    </div>
                    </td>

                    `;
            parent.appendChild(tr);
          });
        }
      });
  }
};

const addNewCategory = (event) => {
  event.preventDefault();
  const accessToken = localStorage.getItem("access");
  const formData = new FormData(document.getElementById("categoryForm"));
  let categoryMsgDiv = document.getElementById("cat_add_massage");
  categoryMsgDiv.innerHTML = " ";
  if (!accessToken) {
    alert("You are not logged in.!");
    return;
  }

  const imageInput = formData.get("icon");
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
          const imgUrl = data.data.url;
          formData.delete("icon");
          formData.append("icon", imgUrl);

          // Now add category
          fetch("http://127.0.0.1:8000/products/category/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data.id) {
                categoryMsgDiv.style.display = "block";
                categoryMsgDiv.innerHTML = `<p class="p-3">Category added successfull.</p>`;
                setTimeout(() => {
                  window.location.href = "/src/pages/manage_category.html";
                }, 2000);
              } else {
                categoryMsgDiv.style.display = "block";
                categoryMsgDiv.innerHTML = `<p class="p-3">Something went wrong..94</p>`;
              }
            })
            .catch((error) => {
              categoryMsgDiv.style.display = "block";
              categoryMsgDiv.innerHTML = `<p class="p-3">Something went wrong..99</p>`;
            });
        } else {
          alert("Image Upload Failed.!");
        }
      });
  } 
};

const deleteCategory = (id) => {
  const confirmDelete = confirm(`Are you sure delete this category ID = ${id}`);
  if (!confirmDelete) return;

  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    fetch(`http://127.0.0.1:8000/products/category/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Category delete successful");
          window.location.reload();
        } else {
          alert("Failed to delete category..");
        }
      })
      .catch((error) => {
        alert("Something went wrong.....");
      });
  }
};

const UpdateCategory = async (event) => {
  event.preventDefault();

  const category_id = new URLSearchParams(window.location.search).get("category_id");
  const accessToken = localStorage.getItem("access");
  const form = document.getElementById("categoryUpdateForm");
  const formData = new FormData(form);
  const updateMsgDiv = document.getElementById("cat_update_massage");
  updateMsgDiv.innerHTML = "";

  if (!accessToken) {
    alert("You are not logged in.!");
    return;
  }

  const imageInput = formData.get("icon");

  try {
    if (imageInput?.name) {
      // Image upload 
      const imgFormData = new FormData();
      imgFormData.append("image", imageInput);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=5d73580189900a06ec19f27044f747fe`,
        {
          method: "POST",
          body: imgFormData,
        }
      );
      const imgData = await imgRes.json();

      if (!imgData.success) {
        alert("Image Upload Failed.!");
        return;
      }

      formData.set("icon", imgData.data.url);
    } else {
     
      formData.delete("icon");
    }

    // category update PATCH request
    const res = await fetch(`http://127.0.0.1:8000/products/category/${category_id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.id) {
      updateMsgDiv.style.display = "block";
      updateMsgDiv.innerHTML = `<p class="p-3">Category Update successful.</p>`;

      setTimeout(() => {
        window.location.href = "/src/pages/manage_category.html";
      }, 2000);
    } else {
      updateMsgDiv.style.display = "block";
      updateMsgDiv.innerHTML = `<p class="p-3">Category Update Failed.</p>`;
    }
  } catch (error) {
    updateMsgDiv.style.display = "block";
    updateMsgDiv.innerHTML = `<p class="p-3">Something went wrong...</p>`;
    console.error(error);
  }
};


const showCategoryData = () => {
  const category_id = new URLSearchParams(window.location.search).get(
    "category_id"
  );
  const accessToken = localStorage.getItem("access");

  if (accessToken && category_id) {
    fetch(`http://127.0.0.1:8000/products/category/${category_id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        document.getElementById("category_name").value = data.name;
      });
  }
};

window.onload = showCategoryData();
loadCategory();
