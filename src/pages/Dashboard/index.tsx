import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome to My Page</h1>

      {/* Input Component */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Button Component */}
      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mt-4">
        Submit
      </Button>
    </div>
  </div>
  );
}

export default Dashboard;