import { celsiusToFahrenheit } from "../mathUtils";

describe("Tests Unitaires", () => {
  test("convertit 0°C en 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test("convertit 100°C en 212°F", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });
});