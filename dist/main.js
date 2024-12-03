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
const generateSummary_1 = require("./scripts/generateSummary");
const postToSlack_1 = require("./scripts/postToSlack");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Generating sprint summary...");
            const summary = yield (0, generateSummary_1.fetchSprintsAndGenerateSummary)(); // Corrected function name
            console.log("Summary generated:", summary);
            console.log("Posting summary to Slack...");
            const result = yield (0, postToSlack_1.postToSlack)(summary);
            console.log(result);
        }
        catch (error) { // Typing error as 'any' or 'Error'
            console.error("Error:", error.message || error);
        }
    });
}
main();
