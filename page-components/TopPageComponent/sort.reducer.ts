import { SortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

export type SortActions = { type: SortEnum.PRICE } | { type: SortEnum.RATING } | { type: 'reset', initialState: ProductModel[] };

export interface SortReducerState {
    sort: SortEnum;
    products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
    switch(action.type) {
        case SortEnum.RATING:
            return {
                sort: SortEnum.RATING,
                products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
            };
        case SortEnum.PRICE:
            return {
                sort: SortEnum.PRICE,
                products: state.products.sort((a, b) => a.price > b.price ? 1 : -1)
            };
        case 'reset':
            return {
                sort: SortEnum.RATING,
                products: action.initialState
            };
        default:
            throw new Error('Неверный тип сортировки');
    }
};
