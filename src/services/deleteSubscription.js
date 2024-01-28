const deleteSubscription = (subscriptionData) => {
    const endpointURL = process.env.REACT_APP_DELETE_SUB_URL;
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
