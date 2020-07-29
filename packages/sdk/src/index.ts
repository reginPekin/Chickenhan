// connect with axioss

// export const getTenorGifs = async (): Promise<void> => {
//   const response = await fetch(
//     `https://api.tenor.com/v1/trending?key=GQ4H6AD66RC8`,
//   );
//   const body = await response.json();

//   return body;
// }; // try catch

export async function getUserInfo(): Promise<void> {
  const promisedFiles: Promise<string>[] = [];

  const file = ['1', '2', '3', '4', '5'];

  for (let i = 0; i++; i < file.length) {
    const promise = new Promise<string>(resolve => {
      resolve(file[i]);
    });

    promisedFiles.push(promise);
  }

  Promise.all(promisedFiles).then(res => console.log(res));
}
