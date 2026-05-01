const XLSX = require("xlsx");

const data = [
  { label: "Test", value: "123" }
];

const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Statistik");
const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
console.log("Buffer created, size:", buf.length);
