export function formatCaseDate(date: string | null, long = false) {
  if (!date) return "Unknown";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: long ? "long" : "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
