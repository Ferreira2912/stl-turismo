export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Parse various date shapes to a Date object, preserving date-only values in local timezone
export const parseDateLocal = (value) => {
  if (!value) return null;
  // Firestore Timestamp-like
  if (typeof value === 'object' && value !== null) {
    if (typeof value.toDate === 'function') {
      const d = value.toDate();
      return isNaN(d) ? null : d;
    }
    if ('seconds' in value) {
      const d = new Date(value.seconds * 1000);
      return isNaN(d) ? null : d;
    }
  }
  if (typeof value === 'string') {
    // Handle date-only strings as local dates to avoid UTC shift (e.g., 2025-03-06)
    const m = /^\d{4}-\d{2}-\d{2}$/.exec(value.trim());
    if (m) {
      const [y, mo, d] = value.split('-').map((v) => parseInt(v, 10));
      const local = new Date(y, mo - 1, d, 0, 0, 0, 0);
      return isNaN(local) ? null : local;
    }
    // Otherwise, let Date parse (ISO with time)
    const d = new Date(value);
    return isNaN(d) ? null : d;
  }
  // Date or timestamp number
  const d = new Date(value);
  return isNaN(d) ? null : d;
};

export const formatDate = (date) => {
  const d = parseDateLocal(date);
  return d ? new Intl.DateTimeFormat('pt-BR').format(d) : '';
};

export const calculateDiscount = (originalPrice, salePrice) => {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Returns a valid Date if possible, otherwise null (no throw)
export const parseDateSafe = (value) => parseDateLocal(value);

// Determine the best start date for a package for sorting purposes
// Priority: departureDate -> earliest departureLocations[i].date -> null
export const getPackageStartDate = (pkg) => {
  // 1) Simple field
  const direct = parseDateSafe(pkg?.departureDate);
  if (direct) return direct;

  // 2) From departureLocations array (pick earliest valid)
  const locations = Array.isArray(pkg?.departureLocations) ? pkg.departureLocations : [];
  const validDates = locations
    .map((loc) => parseDateSafe(loc?.date))
    .filter((d) => d !== null);
  if (validDates.length > 0) {
    validDates.sort((a, b) => a - b);
    return validDates[0];
  }

  // 3) No date available
  return null;
};