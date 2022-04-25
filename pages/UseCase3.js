import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  Alert,
} from 'reactstrap';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import Select from 'react-select';

const UseCase3 = ({ options }) => {
  const { register, handleSubmit } = useForm();
  const [profile, setProfile] = useState();
  const [events, setEvents] = useState();

  const onSubmit = async (formData) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase3/getProfile`,
      formData
    );
    setProfile(data);
    if (data !== 'Invalid') {
      const response = await axios.get(
        `http://localhost:3000/api/UseCase3/getProfileEvents?profileId=${data.id}`
      );
      setEvents(response.data);
    }
  };

  return (
    <div className='row justify-content-md-center'>
      <div className='col-6 '>
        <div className=' mt-40'>
          <h1>Doan's Klaviyo Demo</h1>

          <hr className='mt-40' />
          <h6>Use Case 3</h6>
          <p>
            Customer Service Agents may find it useful to track what user
            activity or actions have been taken by users to troubleshoot or help
            customers. We can create a page which allows customers to retrieve
            profiles from Klaviyo and view recent actions.
          </p>
          <i>
            Klaviyo API's used in this interation: Get Lists, Add Profiles to
            List
          </i>
          <Row>
            <Col sm='12'>
              <Card className=' box-shadow '>
                <div className='card-body'>
                  <Label for='identifier'>Find Email or ID</Label>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        id='identifier'
                        name='identifier'
                        placeholder='ID or Email'
                        {...register('identifier', { required: true })}
                      />{' '}
                      <span className='input-group-addon'>
                        {' '}
                        <Button>Find</Button>
                      </span>
                    </div>
                  </Form>
                </div>
              </Card>
            </Col>
            <Col sm='12'></Col>
          </Row>
          <Row className='pt-3'>
            <Col sm='4'>
              {profile && (
                <>
                  <p>Email: {profile.$email}</p>
                  <p>Klaviyo ID: {profile.id}</p>
                  <p>Address: {profile.$address1}</p>
                  <p>Created: {profile.created}</p>
                  <p>Updated: {profile.updated}</p>
                </>
              )}
            </Col>
            <Col sm='8'>
              <Select options={options}></Select>
              <Card className='pt-3'>
                <CardBody>
                  {events?.map((event) => {
                    return (
                      <Alert>
                        Event: {event.event_name}{' '}
                        <p>
                          {event.datetime.subString(
                            0,
                            event.datetime.length - 8
                          )}
                        </p>
                      </Alert>
                    );
                  })}
                </CardBody>
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
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const url = `https://a.klaviyo.com/api/v1/metrics?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const { data } = await axios.get(url);
  const options = [];
  options.push({ value: 'all', label: 'All Metrics' });
  data.data.map((metric) => {
    options.push({ value: metric.id, label: metric.name });
  });
  console.log(options);
  return {
    props: { options },
  };
};

export default UseCase3;
