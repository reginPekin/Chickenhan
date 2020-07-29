// export const getUserInfo = () =>
//   //  async (): Promise<string>
//   {
//     //   setTimeout(() => {
//     //     return 'HI';
//     //   }, 1000);
//     return 'Bzz';
//   }; // try catch

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
