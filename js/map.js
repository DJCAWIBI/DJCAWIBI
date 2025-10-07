// js/map.js
class MapManager {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.serviceArea = null;
        this.isInServiceArea = true;
        this.routeLayer = null; // Para rutas
    }

    initMap(containerId, center = [-3.7481, -73.2472], zoom = 13) {
        // Verifica si el mapa ya existe en el contenedor para evitar errores de duplicidad de Leaflet
        if (this.map) {
            this.map.remove();
        }
        
        this.map = L.map(containerId).setView(center, zoom);
        
        // Capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        this.defineServiceArea();
        
        return this.map;
    }

    defineServiceArea() {
        // Coordenadas aproximadas del área de servicio en Iquitos
        const serviceBounds = [
            [-3.720, -73.280], // Noroeste
            [-3.720, -73.210], // Noreste
            [-3.780, -73.210], // Sureste
            [-3.780, -73.280]  // Suroeste
        ];

        this.serviceArea = L.polygon(serviceBounds, {
            color: 'green',
            weight: 2,
            fillColor: 'green',
            fillOpacity: 0.1
        });
        
        // Agregarlo al mapa solo si el mapa ya fue inicializado
        if (this.map) {
            this.serviceArea.addTo(this.map);
        }
    }

    setUserLocation(lat, lng) {
        const userLocation = L.latLng(lat, lng);

        if (!this.userMarker) {
            this.userMarker = L.marker(userLocation, {
                icon: L.divIcon({
                    className: 'user-marker',
                    html: '📍',
                    iconSize: [25, 25]
                })
            }).addTo(this.map);
        } else {
            this.userMarker.setLatLng(userLocation);
        }

        this.map.setView(userLocation, this.map.getZoom());
        this.checkServiceArea(userLocation);
    }
    
    checkServiceArea(location) {
        this.isInServiceArea = this.serviceArea.getBounds().contains(location);
        
        // Aquí podrías mostrar una alerta o cambiar la UI si no está en el área
        if (!this.isInServiceArea) {
            console.warn('Ubicación fuera del área de servicio.');
        }
    }
    
    // Simulación de ruta con Polyline de Leaflet
    addRoute(origin, destination) {
        // En una app real usarías un servicio de routing (OSRM, Google Maps API, etc.)
        
        // Simulación de una línea recta
        const route = [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng]
        ];
        
        if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
        }
        
        this.routeLayer = L.polyline(route, { color: '#007BFF', weight: 4, opacity: 0.7 }).addTo(this.map);
        
        // Ajustar la vista para que quepan ambos puntos
        const bounds = L.latLngBounds([origin, destination]);
        this.map.fitBounds(bounds, { padding: [50, 50] });

        // Agregar marcadores de origen y destino
        L.marker([origin.lat, origin.lng], { icon: L.divIcon({ className: 'location-marker origin', html: '🟢' }) }).addTo(this.map);
        L.marker([destination.lat, destination.lng], { icon: L.divIcon({ className: 'location-marker destination', html: '🏁' }) }).addTo(this.map);
    }
}

// La lógica de inicialización y eventos ahora está en main.js