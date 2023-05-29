const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((products) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${products.img}">
          <h3>${products.nombre}</h3>
          <p> $ ${products.precio} </p>
          <span class="restar"> - </span>
          <p>${products.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $ ${products.cantidad * products.precio} </p>
          <span class="delete-products"> ❌ </span>
        `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (products.cantidad !== 1) {
          products.cantidad--;
        }
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        products.cantidad++;
        saveLocal();
        pintarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-products");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(products.id);
      });
  
  
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `El total de tu compra es: $ ${total}`;
  
    modalContainer.append(totalBuying);
  
    const finalizar = document.createElement("button");
    finalizar.innerText = "Finalizar Compra";
    finalizar.className = "btnfinalizar";
  
    modalContainer.append(finalizar)
  
    finalizar.addEventListener("click", (finalizarcompra));
  
  };
  
  
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
  
    carritoCounter();
    saveLocal();
    pintarCarrito();
  };
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  const finalizarcompra = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gracias por su Compra, la misma se realizó con éxito',
      showConfirmButton: true,
      timer: 3000,
    })
  }
  
  carritoCounter();