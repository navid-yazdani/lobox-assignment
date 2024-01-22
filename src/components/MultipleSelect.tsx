import {FC, useEffect, useRef, useState} from 'react';
import useData from '../utiles/useData.ts';
import '../styles/MultipleSelect.scss';

const MultipleSelect: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOut);
        return () => {
            document.removeEventListener('click', handleClickOut);
        };
    }, []);

    const {
        list,
        handleSelectItem,
        addItem,
    } = useData({
        initialData: [
            {label: 'Sample 1', value: 'sample1'},
            {label: 'Sample 2', value: 'sample2'},
        ],
    });

    const handleClickOut = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node) && listRef.current && !listRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="select-wrapper">
            <input
                ref={inputRef}
                type="text"
                placeholder="Add an item..."
                onKeyDown={(e) => addItem(e)}
                onClick={toggleList}
                className='select'
            />
            <span className={`arrow-icon ${isOpen ? 'rotate' : ''}`}>&#9662;</span>
            {isOpen && (
                <div ref={listRef} className="list">
                    {list.map((item) => (
                        <div key={item.value} className={`list-item ${item.selected ? 'selected-color' : ''}`} onClick={() => handleSelectItem(item)}>
                            {item.label}
                            {item.selected && <span>&#10003;</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultipleSelect;
