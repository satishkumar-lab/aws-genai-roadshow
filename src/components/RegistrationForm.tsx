"use client";

import { useState } from "react";

const COMPANY_TYPES = [
  "Private Limited Company",
  "Public Limited Company",
  "Sole Proprietorship",
  "Partnership Firm",
  "Others",
];

const SUCCESS_CONFETTI = [
  { x: -72, y: -58, delay: "0.05s", color: "#17a5fb", size: 8, rot: 18 },
  { x: 68, y: -52, delay: "0.08s", color: "#ed0082", size: 7, rot: -24 },
  { x: -48, y: -78, delay: "0.12s", color: "#ff9900", size: 6, rot: 40 },
  { x: 42, y: -82, delay: "0.1s", color: "#22c55e", size: 7, rot: -12 },
  { x: -88, y: -18, delay: "0.18s", color: "#a855f7", size: 6, rot: 55 },
  { x: 90, y: -12, delay: "0.15s", color: "#17a5fb", size: 8, rot: -35 },
  { x: -70, y: 28, delay: "0.22s", color: "#f472b6", size: 5, rot: 28 },
  { x: 74, y: 32, delay: "0.2s", color: "#ff9900", size: 6, rot: -48 },
  { x: -28, y: -96, delay: "0.14s", color: "#60a5fa", size: 5, rot: 8 },
  { x: 18, y: -98, delay: "0.16s", color: "#34d399", size: 5, rot: -20 },
  { x: -98, y: -42, delay: "0.24s", color: "#ed0082", size: 4, rot: 70 },
  { x: 100, y: -38, delay: "0.26s", color: "#22c55e", size: 5, rot: -62 },
  { x: -56, y: 52, delay: "0.28s", color: "#17a5fb", size: 6, rot: 15 },
  { x: 58, y: 56, delay: "0.3s", color: "#a855f7", size: 5, rot: -30 },
  { x: 0, y: -108, delay: "0.11s", color: "#ff9900", size: 4, rot: 0 },
  { x: -110, y: 8, delay: "0.32s", color: "#60a5fa", size: 4, rot: 42 },
  { x: 112, y: 6, delay: "0.34s", color: "#f472b6", size: 4, rot: -44 },
  { x: -36, y: 70, delay: "0.36s", color: "#22c55e", size: 5, rot: 22 },
  { x: 38, y: 74, delay: "0.38s", color: "#ed0082", size: 5, rot: -18 },
  { x: -84, y: -68, delay: "0.2s", color: "#34d399", size: 5, rot: 33 },
] as const;

const HUBSPOT_FORM_URL =
  "https://share.hsforms.com/15_sD7enMRbOVbEGWrfH3YQs0lre";

function SuccessCheck() {
  return (
    <div className="success-hero relative flex size-[160px] items-center justify-center md:size-[180px]">
      <span className="success-glow" aria-hidden />
      <span className="success-check-ring success-check-ring--outer" aria-hidden />
      <span className="success-check-ring success-check-ring--mid" aria-hidden />
      <span className="success-check-ring success-check-ring--inner" aria-hidden />

      {SUCCESS_CONFETTI.map((piece, index) => (
        <span
          key={index}
          className={`success-burst ${
            index % 4 === 0
              ? "success-burst--rect"
              : index % 4 === 1
                ? "success-burst--circle"
                : index % 4 === 2
                  ? "success-burst--ribbon"
                  : "success-burst--diamond"
          }`}
          style={{
            width: piece.size,
            height: index % 4 === 2 ? piece.size * 2.4 : piece.size,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            ["--burst-x" as string]: `${piece.x}px`,
            ["--burst-y" as string]: `${piece.y}px`,
            ["--burst-rot" as string]: `${piece.rot}deg`,
          }}
          aria-hidden
        />
      ))}

      <div className="success-check relative z-[2] flex size-[88px] items-center justify-center rounded-full bg-gradient-to-b from-[#34d399] to-[#059669] shadow-[0_14px_32px_rgba(5,150,105,0.35)] md:size-[96px]">
        <span className="pointer-events-none absolute inset-[3px] rounded-full bg-gradient-to-b from-white/25 to-transparent" aria-hidden />
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-[1] size-11 md:size-12"
          aria-hidden
        >
          <path
            className="success-check-mark"
            d="M12 24.5L20.5 33L36 15.5"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

type FormFields = {
  name: string;
  email: string;
  organization: string;
  role: string;
  country: string;
  city: string;
  phone: string;
  industry: string;
};

type Interest = "business" | "personal" | "";

type ErrorKey = keyof FormFields | "companyType" | "interest";

type FieldErrors = Partial<Record<ErrorKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validateField(
  key: ErrorKey,
  value: string,
): string {
  const trimmed = value.trim();

  switch (key) {
    case "name":
      return trimmed ? "" : "Please enter your full name.";
    case "email":
      if (!trimmed) return "Please enter your work email address.";
      if (!EMAIL_RE.test(trimmed)) return "Please enter a valid work email address.";
      return "";
    case "organization":
      return trimmed ? "" : "Please enter your organization name.";
    case "role":
      return trimmed ? "" : "Please enter your role.";
    case "companyType":
      return trimmed ? "" : "Please select a company type.";
    case "country":
      return trimmed ? "" : "Please enter your country.";
    case "city":
      return trimmed ? "" : "Please enter your city.";
    case "phone":
      if (!trimmed) return "Please enter your mobile number.";
      if (!isValidPhone(trimmed)) return "Please enter a valid mobile number.";
      return "";
    case "industry":
      return trimmed ? "" : "Please enter your industry.";
    case "interest":
      return trimmed ? "" : "Please select an option.";
    default:
      return "";
  }
}

function validateAll(
  form: FormFields,
  companyType: string,
  interest: Interest,
): FieldErrors {
  const next: FieldErrors = {};
  (Object.keys(form) as (keyof FormFields)[]).forEach((key) => {
    const message = validateField(key, form[key]);
    if (message) next[key] = message;
  });
  const companyMessage = validateField("companyType", companyType);
  if (companyMessage) next.companyType = companyMessage;
  const interestMessage = validateField("interest", interest);
  if (interestMessage) next.interest = interestMessage;
  return next;
}

type FieldProps = {
  id: keyof FormFields;
  label: string;
  type?: string;
  placeholder: string;
  icon?: string;
  className?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function Field({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  className = "",
  value,
  error,
  onChange,
  onBlur,
}: FieldProps) {
  const invalid = Boolean(error);

  return (
    <label className={`group/field flex w-full flex-col gap-1 ${className}`}>
      <span className="text-[13px] font-medium text-black transition-colors duration-200 group-focus-within/field:text-[#0e1526]">
        {label}
      </span>
      <span
        className={`flex h-[36px] items-center gap-1 overflow-hidden rounded-lg border bg-[#fbfcfe] py-2 pl-3 pr-[14px] transition-all duration-200 ease-out ${
          invalid
            ? "border-[#dc2626] bg-[#fef2f2]"
            : "border-[#d8dee8] group-hover/field:border-[#17a5fb] group-focus-within/field:border-[#17a5fb] group-focus-within/field:bg-white"
        }`}
      >
        {icon ? (
          <img
            src={icon}
            alt=""
            width={16}
            height={16}
            className="size-4 shrink-0 transition-transform duration-200 group-hover/field:scale-105 group-focus-within/field:scale-105"
          />
        ) : null}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#8a93a5]"
        />
      </span>
      {error ? (
        <span id={`${id}-error`} className="text-[12px] leading-snug text-[#dc2626]" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default function RegistrationForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState<Interest>("business");
  const [companyType, setCompanyType] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    organization: "",
    role: "",
    country: "",
    city: "",
    phone: "",
    industry: "",
  });

  function clearError(key: ErrorKey) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function setFieldError(key: ErrorKey, message: string) {
    setErrors((current) => {
      if (!message) {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      }
      if (current[key] === message) return current;
      return { ...current, [key]: message };
    });
  }

  function update(key: keyof FormFields) {
    return (value: string) => {
      setForm((current) => ({ ...current, [key]: value }));
      const message = validateField(key, value);
      if (!message) clearError(key);
      else if (errors[key]) setFieldError(key, message);
    };
  }

  function blur(key: keyof FormFields) {
    return () => {
      setFieldError(key, validateField(key, form[key]));
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOpen(false);

    const nextErrors = validateAll(form, companyType, interest);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.companyType) setOpen(true);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          companyType,
          interest,
          pageUri: typeof window !== "undefined" ? window.location.href : HUBSPOT_FORM_URL,
          pageName: "AWS GenAI Roadshow",
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        field?: ErrorKey;
      };

      if (!response.ok || !data.ok) {
        if (data.field) {
          setFieldError(data.field, data.message || "Please check this field.");
          return;
        }
        throw new Error(
          data.message || "Something went wrong. Please try again in a moment.",
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        id="register"
        className="success-card relative z-10 flex w-full min-w-0 max-w-[554px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white px-5 py-14 shadow-[0px_24px_60px_rgba(11,23,48,0.18)] md:min-h-[636px] md:px-9 md:py-16"
        role="status"
        aria-live="polite"
      >
        <img
          src="/assets/success-glow-left.svg"
          alt=""
          width={220}
          height={220}
          className="pointer-events-none absolute -left-20 -top-20 size-[180px] opacity-80 md:size-[220px]"
          aria-hidden
        />
        <img
          src="/assets/success-glow-right.svg"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute -right-6 -top-14 size-[140px] opacity-80 md:-right-4 md:size-[180px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12)_0%,transparent_65%)]"
          aria-hidden
        />

        <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-7 md:gap-8">
          <SuccessCheck />

          <div className="success-copy flex w-full flex-col items-center gap-5 text-center md:gap-6">
            <p className="text-[20px] font-semibold leading-[1.5] tracking-[-0.12px] text-[#292929] md:text-[24px]">
              Thank you for your interest.
              <br />
              The confirmation details will be sent to the registered Email ID.
            </p>
            <div className="success-divider h-px w-12 bg-[#e5eaf1]" aria-hidden />
            <p className="text-[15px] leading-normal text-[#828282]">
              Can&apos;t find the email? Check your Spam folder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      id="register"
      noValidate
      onSubmit={handleSubmit}
      className="relative z-10 flex w-full min-w-0 max-w-[554px] flex-col gap-5 rounded-2xl bg-white p-5 shadow-[0px_24px_30px_rgba(11,23,48,0.18)] md:gap-6 md:p-8"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-1.5">
        <h2 className="flex-1 text-[22px] font-bold tracking-[-0.12px] text-[#292929] sm:text-[24px]">
          Register your interest
        </h2>
        <p className="shrink-0 text-[12px] text-[#828282] sm:whitespace-nowrap">
          All fields are mandatory
          <span className="ml-0.5 text-[13px] font-bold text-[#ed0082]">*</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            placeholder="Your full name"
            icon="/assets/ic-user.svg"
            value={form.name}
            error={errors.name}
            onChange={update("name")}
            onBlur={blur("name")}
          />
          <Field
            id="email"
            label="Work Email"
            type="email"
            placeholder="Work email address"
            icon="/assets/ic-email.svg"
            value={form.email}
            error={errors.email}
            onChange={update("email")}
            onBlur={blur("email")}
          />
        </div>

        <Field
          id="organization"
          label="Organization"
          placeholder="Company name"
          value={form.organization}
          error={errors.organization}
          onChange={update("organization")}
          onBlur={blur("organization")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="role"
            label="Role"
            placeholder="e.g. Developer, Manager"
            value={form.role}
            error={errors.role}
            onChange={update("role")}
            onBlur={blur("role")}
          />
          <div className="relative flex w-full flex-col gap-1">
            <span className="text-[13px] font-medium text-black">Company type</span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-invalid={Boolean(errors.companyType)}
              aria-describedby={errors.companyType ? "companyType-error" : undefined}
              className={`flex h-[36px] w-full items-center justify-center overflow-hidden rounded-lg border bg-[#fbfcfe] px-[14px] py-2 text-left transition-all duration-200 ease-out ${
                errors.companyType
                  ? "border-[#dc2626] bg-[#fef2f2]"
                  : open
                    ? "border-[#17a5fb] bg-white"
                    : "border-[#d8dee8] hover:border-[#17a5fb]"
              }`}
            >
              <span
                className={`min-w-0 flex-1 truncate text-[14px] ${
                  companyType ? "text-black" : "text-[#8a93a5]"
                }`}
              >
                {companyType || "Select"}
              </span>
              <img
                src="/assets/ic-chevron.svg"
                alt=""
                width={12}
                height={12}
                className={`size-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open ? (
              <div className="absolute top-[calc(100%+4px)] z-20 w-full overflow-hidden rounded-lg border border-[#d8dee8] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.1)]">
                {COMPANY_TYPES.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setCompanyType(option);
                      clearError("companyType");
                      setOpen(false);
                    }}
                    className={`w-full px-[14px] py-3 text-left text-[14px] text-[#1a1a1a] transition-colors duration-150 hover:bg-[#edf9ff] hover:text-[#17a5fb] ${
                      index === 0 || option === companyType ? "bg-[#f5f7fa]" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
            {errors.companyType ? (
              <span
                id="companyType-error"
                className="text-[12px] leading-snug text-[#dc2626]"
                role="alert"
              >
                {errors.companyType}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="country"
            label="Country"
            placeholder="e.g. India"
            value={form.country}
            error={errors.country}
            onChange={update("country")}
            onBlur={blur("country")}
          />
          <Field
            id="city"
            label="City"
            placeholder="e.g. Mumbai"
            value={form.city}
            error={errors.city}
            onChange={update("city")}
            onBlur={blur("city")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="phone"
            label="Phone"
            type="tel"
            placeholder="Mobile number"
            icon="/assets/ic-phone.svg"
            value={form.phone}
            error={errors.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
          />
          <Field
            id="industry"
            label="Industry"
            placeholder="e.g. Technology, Finance"
            value={form.industry}
            error={errors.industry}
            onChange={update("industry")}
            onBlur={blur("industry")}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3.5">
        <p className="text-[13px] font-medium leading-normal text-black">
          I am completing this form in connection with my
        </p>
        <div className="flex w-full flex-col gap-1.5 sm:flex-row sm:gap-1.5">
          <button
            type="button"
            onClick={() => {
              setInterest("business");
              clearError("interest");
            }}
            className={`flex h-[30px] flex-1 items-center justify-center gap-2.5 rounded-[42px] px-[14px] text-[14px] transition-all duration-200 ease-out ${
              interest === "business"
                ? "bg-[#edf9ff] font-medium text-black"
                : "rounded-[32px] border-[0.7px] border-[#d8dee8] bg-[#fbfcfe] font-normal text-[#828282] hover:border-[#17a5fb] hover:bg-[#edf9ff] hover:text-black"
            }`}
          >
            <img
              src={
                interest === "business"
                  ? "/assets/ic-radio-on.svg"
                  : "/assets/ic-radio-off.svg"
              }
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
            Business interest
          </button>
          <button
            type="button"
            onClick={() => {
              setInterest("personal");
              clearError("interest");
            }}
            className={`flex h-[30px] flex-1 items-center justify-center gap-2.5 rounded-[32px] px-[14px] text-[14px] transition-all duration-200 ease-out ${
              interest === "personal"
                ? "rounded-[42px] bg-[#edf9ff] font-medium text-black"
                : "border-[0.7px] border-[#d8dee8] bg-[#fbfcfe] font-normal text-[#828282] hover:border-[#17a5fb] hover:bg-[#edf9ff] hover:text-black"
            }`}
          >
            <img
              src={
                interest === "personal"
                  ? "/assets/ic-radio-on.svg"
                  : "/assets/ic-radio-off.svg"
              }
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
            Personal interest
          </button>
        </div>
        {errors.interest ? (
          <span id="interest-error" className="text-[12px] leading-snug text-[#dc2626]" role="alert">
            {errors.interest}
          </span>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[13px] text-[#dc2626]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="group/submit inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#17a5fb] px-5 text-[15px] font-bold text-white transition-all duration-200 ease-out hover:bg-[#0f96ea] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Request to Attend"}
        {!submitting ? (
          <img
            src="/assets/ic-arrow.svg"
            alt=""
            width={17}
            height={17}
            className="size-[16.67px] transition-transform duration-200 ease-out group-hover/submit:translate-x-1"
          />
        ) : null}
      </button>
    </form>
  );
}
