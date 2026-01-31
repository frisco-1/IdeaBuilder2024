export default function PriceSummary({
  totalPrice,
  totalQuantity,
}: {
  totalPrice: number;
  totalQuantity: number;
}) {
  return (
    <div className="p-3 border rounded-lg bg-gray-50">
      <p className="text-xl font-bold">
        {totalPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <p className="text-sm text-gray-600">
        Total Qty: {totalQuantity}
      </p>
    </div>
  );
}