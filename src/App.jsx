import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwQmO9DrVzoNklhnzZQxjL6xErYlWTKDy0hJ9rtT1dduvzUc4xUJdwkIvNnZ3QGA4SWcQ/exec";

    const url = `${scriptURL}?name=${encodeURIComponent(
      formData.name
    )}&email=${encodeURIComponent(formData.email)}&message=${encodeURIComponent(
      formData.message
    )}`;

    try {
      await fetch(url);
      setStatus("✅ Sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("❌ Failed to send");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Contact Form
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Send
          </button>
        </form>
        {status && (
          <p className="text-center mt-4 text-sm font-medium text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
