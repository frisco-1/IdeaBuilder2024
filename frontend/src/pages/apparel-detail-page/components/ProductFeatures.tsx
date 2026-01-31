export default function ProductFeatures({ features }: { features: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Features</h3>
      <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}