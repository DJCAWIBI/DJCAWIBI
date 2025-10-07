// js/auth.js - VERSIÓN COMPLETA CORREGIDA

// Datos de países para el selector
const countries = [
    { code: 'PE', name: 'Perú', prefix: '+51', flag: '🇵🇪' },
    { code: 'EC', name: 'Ecuador', prefix: '+593', flag: '🇪🇨' },
    { code: 'CO', name: 'Colombia', prefix: '+57', flag: '🇨🇴' },
    { code: 'AR', name: 'Argentina', prefix: '+54', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', prefix: '+56', flag: '🇨🇱' },
    { code: 'MX', name: 'México', prefix: '+521', flag: '🇲🇽' },
    { code: 'ES', name: 'España', prefix: '+34', flag: '🇪🇸' },
    { code: 'BR', name: 'Brasil', prefix: '+55', flag: '🇧🇷' },
    { code: 'PA', name: 'Panamá', prefix: '+507', flag: '🇵🇦' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre pantallas de autenticación
    const phoneAuthBtn = document.getElementById('phoneAuthBtn');
    const countrySelector = document.getElementById('countrySelector');
    const continueToPassword = document.getElementById('continueToPassword');
    const completeRegistration = document.getElementById('completeRegistration');
    
    // Ir a pantalla de teléfono
    if (phoneAuthBtn) {
        phoneAuthBtn.addEventListener('click', function() {
            document.getElementById('registerScreen').classList.add('hidden');
            document.getElementById('phoneScreen').classList.remove('hidden');
        });
    }
    
    // Abrir selector de países
    if (countrySelector) {
        countrySelector.addEventListener('click', function() {
            document.getElementById('phoneScreen').classList.add('hidden');
            document.getElementById('countryScreen').classList.remove('hidden');
            loadCountries();
        });
    }
    
    // Continuar a contraseña
    if (continueToPassword) {
        continueToPassword.addEventListener('click', function() {
            const phoneInput = document.getElementById('phoneInput');
            if (phoneInput.value.trim() === '') {
                alert('Por favor ingresa tu número de celular');
                return;
            }
            document.getElementById('phoneScreen').classList.add('hidden');
            document.getElementById('passwordScreen').classList.remove('hidden');
        });
    }
    
    // Completar registro - ESTA ES LA PARTE CORREGIDA
    if (completeRegistration) {
        completeRegistration.addEventListener('click', function() {
            const fullName = document.getElementById('fullNameInput').value;
            const password = document.getElementById('passwordInput').value;
            
            if (fullName.trim() === '' || password.length < 8) {
                alert('Por favor completa todos los campos correctamente. La contraseña debe tener al menos 8 caracteres.');
                return;
            }
            
            // Simular registro exitoso
            const userData = {
                nombre: fullName,
                telefono: document.getElementById('phoneInput').value,
                pais: document.querySelector('.country-code').textContent,
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar en localStorage para simular sesión
            localStorage.setItem('jackigo_user', JSON.stringify(userData));
            localStorage.setItem('jackigo_loggedIn', 'true');
            
            console.log('Usuario registrado:', userData);
            
            // Mostrar mensaje de éxito
            alert('¡Registro completado con éxito! Redirigiendo a la página principal...');
            
            // Redirigir a home.html después de 1 segundo
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        });
    }
});

function loadCountries() {
    const countryList = document.getElementById('countryList');
    const countrySearch = document.getElementById('countrySearch');
    
    function renderCountries(countriesToRender) {
        if (!countryList) return;
        
        countryList.innerHTML = '';
        countriesToRender.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.innerHTML = `
                <span class="country-item-flag">${country.flag}</span>
                <div class="country-item-info">
                    <div class="country-item-name">${country.name}</div>
                    <div class="country-item-code">${country.prefix}</div>
                </div>
            `;
            countryItem.addEventListener('click', function() {
                selectCountry(country);
            });
            countryList.appendChild(countryItem);
        });
    }
    
    // Renderizar países inicialmente
    renderCountries(countries);
    
    // Buscar países
    if (countrySearch) {
        countrySearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCountries = countries.filter(country => 
                country.name.toLowerCase().includes(searchTerm) ||
                country.prefix.includes(searchTerm)
            );
            renderCountries(filteredCountries);
        });
    }
}

function selectCountry(country) {
    // Actualizar el selector de país en la pantalla de teléfono
    const countrySelector = document.querySelector('.country-selector');
    if (countrySelector) {
        countrySelector.innerHTML = `
            <span class="country-flag">${country.flag}</span>
            <span class="country-code">${country.prefix}</span>
            <span class="dropdown-arrow">▼</span>
        `;
    }
    
    // Volver a la pantalla de teléfono
    document.getElementById('countryScreen').classList.add('hidden');
    document.getElementById('phoneScreen').classList.remove('hidden');
    
    // Re-asignar event listener al selector actualizado
    const updatedCountrySelector = document.querySelector('.country-selector');
    if (updatedCountrySelector) {
        updatedCountrySelector.addEventListener('click', function() {
            document.getElementById('phoneScreen').classList.add('hidden');
            document.getElementById('countryScreen').classList.remove('hidden');
            loadCountries();
        });
    }
}