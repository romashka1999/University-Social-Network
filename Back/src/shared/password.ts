import * as bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<{salt: string, hashedPassword: string}> => {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return {
        salt,
        hashedPassword
    }
}

export const validatePassword = async (password: string, self: any): Promise<boolean> => {
    const hash = await bcryptjs.hash(password, self.salt);
    return hash === self.password;
}