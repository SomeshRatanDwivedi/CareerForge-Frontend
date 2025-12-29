const Loader = ({ size = 32, color = "#3b82f6" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="animate-spin"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      />
    </svg>
  );
};

export default Loader;
