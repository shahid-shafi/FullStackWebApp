import Multiselect from 'multiselect-react-dropdown';

const Dropdown = ({ options, label, onSelect, onRemove, selectedValues }) => {
    return (
        <>
            <label className='font-bold'>{label}</label>
            <Multiselect className='leading-none rounded-md w-80 shadow shadow-slate-400 hover:scale-105'
                displayValue="name"
                options={options}
                onSelect={onSelect}
                onRemove={onRemove}
                selectedValues={selectedValues}
            />
        </>
    )
}

export default Dropdown