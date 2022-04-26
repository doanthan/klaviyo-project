import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { Form, Button, Container, Row, Col, Card } from 'reactstrap';
import { useForm } from 'react-hook-form';
import AddProfile from '../components/UseCase1/addProfile';
import GetProfileDetails from '../components/UseCase1/GetProfileDetails';

const UseCase1 = () => {
  const { register, handleSubmit } = useForm();
  const { handleSubmit: handleSubmit2, register: register2 } = useForm();

  const [profile, setProfile] = useState();

  // DT: 1st step- add a person to Klaviyo with a full address in one field
  const addPerson = async (formData) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase1/identifyProfile`,
      formData
    );
  };
  // DT: 2nd step- load a profile, using their email address as the identifier
  const getProfile = async (formData) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase1/getProfile`,
      formData
    );
    setProfile(data);
  };
  // DT: 3rd step- call out to Google Maps, and used the retrieved information to update the correct fields within Klaviyo.
  const updateAddress = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase1/updateAddress`,
      { email: profile.$email, address: profile.$address1 }
    );
  };
  // DT: 4th step- using the new long and lat coordinates, call out to Open Maps Weather API and personalise an email with the current weather condtions to a contact in Klaviyo
  const sendEmail = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase1/sendEmail`,
      {
        email: profile.$email,
        address: profile.$address1,
        lat: profile.$latitude,
        lon: profile.$longitude,
      }
    );
  };

  return (
    <Container className='px-4'>
      <div className='text-center mt-40'>
        <h1>Doan's Klaviyo Demo</h1>
        <hr className='mt-40' />
        <h5 className='text-secondary'>Use Case 1</h5>
        <p>
          <b>Issue: </b>
          Brands may have messy address data from years of data collection. It
          is also hard to impress customers and show personalisation that gives
          a great customer experience.
        </p>
        <p>
          <b>Solution: </b>
          We call out to Google Maps to correctly fill out address fields ins
          Klaviyo. This helps with future location segmentation. We then use
          this data to personalise an email with the contact's current weather
          conditions and hopefully add value and delighting customers for a
          great customer experience.
        </p>

        <i>
          <p>
            Klaviyo APIs used in this example: Post a new customer, retrieve a
            customer, update a customer, insert an event (to trigger a workflow)
          </p>
        </i>
        <i>External APIs used in this example: Google Maps, OpenWeatherAPI</i>
      </div>
      <Row className='justify-content-md-center'>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <Form onSubmit={handleSubmit(addPerson)}>
                {' '}
                <AddProfile register={register} />
              </Form>
            </div>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <p>
                1. We post a new profile to Klaviyo. Note that the Address field
                is in a single string- this makes it hard for marketers to
                segment contacts, particularly based around geolocation.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center pt-3'>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <Form onSubmit={handleSubmit2(getProfile)}>
                {' '}
                <GetProfileDetails register={register2} />
              </Form>
            </div>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <p>2. Retrieve the data:</p>
              <pre>{JSON.stringify(profile, null, '\t')}</pre>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center pt-3'>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <div className='pt-2'>
                <Button
                  onClick={updateAddress}
                  color='primary'
                  className='btn-lg btn-block'
                >
                  Update
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              3. In this step, we call out to Google API to search for the
              address that was entered in the first step. We then call back to
              Klaviyo to post the detailed location results of what was found
              using Google Maps. Note: We assume that the address is valid.
            </div>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center pt-3'>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              <div className='pt-2'>
                <Button
                  onClick={sendEmail}
                  color='primary'
                  className='btn-lg btn-block'
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className=' box-shadow '>
            <div className='card-body'>
              4. Great! What else can we do with this information? In this
              example, we use the Longitude and Lattitude attributed found by
              Google to send a personal tailored message to the contact- an
              update on the weather in their current location at time of send!
            </div>
          </Card>
        </Col>
      </Row>
      <div className='text-center py-3'>
        <Link href='/'>
          <a>
            <Button type='submit' color='secondary' className='btn-lg '>
              Home
            </Button>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default UseCase1;

export const getServerSideProps = async ({ query }) => {
  return {
    props: {},
  };
};
