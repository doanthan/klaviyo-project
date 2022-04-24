import { Label, Button } from 'reactstrap';
import Select from 'react-select';
const AddProfile = ({ register }) => {
  return (
    <>
      <Label htmlFor='$email'>Email address</Label>
      <input
        type='$email'
        className='form-control'
        id='$email'
        name='$email'
        placeholder='you@email.com'
        {...register('$email', { required: true })}
      />
      <Label htmlFor='$address1'>Address</Label>
      <input
        type='text'
        className='form-control'
        id='$address1'
        name='$address1'
        placeholder='Address'
        {...register('$address1', { required: true })}
      />
      <div className='pt-2'>
        <Button type='submit' color='primary' className='btn-lg btn-block'>
          Submit
        </Button>
      </div>
    </>
  );
};
export default AddProfile;
