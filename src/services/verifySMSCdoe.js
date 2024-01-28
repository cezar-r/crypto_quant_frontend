const verifySMSCode =  async (payload) => {
    try {
        const response = await fetch(process.env.REACT_APP_VERIFY_SMS_CODE_URL, {
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