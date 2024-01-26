const getDashboardDataForUser = async (userData) => {
    try {
        const response = await fetch('https://xy9kuuqpo4.execute-api.us-east-2.amazonaws.com/prod/getDashboardData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Failed to fetch user data: ' + error.message);
        return {};
    }
}

export default getDashboardDataForUser;

