const transformDate = require("./transformDate");

test("Преобразование даты", () => {
  expect(transformDate("2025-02-04T21:00:00.000Z")).toBe("5 февраля 2025");
});
