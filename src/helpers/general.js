import { toast } from "react-toastify";

export const validateAlphabets = (string) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(string);
};

export const validateCurrency = (string) => {
  const regex = /\D/;
  let raw = string.replace("₹", "").replace(/,/g, "");
  if (regex.test(raw)) {
    return (
      "₹" +
      raw
        .toString()
        .replace("$", "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }
};

export const validateEmail = (mail) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(mail).toLowerCase());
};

export const validateNumber = (string) => {
  const regex = /\D/;
  return !regex.test(string);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const copyToClipBoard = async (copyMe, messageType) => {
  try {
    await navigator.clipboard.writeText(copyMe);
    toast.success(`${messageType} copied`);
  } catch (err) {
    toast.error("Unable to copy, please try again...!");
  }
};
