import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Label, Row, Col, Card } from 'reactstrap';
import Link from 'next/link';
import Select from 'react-select';
import ReactDataSheet from 'react-datasheet';
import { useForm, Controller } from 'react-hook-form';

const UseCase2 = ({ data }) => {
  const { control, handleSubmit, register } = useForm();
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

  const [grid, setGrid] = useState(blankSheet);

  return (
    <div className='row justify-content-md-center'>
      <div className='col-6'>
        <div className='text-center mt-40'>
          <h1>Use Case 2</h1>

          <hr className='mt-40' />
          <Row className='justify-content-md-center'>
            <Col sm='12'>
              <Card className=' box-shadow '>
                <div className='card-body'>
                  <Label>Klaviyo Lists</Label>
                  <Controller
                    as={Select}
                    options={data}
                    name='selectList'
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        options={data}
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
          </Row>
          <div className='text-center py-3'>
            <Link href='/'>
              <a>
                <Button type='submit' color='primary' className='btn-lg '>
                  Submit List
                </Button>
              </a>
            </Link>
          </div>
          <div className='text-center'>
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

export default UseCase2;

export const getServerSideProps = async () => {
  const url = `https://a.klaviyo.com/api/v2/lists?api_key=${process.env.KLAVIYO_SECRET_KEY}`;
  const listArray = await axios.get(url);
  const { data } = listArray;
  console.log(data);
  return {
    props: { data },
  };
};
