# React Contact Form with Google Apps Script Backend & Proxy

This project is a simple React contact form that submits data to a Google Sheet using Google Apps Script. A Node.js proxy server is used to bypass CORS restrictions during local development.

## Features
- Modern React form UI with Tailwind CSS
- Form fields: Name, Email, Message
- Data is sent to a Google Sheet via Google Apps Script
- Node.js proxy server to handle CORS for local development

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/Pritam1234678/dummy.git
cd dummy
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```
VITE_YOUR_WEB_APP_URL=http://localhost:3001/submit
```

### 4. Set Up Google Apps Script
- Create a new Google Apps Script attached to your Google Sheet.
- Use this code for your script:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.name, data.email, data.message, new Date()]);
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}
```
- Deploy as a web app with access: "Anyone, even anonymous".
- Copy your web app URL (used in the proxy).

### 5. Start the Proxy Server
Edit `proxy-server.js` and set your Google Apps Script URL. Then run:
```sh
npm install express cors node-fetch
node proxy-server.js
```

### 6. Start the React App
```sh
npm run dev
```

## Usage
- Fill out the contact form and submit.
- Data will be sent to your Google Sheet.

## Troubleshooting
- If you see CORS errors, make sure you are submitting to the proxy (`http://localhost:3001/submit`) and the proxy is running.
- Make sure your Google Apps Script is deployed and accessible.

## License
MIT
