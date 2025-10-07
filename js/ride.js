// js/ride.js
class RideManager {
    constructor() {
        this.rideState = 'searching'; // searching, driver_assigned, pickup, ongoing, completed
        this.progress = 25;
        this.rideInterval = null;
    }

    init() {
        this.loadRideData();
        this.initMap();
        this.startRideSimulation();
        this.setupEventListeners();
        this.updateRideState('searching');
    }

    loadRideData() {
        // Carga los datos guardados en home.html
        const origin = localStorage.getItem('rideOrigin') || 'Avenida Dos de Mayo, 299';
        const destination = localStorage.getItem('rideDestination') || 'Calle Ramón Ribeyro, 672';
        
        const originEl = document.getElementById('rideOrigin');
        const destinationEl = document.getElementById('rideDestination');
        
        if(originEl) originEl.textContent = origin;
        if(destinationEl) destinationEl.textContent = destination;
    }

    initMap() {
        // Se asegura que MapManager exista (gracias a la corrección en ride.html)
        const mapManager = new MapManager();
        mapManager.initMap('rideMap', [-3.7481, -73.2472], 14);
        
        // Simular ubicaciones de origen y destino (tomadas de los valores por defecto)
        // En una aplicación real usarías las coordenadas guardadas en localStorage
        const origin = { lat: -3.7481, lng: -73.2472 };
        const destination = { lat: -3.7400, lng: -73.2350 };
        
        mapManager.setUserLocation(origin.lat, origin.lng);
        mapManager.addRoute(origin, destination);
    }

    startRideSimulation() {
        // Simular progreso del viaje y cambio de estado
        this.rideInterval = setInterval(() => {
            if (this.progress < 100) {
                this.progress += 25;
                const progressFill = document.getElementById('rideProgress');
                if (progressFill) progressFill.style.width = `${this.progress}%`;
            }

            if (this.progress === 50) {
                this.updateRideState('assigned');
            } else if (this.progress === 75) {
                 this.updateRideState('pickup');
            } else if (this.progress === 100) {
                this.updateRideState('completed');
                this.completeRide();
            }
        }, 3000); // Avanza cada 3 segundos
    }

    updateRideState(newState) {
        this.rideState = newState;
        const searching = document.getElementById('searchingState');
        const assigned = document.getElementById('assignedState');
        
        if (searching) searching.classList.add('hidden');
        if (assigned) assigned.classList.add('hidden');

        // Lógica de visualización
        switch (newState) {
            case 'searching':
                if (searching) searching.classList.remove('hidden');
                break;
            case 'assigned':
                if (assigned) assigned.classList.remove('hidden');
                break;
            // ... otros estados ...
        }
        
        // Actualizar pasos en el header
        document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
            const stepProgress = (index + 1) * 25;
            if (this.progress >= stepProgress) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    completeRide() {
        clearInterval(this.rideInterval);
        alert('¡Viaje completado! Por favor califica a tu conductor.');
        // Redirigir a pantalla de inicio después de la simulación
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }

    setupEventListeners() {
        const cancelRideBtn = document.getElementById('cancelRideBtn');
        const confirmCancel = document.getElementById('confirmCancel');
        const dontCancel = document.getElementById('dontCancel');
        const cancelModal = document.getElementById('cancelModal');

        if (cancelRideBtn) {
            cancelRideBtn.addEventListener('click', function() {
                if (cancelModal) cancelModal.classList.remove('hidden');
            });
        }

        // CORRECCIÓN: Botón "Sí, cancelar"
        if (confirmCancel) {
            confirmCancel.addEventListener('click', function() {
                clearInterval(this.rideInterval);
                alert('Viaje cancelado.');
                // Redirigir al Home inmediatamente
                window.location.href = 'home.html'; 
            }.bind(this)); // El bind(this) es crucial para acceder a this.rideInterval
        }

        if (dontCancel) {
            dontCancel.addEventListener('click', function() {
                if (cancelModal) cancelModal.classList.add('hidden');
            });
        }
    }
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    const rideManager = new RideManager();
    rideManager.init();
});