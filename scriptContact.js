document.addEventListener('DOMContentLoaded', () => {
    //menu hamburguesa
    const navToggleBtn = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav'); // Tu <nav>

    if (navToggleBtn && mainNav) {
        const hamburgerIcon = navToggleBtn.querySelector('.header__nav-toggle-icon--hamburger');
        const closeIcon = navToggleBtn.querySelector('.header__nav-toggle-icon--close');

        if (hamburgerIcon && closeIcon) {
            navToggleBtn.addEventListener('click', () => {
                // Alternar la clase 'is-active' en el <nav> para mostrar/ocultar el menú
                mainNav.classList.toggle('is-active');

                // Alternar la visibilidad de los iconos
                hamburgerIcon.classList.toggle('is-hidden');
                closeIcon.classList.toggle('is-hidden');

                // Actualizar el atributo aria-expanded para accesibilidad
                const isActive = mainNav.classList.contains('is-active');
                navToggleBtn.setAttribute('aria-expanded', isActive.toString());

                // Opcional: Añadir/quitar clase al body para prevenir scroll
                document.body.classList.toggle('nav-open', isActive);
            });

            // Opcional: Cerrar el menú al hacer clic en un enlace del menú
            // (útil para navegación en la misma página con anclas #)
            const navLinks = mainNav.querySelectorAll('.header__nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNav.classList.contains('is-active')) {
                        mainNav.classList.remove('is-active');
                        hamburgerIcon.classList.remove('is-hidden'); // Mostrar hamburguesa
                        closeIcon.classList.add('is-hidden');     // Ocultar cruz
                        navToggleBtn.setAttribute('aria-expanded', 'false');
                        document.body.classList.remove('nav-open');
                    }
                });
            });
        } else {
            console.warn("Iconos de hamburguesa/cierre no encontrados dentro del botón de toggle.");
        }
    } else {
        console.warn("Botón de toggle del menú (nav-toggle) o el menú principal (main-nav) no encontrados.");
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');
    const clientNameInput = document.getElementById('clientName');
    const clientEmailInput = document.getElementById('clientEmail');
    const bookingDateInput = document.getElementById('bookingDate');
    const dogNameInput = document.getElementById('dogName');
    const dogSizeRadios = document.querySelectorAll('input[name="dogSize"]');
    const dogBreedSelect = document.getElementById('dogBreed');
    const submitButton = form.querySelector('.form__button--submit');
    const dogSizeErrorSpan = document.getElementById('dogSizeError');

    const dogBreedsData = {
        pequeno: {
            label: "Razas Pequeñas",
            breeds: ["Chihuahua", "Yorkshire Terrier", "Pomerania", "Shih Tzu", "Caniche Toy", "Bichón Maltés", "Teckel (Salchicha)"]
        },
        mediano: {
            label: "Razas Medianas",
            breeds: ["Beagle", "Cocker Spaniel", "Bulldog Francés", "Border Collie", "Shar Pei", "Basset Hound", "Staffordshire Bull Terrier"]
        },
        grande: {
            label: "Razas Grandes",
            breeds: ["Labrador Retriever", "Pastor Alemán", "Golden Retriever", "Boxer", "Doberman", "Rottweiler", "San Bernardo"]
        }
    };

    function populateBreeds(size) {
        dogBreedSelect.innerHTML = ''; // Limpiar opciones anteriores
        const defaultOpt = document.createElement('option');
        defaultOpt.value = "";
        defaultOpt.textContent = "Selecciona una raza";
        dogBreedSelect.appendChild(defaultOpt);
        dogBreedSelect.disabled = true;

        if (size && dogBreedsData[size]) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = dogBreedsData[size].label;

            dogBreedsData[size].breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                optgroup.appendChild(option);
            });
            dogBreedSelect.appendChild(optgroup);
            dogBreedSelect.disabled = false;
        } else if (!size) { // Si no hay tamaño seleccionado explícitamente
            defaultOpt.textContent = "Selecciona un tamaño primero";
        }
        // Revalidar el campo de raza si ya fue interactuado
        if (dogBreedSelect.dataset.interacted) {
            validateRequired(dogBreedSelect, "Debes seleccionar una raza.");
        }
    }

    dogSizeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            populateBreeds(this.value);
            validateRadioGroup(dogSizeRadios, dogSizeErrorSpan, "Debes seleccionar un tamaño.");
            // Forzar validación del select de raza al cambiar tamaño
            dogBreedSelect.dataset.interacted = "true"; // Marcar como interactuado
            validateRequired(dogBreedSelect, "Debes seleccionar una raza.");
        });
    });

    // --- Funciones de Validación ---
    function setFieldValidity(inputElement, isValid, message = "") {
        const errorElement = inputElement.parentElement.querySelector('.form__error-message');
        if (!isValid) {
            inputElement.classList.add('form__input--invalid');
            inputElement.classList.remove('form__input--valid');
            if (errorElement) errorElement.textContent = message;
            inputElement.setAttribute('aria-invalid', 'true');
        } else {
            inputElement.classList.remove('form__input--invalid');
            inputElement.classList.add('form__input--valid');
            if (errorElement) errorElement.textContent = '';
            inputElement.setAttribute('aria-invalid', 'false');
        }
    }

    function validateRequired(inputElement, message = "Este campo es obligatorio.") {
        const isValid = inputElement.value.trim() !== "";
        setFieldValidity(inputElement, isValid, message);
        return isValid;
    }

    function validatePattern(inputElement, regex, message) {
        const isValid = regex.test(inputElement.value.trim());
        if (inputElement.value.trim() === "" && inputElement.required) { // Si está vacío y es requerido
            setFieldValidity(inputElement, false, "Este campo es obligatorio.");
            return false;
        }
        if (inputElement.value.trim() !== "") { // Solo validar patrón si hay algo escrito
            setFieldValidity(inputElement, isValid, message);
            return isValid;
        }
        setFieldValidity(inputElement, true); // Si no es requerido y está vacío, es válido
        return true;

    }

    function validateEmail(inputElement) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // EmailJS realiza su propia validación de formato de email, pero es bueno tenerla aquí también
        const isValid = emailRegex.test(inputElement.value.trim());
        if (inputElement.value.trim() === "" && inputElement.required) {
            setFieldValidity(inputElement, false, "El correo electrónico es obligatorio.");
            return false;
        }
        if (inputElement.value.trim() !== "") {
            setFieldValidity(inputElement, isValid, "Introduce un correo electrónico válido.");
            return isValid;
        }
        setFieldValidity(inputElement, true);
        return true;
    }

    function validateDate(inputElement) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalizar a medianoche para comparar solo fechas
        const selectedDate = new Date(inputElement.value); // El valor del input type="date" ya es YYYY-MM-DD

        // Necesitamos convertir la fecha seleccionada a UTC para evitar problemas de zona horaria
        // al compararla con 'today' que está en la zona horaria local.
        // La forma más simple es asegurarse de que el input no esté vacío.
        // y luego comparar las cadenas de fecha, o los objetos Date si se manejan con cuidado.

        if (inputElement.value.trim() === "") {
            setFieldValidity(inputElement, false, "La fecha es obligatoria.");
            return false;
        }

        // Para la comparación, obtenemos el tiempo en milisegundos de la fecha seleccionada
        // ajustada a la medianoche UTC para que la comparación sea solo de día, mes y año.
        const selectedDateUTC = new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate());


        if (selectedDateUTC < today) {
            setFieldValidity(inputElement, false, "La fecha no puede ser anterior a hoy.");
            return false;
        }

        setFieldValidity(inputElement, true);
        return true;
    }


    function validateRadioGroup(radioInputs, errorSpanElement, message) {
        let selected = false;
        radioInputs.forEach(radio => {
            if (radio.checked) {
                selected = true;
            }
        });
        if (selected) {
            errorSpanElement.textContent = '';
            // Opcional: añadir clase de validez al fieldset o al span
            errorSpanElement.closest('fieldset').classList.remove('form__input--invalid'); // Asumiendo que puedes marcar el fieldset
            errorSpanElement.closest('fieldset').classList.add('form__input--valid');
            return true;
        } else {
            errorSpanElement.textContent = message;
            errorSpanElement.closest('fieldset').classList.add('form__input--invalid');
            errorSpanElement.closest('fieldset').classList.remove('form__input--valid');
            return false;
        }
    }

    // --- Event Listeners para validación "on input" o "on blur" ---
    function addRealTimeValidation(inputElement, validationFn, ...args) {
        inputElement.addEventListener('blur', () => {
            validationFn(inputElement, ...args);
            inputElement.dataset.interacted = "true"; // Marcar como interactuado
        });
        // Opcional: validar también con 'input' para feedback más inmediato,
        // pero 'blur' suele ser menos intrusivo.
        // inputElement.addEventListener('input', () => validationFn(inputElement, ...args));
    }

    addRealTimeValidation(clientNameInput, validatePattern, /^[a-zA-ZÀ-ÿ\s'-]{2,}$/, "Nombre inválido (mín. 2 letras, solo letras, espacios, ', -).");
    addRealTimeValidation(clientEmailInput, validateEmail);
    addRealTimeValidation(dogNameInput, validatePattern, /^[a-zA-ZÀ-ÿ0-9\s'-]{2,}$/, "Nombre de perro inválido (mín. 2 caracteres).");
    bookingDateInput.addEventListener('change', () => { // 'change' es mejor para date
        validateDate(bookingDateInput);
        bookingDateInput.dataset.interacted = "true";
    });
    dogBreedSelect.addEventListener('change', () => {
        validateRequired(dogBreedSelect, "Debes seleccionar una raza.");
        dogBreedSelect.dataset.interacted = "true";
    });


    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío real

        // Marcar todos los campos como interactuados para que se muestren errores si están vacíos
        [clientNameInput, clientEmailInput, bookingDateInput, dogNameInput, dogBreedSelect].forEach(input => input.dataset.interacted = "true");
        dogSizeRadios.forEach(r => r.dataset.interacted = "true"); // O manejar esto con el fieldset

        // Realizar todas las validaciones
        const isClientNameValid = validatePattern(clientNameInput, /^[a-zA-ZÀ-ÿ\s'-]{2,}$/, "Nombre inválido (mín. 2 letras, solo letras, espacios, ', -).");
        const isClientEmailValid = validateEmail(clientEmailInput);
        const isBookingDateValid = validateDate(bookingDateInput);
        const isDogNameValid = validatePattern(dogNameInput, /^[a-zA-ZÀ-ÿ0-9\s'-]{2,}$/, "Nombre de perro inválido (mín. 2 caracteres).");
        const isDogSizeValid = validateRadioGroup(dogSizeRadios, dogSizeErrorSpan, "Debes seleccionar un tamaño.");
        const isDogBreedValid = validateRequired(dogBreedSelect, "Debes seleccionar una raza.");


        if (isClientNameValid && isClientEmailValid && isBookingDateValid && isDogNameValid && isDogSizeValid && isDogBreedValid) {
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            const selectedSizeRadio = document.querySelector('input[name="dogSize"]:checked');
            const sizeLabel = selectedSizeRadio ? dogBreedsData[selectedSizeRadio.value].label : "No especificado";
            const breedValue = dogBreedSelect.value;
            // Texto para el email: "Etiqueta del Optgroup: RazaSeleccionada"
            const dogBreedText = `${sizeLabel}: ${breedValue}`;

            const templateParams = {
                reply_to: clientEmailInput.value.trim(), // Email del cliente para responder
                name: clientNameInput.value.trim(),      // Nombre del cliente
                time: bookingDateInput.value,            // Fecha de la reserva (puedes formatearla mejor si lo deseas)
                message: `Nombre del perro: ${dogNameInput.value.trim()}, Raza: ${dogBreedText}`, // Mensaje con info del perro
            };

            console.log("Formulario Válido. Datos para EmailJS:", templateParams);

            // --- Integración con EmailJS ---
            // Asegúrate de haber inicializado EmailJS con tu Public Key en el HTML
            // y de haber reemplazado "TU_SERVICE_ID" y "TU_TEMPLATE_ID".
            // Las claves en templateParams (ej. client_name) deben coincidir con las variables
            // {{client_name}} en tu plantilla de EmailJS.


            emailjs.send('service_5rvhmsk', 'template_8udh2xh', templateParams)
                .then(function(response) {
                    console.log('ÉXITO!', response.status, response.text);
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Tu reserva se ha enviado correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    form.reset();
                    // Resetear validaciones visuales y estado
                    [clientNameInput, clientEmailInput, bookingDateInput, dogNameInput, dogBreedSelect].forEach(input => {
                        input.classList.remove('form__input--valid', 'form__input--invalid');
                        input.removeAttribute('aria-invalid');
                        input.dataset.interacted = "false";
                        const errorElement = input.parentElement.querySelector('.form__error-message');
                        if (errorElement) errorElement.textContent = '';
                    });
                    dogSizeErrorSpan.textContent = '';
                    dogSizeErrorSpan.closest('fieldset').classList.remove('form__input--invalid', 'form__input--valid');
                    populateBreeds(null); // Resetea el select de razas a "Selecciona un tamaño primero"
                    submitButton.textContent = 'Enviar Reserva';
                    submitButton.disabled = false;
                })
                .catch(function(error) {
                    console.error('FALLO AL ENVIAR EMAIL...', error);
                    Swal.fire({
                        title: '¡Error!',
                        text: `Hubo un problema al enviar la reserva: ${error.text || 'Por favor, inténtalo de nuevo.'}`,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    submitButton.textContent = 'Enviar Reserva';
                    submitButton.disabled = false;
                });


            // Simulación (ELIMINAR AL USAR EMAILJS REAL)
            // setTimeout(() => { ... }, 1000); // Comentado para evitar duplicación con EmailJS real

        } else {
            console.log("Formulario Inválido. Por favor, corrige los errores.");
            // Enfocar el primer campo con error para mejorar la accesibilidad
            const firstInvalidField = form.querySelector('[aria-invalid="true"], .form__input--invalid'); // Busca también por clase como fallback
            if (firstInvalidField) {
                if (firstInvalidField.type === 'radio') { // Si es un radio, enfocar el fieldset o el primer radio
                    firstInvalidField.closest('fieldset').focus(); // o el primer radio con error
                } else {
                    firstInvalidField.focus();
                }
                // Anunciar error general para lectores de pantalla
                const generalErrorAnnouncer = document.getElementById('generalErrorAnnouncer');
                JavaScript

                if (generalErrorAnnouncer) { // Necesitarías un span <span id="generalErrorAnnouncer" class="sr-only" aria-live="assertive"></span>
                    generalErrorAnnouncer.textContent = "El formulario contiene errores. Por favor, revísalos.";
                }
            }
            submitButton.textContent = 'Enviar Reserva'; // Restaurar texto si ya estaba en 'Enviando...'
            submitButton.disabled = false; // Habilitar botón
        }
    });

    // Inicializar el select de razas y la validación de tamaño
    populateBreeds(null);
    // No validar al inicio para no mostrar errores antes de la interacción
});