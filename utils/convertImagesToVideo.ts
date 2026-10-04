export async function convertImagesToVideo(token: string) {
  const response = await fetch(`https://snaptik.app/render.php?token=${token}`);

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Error: Invalid convert token!');
  }
}
