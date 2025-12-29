
import { apiFetch } from './api';

/**
 * Institutional Enquiry Service
 * Routes digital enquiries to the secure backend.
 */
export const submitEnquiry = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  course: string;
}): Promise<boolean> => {
  try {
    await apiFetch('/enquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
