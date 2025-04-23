
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const LanguageSelector = () => {
  return (
    <div className="flex items-center space-x-2">
      <Globe size={18} className="text-gray-600" />
      <select
        defaultValue="en"
        className="border-none bg-transparent text-sm font-medium cursor-pointer outline-none text-gray-700"
        aria-label="Language selector"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
