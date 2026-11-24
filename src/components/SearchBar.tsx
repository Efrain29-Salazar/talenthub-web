import './SearchBar.css';

// Campo de búsqueda CONTROLADO: el texto vive en la página, aquí solo se muestra y se avisa del cambio.
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const SearchBar = ({ value, onChange, placeholder, label }: SearchBarProps) => {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={placeholder}
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
