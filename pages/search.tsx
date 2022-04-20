import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";
import { withLayout } from "../layout/Layout";

function Search(): JSX.Element {
    return (
        <>

        </>
    );
}

export default withLayout(Search);

interface SearchProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
}
