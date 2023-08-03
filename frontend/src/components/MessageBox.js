import Alert from 'react-bootstrap/Alert';
//import Spinner from 'react-bootstrap/Spinner';
export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}> {props.children} </Alert>;
}
