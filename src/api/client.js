const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrfCookie() {
  if (!getCookie('csrftoken')) {
    await fetch(`${BASE_URL}/csrf/`, { credentials: 'include' });
  }
}

async function request(path, { method = 'GET', body, params } = {}) {
  const needsCsrf = method !== 'GET' && method !== 'HEAD';
  if (needsCsrf) await ensureCsrfCookie();

  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''));
    const qsString = qs.toString();
    if (qsString) url += `?${qsString}`;
  }

  const headers = {};
<<<<<<< HEAD
  if (body !== undefined && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';
=======
  if (body !== undefined) headers['Content-Type'] = 'application/json';
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
  if (needsCsrf) headers['X-CSRFToken'] = getCookie('csrftoken') || '';

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers,
<<<<<<< HEAD
    body: body instanceof FormData ? body : (body !== undefined ? JSON.stringify(body) : undefined),
=======
    body: body !== undefined ? JSON.stringify(body) : undefined,
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
  });

  if (res.status === 204) return null;

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const error = new Error(data?.detail || `Request failed: ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  get: (path, params) => request(path, { method: 'GET', params }),
  post: (path, body) => request(path, { method: 'POST', body: body ?? {} }),
  patch: (path, body) => request(path, { method: 'PATCH', body: body ?? {} }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
