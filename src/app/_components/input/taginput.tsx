"use client";

import React, {
  FC,
  InputHTMLAttributes,
  useState,
  KeyboardEvent,
  MouseEvent,
  FormHTMLAttributes,
} from "react";
import { IoSearchOutline } from "react-icons/io5";

interface IPROPS extends FormHTMLAttributes<HTMLFormElement> {}

const Tag: FC<{ value: string; onRemove: () => void }> = ({
  value,
  onRemove,
}) => {
  return (
    <div
      className="bg-slate-50 p-1 uppercase font-bold text-center min-w-12 m-1 cursor-pointer"
      onClick={onRemove}
    >
      {value}
    </div>
  );
};

const TagInput: FC<IPROPS> = ({ action, ...props }) => {
  const [values, updateValues] = useState<string[]>(["Tag 1", "Tag 2"]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!values.includes(inputValue.trim())) {
        updateValues([...values, inputValue.trim()]);
      }
      setInputValue("");
      event.preventDefault();
    }
  };

  const handleRemoveTag = (tag: string) => {
    updateValues(values.filter((value) => value !== tag));
  };

  return (
    <form
      className="relative flex my-3 w-full items-center justify-center align-middle 
       flex-col-reverse  md:flex-row
    "
      action={action}
      onSubmit={() => console.log("Sumbitted")}
    >
      <div className="flex  justify-center align-middle flex-wrap m-3  md:flex-nowrap md:m-0  ">
        {values.map((ele, index) => (
          <Tag key={index} value={ele} onRemove={() => handleRemoveTag(ele)} />
        ))}
      </div>

      <div className="flex justify-center align-middle items-center gap-1 w-full">
        <input
          placeholder="Search here...."
          className={`text-base p-1.5  w-full outline-none bg-transparent border-b-2 border-gray-200 `}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">
          <IoSearchOutline className="w-8 h-8 p-1 rounded-lg hover:bg-slate-100 transition-all duration-150" />
        </button>
      </div>
      <input type="hidden" name="search" value={JSON.stringify(values)} />
    </form>
  );
};

export default TagInput;
