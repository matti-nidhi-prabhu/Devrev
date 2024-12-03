import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export async function fetchSprintsAndGenerateSummary(): Promise<string> {
  try {
    // Fetching sprints from DevRev API
    const response = await axios.get('https://api.devrev.ai/sprints', {
      headers: {
        Authorization: `Bearer ${process.env.DEVREV_API_TOKEN}`, // Use your API token
      },
    });

    // Assuming the response contains a list of sprints
    const sprints = response.data;

    // Check if sprints data is valid
    if (!Array.isArray(sprints) || sprints.length === 0) {
      throw new Error("No sprints found.");
    }

    // Extract the sprint IDs (if you need to process them)
    const sprintIds = sprints.map((sprint: any) => sprint.id);
    console.log('Sprint IDs:', sprintIds);

    // Use the first sprint or change based on your requirements
    const sprintData = sprints[0]; // Modify this logic as needed

    // Check if sprint data has required properties before formatting summary
    if (!sprintData.totalTasks || !sprintData.completedTasks || !sprintData.blockers || !sprintData.progress) {
      throw new Error('Missing necessary sprint data');
    }

    // Format the summary
    const summary = `
      Sprint Summary:
      - Total Tasks: ${sprintData.totalTasks}
      - Tasks Completed: ${sprintData.completedTasks}
      - Blockers: ${sprintData.blockers}
      - Sprint Progress: ${sprintData.progress}%
    `;

    // Return the formatted summary
    return summary;

  } catch (error: any) {
    // Handle errors
    throw new Error(`Failed to fetch sprints or generate summary: ${error.message}`);
  }
}

// Call the function to fetch sprints and generate the summary
fetchSprintsAndGenerateSummary()
  .then((summary) => {
    console.log('Generated Sprint Summary:', summary);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
