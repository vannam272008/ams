import { useEffect, useState } from 'react';

const AlertFieldMessage = (props) => {
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
    return <label>{props.message}</label>;
};
export default AlertFieldMessage;
