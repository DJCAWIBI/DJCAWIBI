// js/main.js - VERSIÓN CORREGIDA PARA ESTILOS DEL MAPA EN MODAL

let mapManagerInstance = null; // Instancia para el mapa principal
let searchMapManager = null; // Instancia para el mapa de búsqueda

document.addEventListener('DOMContentLoaded', function() {
    // Simular carga inicial (lógica de index.html)
    if (document.getElementById('splashScreen')) {
        setTimeout(() => {
            document.getElementById('splashScreen').classList.add('hidden');
            document.getElementById('registerScreen').classList.remove('hidden');
        }, 2000);
    }
    
    // Verificar si estamos en home.html
    if (document.getElementById('mainMap')) {
        initializeHomePage();
    }
});

function initializeHomePage() {
    // Inicializar mapa (UNA SOLA VEZ)
    mapManagerInstance = new MapManager();
    mapManagerInstance.initMap('mainMap');
    
    const locationElement = document.getElementById('currentLocation');
    
    // Simular ubicación del usuario
    setTimeout(() => {
        mapManagerInstance.setUserLocation(-3.7481, -73.2472); // Iquitos
        if (locationElement) {
            locationElement.querySelector('.location-text').textContent = 'Iquitos, Perú';
        }
    }, 1000);

    // Configurar servicio seleccionado
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- LÓGICA DEL MODAL DE BÚSQUEDA ---
    
    const searchModal = document.getElementById('searchModal');
    const destinationInput = document.getElementById('destinationInput');
    const searchBtn = document.getElementById('searchBtn');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const confirmLocations = document.getElementById('confirmLocations');
    const originInput = document.getElementById('originInput');
    const modalDestinationInput = document.getElementById('modalDestinationInput');

    // Función para abrir el modal (compartida por orderNowBtn, searchBtn, destinationInput)
    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('hidden');
            
            // 1. Inicializar el mapa de búsqueda SOLO la primera vez
            if (!searchMapManager) {
                searchMapManager = new MapManager();
                searchMapManager.initMap('searchMap', [-3.7481, -73.2472], 14); 
            }
            
            // 2. CORRECCIÓN DE ESTILOS: Forzar el redibujado del mapa de Leaflet
            // Esto asegura que el mapa ocupe el espacio correcto DENTRO del modal visible.
            if (searchMapManager && searchMapManager.map) {
                setTimeout(() => {
                    searchMapManager.map.invalidateSize();
                }, 0); // Un pequeño retraso asegura que el modal esté completamente visible.
            }
        }
    }

    // Botones/Inputs que abren el modal
    const orderNowBtn = document.getElementById('orderNowBtn');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            const selectedService = document.querySelector('.service-option.active');
            if (!selectedService) {
                alert('Por favor selecciona un tipo de servicio.');
                return;
            }
            openSearchModal();
        });
    }

    [searchBtn, destinationInput].forEach(element => {
        if (element) {
            element.addEventListener('click', openSearchModal);
        }
    });

    // Cerrar modal
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', function() {
            if (searchModal) searchModal.classList.add('hidden');
        });
    }

    // Confirmar ubicaciones y redirigir
    if (confirmLocations && originInput && modalDestinationInput) {
        confirmLocations.addEventListener('click', function() {
            const origin = originInput.value.trim();
            const destination = modalDestinationInput.value.trim();
            
            if (!origin || !destination || (origin === 'Ubicación Actual' && destination === '')) {
                alert('Por favor, selecciona o ingresa un destino.');
                return;
            }

            localStorage.setItem('rideOrigin', origin);
            localStorage.setItem('rideDestination', destination);
            
            window.location.href = 'ride.html';
        });
    }

    // Búsqueda en tiempo real
    [destinationInput, modalDestinationInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                const searchTerm = e.target.value;
                if (searchTerm.length > 2) {
                    showSearchResults(searchTerm);
                } else {
                    const resultsContainer = document.getElementById('searchResults');
                    if (resultsContainer) resultsContainer.innerHTML = '';
                }
            });
        }
    });

    function showSearchResults(searchTerm) {
        // ... (Lógica de filtrado y visualización de resultados) ...
        const mockResults = [
            { address: 'Aeropuerto Internacional Jorge Chavez', district: 'Av. Elmer Faucett s/n, Lima' },
            { address: 'Calle Ramón Ribeyro, 672', district: 'Centro de Iquitos' },
            { address: 'Plaza de Armas de Iquitos', district: 'Centro Histórico' }
        ];

        const results = mockResults.filter(item => 
            item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.district.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';

        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <div class="result-address">${result.address}</div>
                <div class="result-district">${result.district}</div>
            `;
            item.addEventListener('click', function() {
                if (destinationInput) destinationInput.value = result.address;
                if (modalDestinationInput) modalDestinationInput.value = result.address;
                resultsContainer.innerHTML = '';
            });
            resultsContainer.appendChild(item);
        });
    }
}