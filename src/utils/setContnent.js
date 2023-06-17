import Spinner from '../components/spinner/spinner';
import ErrorMessenge from '../components/errorMessenge/errorMessenge';
import Skeleton from '../components/skeleton/Skeleton';


const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return <Skeleton />
            break;
        case "loading":
            return <Spinner />
            break;
        case "confirmed":
            return <Component data={data} />
            break;
        case "error":
            return <ErrorMessenge />
            break;
        default:
            throw new Error('Unxpected process state')
    }
}

export default setContent;