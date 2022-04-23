const getData = (dataLocation) => {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
     throw Error(response.statusText)
    }
    return response.json()
  })
  .catch(err => console.log(err));
}

export {
  getData
}