import { formatTime, formatAmount, getTimeBucket } from "@/lib/utils";
import { useMemo, useState } from "react";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 5;

export const ActivityTab = ({
  customerActivity,
}: {
  customerActivity: ICustomerActivityResponse[];
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const groupActivitiesByTime = (activities: ICustomerActivityResponse[]) => {
    return activities.reduce<Record<string, ICustomerActivityResponse[]>>(
      (acc, activity) => {
        const bucket = getTimeBucket(new Date(activity.created_at));

        if (!acc[bucket]) acc[bucket] = [];
        acc[bucket].push(activity);

        return acc;
      },
      {},
    );
  };

  const sortedActivities = useMemo(
    () =>
      [...customerActivity].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [customerActivity],
  );

  const visibleActivities = sortedActivities.slice(0, visibleCount);

  const groupedActivities = useMemo(
    () => groupActivitiesByTime(visibleActivities),
    [visibleActivities],
  );

  const hasMore = visibleCount < sortedActivities.length;

  return (
    <div className="space-y-4 pt-2">
      {Object.entries(groupedActivities).map(([title, activities]) => (
        <ActivitySection key={title} title={title}>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              icon={activity.type === "credit" ? "↙" : "↗"}
              label={activity.description}
              time={formatTime(activity.created_at)}
              amount={formatAmount(activity.amount, activity.type)}
            />
          ))}
        </ActivitySection>
      ))}
      {Object.entries(groupedActivities).length < 1 && (
        <p className="text-gray-400 text-sm w-full text-center mx-auto">
          No Activity yet!
        </p>
      )}

      {hasMore && (
        <button
          className="text-sm text-center text-primary mx-auto w-full"
          onClick={() =>
            setVisibleCount((prev) =>
              Math.min(prev + LOAD_MORE_COUNT, sortedActivities.length),
            )
          }
        >
          See more
        </button>
      )}
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
      <p className="text-sm font-medium text-[#010813] capitalize">{label}</p>
      <p className="text-xs font-medium text-[#A9ACB1]">{time}</p>
    </div>
    <p className="text-sm font-semibold text-[#010813]">{amount}</p>
  </div>
);
