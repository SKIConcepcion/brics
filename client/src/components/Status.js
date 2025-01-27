const StatusIndicator = (props) => {
  const status = props.status;
  const label = props.label;

  const statusColorMapping = {
    awaiting_approval: "#3B82F6",
    pending: "#A855F7",
    finalized: "#1E3A8A",
    rejected: "#EF4444",
  };

  return (
    <div className="flex flex-row justify-center gap-2 items-center">
      <div
        className="w-5 h-5 rounded-full"
        style={{ backgroundColor: statusColorMapping[status] }}
      ></div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

export default StatusIndicator;
