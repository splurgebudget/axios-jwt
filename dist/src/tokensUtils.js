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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.clearAuthTokens = exports.getAccessToken = exports.getRefreshToken = exports.setAccessToken = void 0;
var setAuthTokens_1 = require("./setAuthTokens");
var StorageProxy_1 = require("./StorageProxy");
var StorageKey_1 = require("./StorageKey");
// PRIVATE
/**
 *  Returns the refresh and access tokens
 * @returns {IAuthTokens} Object containing refresh and access tokens
 */
var getAuthTokens = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawTokens;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ((_a = StorageProxy_1.StorageProxy.Storage) === null || _a === void 0 ? void 0 : _a.get(StorageKey_1.STORAGE_KEY))];
            case 1:
                rawTokens = _b.sent();
                if (!rawTokens)
                    return [2 /*return*/];
                try {
                    // parse stored tokens JSON
                    return [2 /*return*/, JSON.parse(rawTokens)];
                }
                catch (error) {
                    if (error instanceof SyntaxError) {
                        error.message = "Failed to parse auth tokens: ".concat(rawTokens);
                        throw error;
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * Sets the access token
 * @param {string} token - Access token
 */
var setAccessToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthTokens()];
            case 1:
                tokens = _a.sent();
                if (!tokens) {
                    throw new Error('Unable to update access token since there are not tokens currently stored');
                }
                tokens.accessToken = token;
                return [4 /*yield*/, (0, setAuthTokens_1.setAuthTokens)(tokens)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setAccessToken = setAccessToken;
/**
 * Returns the stored refresh token
 * @returns {string} Refresh token
 */
var getRefreshToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthTokens()];
            case 1:
                tokens = _a.sent();
                return [2 /*return*/, tokens ? tokens.refreshToken : undefined];
        }
    });
}); };
exports.getRefreshToken = getRefreshToken;
/**
 * Returns the stored access token
 * @returns {string} Access token
 */
var getAccessToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAuthTokens()];
            case 1:
                tokens = _a.sent();
                return [2 /*return*/, tokens ? tokens.accessToken : undefined];
        }
    });
}); };
exports.getAccessToken = getAccessToken;
/**
 * Clears both tokens
 */
var clearAuthTokens = function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0: return [4 /*yield*/, ((_a = StorageProxy_1.StorageProxy.Storage) === null || _a === void 0 ? void 0 : _a.remove(StorageKey_1.STORAGE_KEY))
            /**
             * Checks if refresh tokens are stored
             * @returns Whether the user is logged in or not
             */
        ];
        case 1: return [2 /*return*/, _b.sent()
            /**
             * Checks if refresh tokens are stored
             * @returns Whether the user is logged in or not
             */
        ];
    }
}); }); };
exports.clearAuthTokens = clearAuthTokens;
/**
 * Checks if refresh tokens are stored
 * @returns Whether the user is logged in or not
 */
var isLoggedIn = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getRefreshToken)()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, !!token];
        }
    });
}); };
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=tokensUtils.js.map