const deleteSubscription = (subscriptionData) => {
    console.log("Data");
    console.log(subscriptionData);
    const endpointURL = "https://cr4ectu1a1.execute-api.us-east-2.amazonaws.com/prod/deleteSubscription";
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

export default deleteSubscription;
