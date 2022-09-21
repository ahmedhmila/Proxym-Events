const create = async (params, credentials, evenmt) => {
    try {
        let response = await fetch('/api/evenmts/by/'+ params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: evenmt
        })
          return response.json()
        } catch(err) { 
          console.log(err)
        }
  }
  
  const list = async (signal) => {
    try {
      let response = await fetch('/api/evenmts/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const read = async (params, signal) => {
    try {
      let response = await fetch('/api/evenmts/' + params.evenmtId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, evenmt) => {
    try {
      let response = await fetch('/api/evenmts/' + params.evenmtId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: evenmt
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/evenmts/' + params.evenmtId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const listByManager = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/evenmts/by/'+params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return response.json()
    } catch(err){
      console.log(err)
    }
  }

  const newActivity = async (params, credentials, activity) => {
    try {
      let response = await fetch('/api/evenmts/'+params.evenmtId+'/activity/new', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({activity:activity})
      })
      return response.json()
    } catch(err){
      console.log(err)
    }
  }
  const listPublished = async (signal) => {
    try {
      let response = await fetch('/api/evenmts/published', {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  export {
    create,
    list,
    read,
    update,
    remove,
    listByManager,
    newActivity,
    listPublished
  }