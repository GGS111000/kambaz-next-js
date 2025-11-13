'use client';

const handleClick = () => {
  alert("Life is Good!");
};

export default function MyButton() {
  return (
    <button
        type="button"
        onClick={handleClick}
        id="wd-all-good">
      Hello World!
    </button>
  );
}
