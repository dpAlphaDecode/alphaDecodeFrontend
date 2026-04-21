// utils/generateDummyData.js
export const generateDummyData = (base = 100, points = 30) => {
  let value = base;
  return Array.from({ length: points }, (_, i) => {
    const change = (Math.random() - 0.5) * 5; // more variation: -2.5 to +2.5
    value = Math.max(0, value + change);
    return { label: `Point ${i + 1}`, value: Number(value.toFixed(2)) };
  });
};
