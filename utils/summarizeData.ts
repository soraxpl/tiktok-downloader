import BeautifulDom from 'beautiful-dom';

interface SummarizedData {
  desc: string | false;
  author: string | false;
  urlVideoDownload: string | false;
  urlAlbums: string[] | false;
  availableImagesToVideo: boolean;
  tokenConverter: string | false;
}

export function summarizeData(dom: BeautifulDom): SummarizedData {
  let author: string | boolean = false;
  let desc: string | boolean = false;
  let urlVideoDownload: string | boolean = false;
  let urlAlbums: string[] | boolean = [];
  let tokenConverter: string | boolean = false;
  let availableImagesToVideo: boolean = false;

  try {
    author = dom.getElementsByTagName('span')[0].textContent;
  } catch (error) {
    author = false;
  }

  try {
    desc = dom.getElementsByClassName('video-title')[0].textContent;
  } catch (error) {
    desc = false;
  }

  try {
    urlVideoDownload = dom
      .getElementsByClassName('download-file')[0]
      .getAttribute('href') as string;
  } catch (error) {
    availableImagesToVideo = true;
    urlVideoDownload = false;
  }

  if (availableImagesToVideo) {
    try {
      const elements = dom.getElementsByTagName('a');

      urlAlbums = Array.from(elements)
        .map((element) => element.getAttribute('href') as string)
        .filter((href) => href && href.includes('https'))
        .map((url) => url.replace('&dl=1', ''));
    } catch (error) {
      urlAlbums = false;
    }

    try {
      const renderToken = dom
        .getElementsByClassName('btn-render')[0]
        .getAttribute('data-token') as string;

      tokenConverter = renderToken;
    } catch (error) {
      tokenConverter = false;
    }
  }

  return {
    author,
    desc,
    urlVideoDownload,
    urlAlbums,
    availableImagesToVideo,
    tokenConverter,
  };
}
