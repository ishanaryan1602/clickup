const simplifyZodErrorName = (validated) => {
  const name = validated?.error?.name || "";
  return name.toLowerCase().includes("zod") ? "One or more fields failed validation checks." : name || "Bad Request";
};

const simplifyZodErrors = (validated) => {
  if (!validated?.error?.flatten) return [];

  const { fieldErrors = {}, formErrors = [] } = validated.error.flatten();

  const fieldDetails = Object.entries(fieldErrors).map(([field, msgs]) => ({
    field,
    issue: Array.isArray(msgs) && msgs.length ? msgs[0] : "Invalid value",
  }));

  const formDetails = formErrors.map((msg) => ({
    field: "form",
    issue: msg,
  }));

  return [...fieldDetails, ...formDetails];
};

export { simplifyZodErrorName, simplifyZodErrors };
