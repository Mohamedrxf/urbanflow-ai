const items = [
  "Dashboard",
  "Fleet",
  "Traffic",
  "Analytics",
  "Alerts",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[72px] flex flex-col items-center py-4 gap-4">
      {items.map((item) => (
        <div
          key={item}
          className="w-full flex flex-col items-center justify-center py-2 text-[10px] font-medium text-gray-500"
        >
          <span className="text-lg leading-none mb-1">{item[0]}</span>
          <span className="truncate px-1">{item}</span>
        </div>
      ))}
    </aside>
  );
}