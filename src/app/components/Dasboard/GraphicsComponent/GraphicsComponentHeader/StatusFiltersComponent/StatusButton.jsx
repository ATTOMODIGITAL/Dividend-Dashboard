export default function StatusButton({ label, icon, selected, onClick }) {
  const colors = {
    "EN TRÁMITE": "#C9C9C9",
    ENVIADO: "#4F84A6",
    RECUPERADO: "#244A76",
  };

  const color = colors[label] || "#D1D5DB";

  const bgColor = selected ? color : "#FFFFFF";
  const textColor = selected ? "#FFFFFF" : "#6B7280"; // gray-500

  return (
    <button
      onClick={onClick}
      className="px-7 text-[12px] leading-5 font-bold h-10 rounded-md flex items-center justify-start gap-3"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {icon}
      <span className="uppercase tracking-wide flex items-center justify-center">
        {label}
      </span>
    </button>
  );
}
