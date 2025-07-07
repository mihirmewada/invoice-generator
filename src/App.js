// src/App.jsx
import { useState } from 'react';
import html2pdf from 'html2pdf.js';

function App() {
  const [client, setClient] = useState('');
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const addItem = () => {
    setItems([...items, { description, quantity, price }]);
    setDescription('');
    setQuantity(1);
    setPrice(0);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const downloadPDF = () => {
    const element = document.getElementById('invoice');
    html2pdf().from(element).save();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Invoice Generator</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-1/3"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-2/3"
          />
        </div>
        <button
          onClick={addItem}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      <div id="invoice" className="border p-4">
        <h2 className="text-xl font-semibold">Invoice</h2>
        <p className="mb-2">Client: {client}</p>
        <table className="w-full border-t mt-4">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.description}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">₹{item.price}</td>
                <td className="text-right">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-right font-bold mt-4">Total: ₹{calculateTotal()}</p>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
}

export default App;
