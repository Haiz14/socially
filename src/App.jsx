import { useState } from 'react';
import ytdl from 'ytdl-core';
import './App.css';

function App() {
  const [dlLink, setDlLink] = useState('');

  const handleInputChange = (event) => {
    setDlLink(event.target.value);
  };

  const handleDownload = () => {
    if (dlLink) {
      // Perform download logic using the dlLink state value
      const videoUrl = dlLink;
      const videoInfo = ytdl.getInfo(videoUrl);

      videoInfo.then((info) => {
        const videoTitle = info.videoDetails.title;
        const downloadOptions = {
          quality: 'highest',
        };

        const videoReadableStream = ytdl(videoUrl, downloadOptions);
        const downloadLink = URL.createObjectURL(videoReadableStream);
        const downloadElement = document.createElement('a');

        downloadElement.href = downloadLink;
        downloadElement.download = `${videoTitle}.mp4`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);

        console.log('Downloading:', videoTitle);
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <>
      <input type="text" placeholder="Enter YT link" onChange={handleInputChange} />
      <button onClick={handleDownload}>Download</button>
    </>
  );
}

export default App;
