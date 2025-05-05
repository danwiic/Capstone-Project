export default function formatDate(dateString: string) {
  const formattedDate = new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}
