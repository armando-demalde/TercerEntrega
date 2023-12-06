window.onload = function() {
    let respuesta1 = document.getElementById("ValorMonto")
    let respuesta2 = document.getElementById("ValorPlazo")
    let respuesta3 = document.getElementById("ValorTasas")

    let boton1 = document.getElementById("agregarMonto")
    let boton2 = document.getElementById("agregarPlazo")
    let boton3 = document.getElementById("agregarTasas")
    let botonAgregarSolicitud = document.getElementById("agregarSolicitud")

    const solicitudes = obtenerSolicitudesGuardadas()

    boton1.addEventListener("click", function() {
        let valorinput1 = respuesta1.value
        document.getElementById("monto").innerHTML = valorinput1
        localStorage.setItem("ValorUnoGuardado", valorinput1)
        respuesta1.value = ""
    })

    boton2.addEventListener("click", function() {
        let valorinput2 = respuesta2.value
        document.getElementById("plazo").innerHTML = valorinput2
        localStorage.setItem("ValorDosGuardado", valorinput2)
        respuesta2.value = ""
    })

    boton3.addEventListener("click", function() {
        let valorinput3 = respuesta3.value
        document.getElementById("tasas").innerHTML = valorinput3
        localStorage.setItem("ValorTresGuardado", valorinput3)
        respuesta3.value = ""
    })

    botonAgregarSolicitud.addEventListener("click", function() {
        let valorinput1 = parseFloat(localStorage.getItem("ValorUnoGuardado")) || 0
        let valorinput2 = parseInt(localStorage.getItem("ValorDosGuardado")) || 0
        let valorinput3 = parseFloat(localStorage.getItem("ValorTresGuardado")) || 0

        if (!isNaN(valorinput1) && !isNaN(valorinput2) && !isNaN(valorinput3)) {
            let solicitud = {
                monto: valorinput1,
                plazo: valorinput2,
                tasaInteres: valorinput3
            }

            solicitudes.push(solicitud)

            guardarSolicitudes(solicitudes)

            mostrarSolicitudes()
        } else {
            alert("Ingresa valores numéricos válidos en todos los campos antes de agregar la solicitud.")
        }
    })

    let buscarPorMontoButton = document.getElementById("buscarPorMonto")
    buscarPorMontoButton.addEventListener("click", function() {
        let montoBusqueda = parseFloat(document.getElementById("BuscarMonto").value) || 0
        mostrarResultadosBusqueda(buscarPorMonto(montoBusqueda))
    })

    function obtenerSolicitudesGuardadas() {
        let solicitudesGuardadas = localStorage.getItem("SolicitudesGuardadas")
        return solicitudesGuardadas ? JSON.parse(solicitudesGuardadas) : []
    }

    function guardarSolicitudes(solicitudes) {
        localStorage.setItem("SolicitudesGuardadas", JSON.stringify(solicitudes))
    }

    function mostrarSolicitudes() {
        let resultados = document.getElementById("resultados")
        resultados.innerHTML = ""

        for (let i = 0; i < solicitudes.length; i++) {
            resultados.innerHTML += `<p>Solicitud ${i + 1}: Monto: ${solicitudes[i].monto}, Plazo: ${solicitudes[i].plazo} meses, Tasa de Interés: ${solicitudes[i].tasaInteres}%, Cuota: ${calcularCuota(solicitudes[i])}</p>`
        }
    }

    function calcularCuota(solicitud) {
        const tasaMensual = solicitud.tasaInteres / 12 / 100
        const cuota = (solicitud.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -solicitud.plazo))
        return cuota.toFixed(2)
    }

    function buscarPorMonto(monto) {
        return solicitudes.filter(solicitud => solicitud.monto === monto)
    }

    function mostrarResultadosBusqueda(resultados) {
        let resultadosBusqueda = document.getElementById("resultadosBusqueda")
        resultadosBusqueda.innerHTML = ""

        for (let i = 0; i < resultados.length; i++) {
            resultadosBusqueda.innerHTML += `<p>Resultado de búsqueda ${i + 1}: Monto: ${resultados[i].monto}, Plazo: ${resultados[i].plazo} meses, Tasa de Interés: ${resultados[i].tasaInteres}%, Cuota: ${calcularCuota(resultados[i])}</p>`
        }
    }
}
