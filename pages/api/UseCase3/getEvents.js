import axios from 'axios';
import { validateEmail } from '../../helper/functions';

export default async function identifyProfile(req, res) {
  let identifier = req.body.identifier;
  // if email address, get the ID

  if (validateEmail(identifier)) {
    const { data } = await axios.get(
      `https://a.klaviyo.com/api/v2/people/search?api_key=${process.env.KLAVIYO_SECRET_KEY}&email=${identifier}`
    );
    identifier = data.id;
  }

  // get profile based off ID
  try {
    const { data } = await axios.get(
      `https://a.klaviyo.com/api/v1/person/${identifier}?api_key=${process.env.KLAVIYO_SECRET_KEY}`
    );
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(401).send('data');
  }
}
