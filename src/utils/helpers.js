export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
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
export const parseDateSafe = (value) => {
  if (!value) return null;
  try {
    const d = new Date(value.seconds ? value.seconds * 1000 : value);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
};

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