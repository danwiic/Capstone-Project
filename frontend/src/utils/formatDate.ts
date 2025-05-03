export default function formatDate(dateString: string) {
  const formattedDate = new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
}
