// API base URL for the backend.
// - Local dev:   http://localhost:3000
// - Production:  set window.__API_BASE__ in index.html to your Render URL,
//                e.g. https://vedansh-birthday-api.onrender.com
export const API_BASE = (window.__API_BASE__ || 'http://localhost:3000').replace(/\/+$/, '');
