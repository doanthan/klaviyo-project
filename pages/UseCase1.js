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
  const { handleSubmit: handleSubmit3, register: register3 } = useForm();

  const [profile, setProfile] = useState();

  const addPerson = async (formData) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/identifyProfile`,
      formData
    );
    alert(data);
  };

  const getProfile = async (formData) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/getProfile`,
      formData
    );
    setProfile(data);
  };

  const updateAddress = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/updateAddress`,
      { email: profile.$email, address: profile.$address1 }
    );
  };

  const sendEmail = async () => {
    const { data } = await axios.post(`http://localhost:3000/api/sendEmail`, {
      email: profile.$email,
      address: profile.$address1,
    });
  };

  return (
    <Container className='px-4'>
      <div className='text-center mt-40'>
        <h1>Use Case 1</h1>
        <h5 className='text-secondary'>Description</h5>
        <hr className='mt-40' />
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
            <div className='card-body'></div>
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
            <div className='card-body'>{/* <pre>{profile}</pre> */}</div>
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
            <div className='card-body'>{/* <pre>{profile}</pre> */}</div>
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
