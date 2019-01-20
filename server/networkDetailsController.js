import Network from './lib/Network';
import auth from './config';

const dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(() => {
  fetchCustomerDetails();
}, dayInMilliseconds);

// setTimeout(() => {
//   fetchCustomerDetails();
// }, 3000);

const getNetworkDetails = async (start, end) => {
  // const response = await Network.find().sort({ network_name: -1 });
  const param = {
    "day": { "$lte": start, "$gte": end }
  }
  const response = await Network.find(param).sort({ network_name: -1 });
  return response;
}

export const networkDetails = (req, res) => {
  const previousDay = new Date().setDate(new Date().getDate() - 10);
  const previousDay_date = JSON.stringify(new Date(previousDay)).slice(1, 11);
  const today = JSON.stringify(new Date()).slice(1, 11);

  return getNetworkDetails(today, previousDay_date)
  .then((details) => {
    const _detailsObject = details.reduce(function(obj, entry){
      if(!obj.hasOwnProperty(entry.day)) obj[entry.day] = [];
      obj[entry.day].push(entry);
      return obj;
    }, {});

    const _detailsArray = Object.keys(_detailsObject).map(function(key){
      return _detailsObject[key];
    });
    
    _detailsArray.sort((a, b) => a[0].day > b[0].day ? 1 : b[0].day > a[0].day ? -1 : 0)
    res.send({
      networkInfo: _detailsArray,
    });
  })
  .catch(() => res.send({
    error: 'Sorry! Data not fetched',
  }))
}

const saveNetworkData = (networks, result) => {
  return networks.forEach(entry => {
    auth.get(`https://api.twitter.com/1.1/users/show.json?user_id=${entry.id}`,
      (err, response) => {
        if (!err) {
          const network_details = new Network();
          network_details.day =  JSON.stringify(new Date()).slice(1, 11);
          network_details.network_name = entry.name;
          network_details.followers_count = response.followers_count;
          network_details.followers_increase = result
            ? response.followers_count - entry.previous_count
            : response.followers_count;
  
          network_details.save((err, saved_network) => {
            if (err) {
              console.log('error', err);
            }
            return;
          });
          return;
        }
      });
  })
}

export const fetchCustomerDetails = () => {
  const yesterday = new Date().setDate(new Date().getDate() - 1);
  const yesterday_date = JSON.stringify(new Date(yesterday)).slice(1, 11);
  const networks = [
    {
      name: 'mtn',
      id: '611632849',
    },
    {
      name: 'airtel',
      id: '1024573431315091458',
    },
    {
      name: 'glo',
      id: '1303300358',
    },
    {
      name: 'etisalat',
      id: '1004111881',
    },
  ];

  Network.find({ day: yesterday_date }, function(err, result) {
    if (err) {
      console.log(err);
    }

    if (result.length) {
      networks.forEach(network => {
        network.previous_count = result.find(data =>
          data.network_name === network.name).followers_count;
      });

      return saveNetworkData(networks, result.length);
    }
    return saveNetworkData(networks);
  });
}