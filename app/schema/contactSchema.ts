
import * as yup from "yup";

interface FileList {
    0: File;
    length: number;
    item(index: number): File;
    [index: number]: File;
}

export const contactSchema = yup.object().shape({
    firstName: yup.string().required("First name is required").min(3, "First name must be at least 3 characters"),
    lastName: yup.string().required("Last name is required").min(3, "Last name must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
    file: yup
    .mixed<FileList>()
    .test("fileSize", "File too large", (value: FileList | undefined) => {
      if (!value || !value.length) return true;
      return value[0].size <= 2000000; // optional max 2MB
    })
    .test("fileType", "Unsupported format", (value: FileList | undefined) => {
      if (!value || !value.length) return true;
      return ["image/jpeg", "image/png", "application/pdf"].includes(value[0].type);
    }),
})