const express = require('express');
const path = require('path');
const { google } = require('googleapis');

const fs = require('fs');

const CLIENT_ID = '800294452856-pd8fjsjo309tm9rauoegp07f4tbcl00s.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04NLeQkwpQ097CgYIARAAGAQSNwF-L9Ir5Xvt4sGmsboz1bL06TDDe5eTY8WXYxPDrv9Ynp6xiBzHd8F9i05elW-1p9KseqPbS5k';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });  

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  }); 