import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Label, Row, Col, Card } from 'reactstrap';
import Link from 'next/link';
import Select from 'react-select';
import ReactDataSheet from 'react-datasheet';
import { useForm, Controller } from 'react-hook-form';
import ResultsCard from '../components/UseCase2/ResultsCard';

const UseCase2 = ({ initialData }) => {
  const { control, handleSubmit } = useForm();

  const [grid, setGrid] = useState(blankSheet);
  const [results, setResults] = useState([]);

  // DT: Submit a list of user details to be uploaded into Klaviyo and added to a certain list
  const onSubmit = async (formData) => {
    formData.emailList = grid;
    const { data } = await axios.post(
      `http://localhost:3000/api/UseCase2/updateList`,
      formData
    );
    setResults(data);
    setGrid(blankSheet);
  };

  return (
    <div className='row justify-content-md-center'>
      <div className='col-6'>
        <div className='text-center mt-40'>
          <h1>Doan's Klaviyo Demo</h1>

          <hr className='mt-40' />
          <h6>Use Case 2</h6>
          <p>
            Customer has multiple local marketeers who wish to add profiles to
            their local list, but don't need access to the Klaviyo platform.
            Create an easy to use function for these marketeers to quickly add
            profiles and their details into Klaviyo
          </p>
          <i>
            Klaviyo API's used in this interaction: Get Lists, Add Profiles to
            List
          </i>
          <Row className='justify-content-md-center'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Col sm='12'>
                <Card className=' box-shadow '>
                  <div className='card-body'>
                    <Label>Klaviyo Lists</Label>
                    <Controller
                      as={Select}
                      options={initialData}
                      name='list'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          options={initialData}
                          getOptionLabel={(data) => data.list_name}
                          getOptionValue={(data) => data.list_id}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    ></Controller>
                  </div>
                </Card>
              </Col>
              <Col sm='12'>
                <ReactDataSheet
                  data={grid}
                  valueRenderer={(cell) => cell.value}
                  onCellsChanged={(changes) => {
                    const newGrid = grid;
                    changes.forEach(({ cell, row, col, value }) => {
                      newGrid[row][col] = { ...newGrid[row][col], value };
                    });
                    setGrid(newGrid);
                  }}
                  onContextMenu={(e, cell, i, j) =>
                    cell.readOnly ? e.preventDefault() : null
                  }
                  className='dataSheet'
                />
              </Col>
              <div className='text-center py-3'>
                <Button type='submit' color='primary' className='btn-lg '>
                  Submit List
                </Button>
              </div>
            </Form>
          </Row>
          <Row>
            <Col sm='12'>
              <ResultsCard results={results} />
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

export default UseCase2;

// DT: Pre populate the page with the list of lists to populate the Select menu
export const getServerSideProps = async () => {
  const url = `https://a.klaviyo.com/api/v2/lists?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const { data } = await axios.get(url);
  const initialData = data;
  return {
    props: { initialData },
  };
};

const blankSheet = [
  [
    { readOnly: true, value: 'Email Address' },
    { readOnly: true, value: 'First Name' },
    { readOnly: true, value: 'Address' },
  ],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
];
