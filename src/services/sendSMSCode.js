const sendSMSCode = async (payload) => {
    const endpointURL = "https://0jsryuliel.execute-api.us-east-2.amazonaws.com/prod/sendSMSCode";
    fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}

export default sendSMSCode;
