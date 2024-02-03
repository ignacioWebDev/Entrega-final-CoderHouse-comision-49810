//Inicio de Sesion
//Funcion para registrar al usuario
function login() {
    Swal.fire({
            title: "Registro",
            html:`
                <input type="text" id="userName" class="swal2-input" placeholder="Pon tu nombre" required>
                <input type="text" id="userSurname" class="swal2-input" placeholder="Pon tu apellido" required>
            `,
            confirmButtonText: "Registrarse",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const userRegisterDate = new Date().toDateString();
                const userName = document.getElementById("userName");
                const userSurname = document.getElementById("userSurname");
                localStorage.setItem("USERNAME", userName.value);
                localStorage.setItem("USERSURNAME", userSurname.value);
                localStorage.setItem("USERREGISTERDATE", userRegisterDate);                
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                    });
                    Toast.fire({
                    icon: "success",
                    title: "Registrado exitosamente"
                    });
            }
        })
}

//Declaramos que la verificacion del usuario no existe
let userVerification = false;

//Funcion para comprobar si el usuario ya esta registrado
function accountVerification() {
    if (userVerification === false) {
        login();
        userVerification = true;
        const btnRegistro = document.getElementById("btnRegistro");
        btnRegistro.classList.add("hidden");
        }
    else {
        Swal.fire({
            text: "Usted ya esta registrado! Si quiere cambiar algo vaya a configuracion",
            icon: "question"
        });
    }
}

//Funcion para eliminar cuenta
function removeAccount(){
    if (userVerification === true) {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("USERSURNAME");
        localStorage.removeItem("USERREGISTERDATE");
        alert("Cuenta eliminada correctamente");
        userVerification = false;
        btnRegistro.classList.remove("hidden")
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Para eliminar la cuenta primero tiene que tener una"
        });
    }
}


////////////////////////////////


//Main
//Creacion de array de productos
const PRODUCTS = [
    {id: 1, name: 'Ala para diluir', price: 3500, description: "Ala para diluir de 250ml", image: "./assets/img/ala-diluir.jpeg", quantity: 1},
    {id: 2, name: 'Coca-Cola', price: 1500, description: "Coca-Cola clasica de 2.25l", image: "./assets/img/Coca-Cola.jpg", quantity: 1},
    {id: 3, name: 'Cif Blanco', price: 2000, description: "Cif blanco de 750gr(500ml)", image: "./assets/img/cif-blanco.jpg", quantity: 1},
    {id: 4, name: 'Bimbo Artesano', price: 1600, description: "Bimbo-artesano original de 500gr", image: "./assets/img/bimbo-artesano.jpg", quantity: 1},
    {id: 5, name: 'Cordones Jorgito', price: 500, description: "Cordones Negros Jorgito",image: "./assets/img/cordones-negros-jorgito.jpg", quantity: 1},
    {id: 6, name: 'Zuelo aceite', price: 2499, description: "Aceite oliva Zuelo clasico de 200ml", image: "./assets/img/zuelo-aceite-oliva.jpg", quantity: 1},
    {id: 7, name: 'Pilas Duracell', price: 1289, description: "Pilas Duracell AAA(Triple a)", image: "./assets/img/pilas-duracell.jpg", quantity: 1},
    {id: 8, name: 'Mayonesa Natura', price: 1760, description: "Mayonesa Natura de 250cm3", image: "./assets/img/mayonesa-natura.jpg", quantity: 1}
];

//Creacion de array del carrito
const CART = [];

//Funcion para mostrar los elementos de PRODUCTS
function renderProducts() {
    const ELEMENTCONTAINER = document.getElementById("productsContainer");
    ELEMENTCONTAINER.innerHTML = '';
    PRODUCTS.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
                        <img class="card-img" src="${product.image}">
                        <div class="div-text">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>$${product.price}</p>
                            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                        </div>
                        `;
                        ELEMENTCONTAINER.appendChild(div);
                    });
                }

//Creando el sidebarConfig con configDiv
const configDiv = document.getElementById('sidebarConfig');
configDiv.classList.add("hidden");


//Boton para abrir el panel de configuracion
let btnConfig = document.getElementById("btnConfig");
btnConfig.addEventListener("click", ()=>{
    showConfig();
    let cartTotal = 0;
    CART.forEach(product => {
        const productElement = createProductElement(product);
        configDiv.appendChild(productElement);
        cartTotal += product.price;
    });
    configDiv.innerHTML = `
                        <h2>Configuracion</h2>
                        <p>Nombre: ${localStorage.getItem("USERNAME")}</p>
                        <p>Apellido: ${localStorage.getItem("USERSURNAME")}</p>
                        <p>Se registro en: ${localStorage.getItem("USERREGISTERDATE")}</p>
                        <button onclick="hideConfig()">Ocultar</button>
                        <button onclick="removeAccount()">Eliminar cuenta</button>
                    `

})

//Funcion para ocultar el panel de configuracion
function hideConfig() {
    configDiv.classList.add('hidden')
}

//Funcion para mostrar el panel de la configuracion(sacar la clase hidden) 
function showConfig() {
    if (!cartDiv.classList.contains('hidden')) {
        cartDiv.classList.add('hidden')
    }
    configDiv.classList.remove("hidden");
}

//Ejecuto la renderizacion de los productos
renderProducts();


////////////////////////////////


// CART
//Funcion para vaciar carrito
function emptyCart() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "No lo va a poder revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
        if (result.isConfirmed) {
            if (CART.length <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Para vaciar el carrito primero debes agregar algo alli"
                });
            } else {
                Swal.fire({
                    title: "Eliminado!",
                    text: "El carrito ha sido eliminado",
                    icon: "success"
                });
                CART.length = 0;
                reloadCart();
            }
        }
    });
}

//Funcion para comprar
function buyCart() {
    Swal.fire({
        title: "Queres comprar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero comprarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            if (CART.length <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Para comprar el carrito primero debes agregar algo alli"
                });
            }else {
                Swal.fire({
                    title: "Comprado!",
                    text: "Compraste el carrito! Felicitaciones, gracias por confiar en nosotros. Te va a llegar un mail con informacion mas detallada",
                    icon: "success"
                });
                CART.length = 0;
                reloadCart();
            }
        }
    });
}

//Creando el sidebarCart con cartDiv
let cartDiv = document.getElementById('sidebarCart');
cartDiv.classList.add('hidden');


//Funcion para ocultar el panel del carrito
function hideCart() {
    cartDiv.classList.add("hidden");
}

//Funcion para mostrar el panel del carrito(sacar la clase hidden) 
function showCart() {
    if (!configDiv.classList.contains("hidden")) {
        configDiv.classList.add("hidden");
    }
    cartDiv.classList.remove("hidden");
}


//Funcion para agregar un producto al carrito
function addToCart(productId) {
    const selectedProduct = PRODUCTS.find(product => product.id === productId);
    if (selectedProduct) {
        const existingCartItem = CART.find(item => item.product.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity++; // Si el producto ya está en el carrito, incrementa la cantidad
        } else {
            CART.push({ product: selectedProduct, quantity: 1 }); // Agrega el producto al carrito con cantidad 1
        }
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#aaa",
                color: "#000"
            },
        }).showToast();
        reloadCart();
    }
}


//Funcion para mostrar el nombre y el precio del producto agregado al carrito
function createProductElement(cartItem) {
    const { product, quantity } = cartItem;
    const productParagraph = document.createElement('p');
    productParagraph.textContent = `${quantity} x ${product.name}, $${(product.price * quantity).toFixed(2)}`;
    return productParagraph;
}


//Funcion para cargar los productos al carrito
function reloadCart() {
    showCart();
    cartDiv.textContent = '';
    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Carrito';
    cartDiv.appendChild(cartTitle);
    let cartTotal = 0;
    CART.forEach((cartItem, index) => {
        const productElement = createProductElement(cartItem);
        cartDiv.appendChild(productElement);
        cartTotal += cartItem.product.price * cartItem.quantity;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.removeEventListener('click', () => delElement(index));
        deleteButton.addEventListener('click', () => delElement(index));
        cartDiv.appendChild(deleteButton);
    });
    
    const totalParagraph = document.createElement('p');
    totalParagraph.textContent = `Total: $${cartTotal.toFixed(2)}`;
    cartDiv.appendChild(totalParagraph);
    
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Comprar';
    buyButton.addEventListener('click', buyCart);
    cartDiv.appendChild(buyButton);
    
    const emptyButton = document.createElement('button');
    emptyButton.textContent = 'Vaciar';
    emptyButton.addEventListener('click', emptyCart);
    cartDiv.appendChild(emptyButton);
    
    const hideButton = document.createElement('button');
    hideButton.textContent = 'Ocultar';
    hideButton.addEventListener('click', hideCart);
    cartDiv.appendChild(hideButton);

}

function delElement(index) {
    const cartItem = CART[index];
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        CART.splice(index, 1);
    }
    reloadCart();
}


//Boton para abrir el panel de carrito
const BTNCART = document.getElementById("btnCart");
BTNCART.addEventListener("click", function () {
    reloadCart();
});