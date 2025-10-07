// js/utils.js
// Utilidades generales para la aplicación
const Utils = {
    // Formatear número de teléfono
    formatPhoneNumber: function(phone, countryCode) {
        return `${countryCode} ${phone}`;
    },
    
    // Validar contraseña
    validatePassword: function(password) {
        return password.length >= 8;
    },
    
    // Simular carga
    simulateLoad: function(duration = 1000) {
        return new Promise(resolve => setTimeout(resolve, duration));
    },
    
    // Generar ID único
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};