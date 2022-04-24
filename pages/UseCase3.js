import axios from 'axios';
import { useState } from 'react';
import { Button, Col } from 'reactstrap';
import Link from 'next/link';

const UseCase1 = ({ title, amount }) => {
  const [loading, setLoading] = useState(false);

  // Handle the submission of card details and send to Stripe
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
  };

  return (
    <div className='row justify-content-md-center'>
      <div className='col-6'>
        <div className='text-center mt-40'>
          <h1>Use Case 3</h1>
          <h5 className='text-secondary'>{title}</h5>
          <hr className='mt-40' />
          <Col xs='12'></Col>
          <hr className='mt-40' />
          <div className='mt-20 text-info'>Total due: ${amount / 100}</div>
        </div>
        <div className='card box-shadow '>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  placeholder='you@email.com'
                />
              </div>
              <div id='card-element' className='form-control'></div>
              <div>
                <Button
                  type='submit'
                  color='primary'
                  className='btn-lg btn-block'
                  disabled={loading}
                >
                  Pay ${amount / 100}
                </Button>
              </div>
            </form>
          </div>

          <div className='text-center pb-3'>
            <Link href='/'>
              <a>
                <Button type='submit' color='secondary' className='btn-lg '>
                  Return Home
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCase1;

export const getServerSideProps = async ({ query }) => {
  const { item } = query;
  const itemRes = await axios.get(
    `http://localhost:3000/api/checkout?item=${item}`
  );
  const { amount, title, error } = itemRes.data;

  return {
    props: {
      amount,
      title,
      error,
    },
  };
};
