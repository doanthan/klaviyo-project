import axios from 'axios';

// DT: Input email to receive an ID. Use the ID to receive the profile from Klaviyo
export default async function identifyProfile(req, res) {
  //get the PERSON_ID by using an email address
  const { data } = await axios.get(
    `https://a.klaviyo.com/api/v2/people/search?api_key=${process.env.KLAVIYO_SECRET_KEY}&email=${req.body.$email}`
  );
  const response = await axios.get(
    `https://a.klaviyo.com/api/v1/person/${data.id}?api_key=${process.env.KLAVIYO_SECRET_KEY}`
  );
  console.log(response);

  return res.status(200).send(response.data);
}
