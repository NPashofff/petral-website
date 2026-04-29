import { test, expect } from "@playwright/test";
import { detectCurrency, parseBrandFromFilename, parsePackage, parseViscosity } from "../src/lib/oil-import";

test.describe("oil-import parser", () => {
  test("parseBrandFromFilename extracts first non-stopword tokens", () => {
    expect(parseBrandFromFilename("Shell new price 01.09.2023.xlsx")).toBe("Shell");
    expect(parseBrandFromFilename("Castrol pricelist.xlsx")).toBe("Castrol");
    expect(parseBrandFromFilename("/some/path/Mobil catalog.xlsx")).toBe("Mobil");
    expect(parseBrandFromFilename("Total.xlsx")).toBe("Total");
  });

  test("parsePackage handles L/kg/decimals/comma", () => {
    expect(parsePackage("Advance 4T AX7 10W40 1L")).toEqual({ value: 1, unit: "L" });
    expect(parsePackage("Tellus S2 M 68 209L")).toEqual({ value: 209, unit: "L" });
    expect(parsePackage("Rimula R4 X 15W40 1000L")).toEqual({ value: 1000, unit: "L" });
    expect(parsePackage("Gadus S2 V100 2 0.4kg")).toEqual({ value: 0.4, unit: "kg" });
    expect(parsePackage("Gadus S2 V220 2 0,4kg")).toEqual({ value: 0.4, unit: "kg" });
    expect(parsePackage("Gadus S2 OG 50 204KG")).toEqual({ value: 204, unit: "kg" });
    expect(parsePackage("No size here")).toBeNull();
  });

  test("parseViscosity recognises SAE motor oil grades", () => {
    expect(parseViscosity("Advance 4T AX7 10W40 1L")).toBe("10W40");
    expect(parseViscosity("Rimula R4 X 15W40 209L")).toBe("15W40");
    expect(parseViscosity("Rimula R3 Turbo 15W-40 209L")).toBe("15W40");
    expect(parseViscosity("Rimula R2 Extra 20W-50 209L")).toBe("20W50");
  });

  test("parseViscosity recognises ISO VG industrial grades", () => {
    expect(parseViscosity("Tellus S2 M 68 209L")).toBe("ISO VG 68");
    expect(parseViscosity("Corena S2 P 100 20L")).toBe("ISO VG 100");
    expect(parseViscosity("Omala S2 GX 220 209L")).toBe("ISO VG 220");
  });

  test("parseViscosity recognises NLGI grease grades", () => {
    expect(parseViscosity("Gadus S2 V100 2 18kg")).toBe("NLGI 2");
    expect(parseViscosity("Gadus S2 V220 00 180kg")).toBe("NLGI 00");
    expect(parseViscosity("Gadus S3 V460 1.5 180 KG")).toBe("NLGI 1.5");
  });

  test("detectCurrency reads BGN / EUR / symbols from header", () => {
    expect(detectCurrency("Клиентска цена в лв/л без ДДС")).toBe("BGN");
    expect(detectCurrency("Цена в лева")).toBe("BGN");
    expect(detectCurrency("Price in BGN")).toBe("BGN");
    expect(detectCurrency("Клиентска цена в евро/л без ДДС")).toBe("EUR");
    expect(detectCurrency("Price EUR/L")).toBe("EUR");
    expect(detectCurrency("Цена в €/L")).toBe("EUR");
    expect(detectCurrency("Без обозначение")).toBeNull();
    expect(detectCurrency("")).toBeNull();
    expect(detectCurrency(null)).toBeNull();
  });

  test("parseViscosity returns null for unknown / Други", () => {
    expect(parseViscosity("Heat transfer oil S2 209L")).toBeNull();
    expect(parseViscosity("Diala S4 ZX-I 209L")).toBeNull();
    expect(parseViscosity("Ondina X 420 209L")).toBeNull();
  });
});
