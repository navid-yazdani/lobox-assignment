import React, {useState} from 'react';

interface ListItem {
    label: string;
    value: string;
    selected?: boolean;
}

interface UseDataProps {
    initialData: ListItem[];
}

const useData = ({initialData}: UseDataProps) => {
    const [list, setList] = useState<ListItem[]>(initialData);

    const handleSelectItem = (item: ListItem) => {
        setList((prevState) => {
            return prevState.map((elem) => {
                if (elem.value === item.value) {
                    return { ...elem, selected: !elem.selected };
                }
                return elem;
            });
        });
    };

    const addItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const elem = event.currentTarget as HTMLInputElement;
            const enteredVal = elem.value;

            if (enteredVal && !list.some((opt) => opt.value === enteredVal)) {
                setList((prevState) => [...prevState, {label: enteredVal, value: enteredVal}]);
            }
        }
    };

    return {
        list,
        handleSelectItem,
        addItem,
    };
};

export default useData;
