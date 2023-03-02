import Alert from 'react-bootstrap/Alert';
import './AlertMessage.scss';
import { useEffect, useState } from 'react';

const AlertMessage = (props) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (props.timeShow) {
            const timeId = setTimeout(() => {
                setShow(false);
            }, props.timeShow);

            return () => {
                clearTimeout(timeId);
            };
        }
    }, []);

    if (!show) {
        return null;
    }
    return (
        <Alert variant={props.variant} className="alert-message">
            {props.message}
        </Alert>
    );
};
export default AlertMessage;
