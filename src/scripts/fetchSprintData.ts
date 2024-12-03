import axios from 'axios';

async function fetchSprintData(orgSlug: string) {
    const response = await axios.get(`https://api.devrev.ai/sprints/${orgSlug}`);
    return response.data;  // Return the sprint data
}

export default fetchSprintData;
