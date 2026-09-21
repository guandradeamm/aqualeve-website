function onlyPhoneDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

/**
 * Formata telefone brasileiro:
 * - fixo 10 dígitos: (00) 0000-0000
 * - celular 11 dígitos: (00) 00000-0000
 */
function formatBrazilianPhone(value = "") {
  const digits = onlyPhoneDigits(value).slice(0, 11);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidBrazilianPhone(value = "") {
  const digits = onlyPhoneDigits(value);

  if (!digits) {
    return true;
  }

  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  if (digits.length === 10) {
    return true;
  }

  if (digits.length === 11) {
    return digits[2] === "9";
  }

  return false;
}

export {
  formatBrazilianPhone,
  isValidBrazilianPhone,
  onlyPhoneDigits,
};
