// connect with axioss

export const getTenorGifs = async (): Promise<void> => {
  const response = await fetch(
    `https://api.tenor.com/v1/trending?key=GQ4H6AD66RC8`,
  );
  const body = await response.json();
  return body;
}; // try catch
