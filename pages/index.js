import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Button } from 'reactstrap';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className='text-center mt-40'>
        <h1>Doan's Demo</h1>
      </div>
      <div className='mt-40 row'>
        <div className='col'>
          <div className='card box-shadow'>
            <img
              src='/images/art-science-eng.jpg'
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Use Case 1</h5>
              <strong>Data Cleansing & Cool Personalisation</strong>
              <p className='card-text mt-20'>
                Using Google Maps API and OpenWeatherAPI, we cleanse a profile's
                address attributes and use the information to send hyper
                personalised messages from Klaviyo.
              </p>
              <Link href='/UseCase1'>
                <a>
                  <Button color='primary'>Go to Use Case 1</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card box-shadow'>
            <img
              src='/images/prince-of-persia.jpg'
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Use Case 2</h5>
              <strong>Distributed Marketing</strong>
              <p className='card-text mt-20'>
                In a distributed marketing model, multiple marketeers in
                different regions run their own campaigns and add to their own
                regional lists. This use case presents a portal where a
                marketeer can add profiles to their own list without having to
                enter the Klaviyo product.
              </p>
              <Link href='/UseCase2'>
                <a>
                  <Button color='primary'>Go to Use Case 2</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card box-shadow'>
            <img
              src='/images/working-in-public.jpg'
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Use Case 3</h5>
              <strong>External Customer Support Page</strong>
              <p className='card-text mt-20'>
                It could be useful for customer support agents to retrieve
                events from Klaviyo in real time to help with support case
                issues. They usually would not be given access to the Klaviyo
                platform- this use case provides a page to access events
                collected by Klaviyo, and information about the customer.
              </p>
              <Link href='/UseCase3'>
                <a>
                  <Button color='primary'>Go to Use Case 3</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
