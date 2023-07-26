import { IAuthTokenInterceptorConfig } from './IAuthTokenInterceptorConfig';
import { TokenRefreshRequest } from './TokenRefreshRequest';
import { Token } from './Token';
/**
 * @callback requestRefresh
 * @param {string} refreshToken - Token that is sent to the backend
 * @returns {Promise} Promise that resolves in an access token
 */
/**
 * Gets the current access token, exchanges it with a new one if it's expired and then returns the token.
 * @param {requestRefresh} requestRefresh - Function that is used to get a new access token
 * @returns {string} Access token
 */
export declare const refreshTokenIfNeeded: (requestRefresh: TokenRefreshRequest) => Promise<Token | undefined>;
/**
 * Function that returns an Axios Intercepter that:
 * - Applies that right auth header to requests
 * - Refreshes the access token when needed
 * - Puts subsequent requests in a queue and executes them in order after the access token has been refreshed.
 *
 * @param {IAuthTokenInterceptorConfig} config - Configuration for the interceptor
 * @returns {Promise} Promise that resolves in the supplied requestConfig
 */
export declare const authTokenInterceptor: ({ header, headerPrefix, requestRefresh, tokenExpireFudge, getStorage, }: IAuthTokenInterceptorConfig) => (requestConfig: any) => Promise<any>;
//# sourceMappingURL=authTokenInterceptor.d.ts.map