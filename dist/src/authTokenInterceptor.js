"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenInterceptor = exports.refreshTokenIfNeeded = void 0;
var tokensUtils_1 = require("./tokensUtils");
var setAuthTokens_1 = require("./setAuthTokens");
var axios_1 = __importDefault(require("axios"));
var StorageProxy_1 = require("./StorageProxy");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var StorageKey_1 = require("./StorageKey");
var getBrowserLocalStorage_1 = require("./getBrowserLocalStorage");
var applyStorage_1 = require("./applyStorage");
var ms_1 = __importDefault(require("ms"));
// Token Leeway
// A little time before expiration to try refresh (seconds)
var expireFudge = 10;
var currentlyRequestingPromise = undefined;
/**
 * Gets the unix timestamp from an access token
 *
 * @param {string} token - Access token
 * @returns {string} Unix timestamp
 */
var getTimestampFromToken = function (token) {
    var decoded = (0, jwt_decode_1.default)(token);
    return decoded.exp;
};
/**
 * Returns the number of seconds before the access token expires or -1 if it already has
 *
 * @param {string} token - Access token
 * @returns {number} Number of seconds before the access token expires
 */
var getExpiresIn = function (token) {
    var expiration = getTimestampFromToken(token);
    if (!expiration)
        return -1;
    return expiration - Date.now() / 1000;
};
/**
 * Checks if the token is undefined, has expired or is about the expire
 *
 * @param {string} token - Access token
 * @returns Whether or not the token is undefined, has expired or is about the expire
 */
var isTokenExpired = function (token) {
    if (!token)
        return true;
    var expiresIn = getExpiresIn(token);
    return !expiresIn || expiresIn <= expireFudge;
};
/**
 * Refreshes the access token using the provided function
 * Note: NOT to be called externally.  Only accessible through an interceptor
 *
 * @param {requestRefresh} requestRefresh - Function that is used to get a new access token
 * @returns {string} - Fresh access token
 */
var refreshToken = function (requestRefresh) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, newTokens, error_1, status_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, tokensUtils_1.getRefreshToken)()];
            case 1:
                refreshToken = _c.sent();
                if (!refreshToken)
                    throw new Error('No refresh token available');
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, , 11]);
                return [4 /*yield*/, requestRefresh(refreshToken)];
            case 3:
                newTokens = _c.sent();
                if (!(typeof newTokens === 'object' && (newTokens === null || newTokens === void 0 ? void 0 : newTokens.accessToken))) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, setAuthTokens_1.setAuthTokens)(newTokens)];
            case 4:
                _c.sent();
                return [2 /*return*/, newTokens.accessToken];
            case 5:
                if (!(typeof newTokens === 'string')) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, tokensUtils_1.setAccessToken)(newTokens)];
            case 6:
                _c.sent();
                return [2 /*return*/, newTokens];
            case 7: throw new Error('requestRefresh must either return a string or an object with an accessToken');
            case 8:
                error_1 = _c.sent();
                if (!axios_1.default.isAxiosError(error_1)) return [3 /*break*/, 10];
                status_1 = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status;
                if (!(status_1 === 401 || status_1 === 422)) return [3 /*break*/, 10];
                // The refresh token is invalid so remove the stored tokens
                return [4 /*yield*/, ((_b = StorageProxy_1.StorageProxy.Storage) === null || _b === void 0 ? void 0 : _b.remove(StorageKey_1.STORAGE_KEY))];
            case 9:
                // The refresh token is invalid so remove the stored tokens
                _c.sent();
                throw new Error("Got ".concat(status_1, " on token refresh; clearing both auth tokens"));
            case 10:
                // A different error, probably network error
                if (error_1 instanceof Error) {
                    throw new Error("Failed to refresh auth token: ".concat(error_1.message));
                }
                else {
                    throw new Error('Failed to refresh auth token and failed to parse error');
                }
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
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
var refreshTokenIfNeeded = function (requestRefresh) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, tokensUtils_1.getAccessToken)()
                // check if access token is expired
            ];
            case 1:
                accessToken = _a.sent();
                if (!(!accessToken || isTokenExpired(accessToken))) return [3 /*break*/, 3];
                return [4 /*yield*/, refreshToken(requestRefresh)];
            case 2:
                // do refresh
                accessToken = _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, accessToken];
        }
    });
}); };
exports.refreshTokenIfNeeded = refreshTokenIfNeeded;
/**
 * Function that returns an Axios Intercepter that:
 * - Applies that right auth header to requests
 * - Refreshes the access token when needed
 * - Puts subsequent requests in a queue and executes them in order after the access token has been refreshed.
 *
 * @param {IAuthTokenInterceptorConfig} config - Configuration for the interceptor
 * @returns {Promise} Promise that resolves in the supplied requestConfig
 */
var authTokenInterceptor = function (_a) {
    var _b = _a.header, header = _b === void 0 ? 'Authorization' : _b, _c = _a.headerPrefix, headerPrefix = _c === void 0 ? 'Bearer ' : _c, requestRefresh = _a.requestRefresh, _d = _a.tokenExpireFudge, tokenExpireFudge = _d === void 0 ? '10s' : _d, _e = _a.getStorage, getStorage = _e === void 0 ? getBrowserLocalStorage_1.getBrowserLocalStorage : _e;
    expireFudge =
        (0, ms_1.default)(typeof tokenExpireFudge === 'string' ? tokenExpireFudge : "".concat(tokenExpireFudge, "s")) / 1000;
    (0, applyStorage_1.applyStorage)(getStorage());
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- Waiting for a fix in axios types
    return function (requestConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, tokensUtils_1.getRefreshToken)()];
                case 1:
                    // Waiting for a fix in axios types
                    // We need refresh token to do any authenticated requests
                    if (!(_a.sent()))
                        return [2 /*return*/, requestConfig];
                    accessToken = undefined;
                    if (!currentlyRequestingPromise) return [3 /*break*/, 3];
                    return [4 /*yield*/, currentlyRequestingPromise];
                case 2:
                    accessToken = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!!accessToken) return [3 /*break*/, 7];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    // Sets the promise so everyone else will wait - then get the value
                    currentlyRequestingPromise = (0, exports.refreshTokenIfNeeded)(requestRefresh);
                    return [4 /*yield*/, currentlyRequestingPromise
                        // Reset the promise
                    ];
                case 5:
                    accessToken = _a.sent();
                    // Reset the promise
                    currentlyRequestingPromise = undefined;
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    // Reset the promise
                    currentlyRequestingPromise = undefined;
                    if (error_2 instanceof Error) {
                        throw new Error("Unable to refresh access token for request due to token refresh error: ".concat(error_2.message));
                    }
                    return [3 /*break*/, 7];
                case 7:
                    // add token to headers
                    if (accessToken && requestConfig.headers) {
                        requestConfig.headers[header] = "".concat(headerPrefix).concat(accessToken);
                    }
                    return [2 /*return*/, requestConfig];
            }
        });
    }); };
};
exports.authTokenInterceptor = authTokenInterceptor;
//# sourceMappingURL=authTokenInterceptor.js.map