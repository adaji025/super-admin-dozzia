import moment from "moment";

export const initialMetadata = {
  current_page: 0,
  last_page: 0,
  path: "",
  per_page: 0,
  total: 0,
};

export const getAgeFromDOB = (dob: string) => {
  return moment().diff(dob, "years");
};

export const objectToFormData = (
  obj: Record<string, unknown>,
  formData = new FormData(),
  parentKey = ""
) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value: any = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        objectToFormData(value as Record<string, unknown>, formData, formKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          formData.append(arrayKey, item);
        });
      } else {
        formData.append(formKey, value);
      }
    }
  }
  return formData;
};
