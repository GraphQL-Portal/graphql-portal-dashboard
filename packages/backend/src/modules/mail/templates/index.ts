import fs from 'fs';
import path from 'path';

// templates created via sendgrid dynamic template and exported

// requires "firstName" and "resetPasswordUrl" vars
export const resetPasswordTemplate = String(
  fs.readFileSync(path.resolve(__dirname, './reset-password.html'))
);
// requires "firstName" and "confirmationUrl" vars
export const confirmationTemplate = String(
  fs.readFileSync(path.resolve(__dirname, './confirmation.html'))
);
