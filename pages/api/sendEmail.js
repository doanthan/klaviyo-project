import axios from 'axios';

export default async function sendEmail(req, res) {
  const email = req.body.email;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-33.9236117&lon=151.0189137&appid=15de4c48d32c487be2f8f233f7399175&units=metric`;
  const { data } = await axios.get(weatherUrl);
  console.log(data);
  const body = {
    token: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY,
    event: 'weather_update',
    customer_properties: {
      $email: email,
    },
    properties: {
      $email: email,
      weather_main: data.weather[0].main,
      weather_description: data.weather[0].description,
      weather_icon: data.weather[0].icon,
      weather_temp: data.main.temp,
    },
  };
  const klaviyoUrl = 'https://a.klaviyo.com/api/track';
  const response = await axios.post(klaviyoUrl, body);

  return res.status(200).send('response.statusText');
}
