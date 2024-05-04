import React from 'react';
import { Dropdown, Label, ClearIcon, Menu, Option, LoadingIcon } from './Select.styled';
import { capitalize } from '../common/capitalize';

export const orderByKey = (arr: any[], key: string) => {
    return arr.sort((a, b) => a[key] > b[key] ? 1 : -1)
}

interface SelectProps {
    label?: string
    name: string
    options: { id: string, label: string }[]
    selected: any
    onChange: (val: any) => any
    isLoading?: boolean
}

export const Select = ({ label, name, options = [], selected, onChange, isLoading }: SelectProps) => {
    const [ isOpen, setIsOpen ] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleInputFocus = () => {
        setIsOpen(true);
        setTimeout(() => {
            menuRef.current?.focus();
        }, 100);        
    }

    const handleMenuBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    }

    return <Dropdown>
        {label && <Label>{label}</Label>}
        <div style={{ position: 'relative', display: 'inline-block'}}>
            <input
                ref={inputRef}
                type="text"
                value={selected?.label ? capitalize(selected.label) : ''}
                onClick={handleInputFocus}
                disabled={options.length === 0}
                onKeyDown={handleInputFocus}
                readOnly
            />
            {selected?.id && <ClearIcon onClick={() => onChange(null)}>X</ClearIcon>}
            {isLoading && <LoadingIcon />}
        </div>
        {isOpen &&
            <Menu
                ref={menuRef}
                tabIndex={0}
                onBlur={handleMenuBlur}
                isOpen={isOpen}
            >
            {orderByKey(options, 'label').map((item, index) => (
                <Option
                    key={`${name}-${index}`}
                    selected={selected?.id === item.id}
                    onClick={() => {
                        onChange(item);
                        setIsOpen(false);
                    }}>{capitalize(item.label)}
                </Option>
            ))}
        </Menu>}
    </Dropdown>
}
