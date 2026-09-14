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
    <label className={`group/field flex w-full min-w-0 flex-col gap-1 ${className}`}>
      <span className="text-[12px] font-medium leading-none text-[#0e1526] md:text-[13px]">
        {label}
      </span>
      <span
        className={`flex h-8 items-center gap-1.5 overflow-hidden rounded-lg border bg-[#fbfcfe] px-2.5 transition-all duration-200 ease-out md:h-9 md:px-3 ${
          invalid
            ? "border-[#dc2626] bg-[#fef2f2]"
            : "border-[#e1e7ef] group-hover/field:border-[#17a5fb]/70 group-focus-within/field:border-[#17a5fb] group-focus-within/field:bg-white group-focus-within/field:shadow-[0_0_0_3px_rgba(23,165,251,0.12)]"
        }`}
      >
        {icon ? (
          <img
            src={icon}
            alt=""
            width={16}
            height={16}
            className="size-3.5 shrink-0 opacity-70 transition-opacity duration-200 group-hover/field:opacity-100 group-focus-within/field:opacity-100 md:size-4"
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
          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#0e1526] outline-none placeholder:text-[#8a93a5] md:text-[14px]"
        />
      </span>
      {error ? (
        <span
          id={`${id}-error`}
          className="text-[11px] leading-snug text-[#dc2626] md:text-[12px]"
          role="alert"
        >
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
        id="register-form"
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
      id="register-form"
      noValidate
      onSubmit={handleSubmit}
      className="relative z-10 flex w-full min-w-0 max-w-[554px] flex-col gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-[0px_24px_40px_rgba(11,23,48,0.2)] sm:gap-4 sm:p-5 md:gap-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-[18px] font-bold leading-tight tracking-[-0.12px] text-[#0e1526] sm:text-[22px] md:text-[24px]">
          Register your interest
        </h2>
        <p className="shrink-0 pt-1 text-right text-[10px] leading-none text-[#828282] sm:pt-1.5 sm:text-[12px]">
          All fields mandatory
          <span className="ml-0.5 text-[12px] font-bold text-[#ed0082] sm:text-[13px]">*</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-2.5 sm:gap-3">
        <Field
          id="name"
          label="Name"
          placeholder="Full name"
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
          placeholder="Work email"
          icon="/assets/ic-email.svg"
          value={form.email}
          error={errors.email}
          onChange={update("email")}
          onBlur={blur("email")}
        />

        <Field
          id="organization"
          label="Organization"
          placeholder="Company name"
          value={form.organization}
          error={errors.organization}
          onChange={update("organization")}
          onBlur={blur("organization")}
        />

        <div className="grid grid-cols-2 gap-x-2.5 gap-y-2.5 sm:gap-3">
          <Field
            id="role"
            label="Role"
            placeholder="e.g. Developer"
            value={form.role}
            error={errors.role}
            onChange={update("role")}
            onBlur={blur("role")}
          />
          <div className="relative flex w-full min-w-0 flex-col gap-1">
            <span className="text-[12px] font-medium leading-none text-[#0e1526] md:text-[13px]">
              Company type
            </span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-invalid={Boolean(errors.companyType)}
              aria-describedby={errors.companyType ? "companyType-error" : undefined}
              className={`flex h-8 w-full items-center gap-1.5 overflow-hidden rounded-lg border bg-[#fbfcfe] px-2.5 text-left transition-all duration-200 ease-out md:h-9 md:px-3 ${
                errors.companyType
                  ? "border-[#dc2626] bg-[#fef2f2]"
                  : open
                    ? "border-[#17a5fb] bg-white shadow-[0_0_0_3px_rgba(23,165,251,0.12)]"
                    : "border-[#e1e7ef] hover:border-[#17a5fb]/70"
              }`}
            >
              <span
                className={`min-w-0 flex-1 truncate text-[13px] md:text-[14px] ${
                  companyType ? "text-[#0e1526]" : "text-[#8a93a5]"
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
              <div className="absolute top-[calc(100%+4px)] z-20 w-full overflow-hidden rounded-lg border border-[#e1e7ef] bg-white shadow-[0px_12px_28px_rgba(14,21,38,0.12)]">
                {COMPANY_TYPES.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setCompanyType(option);
                      clearError("companyType");
                      setOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-[13px] text-[#1a1a1a] transition-colors duration-150 hover:bg-[#edf9ff] hover:text-[#17a5fb] md:text-[14px] ${
                      option === companyType ? "bg-[#edf9ff] font-medium text-[#17a5fb]" : ""
                    } ${index === 0 ? "" : "border-t border-[#eef2f6]"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
            {errors.companyType ? (
              <span
                id="companyType-error"
                className="text-[11px] leading-snug text-[#dc2626] md:text-[12px]"
                role="alert"
              >
                {errors.companyType}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2.5 gap-y-2.5 sm:gap-3">
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

        <div className="grid grid-cols-2 gap-x-2.5 gap-y-2.5 sm:gap-3">
          <Field
            id="phone"
            label="Phone"
            type="tel"
            placeholder="Mobile no."
            icon="/assets/ic-phone.svg"
            value={form.phone}
            error={errors.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
          />
          <Field
            id="industry"
            label="Industry"
            placeholder="e.g. Tech"
            value={form.industry}
            error={errors.industry}
            onChange={update("industry")}
            onBlur={blur("industry")}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="text-[12px] font-medium leading-snug text-[#0e1526] md:text-[13px]">
          I am completing this form in connection with my
        </p>
        <div className="flex w-full flex-row gap-1.5">
          <button
            type="button"
            onClick={() => {
              setInterest("business");
              clearError("interest");
            }}
            className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-[11px] transition-all duration-200 ease-out sm:h-9 sm:gap-2 sm:px-3 sm:text-[14px] ${
              interest === "business"
                ? "border border-[#cfeeff] bg-[#edf9ff] font-medium text-[#0e1526]"
                : "border border-[#e1e7ef] bg-[#fbfcfe] font-normal text-[#828282] hover:border-[#17a5fb]/50 hover:text-[#0e1526]"
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
              className="size-3.5 sm:size-4"
            />
            Business
            <span className="hidden sm:inline"> interest</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInterest("personal");
              clearError("interest");
            }}
            className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-[11px] transition-all duration-200 ease-out sm:h-9 sm:gap-2 sm:px-3 sm:text-[14px] ${
              interest === "personal"
                ? "border border-[#cfeeff] bg-[#edf9ff] font-medium text-[#0e1526]"
                : "border border-[#e1e7ef] bg-[#fbfcfe] font-normal text-[#828282] hover:border-[#17a5fb]/50 hover:text-[#0e1526]"
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
              className="size-3.5 sm:size-4"
            />
            Personal
            <span className="hidden sm:inline"> interest</span>
          </button>
        </div>
        {errors.interest ? (
          <span
            id="interest-error"
            className="text-[11px] leading-snug text-[#dc2626] md:text-[12px]"
            role="alert"
          >
            {errors.interest}
          </span>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[12px] text-[#dc2626] md:text-[13px]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="group/submit inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#17a5fb] px-5 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(23,165,251,0.25)] transition-all duration-200 ease-out hover:bg-[#0f96ea] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none md:h-11 md:text-[15px]"
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
