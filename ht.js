// script.js
const { create } = require('ipfs-http-client');
const client = create('/ip4/127.0.0.1/tcp/5001');

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    try {
        const added = await client.add(file);
        const hash = added.path;
        document.getElementById('output').innerText = `File uploaded: ${hash}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Check the console for details.');
    }
}

async function downloadFile() {
    const hashInput = document.getElementById('hashInput');
    const hash = hashInput.value.trim();

    if (!hash) {
        alert('Please enter a valid IPFS hash.');
        return;
    }

    try {
        const file = await client.cat(hash);
        const fileBlob = new Blob([file], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        document.getElementById('output').innerText = 'File downloaded successfully.';
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file. Check the console for details.');
    }
}
