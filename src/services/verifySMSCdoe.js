const verifySMSCode =  async (payload) => {
    try {
        const response = await fetch('https://23fi2yd3q4.execute-api.us-east-2.amazonaws.com/prod/verifySMSCode', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data === "Success";
    } catch (error) {
        console.log('Failed to verify code ' + error.message);
        return {};
    }

}

export default verifySMSCode;