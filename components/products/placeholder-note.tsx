export function PlaceholderNote({ items }: { items: string[] }) {
  return (
    <div className="container-shell mt-8">
      <aside className="rounded-2xl border border-amber/30 bg-amber/8 px-5 py-4 text-sm text-amber">
        <p className="font-semibold">Pending confirmation</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
