import axios from '../Common/axios';

let social = {
    checkValidUrl : async (url) => {
        try {
            let options = {
                method: 'POST',
                url: 'http://134.209.106.231:3000/v1/url/checker',
                data : {
                    url :url
                }
            }
            let response = await axios(options);   
            return response;
        } catch (err) {
            return err;
        }
    },
    fetchStatus : async (address) =>{
        var client = new XMLHttpRequest();
        client.onreadystatechange = function() {
         // in case of network errors this might not give reliable results
         if(this.readyState === 4)
          return this.status;
        }
        client.open("HEAD", address);
        client.send();
    }
} 

export default social;