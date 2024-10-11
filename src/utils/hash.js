import crypto from 'crypto';
function hashPassword(password) {
    const hash = crypto.createHash('sha256'); // You can use other algorithms like 'sha512', 'md5', etc.
    hash.update(password);
    return hash.digest('hex');
  }

  export { hashPassword };