const InfoCard = ({ title, value, subtitle, color }) => (
  <div className="bg-white p-6 rounded-xl border">
    <h3 className="font-semibold flex items-center gap-2">
      <span className={`text-${color}-600`}>●</span> {title}
    </h3>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
    {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
  </div>
);

const Reward = ({ title, desc, credits, color }) => (
  <div className={`border rounded-xl p-4 flex justify-between items-center`}>
    <div>
      <h4 className={`font-semibold text-${color}-600`}>{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    <span className={`font-bold text-${color}-600`}>
      {credits} credits
    </span>
  </div>
);

const ReferEarn = () => {
  const referralLink = "https://pathfinderhire.com/signup?ref=OM123";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Refer & Earn</h1>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Your Referrals" value="0" color="blue" />
        <InfoCard
          title="Credits Earned"
          value="0"
          subtitle="50 credits per referral"
          color="green"
        />
      </div>

      {/* SHARE LINK */}
      <div className="bg-white p-6 rounded-xl border space-y-3">
        <h3 className="font-semibold">Share Your Link</h3>
        <p className="text-sm text-gray-500">
          Spread the word and earn rewards
        </p>

        <div className="flex gap-2">
          <input
            value={referralLink}
            readOnly
            className="flex-1 border px-3 py-2 rounded-md"
          />
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Copy
          </button>
        </div>

        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          🔗 Share via…
        </button>
      </div>

      {/* REWARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Reward
          title="Each Referral"
          desc="Friend signs up & gets active"
          credits={50}
          color="purple"
        />
        <Reward
          title="Milestone Bonus"
          desc="Every 10 successful referrals"
          credits={50}
          color="green"
        />
        <Reward
          title="Premium Upgrade"
          desc="Friend subscribes to Pro plan"
          credits={100}
          color="orange"
        />
      </div>
    </div>
  );
};

export default ReferEarn;
