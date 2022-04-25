import { Card } from 'reactstrap';
const ResultsCard = ({ results }) => {
  return (
    <Card>
      <h5>Results</h5>
      {results?.map((line) => {
        <p>{line.email} added!</p>;
      })}
    </Card>
  );
};
export default ResultsCard;
