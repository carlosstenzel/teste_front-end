const Cors = require('micro-cors');
const _ = require('lodash');
const axios = require('axios');
const cors = Cors({
  allowedMethods: ['GET'],
});

async function Funds(req, res) {
  const urlData =
    'https://s3.amazonaws.com/orama-media/json/fund_detail_full.json?limit=1000&offset=0&serializer=fund_detail_full';

  const response2 = await axios.get(urlData);
  const data = response2.data;

  const response = _.groupBy(data, 'specification.fund_macro_strategy.name');

  const filterWithclass = Object.keys(response).map((nameMacro) => {
    const filterFundClass = _.groupBy(
      response[nameMacro],
      'specification.fund_main_strategy.name'
    );

    let filterFunds = {
      nameMacro,
      filterFundClass,
    };

    return filterFunds;
  });

  return res.json(filterWithclass);
}
module.exports = cors(Funds);
