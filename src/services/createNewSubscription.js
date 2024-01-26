const createNewSubscription = (subscriptionData) => {
    console.log(subscriptionData);
    const endpointURL = "https://74m5u6odbf.execute-api.us-east-2.amazonaws.com/prod/subscription";
    fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}

export default createNewSubscription;
