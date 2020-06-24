// connect with axioss

export const getTenorGifs = async (): Promise<void> => {
  const response = await fetch('https://api.example.com/items');
  const body = await response.json();
  return body;
}; // try catch
