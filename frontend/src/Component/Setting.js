import React from 'react';
import axios from 'axios';

const Setting = () => {
  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get('https://www.abhifitness.me/generate/excel', {
         withCredentials:true, responseType: 'blob' // Ensures the response is treated as a Blob (binary file)
      });
      console.log(response);
      // Extract the filename from the response headers (if available)
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.split(';')[0]?.replace(/"/g, '') // Extract filename
        : 'download.xlsx'; // Default filename

      // Create a downloadable URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // console.error('Failed to download the Excel file:', error);
      alert('An error occurred while downloading the file. Please try again later.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
    <h1 className="text-2xl font-bold mb-4 text-white">Download Member Data</h1>
    <button
      onClick={handleDownloadExcel}
      className="bg-green-600 text-white px-4 py-2 w-2/6 rounded hover:bg-green-700 transition duration-300"
    >
      Download
    </button>
    </div>
  );
};

export default Setting;
