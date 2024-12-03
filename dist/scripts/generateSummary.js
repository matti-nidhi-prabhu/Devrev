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
exports.fetchSprintsAndGenerateSummary = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
function fetchSprintsAndGenerateSummary() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetching sprints from DevRev API
            const response = yield axios_1.default.get('https://api.devrev.ai/sprints', {
                headers: {
                    Authorization: `Bearer ${process.env.DEVREV_API_TOKEN}`, // Use your API token
                },
            });
            // Assuming the response contains a list of sprints
            const sprints = response.data;
            // Extract the sprint IDs (if you need to process them)
            const sprintIds = sprints.map((sprint) => sprint.id); // Adjust based on API response structure
            console.log('Sprint IDs:', sprintIds);
            // Let's assume the first sprint from the list is the one we want to summarize (change this if needed)
            const sprintData = sprints[0]; // Use specific logic if you want a specific sprint
            // Check if sprint data has required properties before formatting summary
            if (!sprintData.totalTasks || !sprintData.completedTasks || !sprintData.blockers || !sprintData.progress) {
                throw new Error('Missing necessary sprint data');
            }
            // Example: Formatting data into a sprint summary
            const summary = `
      Sprint Summary:
      - Total Tasks: ${sprintData.totalTasks}
      - Tasks Completed: ${sprintData.completedTasks}
      - Blockers: ${sprintData.blockers}
      - Sprint Progress: ${sprintData.progress}%
    `;
            // Return the formatted summary
            return summary;
        }
        catch (error) { // Catching error properly
            throw new Error(`Failed to fetch sprints or generate summary: ${error.message}`);
        }
    });
}
exports.fetchSprintsAndGenerateSummary = fetchSprintsAndGenerateSummary;
// Call the function to fetch sprints and generate the summary
fetchSprintsAndGenerateSummary()
    .then((summary) => {
    console.log('Generated Sprint Summary:', summary);
})
    .catch((error) => {
    console.error('Error:', error.message);
});
