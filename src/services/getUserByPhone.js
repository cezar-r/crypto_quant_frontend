const getUserByPhone = async (phoneNumber) => {
    try {
        const response = await fetch('https://0sx9lvp9kd.execute-api.us-east-2.amazonaws.com/prod/user?phoneNumber=' + phoneNumber, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
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

export default getUserByPhone;

