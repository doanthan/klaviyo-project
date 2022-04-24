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
              <strong>Richard Hamming</strong>
              <p className='card-text mt-20'>
                The Art of Doing Science and Engineering is a reminder that a
                childlike capacity for learning and creativity are accessible to
                everyone.
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
              <strong>Jordan Mechner</strong>
              <p className='card-text mt-20'>
                In The Making of Prince of Persia, on the 30th anniversary of
                the game’s release, Mechner looks back at the journals he kept
                from 1985 to 1993..
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
              <strong>Nadia Eghbal</strong>
              <p className='card-text mt-20'>
                Nadia Eghbal takes an inside look at modern open source and
                offers a model through which to understand the challenges faced
                by online creators.
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
