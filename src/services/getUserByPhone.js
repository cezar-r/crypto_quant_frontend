const getUserByPhone = async (phoneNumber) => {
    try {
        const response = await fetch(process.env.REACT_APP_GET_USER_URL + phoneNumber, {
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

