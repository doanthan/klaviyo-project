import axios from 'axios';

export default async function updateList(req, res) {
  const url = `https://a.klaviyo.com/api/v2/list/${req.body.list.list_id}/members?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const gridList = req.body.emailList;
  const sendList = [];
  await gridList.map((line) => {
    if (validateEmail(line[0].value)) {
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

// Test to see if email is valid before sending to Klaviyo
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
