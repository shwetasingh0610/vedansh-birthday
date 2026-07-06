import { API_BASE } from './config.js';

async function req(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const getWishes = () => req('/wishes');

export const addWish = ({ name, message }) =>
  req('/wishes', { method: 'POST', body: JSON.stringify({ name, message }) });

export const sendRsvp = (payload) =>
  req('/rsvp', { method: 'POST', body: JSON.stringify(payload) });
