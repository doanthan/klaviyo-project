import { Label, Button } from 'reactstrap';
const GetProfileDetails = ({ register }) => {
  return (
    <>
      <Label htmlFor='$email'>Email</Label>
      <input
        type='$email'
        className='form-control'
        id='$email'
        name='$email'
        placeholder='you@email.com'
        {...register('$email', { required: true })}
      />
      <div className='pt-2'>
        <Button type='submit' color='primary' className='btn-lg btn-block'>
          Retrieve
        </Button>
      </div>
    </>
  );
};
export default GetProfileDetails;
