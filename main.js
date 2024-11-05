let productos = [
    { nombre: "Camisa", precio: 30 },
    { nombre: "Pantalón", precio: 40 },
    { nombre: "Zapatos", precio: 60 },
    { nombre: "Boxer", precio: 20 },
    { nombre: "Corbata", precio: 15 }
];

function seleccionProducto() {
    let productosLista = "Productos disponibles:\n";
    for (let i = 0; i < productos.length; i++) {
        productosLista = productosLista + (i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    
    let seleccion = parseInt(prompt(productosLista + "\n Selecciona el número del producto que deseas comprar:"));
    
    if (isNaN(seleccion) || seleccion < 1 || seleccion > productos.length) {
        alert("Opción no válida. Por favor, selecciona un número válido.");
        return seleccionProducto(); 
    }

    return productos[seleccion - 1];
}

function aplicarDescuento(producto, metodoDePago) {
    let descuento = 0;

    if (metodoDePago === 1) {
        descuento = 10;
    } else if (metodoDePago === 2) {
        descuento = 5;
    }

    const descuentoAcumulado = (producto.precio * descuento) / 100;
    const precioFinal = producto.precio - descuentoAcumulado;

    return { producto, descuento, descuentoAcumulado, precioFinal };

}

function core() {
    alert("Bienvenido al simulador de compra.");
    
    let continuarComprando = true;
    let productosSeleccionados = [];


    while (continuarComprando) {
        const productoSeleccionado = seleccionProducto();
        productosSeleccionados.push(productoSeleccionado); 

        
        continuarComprando = confirm("¿Deseas seleccionar otro producto?");
    }


    let resumen = "Resumen de tu compra:\n";
    let totalCompra = 0;

    for (let i = 0; i < productosSeleccionados.length; i++) {
        resumen = resumen + "Producto: " + productosSeleccionados[i].nombre + "\n" + "Precio: $" + productosSeleccionados[i].precio.toFixed(2) + "\n\n";
        totalCompra = totalCompra + productosSeleccionados[i].precio;
    }

    alert(resumen);


    let metodoDePago;
    let pagoValido = false;

    while (!pagoValido) {
    metodoDePago = parseInt(prompt("¿Cómo deseas pagar?\n1. Efectivo\n2. Tarjeta"));
    
    if (metodoDePago === 1 || metodoDePago === 2) {
        pagoValido = true;
    } else {
        alert("Opción no válida. Por favor, selecciona 1 para Efectivo o 2 para Tarjeta.");
    }
    }

    
    let totalFinal = 0;
    let detalleCompra = "Detalles de tu compra:\n";

    for (let i = 0; i < productosSeleccionados.length; i++) {

        const { producto, descuento, descuentoAcumulado, precioFinal } = aplicarDescuento(productosSeleccionados[i], metodoDePago);

        detalleCompra = detalleCompra + "Producto: " + producto.nombre + "\n" + "Precio original: $" + producto.precio + "\n" + "Descuento aplicado: " + descuento + "% - $" + descuentoAcumulado.toFixed(2) + "\n" + "Precio final: $" + precioFinal + "\n\n";

        totalFinal = totalFinal + precioFinal;
    }

    
    detalleCompra = detalleCompra + "Total final a pagar: $" + totalFinal.toFixed(2);
    alert(detalleCompra);
}

core();
