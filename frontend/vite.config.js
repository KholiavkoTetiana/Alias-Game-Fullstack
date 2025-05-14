// vite.config.js
export default {
    server: {
        host: true,              // або '0.0.0.0'
        port: 5173,              // опціонально
        allowedHosts: ['alias.valadis.pp.ua'], // дозволь цей хост
    },
};
