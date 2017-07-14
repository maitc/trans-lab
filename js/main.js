/* Holiii acá va tu código también */
$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.collapsible').collapsible();
	$('select').material_select();
	
	//Se ejecuta localstorage a perfil con el correo guardado
	//dato: se le da el mismo id de index 1 a index de perfil para que lo tome en cuenta localStorage
		var correo = $("#input-correo").val();
		localStorage.setItem(correoPerfil, correo);
		var correoPerfil = $("#input-correo").text(localStorage.getItem("email"));
		$("#input-correo").append(correoPerfil);
		
	//validacion iniciar sesión
	$(".btn-inicio").click(function (e){
		e.preventDefault();//cuando se pone prevent para que detenga el seguir el enlace, no se necesita return false en el if.
		//Se llama los value de los inputs
		var correo = $("#input-correo").val();
		var contrasenia = $("#input-contrasenia").val();

		//donde se alojarán las validaciones
		var errorCorreo = $(".input-box")[0];
		var errorContrasenia = $(".input-box")[1];

		//se crea otra variable para crear el texto directo
		var validarCorreo = $(errorCorreo).append('<p></p>');
		var validarContrasenia = $(errorContrasenia).append('<p></p>');

		
			//lo hice fuera de funciones porque no corría :( 
			if(correo == ""){
				$(validarCorreo).text("Debes ingresar tu correo");
			}else if(!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(correo))){
				$(validarCorreo).text("Debe ser un correo válido");
			}
		
			if(contrasenia == ""){
				$(validarContrasenia).text("Debes ingresar tu contraseña");
			}else if(contrasenia.length < 8){
				$(validarContrasenia).text("Debe tener al menos 8 números");
			}else if(!(/^[0-9]+$/.test(contrasenia))){
				$(validarContrasenia).text("No pueden ser caracteres");
			}else{
				window.location.href = "index-segundo.html"
			}
		
	});

	//funcion agregar tarjeta junto con eliminar
	$(".btn-r").click(function(){
		var inputTarjetas = $(".input-numero-tarjeta").val();
		$(".print").append("<p>" + inputTarjetas + "<a class='eliminar'>x</a></p>");
		//se le da click a la x con la funcion de eliminar la tarea como de eliminarla de locastorage.
		$(document).on('click', '.eliminar', function(){
			$(this).parent().remove();
		});
	});

	//funcion de mostrar saldo
	$("#imprimir-numero").click(function(){
		var inputIngresoTarjeta = $(".input-num").val();
		 $.ajax({
            url:'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip='+inputIngresoTarjeta+'',
            type: 'GET',
            datatype: 'json',
        })
        .done(function(e){
            console.log(e.saldoTarjeta);
            $(".print-balances").append("<p>" +e.saldoTarjeta+"</p>");
        })
        .fail(function(){
            console.log("error");
        });
	});


})

