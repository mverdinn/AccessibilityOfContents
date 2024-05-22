// Array para almacenar los usuarios
let users = [];
let editIndex = null;

function mostrarUsuarios() {
    const lista = document.getElementById("Lista");
    lista.innerHTML = '';
  
    for (var i = 0; i < users.length; i++){
      // Crear un nuevo elemento li
      var elementoLi = document.createElement("li");
      var elementoBr = document.createElement("br");
      // Asignar el texto con los datos del usuario al elemento li
      elementoLi.textContent = "Nombre: " + users[i].nombre + " - " + users[i].edad + " años" + " - Posición: " + users[i].pos;
      
      // Agregar datos de checkbox
      elementoLi.textContent += " - Complementos: " + users[i].complementos.join(", ");
      // Agregar datos de radiobutton
      elementoLi.textContent += " - Estadio: " + users[i].estadio;
      // Agregar datos del select
      elementoLi.textContent += " - Equipo: " + users[i].equipo;
      // Agregar el elemento li a la lista
      lista.appendChild(elementoLi);
    }
}

function displayUsers() { 
    // Obtiene el elemento HTML con el id 'userList'
    const userList = document.getElementById('userList');
    // Limpia el contenido del elemento HTML
    userList.innerHTML = '';
    
    // Itera sobre cada usuario en el arreglo 'users'
    users.forEach((user, index) => {
        // Inserta una nueva fila en la tabla
        const row = userList.insertRow();
        // Inserta una celda para el nombre del usuario en la fila creada
        const cellNombre = row.insertCell(0);
        // Inserta una celda para la edad del usuario en la fila creada
        const cellEdad = row.insertCell(1);
        // Inserta una celda para la posición del usuario en la fila creada
        const cellPos = row.insertCell(2);
        // Inserta una celda para los complementos del usuario en la fila creada
        const cellComplementos = row.insertCell(3);
        // Inserta una celda para el estadio del usuario en la fila creada
        const cellEstadio = row.insertCell(4);
        // Inserta una celda para el equipo del usuario en la fila creada
        const cellEquipo = row.insertCell(5);
        // Inserta una celda para los botones de acciones en la fila creada
        const cellActions = row.insertCell(6);

        // Asigna el nombre, edad y posición del usuario a la celda correspondiente
        cellNombre.textContent = user.nombre;
        cellEdad.textContent = user.edad;
        cellPos.textContent = user.pos;
        // Muestra los complementos como una lista separada por comas
        cellComplementos.textContent = user.complementos.join(", ");
        // Asigna el estadio del usuario a la celda correspondiente
        cellEstadio.textContent = user.estadio;
        // Asigna el equipo del usuario a la celda correspondiente
        cellEquipo.textContent = user.equipo;



        // Crea un botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'deleteButton'; // Agrega la clase deleteButton para css
        // Define el evento onclick para eliminar el usuario
        deleteButton.onclick = () => deleteUser(index);
        
        // Crea un botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'editButton'; // Agrega la clase editButton para css
        // Define el evento onclick para editar el usuario
        editButton.onclick = () => editUser(index);

        // Agrega los botones de eliminar y editar a la celda de acciones
        cellActions.appendChild(deleteButton);
        cellActions.appendChild(editButton);
    });
}


// Función para agregar un nuevo usuario
document.getElementById('addForm').addEventListener('submit', function(event) {
    var confirmacion = confirm("¿Estás seguro de que deseas agregar este jugador?");
    if (confirmacion) { 
        event.preventDefault(); // Evitar que el formulario se envíe, se envía mediante JS
        // Los datos que se van a agregar
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const pos = document.getElementById('pos').value;
        // Capturar los valores de los checkbox
        const equipo = document.getElementById('equipo').value;
        const salsaVerde = document.getElementById('Nike').checked ? "Nike" : "";
        const salsaRoja = document.getElementById('Adidas').checked ? "Adidas" : "";
        // Capturar el valor del radio button del estadio seleccionado
        const estadioSeleccionado = document.querySelector('input[name="estadios"]:checked');
        const estadio = estadioSeleccionado ? estadioSeleccionado.value : ""; // Obtener el valor del estadio o un string vacío si no se seleccionó ninguno
        // Almacenar los complementos en un array
        const complementos = [];
        if (salsaVerde !== "") complementos.push(salsaVerde);
        if (salsaRoja !== "") complementos.push(salsaRoja);
        // Agregar el nuevo usuario al array users 
        // Se crea un nuevo objeto que representa al usuario utilizando los valores obtenidos del formulario.
        users.push({ nombre, edad, pos, complementos, estadio, equipo });
        displayUsers();
        mostrarUsuarios();
        this.reset(); // Limpiar el formulario después de agregar
    } else {
        document.getElementById('addForm').reset();
    }
});



// Función para eliminar un usuario
function deleteUser(index) {
    var confirmacion = confirm("¿Estás seguro de que deseas continuar?");
    if (confirmacion) {
        alert("Acción confirmada"); // Mensaje si se confirma    
        users.splice(index, 1);
        displayUsers();
        mostrarUsuarios();
    } else {
        alert("Acción cancelada"); // Mensaje si se cancela
    }

}

// Función para editar un usuario
function editUser(index) {
    const user = users[index];
    document.getElementById('nombre').value = user.nombre;
    document.getElementById('edad').value = user.edad;
    document.getElementById('pos').value = user.pos;
    // Checkboxs
    document.getElementById('Nike').checked = user.complementos.includes('Nike');
    document.getElementById('Adidas').checked = user.complementos.includes('Adidas');
    // Radiobuttons
    document.getElementById('estadioOlimpico').checked = user.estadio === 'Estadio Olímpico';
    document.getElementById('estadioSanJorge').checked = user.estadio === 'Estadio San Jorge';
    document.getElementById('estadioColima').checked = user.estadio === 'Estadio Colima';
    // Select
    const selectEquipo = document.getElementById('equipo');
    selectEquipo.value = user.equipo;
    
    editIndex = index; // Guardar el índice del usuario que está siendo editado
    document.getElementById('guardarCambios').style.display = 'block'; // Mostrar el botón de guardar cambios
    document.getElementById('CancelarCambios').style.display = 'block';
}

// Función para guardar cambios
document.getElementById('guardarCambios').addEventListener('click', function() {
    const newNombre = document.getElementById('nombre').value;
    const newEdad = document.getElementById('edad').value;
    const newPos = document.getElementById('pos').value;
    // Obtener el valor de los checkboxs
    const salsaVerde = document.getElementById('Nike').checked ? "Nike" : "";
    const salsaRoja = document.getElementById('Adidas').checked ? "Adidas" : "";
    // Obtener el valor de los radiobuttons
    let estadioValue;
    const estadios = document.getElementsByName('estadios');
    estadios.forEach(radio => {
        if (radio.checked) {
            estadioValue = radio.value;
        }
    });
    // Obtener el valor del select
    const selectEquipo = document.getElementById('equipo').value;
    
    if (newNombre !== '' && newEdad !== '' && newPos !== '' && editIndex !== null) {
        users[editIndex].nombre = newNombre;
        users[editIndex].edad = newEdad;
        users[editIndex].pos = newPos;
        // Actualizar los valores de los checkboxs
        users[editIndex].complementos = [];
        if (salsaVerde !== "") users[editIndex].complementos.push(salsaVerde);
        if (salsaRoja !== "") users[editIndex].complementos.push(salsaRoja);
        // Actualizar el valor del radiobutton
        users[editIndex].estadio = estadioValue;
        // Actualizar el valor del select
        users[editIndex].equipo = selectEquipo;
        displayUsers(); // Actualizar la visualización de los usuarios después de editar
        mostrarUsuarios();
        editIndex = null; // Reiniciar el índice de edición
        document.getElementById('guardarCambios').style.display = 'none'; // Ocultar el botón de guardar cambios
        document.getElementById('CancelarCambios').style.display = 'none';
        document.getElementById('addForm').reset(); // Limpiar el formulario después de guardar cambios
    }
});

document.getElementById('CancelarCambios').addEventListener('click', function() {
    document.getElementById('CancelarCambios').style.display = 'none';
    document.getElementById('guardarCambios').style.display = 'none';
    document.getElementById('addForm').reset();
})


// Función para ir a la página de inicio
function goini() {
    var inicio = document.getElementById("inicio");
    inicio.style.display = "block";
    var formulario = document.getElementById("Formulario");
    formulario.style.display = "none";
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    setActiveOption('ini');
}

// Función para ir a la página de menú
function gomenu() {
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";
    var formulario = document.getElementById("Formulario");
    formulario.style.display = "none";
    var menu = document.getElementById("menu");
    menu.style.display = "block";
    setActiveOption('ver-menu');
}

// Función para ir a la página de gestión de menú
function goGemenu() {
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";
    var formulario = document.getElementById("Formulario");
    formulario.style.display = "block";
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    setActiveOption('gestionar-menu');
}

// Obtener todas las opciones del menú
const menuOptions = document.querySelectorAll('.menu a');

// Función para agregar la clase activa a la opción seleccionada
function setActiveOption(selectedOptionId) {
    // Remover la clase activa de todas las opciones
    menuOptions.forEach(option => option.classList.remove('active'));

    // Agregar la clase activa a la opción seleccionada
    document.getElementById(selectedOptionId).classList.add('active');
}

// Función para agregar la clase activa a la opción seleccionada
function setActiveOption(selectedOptionId) {
    // Remover la clase activa de todas las opciones
    menuOptions.forEach(option => option.classList.remove('active'));

    // Agregar la clase activa a la opción seleccionada
    document.getElementById(selectedOptionId).classList.add('active');
}