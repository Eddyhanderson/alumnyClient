import { UserModel } from '../user-model/user-model';
import { AuthConfigToken } from '../auth-config-tokens/auth-config-tokens';

export class AuthResult {
    user: UserModel;

    authConfigTokens: AuthConfigToken;

    authenticated: boolean;

    errors: Array<string>;

    messages: Array<string>;
}