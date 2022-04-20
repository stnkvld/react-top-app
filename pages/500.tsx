import { withLayout } from '../layout/Layout';

export function Error500(): JSX.Element {
    return (
        <>
            Ошибка 500
        </>
    );
}

export default withLayout(Error500);
