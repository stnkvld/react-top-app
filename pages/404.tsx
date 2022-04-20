import { withLayout } from '../layout/Layout';

export function Error404(): JSX.Element {
    return (
        <>
            Ошибка 404
        </>
    );
}

export default withLayout(Error404);
