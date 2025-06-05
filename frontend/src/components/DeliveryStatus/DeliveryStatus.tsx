import { Check } from "lucide-react";

interface DeliveryStatusProps {
  status?: string;
  date?: string;
}

interface Status {
  statuses?: Array<DeliveryStatusProps>;
}

export default function DeliveryStatus({ statuses }: Status) {
  return (
    <div className="flex w-full">
      {statuses &&
        statuses.map((stats, index) => (
          <div
            key={index}
            className={`${index !== statuses.length - 1 ? "w-full" : "flex-1"}`}
          >
            <div
              className="flex items-center justify-around w-full"
              key={index}
            >
              {index !== statuses.length - 1 ? (
                <Status done={stats.date ? true : false} />
              ) : (
                <Status disableLine done={stats.date ? true : false} />
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm font-medium ${
                  stats.date ? "text-mayormoto-pink" : ""
                }`}
              >
                {stats.status &&
                  stats.status?.charAt(0).toUpperCase() +
                    stats.status?.slice(1)}
              </span>
              {stats.date && (
                <span className="text-xs text-gray-500">{stats.date}</span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

function Status({
  disableLine = false,
  done = false,
}: {
  disableLine?: boolean;
  done?: boolean;
}) {
  return (
    <div className={`flex items-center w-full ${disableLine ? "w-fit" : ""} `}>
      <div
        className={`p-2 min-h-10 min-w-10 rounded-full ${
          done ? "bg-mayormoto-pink" : "bg-gray-200"
        }`}
      >
        {done ? <Check className="text-white" /> : ""}
      </div>
      <div
        className={`border-2  min-w-full ${disableLine ? "hidden" : ""} 
          ${done ? "border-mayormoto-pink" : "border-gray-300"} `}
      ></div>
    </div>
  );
}
