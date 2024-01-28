const sendSMSCode = async (payload) => {
    const endpointURL = process.env.REACT_APP_SEND_SMS_CODE_URL;
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
