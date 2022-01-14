import * as bcrypt from "bcrypt";
import * as _ from "lodash";

export class UtilsProvider {
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 4);
    }

    static isHash(password: string):Boolean {
        try {
            bcrypt.getRounds(password)
            return true
        } catch (err) {
            return false;
        }
    }

    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash || "");
    }
}
