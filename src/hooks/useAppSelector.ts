import { useSelector as useCustomSelector } from 'react-redux';
import { RootState } from '../store';

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) => {
    return useCustomSelector(selector, equalityFn);
};
