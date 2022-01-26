import { ValueTransformer } from "typeorm";
import { UtilsProvider } from "../../providers/UtilsProvider";

/**
 * 비밀번호 변환기
 */
export class PasswordTransformer implements ValueTransformer {
    to(value: any) {
        return UtilsProvider.isHash(value) ? value : UtilsProvider.generateHash(value);
    }
    from(value: any) {
        return value;
    }
}
