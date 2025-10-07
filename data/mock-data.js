// data/mock-data.js
const MockData = {
    countries: [
        { code: 'PE', name: 'Perú', prefix: '+51', flag: '🇵🇪' },
        { code: 'EC', name: 'Ecuador', prefix: '+593', flag: '🇪🇨' },
        { code: 'CO', name: 'Colombia', prefix: '+57', flag: '🇨🇴' },
        { code: 'AR', name: 'Argentina', prefix: '+54', flag: '🇦🇷' },
        { code: 'CL', name: 'Chile', prefix: '+56', flag: '🇨🇱' },
        { code: 'MX', name: 'México', prefix: '+521', flag: '🇲🇽' },
        { code: 'ES', name: 'España', prefix: '+34', flag: '🇪🇸' },
        { code: 'BR', name: 'Brasil', prefix: '+55', flag: '🇧🇷' },
        { code: 'PA', name: 'Panamá', prefix: '+507', flag: '🇵🇦' }
    ],

    serviceAreas: {
        iquitos: {
            bounds: [
                [-3.720, -73.280],
                [-3.720, -73.210],
                [-3.780, -73.210],
                [-3.780, -73.280]
            ],
            center: [-3.7481, -73.2472]
        }
    },

    drivers: [
        {
            id: 1,
            name: 'Andrés Díaz',
            vehicle: 'Toyota Corolla',
            plate: 'ABC-123',
            rating: 4.8,
            location: [-3.7490, -73.2480]
        },
        {
            id: 2,
            name: 'María López',
            vehicle: 'Nissan Versa',
            plate: 'DEF-456',
            rating: 4.9,
            location: [-3.7470, -73.2460]
        }
    ],

    popularDestinations: [
        {
            name: 'Aeropuerto Internacional Jorge Chavez',
            address: 'Av. Elmer Faucett s/n, Lima',
            type: 'airport'
        },
        {
            name: 'Calle Ramón Ribeyro, 672',
            address: 'Centro de Iquitos',
            type: 'address'
        },
        {
            name: 'Mercado de Belén',
            address: 'Jirón Putumayo, Iquitos',
            type: 'landmark'
        }
    ],

    ridePrices: {
        motocarro: {
            base: 2.00,
            perKm: 0.50,
            minimum: 3.00
        },
        carro: {
            base: 5.00,
            perKm: 1.20,
            minimum: 8.00
        }
    }
};