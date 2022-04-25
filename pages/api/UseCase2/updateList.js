import axios from 'axios';
import { validateEmail } from '../../helper/functions';

export default async function updateList(req, res) {
  const url = `https://a.klaviyo.com/api/v2/list/${req.body.list.list_id}/members?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const gridList = req.body.emailList;
  const sendList = [];

  await gridList.map((line) => {
    // for each contact, check to see if the email field is a valid email
    if (validateEmail(line[0].value)) {
      //if so, push the email into the listt to be imported into Klaviyo
      sendList.push({
        email: line[0].value,
        firstName: line[1].value,
        address: line[2].value,
      });
    }
  });
  const { data } = await axios.post(url, { profiles: sendList });
  console.log(data);

  return res.status(200).send(data);
}
