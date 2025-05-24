export default function formatDate(dateString: string, includeTime: boolean = false) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (includeTime) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);

  return formattedDate;
}
