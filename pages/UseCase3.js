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

  // DT: Submit to retrieve customer profile and to set the initial events
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

  // DT: OnChange event when selecting a new option in the Select Events
  const changeEvents = async (e) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/UseCase3/getProfileEvents?profileId=${profile.id}&metric=${e.value}`
    );
    setEvents(data);
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
            Klaviyo API's used in this interaction: Get Metrics list, get
            Profile, get Events, Get specific events
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
              <Select options={options} onChange={changeEvents}></Select>
              <Card className='pt-3'>
                <CardBody>
                  {events?.map((event) => {
                    return (
                      <Alert>
                        Event: {event.event_name}{' '}
                        <p>
                          {event.datetime.slice(0, event.datetime.length - 9)}{' '}
                          {event.event_properties.Subject}
                          {event.event_name === 'Received Email' && (
                            <a
                              target='_blank'
                              href={`https://www.klaviyo.com/message/flow-message/web-view/${event.event_properties.$event_id.slice(
                                7,
                                46
                              )}`}
                              rel='noopener noreferrer'
                            >
                              <span> 🚀</span>
                            </a>
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

// DT: Code to run Server Side before page gets populated
// We retrieve all the metrics from Klaviyo and populate the Select on the page.
// We all push an 'All Metrics' option on top of the options
export const getServerSideProps = async () => {
  const url = `https://a.klaviyo.com/api/v1/metrics?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const { data } = await axios.get(url);
  const options = [];
  options.push({ value: 'all', label: 'All Metrics' });
  data.data.map((metric) => {
    options.push({ value: metric.id, label: metric.name });
  });
  return {
    props: { options },
  };
};

export default UseCase3;
