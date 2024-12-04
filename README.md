Documentation: Sprint Summarizer

This project, Sprint Summarizer, is a tool designed to automate the generation of sprint progress summaries from the DevRev API and send the summaries to a Slack channel using a Slack bot. The application is written in TypeScript and leverages APIs for communication and functionality.


### **Features**
1. **Fetch Sprint Data**:
   - Retrieves sprint information from the DevRev API.
   - Uses an authentication token for secure API access.

2. **Generate Summary**:
   - Summarizes the key metrics of a sprint, such as total tasks, completed tasks, blockers, and progress.

3. **Post to Slack**:
   - Sends the generated summary to a specified Slack channel.
   - Uses a Slack bot for posting messages.

4. **Error Handling**:
   - Includes robust error handling for API failures, missing data, and environmental misconfigurations.

---

### **File Descriptions**

#### **1. `main.ts`**
- **Purpose**: Acts as the entry point for the application.
- **Functions**:
  - Fetches sprint data using `generateSummary`.
  - Posts the generated summary to a Slack channel using `postToSlack`.
- **Key Variables**:
  - `slackChannel`: Specifies the Slack channel to post to.
  - `devrevOrgSlug`: Defines the DevRev organization slug for API usage.

#### **2. `generateSummary.ts`**
- **Purpose**: Fetches sprint data from the DevRev API and formats it into a summary.
- **Core Logic**:
  - Fetches data using `axios` from the `/sprints` endpoint.
  - Validates that all necessary sprint properties (e.g., total tasks, completed tasks) are present.
  - Returns a human-readable summary string.

#### **3. `postToSlack.ts`**
- **Purpose**: Posts a message to a specified Slack channel using Slack's `chat.postMessage` API.
- **Core Logic**:
  - Authenticates using a Slack bot token.
  - Sends a POST request to Slack with the channel ID and message.
  - Validates the success of the operation.

---

### **Code Highlights**

#### **Environment Variables**
The application uses the following environment variables:
- `DEVREV_API_TOKEN`: Authentication token for DevRev API.
- `SLACK_BOT_TOKEN`: Token for Slack bot authentication.
- `SLACK_CHANNEL`: Default Slack channel to post messages to.
- `DEVREV_ORG_SLUG`: Organization slug for DevRev API.

#### **Main Code Flow**
1. Fetch sprint data using `generateSummary`.
2. Log the fetched sprint details.
3. Generate a formatted summary of the sprint's progress.
4. Post the summary to Slack using `postToSlack`.
5. Handle errors at every step to ensure smooth operation.

#### **Sample Slack Summary**
```plaintext
Sprint Summary:
- Total Tasks: 50
- Tasks Completed: 45
- Blockers: 2
- Sprint Progress: 90%
```

---

### **Dependencies**
- **Node.js**: Runtime environment.
- **TypeScript**: Programming language for better type safety.
- **Axios**: HTTP client for API requests.
- **Dotenv**: For managing environment variables.

---

### **How to Run the Project**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ananya168/SprintSummarizer.git
   cd SprintSummarizer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   DEVREV_API_TOKEN=your_devrev_api_token
   SLACK_BOT_TOKEN=your_slack_bot_token
   SLACK_CHANNEL=#general
   DEVREV_ORG_SLUG=your_devrev_organization_slug
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

---

### **Error Handling**
1. **Missing Data**:
   - If required sprint data is missing, the application throws an error with appropriate messages.
2. **API Failures**:
   - Logs and handles API request failures.
3. **Invalid Configuration**:
   - Validates the presence of all environment variables and provides meaningful errors if they are missing.

---

### **Future Improvements**
- Add support for multiple sprints in one summary.
- Include more detailed metrics, such as team-specific progress or velocity.
- Enhance Slack message formatting with rich text or interactive components.

This documentation provides a comprehensive understanding of the Sprint Summarizer project, its purpose, and its functionality.
