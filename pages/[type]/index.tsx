import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { MenuItem } from "../../interfaces/menu.interface";
import axios from "axios";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { API } from "../../helpers/api";

function Type({ firstCategory }: TypeProps): JSX.Element {
    return (
        <>
            {firstCategory}
        </>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => `/${m.route}`),
        fallback: true
    };
};

export async function getStaticProps({ params }: GetStaticPropsContext<ParsedUrlQuery>) {
    if (!params) {
        return {
            notFound: true
        };
    }

    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

    if (!firstCategoryItem) {
        return {
            notFound: true
        };
    }

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id
    });

    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        }
    };
}

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
}
