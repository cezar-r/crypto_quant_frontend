const getCryptoPriceData =  async (args) => {
    try {
        const response = await fetch('https://t63br8172g.execute-api.us-east-2.amazonaws.com/prod/getCryptoPriceData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(args),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Failed to fetch price data: ' + error.message);
        return {};
    }

}

export default getCryptoPriceData;