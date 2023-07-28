export const localizeDate = (date: string) => {
  try {
    const createDate = new Date(date);
    return createDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "-";
  }
};
