const requestsHandler = (response, error) => {
    if(response){
        if(response.status === 200){
            return response.data;
        }
    }else if(error){
        if(error.message == 'Network Error'){
            alert('Error: '+error.message);
        }else if(error.message === 'Request failed with status code 400'){
            alert('Sorry, an input with the same ID already exists!');
        }else if(error.message === 'Request failed with status code 404'){
            alert('Sorry, No App Matching the ID!');
        }
    }
}

export default requestsHandler