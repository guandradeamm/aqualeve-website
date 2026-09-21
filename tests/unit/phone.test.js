import {
  formatBrazilianPhone,
  isValidBrazilianPhone,
  onlyPhoneDigits,
} from "../../lib/phone";

describe("Brazilian phone helpers", () => {
  it("limits input to 11 digits and formats mobile numbers", () => {
    expect(formatBrazilianPhone("31999998888")).toBe("(31) 99999-8888");
    expect(formatBrazilianPhone("319999988889999")).toBe("(31) 99999-8888");
    expect(onlyPhoneDigits("(31) 99999-8888")).toBe("31999998888");
  });

  it("formats landline numbers with 10 digits", () => {
    expect(formatBrazilianPhone("3133334444")).toBe("(31) 3333-4444");
  });

  it("validates realistic Brazilian lengths", () => {
    expect(isValidBrazilianPhone("")).toBe(true);
    expect(isValidBrazilianPhone("(31) 99999-8888")).toBe(true);
    expect(isValidBrazilianPhone("(31) 3333-4444")).toBe(true);
    expect(isValidBrazilianPhone("(31) 3333-444")).toBe(false);
    expect(isValidBrazilianPhone("(31) 88888-8888")).toBe(false);
    expect(isValidBrazilianPhone("(00) 99999-8888")).toBe(false);
  });
});
