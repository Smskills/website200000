
const API_BASE_URL = 'http://localhost:5000/api/admin';

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('sm_skills_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const handleResponse = async (response: Response) => {
  const result = await response.json();
  if (response.status === 401 && !window.location.hash.includes('login')) {
    sessionStorage.removeItem('sm_skills_token');
    window.location.href = '#/login';
    throw new Error('Session expired');
  }
  if (!response.ok) throw new Error(result.message || 'Operation failed');
  return result;
};

// AUTH
export const adminLogin = (credentials: any) => fetch(`${API_BASE_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
}).then(handleResponse);

// COURSES
export const adminGetCourses = () => fetch(`${API_BASE_URL}/courses`, { headers: getAuthHeaders() }).then(handleResponse);
export const adminCreateCourse = (data: any) => fetch(`${API_BASE_URL}/courses`, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify(data)
}).then(handleResponse);
export const adminUpdateCourse = (id: number, data: any) => fetch(`${API_BASE_URL}/courses/${id}`, {
  method: 'PUT',
  headers: getAuthHeaders(),
  body: JSON.stringify(data)
}).then(handleResponse);
export const adminDeleteCourse = (id: number) => fetch(`${API_BASE_URL}/courses/${id}`, {
  method: 'DELETE',
  headers: getAuthHeaders()
}).then(handleResponse);

// NOTICES
export const adminGetNotices = () => fetch(`${API_BASE_URL}/notices`, { headers: getAuthHeaders() }).then(handleResponse);
export const adminCreateNotice = (data: any) => fetch(`${API_BASE_URL}/notices`, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify(data)
}).then(handleResponse);
export const adminUpdateNotice = (id: number, data: any) => fetch(`${API_BASE_URL}/notices/${id}`, {
  method: 'PUT',
  headers: getAuthHeaders(),
  body: JSON.stringify(data)
}).then(handleResponse);
export const adminToggleNoticeStatus = (id: number, is_active: boolean) => fetch(`${API_BASE_URL}/notices/${id}/status`, {
  method: 'PATCH',
  headers: getAuthHeaders(),
  body: JSON.stringify({ is_active })
}).then(handleResponse);

// ENQUIRIES
export const adminGetEnquiries = () => fetch(`${API_BASE_URL}/enquiries`, { headers: getAuthHeaders() }).then(handleResponse);
