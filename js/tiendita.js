
var btnSave=document.getElementById("btnSave");
var btnEdit=document.getElementById("btnEdit");

var productos=JSON.parse(localStorage.getItem("productos")) || [];

btnSave.onclick=()=>{
    let txtNombre=document.getElementById("nombre");
    let txtPrecio=document.getElementById("precio");
    let txtCantidad=document.getElementById("cantidad");

    if(txtNombre.value.trim()==="" || txtPrecio.value==="" || txtCantidad.value==="" || Number(txtPrecio.value)<=0 || Number(txtCantidad.value)<1 || !Number.isInteger(Number(txtCantidad.value))){
        alert("ERROR: REVISA LOS CAMPOS");
        return;
    }

    const producto={
        nombre:txtNombre.value.trim(),
        precio:txtPrecio.value,
        cantidad:txtCantidad.value
    }

    productos.push(producto);

    localStorage.setItem("productos",JSON.stringify(productos));

    document.getElementById("addProducto").close();

    txtNombre.value="";
    txtPrecio.value="";
    txtCantidad.value="";

    cargarProductos();
}

btnEdit.onclick=()=>{
    let txtNombre=document.getElementById("nombree");
    let txtPrecio=document.getElementById("precioe");
    let txtCantidad=document.getElementById("cantidade");
    let posicion=document.getElementById("posicion");

    if(txtNombre.value.trim()==="" || txtPrecio.value==="" || txtCantidad.value==="" || Number(txtPrecio.value)<=0 || Number(txtCantidad.value)<1 || !Number.isInteger(Number(txtCantidad.value))){
        alert("ERROR: REVISA LOS CAMPOS");
        return;
    }

    productos[posicion.value].nombre=txtNombre.value.trim();
    productos[posicion.value].precio=txtPrecio.value;
    productos[posicion.value].cantidad=txtCantidad.value;

    localStorage.setItem("productos",JSON.stringify(productos));

    document.getElementById("editProducto").close();

    txtNombre.value="";
    txtPrecio.value="";
    txtCantidad.value="";

    cargarProductos();
}

const cargarProductos=()=>{
    let posicion=0;

    productos=JSON.parse(localStorage.getItem("productos")) || [];

    let tbody=document.getElementById("productos");
    let tabla="";

    productos.map((producto)=>{
        tabla+= `<tr class="text-center">
                    <td><b>${producto.nombre.toUpperCase()}</b></td>
                    <td><b>$ ${parseFloat(producto.precio).toFixed(2)}</b></td>
                    <td><b>${producto.cantidad || 0}</b></td>
                    <td>
                        <button class="btn-solid btn-styled theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash3"></i></button>
                        <button class="btn-solid btn-styled theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>`;

        posicion++;
    })

    tbody.innerHTML=tabla;
}

const editarProducto=(posicion)=>{
    const producto=productos[posicion];

    document.getElementById("nombree").value=producto.nombre;
    document.getElementById("precioe").value=producto.precio;
    document.getElementById("cantidade").value=producto.cantidad || 1;
    document.getElementById("posicion").value=posicion;
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid theme-success mx-5",
        cancelButton: "btn-solid theme-danger"
    },
    buttonsStyling: false
});

const negro = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid btn-styled theme-secondary"
    },
    buttonsStyling: false
});

const eliminarProducto=(posicion)=>{
    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "Estas seguro de eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if(result.isConfirmed){
            productos.splice(posicion,1);

            localStorage.setItem("productos",JSON.stringify(productos));

            cargarProductos();

            negro.fire({
                title: "EXITO!!",
                text: "Se elimino correctamente",
                icon: "success"
            });
        }
    });
}

cargarProductos();
