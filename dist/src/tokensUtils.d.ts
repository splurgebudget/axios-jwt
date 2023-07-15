import { Token } from './Token';
/**
 * Sets the access token
 * @param {string} token - Access token
 */
export declare const setAccessToken: (token: Token) => Promise<void>;
/**
 * Returns the stored refresh token
 * @returns {string} Refresh token
 */
export declare const getRefreshToken: () => Promise<Token | undefined>;
/**
 * Returns the stored access token
 * @returns {string} Access token
 */
export declare const getAccessToken: () => Promise<Token | undefined>;
/**
 * Clears both tokens
 */
export declare const clearAuthTokens: () => Promise<void>;
/**
 * Checks if refresh tokens are stored
 * @returns Whether the user is logged in or not
 */
export declare const isLoggedIn: () => Promise<boolean>;
//# sourceMappingURL=tokensUtils.d.ts.map