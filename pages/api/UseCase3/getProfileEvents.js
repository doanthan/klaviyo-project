import axios from 'axios';
export default async function getProfileEvents(req, res) {
  const profileId = req.query.profileId;
  console.log(profileId);
  const { data } = await axios.get(
    `https://a.klaviyo.com/api/v1/person/${profileId}/metrics/timeline?api_key=${process.env.KLAVIYO_SECRET_KEY}`
  );
  console.log(data.data);
  return res.status(200).send(data.data);
}
