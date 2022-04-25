import axios from 'axios';
import NodeGeocoder from 'node-geocoder';

// DT: Update a profile with an correct address fields inside Klaviyo
export default async function identifyProfile(req, res) {
  //get the PERSON_ID by using an email address
  const options = {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_KEY,
    formatter: null,
  };
  const geocoder = NodeGeocoder(options);
  const loc = await geocoder.geocode(req.body.address);
  const url = 'https://a.klaviyo.com/api/identify';
  const body = {
    token: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY,
    properties: {
      $email: req.body.email,
      $city: loc[0].city,
      $region: loc[0].administrativeLevels.level1long,
      $country: loc[0].country,
      $zip: loc[0].zipcode,
      $longitude: loc[0].longitude,
      $latitude: loc[0].latitude,
      formattedAddress: loc[0].formattedAddress,
    },
  };
  await axios.post(url, body);
  return res.status(200).send(loc);
}
