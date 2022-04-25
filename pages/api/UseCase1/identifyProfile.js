import axios from 'axios';

// DT: Add a profile to Klaviyo
export default async function identifyProfile(req, res) {
  const url = 'https://a.klaviyo.com/api/identify';
  const body = {
    token: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY,
    properties: req.body,
  };
  const response = await axios.post(url, body);
  console.log(response);
  return res.status(200).send(response.statusText);
}
