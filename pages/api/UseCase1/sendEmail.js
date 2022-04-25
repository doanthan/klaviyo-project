import axios from 'axios';

export default async function sendEmail(req, res) {
  const email = req.body.email;
  console.log(req.body);
  console.log(process.env.OPEN_WEATHER_API_KEY);
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat.toString()}&lon=${req.body.lon.toString()}&appid=${
    process.env.OPEN_WEATHER_API_KEY
  }&units=metric`;
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
  console.log(response.data);
  return res.status(200).send('Success');
}
