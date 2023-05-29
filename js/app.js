const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// localStorage //

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// async await fetch de los productos //

const getProductos = async () => {
  const respuesta = await fetch ("products.json");
  const products = await respuesta.json();
  console.log(products);

  products.forEach((products) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${products.img}">
      <h3>${products.nombre}</h3>
      <p class="price"> $ ${products.precio}</p>
    ` ;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProducts) => repeatProducts.id === products.id);

      // Mensaje de Producto agregado al carrito //

      mensajeAddProduct()

      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === productos.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: products.id,
          img: products.img,
          nombre: products.nombre,
          precio: products.precio,
          cantidad: products.cantidad,
        });

        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();

      }
    });
  });

};

getProductos()


const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mensajeAddProduct = () => {
  Swal.fire({
    text: 'Producto agregado al Carrito',
    timer: 1500,
  })
}