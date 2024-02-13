const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const SCOPES= [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ]

export class GoogleSheetPlugin extends Plugins {
    async validationChecks(form_id, response) {
        // Checking whether the email field of the user is empty or not.
        // Also Checking whether the google sheets exists for the form or not.
    }

    async run(form_id, response, databaseResponse) {
        // Inserting the data into the google sheet.
    }
}