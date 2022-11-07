import crypto from 'crypto'
import bcrypt from 'bcryptjs';

export const correctPassword =
    async function (candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }

export const createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}