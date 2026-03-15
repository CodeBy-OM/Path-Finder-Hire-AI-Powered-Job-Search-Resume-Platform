
const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect plan for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Basic</h2>
            <p className="text-gray-600 mb-4">Perfect for getting started</p>
            <p className="text-3xl font-bold text-gray-900 mb-6">$9<span className="text-lg">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li>✅ 5 AI generations per month</li>
              <li>✅ 1 CV builder</li>
              <li>✅ 5 job applications</li>
            </ul>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-500 relative">
            <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pro</h2>
            <p className="text-gray-600 mb-4">Best for professionals</p>
            <p className="text-xl font-bold text-gray-900 mb-[18px]">$29<span className="text-sm">/month</span></p>
            <ul className="space-y-[18px] mb-[36px]">
              <li>✅ Unlimited AI generations</li>
              <li>✅ Unlimited CV builders</li>
              <li>✅ Unlimited job applications</li>
              <li>✅ Advanced analytics and insights</li>
            </ul>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 text-white py-[18px] rounded-lg hover:bg-blue-[75%] transition"
            >
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-xl shadow-lg p-[36px]">
            <h2 className="text-xl font-bold text-gray-[95%] mb-[18px]">Enterprise</h2>
            <p className="text-gray-[75%] mb-[36px]">For large teams and organizations</p>
            {/* Placeholder for enterprise pricing */}
            {/* Add enterprise pricing details here */}
          </div>

        </div>

      </div>

    </div>

  );
};

export default Pricing;