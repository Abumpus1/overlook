const getData = (dataLocation) => {
  return fetch(`https://pacific-plateau-49208.herokuapp.com/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
     throw Error(response.statusText)
    }
    return response.json()
  })
  .catch(err => console.log(err));
}


const postData = (userID, date, roomNum) => {
  return fetch("https://pacific-plateau-49208.herokuapp.com/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      date: date,
      roomNumber: roomNum
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .catch(err => console.log(err));
}

export {
  getData,
  postData
}