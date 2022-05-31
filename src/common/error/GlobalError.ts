import { ApolloError } from "apollo-server-express";
import { ErrorInterface } from "common/interface/ErrorInterface";

export class GlobalError extends ApolloError {
    constructor(
        error: ErrorInterface
    ) {
        const { code, message } = error;
        super(message, code);
    }
}