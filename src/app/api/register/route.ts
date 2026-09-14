import { NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = "47057450";
const HUBSPOT_FORM_ID = "e7fb03ed-e9cc-45b3-956c-4196adf1f761";
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

type RegisterBody = {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  companyType?: string;
  country?: string;
  city?: string;
  phone?: string;
  industry?: string;
  interest?: string;
  pageUri?: string;
  pageName?: string;
};

function splitName(name: string) {
  const cleaned = name.trim().replace(/\s+/g, " ");
  if (!cleaned) return { firstname: "", lastname: "" };
  const parts = cleaned.split(" ");
  if (parts.length === 1) return { firstname: parts[0], lastname: "." };
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const organization = body.organization?.trim() ?? "";
    const role = body.role?.trim() ?? "";
    const companyType = body.companyType?.trim() ?? "";
    const country = body.country?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const industry = body.industry?.trim() ?? "";
    const interest = body.interest?.trim() ?? "";

    if (
      !name ||
      !email ||
      !organization ||
      !role ||
      !companyType ||
      !country ||
      !city ||
      !phone ||
      !industry ||
      !interest
    ) {
      return NextResponse.json(
        { ok: false, message: "All fields are mandatory." },
        { status: 400 },
      );
    }

    const { firstname, lastname } = splitName(name);

    const payload = {
      fields: [
        { name: "email", value: email },
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "company", value: organization },
        { name: "jobtitle", value: role },
        { name: "0-2/type_of_account__c", value: companyType },
        { name: "country", value: country },
        { name: "city", value: city },
        { name: "mobilephone", value: phone },
        { name: "0-2/industry", value: industry },
        {
          name: "i_am_completing_this_form_in_connection_with_my",
          value: interest === "personal" ? "Personal interest" : "Business interest",
        },
      ],
      context: {
        pageUri: body.pageUri || "https://localhost/",
        pageName: body.pageName || "AWS GenAI Roadshow",
      },
    };

    const response = await fetch(HUBSPOT_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      const hubspot = data as {
        errors?: Array<{ errorType?: string; message?: string }>;
      } | null;

      const blockedEmail = hubspot?.errors?.some(
        (item) => item.errorType === "BLOCKED_EMAIL",
      );

      if (blockedEmail) {
        return NextResponse.json(
          {
            ok: false,
            field: "email",
            message: "Please enter a valid work email address.",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          ok: false,
          message: "Something went wrong. Please try again in a moment.",
        },
        { status: response.status >= 400 && response.status < 600 ? response.status : 502 },
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }
}
