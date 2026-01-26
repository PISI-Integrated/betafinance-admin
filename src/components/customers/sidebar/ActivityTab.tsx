export const ActivityTab = () => {
  return (
    <div className="space-y-4 pt-2">
      {/* Today */}
      <ActivitySection title="Today">
        <ActivityItem
          icon="↙"
          label="Added to wallet"
          time="12:36 PM"
          amount="+₦500"
        />
        <ActivityItem
          icon="↗"
          label="Withdrawal"
          time="12:36 PM"
          amount="-₦500"
        />
      </ActivitySection>

      {/* Yesterday */}
      <ActivitySection title="Yesterday">
        <ActivityItem
          icon="↙"
          label="Added to wallet"
          time="12:36 PM"
          amount="+₦450"
        />
        <ActivityItem
          icon="↗"
          label="Withdrawal"
          time="12:36 PM"
          amount="-₦300"
        />
      </ActivitySection>
    </div>
  );
};

const ActivitySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="mb-3 text-xs font-semibold text-[#A9ACB1]">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const ActivityItem = ({
  icon,
  label,
  time,
  amount,
}: {
  icon: string;
  label: string;
  time: string;
  amount: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F3F5] text-sm">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-[#010813]">{label}</p>
      <p className="text-xs font-medium text-[#A9ACB1]">{time}</p>
    </div>
    <p className="text-sm font-semibold text-[#010813]">{amount}</p>
  </div>
);
