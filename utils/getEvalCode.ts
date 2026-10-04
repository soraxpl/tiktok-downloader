export async function getEvalCode(url: string): Promise<string> {
  const formdata = new FormData();
  formdata.append(
    'url',
    url
  );

  const requestOptions = <RequestInit>{
    method: 'POST',
    body: formdata,
  };

  const response = await fetch('https://snaptik.app/abc2.php', requestOptions);

  return await response.text();
}
