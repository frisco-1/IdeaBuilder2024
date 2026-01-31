export default function ProductDescription({ description }: { description: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Description</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
}