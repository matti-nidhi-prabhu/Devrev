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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postToSlack = void 0;
const axios_1 = __importDefault(require("axios"));
const botToken = process.env.SLACK_BOT_TOKEN || 'xoxb-8088747461361-8069616515686-kZYdOMmiVwU601IGOlGw06j1'; // Make sure this is correct in your .env file
function postToSlack(message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!botToken) {
            throw new Error('Slack Bot Token is missing.');
        }
        try {
            const headers = {
                Authorization: `Bearer ${botToken}`,
                'Content-Type': 'application/json',
            };
            const data = {
                channel: 'C08281TTAFL',
                text: message, // The message you want to send
            };
            const response = yield axios_1.default.post('https://slack.com/api/chat.postMessage', data, { headers });
            if (response.data.ok) {
                return 'Message sent to Slack successfully';
            }
            else {
                throw new Error('Error posting message to Slack: ' + response.data.error);
            }
        }
        catch (error) { // Using `any` type to avoid the "unknown" type error
            console.error('Error occurred:', error.message || error); // Accessing `message` on the error
            throw new Error(`Failed to post to Slack: ${error.message || error}`);
        }
    });
}
exports.postToSlack = postToSlack;
