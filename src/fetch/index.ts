import { encrypt } from "utils/cryptojs";
import baseurl from "api/baseurl";

const get = async (url: string, body: BodyInit | null | undefined = null) => {
  try {
    const res = await fetch(baseurl + url, { cache: "no-store", body });
    if (!res.ok) return encrypt({ status: false, error: "Failed to fetch" });
    return await res.json();
  } catch (error) {
    return encrypt({ status: false, error });
  }
};

const post = async (url: string, body: BodyInit | null | undefined = null) => {
  try {
    const res = await fetch(baseurl + url, {
      cache: "no-store",
      body: JSON.stringify(body),
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    if (!res.ok) return encrypt({ status: false, error: "Failed to fetch" });
    return await res.json();
  } catch (error) {
    return encrypt({ status: false, error });
  }
};

const put = async (url: string, body: BodyInit | null | undefined = null) => {
  try {
    const res = await fetch(baseurl + url, {
      cache: "no-store",
      body: JSON.stringify(body),
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    if (!res.ok) return encrypt({ status: false, error: "Failed to fetch" });
    return await res.json();
  } catch (error) {
    return encrypt({ status: false, error });
  }
};
const deleteCall = async (url: string, body: BodyInit | null | undefined | object) => {
  try {
    const res = await fetch(baseurl + url, {
      cache: "no-store",
      method: "DELETE",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    if (!res.ok) return encrypt({ status: false, error: "Failed to fetch" });
    return await res.json();
  } catch (error) {
    return encrypt({ status: false, error });
  }
};

export { get, post, put, deleteCall };
