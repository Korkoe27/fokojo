"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Loader2,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "general" | "manufacturer" | "distributor";

interface BaseFields {
  name: string;
  email: string;
  company: string;
}

interface GeneralFields extends BaseFields {
  role: string;
  subject: string;
  message: string;
}

interface ManufacturerFields extends BaseFields {
  country: string;
  category: string;
  capacity: string;
  markets: string[];
  notes: string;
}

interface DistributorFields extends BaseFields {
  region: string;
  channel: string;
  volume: string;
  categories: string[];
  network: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; desc: string }[] = [
  {
    key: "general",
    label: "General",
    desc: "Have a question or not sure which partnership type fits? Send us a message and our team will direct you to the right person.",
  },
  {
    key: "manufacturer",
    label: "Manufacturer",
    desc: "Tell us about your manufacturing capabilities. We'll connect you with the right distribution partners and markets for your products.",
  },
  {
    key: "distributor",
    label: "Distributor",
    desc: "Share your distribution network and market reach. We'll match you with manufacturers whose products align with your channels.",
  },
];

const EXPORT_MARKETS = [
  "West Africa",
  "East Africa",
  "Europe",
  "Middle East",
  "Southeast Asia",
  "North America",
];

const PRODUCT_CATEGORIES = [
  "Consumer goods",
  "Food & beverage",
  "Electronics",
  "Textiles & apparel",
  "Health & beauty",
  "Industrial goods",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B1F3B] mb-1.5"
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 text-sm text-[#222] bg-white/90 border border-[#0B1F3B]/15 rounded-xl outline-none transition-all duration-150 focus:border-[#8E6E53] focus:ring-2 focus:ring-[#8E6E53]/15 placeholder:text-[#aaa]";

function SelectField({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls + " appearance-none pr-9 cursor-pointer"}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E6E53] pointer-events-none"
      />
    </div>
  );
}

function CheckboxGrid({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
}) {
  const toggle = (val: string) =>
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label
            key={opt}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer text-sm transition-all duration-150 ${
              checked
                ? "border-[#8E6E53]/60 bg-[#8E6E53]/06 text-[#0B1F3B]"
                : "border-[#0B1F3B]/10 text-[#555] hover:border-[#8E6E53]/40 hover:bg-[#8E6E53]/04"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(opt)}
              className="accent-[#8E6E53] w-3.5 h-3.5 cursor-pointer"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

// ─── Form panels ──────────────────────────────────────────────────────────────

function GeneralForm({
  data,
  set,
}: {
  data: GeneralFields;
  set: (k: keyof GeneralFields, v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="g-name" required>
            Full name
          </FieldLabel>
          <input
            id="g-name"
            className={inputCls}
            placeholder="Your name"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="g-email" required>
            Email address
          </FieldLabel>
          <input
            id="g-email"
            type="email"
            className={inputCls}
            placeholder="you@company.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="g-company">Company</FieldLabel>
          <input
            id="g-company"
            className={inputCls}
            placeholder="Company name (optional)"
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="g-role">I am a…</FieldLabel>
          <SelectField
            id="g-role"
            value={data.role}
            onChange={(v) => set("role", v)}
          >
            <option value="" disabled>
              Select role
            </option>
            {["Manufacturer", "Distributor", "Brand owner", "Investor", "Consultant", "Other"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="g-subject" required>
          Subject
        </FieldLabel>
        <input
          id="g-subject"
          className={inputCls}
          placeholder="What is your enquiry about?"
          value={data.subject}
          onChange={(e) => set("subject", e.target.value)}
        />
      </div>
      <div>
        <FieldLabel htmlFor="g-message" required>
          Message
        </FieldLabel>
        <textarea
          id="g-message"
          rows={5}
          className={inputCls + " resize-none"}
          placeholder="Tell us about your business goals and how we can help…"
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>
    </div>
  );
}

function ManufacturerForm({
  data,
  set,
}: {
  data: ManufacturerFields;
  set: (k: keyof ManufacturerFields, v: string | string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="m-name" required>
            Full name
          </FieldLabel>
          <input
            id="m-name"
            className={inputCls}
            placeholder="Jane Smith"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="m-email" required>
            Email address
          </FieldLabel>
          <input
            id="m-email"
            type="email"
            className={inputCls}
            placeholder="jane@company.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="m-company" required>
            Company name
          </FieldLabel>
          <input
            id="m-company"
            className={inputCls}
            placeholder="Acme Manufacturing Ltd."
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="m-country" required>
            Country of operation
          </FieldLabel>
          <SelectField
            id="m-country"
            value={data.country}
            onChange={(v) => set("country", v)}
          >
            <option value="" disabled>
              Select country
            </option>
            {["Nigeria", "Ghana", "Kenya", "South Africa", "China", "UAE", "United Kingdom", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="m-category" required>
            Industry / product category
          </FieldLabel>
          <SelectField
            id="m-category"
            value={data.category}
            onChange={(v) => set("category", v)}
          >
            <option value="" disabled>
              Select category
            </option>
            {["Consumer goods", "Food & beverage", "Electronics", "Textiles & apparel", "Industrial goods", "Health & beauty", "Agricultural products", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="m-capacity">Annual production capacity</FieldLabel>
          <SelectField
            id="m-capacity"
            value={data.capacity}
            onChange={(v) => set("capacity", v)}
          >
            <option value="" disabled>
              Select range
            </option>
            {["Under $500K", "$500K – $2M", "$2M – $10M", "$10M – $50M", "Over $50M"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="m-markets">Target export markets</FieldLabel>
        <CheckboxGrid
          options={EXPORT_MARKETS}
          selected={data.markets}
          onChange={(v) => set("markets", v)}
        />
      </div>
      <div>
        <FieldLabel htmlFor="m-notes">Additional notes</FieldLabel>
        <textarea
          id="m-notes"
          rows={3}
          className={inputCls + " resize-none"}
          placeholder="Tell us about your products, certifications, or specific requirements…"
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>
    </div>
  );
}

function DistributorForm({
  data,
  set,
}: {
  data: DistributorFields;
  set: (k: keyof DistributorFields, v: string | string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="d-name" required>
            Full name
          </FieldLabel>
          <input
            id="d-name"
            className={inputCls}
            placeholder="John Adeyemi"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="d-email" required>
            Email address
          </FieldLabel>
          <input
            id="d-email"
            type="email"
            className={inputCls}
            placeholder="john@company.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="d-company" required>
            Company name
          </FieldLabel>
          <input
            id="d-company"
            className={inputCls}
            placeholder="Global Distribution Co."
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="d-region" required>
            Primary market region
          </FieldLabel>
          <SelectField
            id="d-region"
            value={data.region}
            onChange={(v) => set("region", v)}
          >
            <option value="" disabled>
              Select region
            </option>
            {["West Africa", "East Africa", "Southern Africa", "North Africa", "Middle East", "Europe", "Southeast Asia", "Other"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="d-channel" required>
            Distribution channels
          </FieldLabel>
          <SelectField
            id="d-channel"
            value={data.channel}
            onChange={(v) => set("channel", v)}
          >
            <option value="" disabled>
              Primary channel
            </option>
            {["Retail chains", "Wholesale / B2B", "E-commerce", "Horeca", "Direct to consumer", "Multi-channel"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="d-volume">Monthly volume capacity</FieldLabel>
          <SelectField
            id="d-volume"
            value={data.volume}
            onChange={(v) => set("volume", v)}
          >
            <option value="" disabled>
              Select range
            </option>
            {["Under $100K", "$100K – $500K", "$500K – $2M", "Over $2M"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </SelectField>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="d-categories">Product categories of interest</FieldLabel>
        <CheckboxGrid
          options={PRODUCT_CATEGORIES}
          selected={data.categories}
          onChange={(v) => set("categories", v)}
        />
      </div>
      <div>
        <FieldLabel htmlFor="d-network">Tell us about your network</FieldLabel>
        <textarea
          id="d-network"
          rows={3}
          className={inputCls + " resize-none"}
          placeholder="Describe your distribution network, key retail partnerships, or market presence…"
          value={data.network}
          onChange={(e) => set("network", e.target.value)}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Form state per tab
  const [general, setGeneral] = useState<GeneralFields>({
    name: "", email: "", company: "", role: "", subject: "", message: "",
  });
  const [manufacturer, setManufacturer] = useState<ManufacturerFields>({
    name: "", email: "", company: "", country: "", category: "", capacity: "", markets: [], notes: "",
  });
  const [distributor, setDistributor] = useState<DistributorFields>({
    name: "", email: "", company: "", region: "", channel: "", volume: "", categories: [], network: "",
  });

  const setGen = (k: keyof GeneralFields, v: string) => setGeneral((p) => ({ ...p, [k]: v }));
  const setMfr = (k: keyof ManufacturerFields, v: string | string[]) => setManufacturer((p) => ({ ...p, [k]: v }));
  const setDst = (k: keyof DistributorFields, v: string | string[]) => setDistributor((p) => ({ ...p, [k]: v }));

  const canSubmit = () => {
    if (activeTab === "general") return general.name && general.email && general.subject && general.message;
    if (activeTab === "manufacturer") return manufacturer.name && manufacturer.email && manufacturer.company && manufacturer.country && manufacturer.category;
    if (activeTab === "distributor") return distributor.name && distributor.email && distributor.company && distributor.region && distributor.channel;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) return;
    setStatus("submitting");
    // Replace with your actual API call
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  const activeDesc = TABS.find((t) => t.key === activeTab)!.desc;

  return (
    <section
      id="contact"
      className="w-full py-20 lg:py-28 bg-linear-to-b from-[#e1e2e2] to-[#fcfcfc]"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold font-[Manrope] lg:max-w-1/2 leading-[1.08] tracking-tight text-[#0B1F3B]  mb-4">
            Let&apos;s build something{" "}
            <em className="not-italic text-[#8E6E53]">together</em>
          </h2>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8E6E53] font-[Manrope] mb-3">
            Get in Touch
          </p>
          <p className="text-[15px] leading-relaxed text-[#555] max-w-xl">
            Whether you&apos;re a manufacturer, distributor, or simply exploring — our
            trade experts are ready to help you unlock new markets.
          </p>
        </motion.div>

        {/* ── Body grid ── */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Image slot */}
            <div className="rounded-2xl overflow-hidden border border-[#0B1F3B]/10 bg-[#0B1F3B]/04 aspect-[4/3] w-full">
              
               
               {/* <Image src="/images/partnership.png" alt="Business partnership" fill className="object-cover" /> */}
               <img src="/assets/images/contact-us.jpg" alt="" className="object-cover w-full h-full object-center" />
              
            </div>

{/* Contact info */}
<div className="space-y-3">
  {[
    {
      icon: "/assets/icons/email.png",
      label: "Email",
      value: "contact@fokojo.com",
      href: "mailto:contact@fokojo.com",
    },
    {
      icon: "/assets/icons/phone.png",
      label: "Phone",
      value: "+1 (234) 567-890",
      href: "tel:+1234567890",
    },
    {
      icon: "/assets/icons/location.png",
      label: "Offices",
      value: "Lagos · Dubai · Shenzhen",
      href: null,
    },
  ].map(({ icon, label, value, href }, i) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.07 }}
      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/50 border border-[#0B1F3B]/[0.06] hover:border-[#8E6E53]/30 hover:bg-white/70 transition-all duration-200"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8E6E53]/10">
        <img src={icon} alt="" className="h-4.5 w-4.5 object-contain" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#8E6E53] mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-[13px] font-medium text-[#0B1F3B] hover:text-[#8E6E53] transition-colors truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-[13px] font-medium text-[#0B1F3B] truncate">{value}</p>
        )}
      </div>
    </motion.div>
  ))}
</div>

            <div className="h-px bg-[#0B1F3B]" />

<div className="rounded-xl border border-[#0B1F3B]/[0.06] bg-white/40 p-5 space-y-4">
  <div>
    <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#8E6E53] mb-1.5">
      Response time
    </p>
    <p className="text-[13px] text-[#555] leading-relaxed">
      We aim to respond to all enquiries within 24 hours during business days.
    </p>
  </div>
  <div className="h-px bg-[#0B1F3B]/06" />
  <div>
    <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#8E6E53] mb-1.5">
      Partnership enquiries
    </p>
    <p className="text-[13px] text-[#555] leading-relaxed">
      Interested in a formal partnership? Use the manufacturer or distributor forms to receive a tailored proposal.
    </p>
  </div>
</div>
          </motion.div>

          {/* ── Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="lg:col-span-3 rounded-2xl border border-[#0B1F3B]/08 bg-white/65 backdrop-blur-sm p-7 sm:p-9 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100  mb-5">
                    <CheckCircle size={30} className="text-emerald-600 " />
                  </div>
                  <h3 className="text-xl font-bold font-[Manrope] text-[#0B1F3B] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[#666]">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Tabs */}
                  <div className="flex gap-1 p-1 bg-[#0B1F3B]/05 rounded-xl">
                    {TABS.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={`relative flex-1 py-2.5 px-2 text-[11px] font-bold tracking-[0.06em] uppercase rounded-[10px] transition-all duration-200 cursor-pointer ${
                          activeTab === key
                            ? "bg-white text-[#0B1F3B] shadow-sm"
                            : "text-[#888]/40 hover:text-[#0B1F3B]"
                        }`}
                      >
                        {label}
                        {activeTab === key && (
                          <motion.div
                            layoutId="tab-indicator"
                            className="absolute inset-0 rounded-[10px] bg-white -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab description */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTab + "-desc"}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22 }}
                      className="text-[13px] text-[#666]/55 leading-relaxed px-4 py-3 bg-[#8E6E53]/06 border-l-[3px] border-[#8E6E53] rounded-r-xl"
                    >
                      {activeDesc}
                    </motion.p>
                  </AnimatePresence>

                  {/* Form fields */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {activeTab === "general" && (
                        <GeneralForm data={general} set={setGen} />
                      )}
                      {activeTab === "manufacturer" && (
                        <ManufacturerForm data={manufacturer} set={setMfr} />
                      )}
                      {activeTab === "distributor" && (
                        <DistributorForm data={distributor} set={setDst} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Submit */}
                  <div className="pt-1">
                    <motion.button
                      type="submit"
                      disabled={!canSubmit() || status === "submitting"}
                      whileHover={canSubmit() ? { scale: 1.01 } : {}}
                      whileTap={canSubmit() ? { scale: 0.98 } : {}}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#0B1F3B] hover:bg-[#8E6E53] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold tracking-[0.07em] uppercase rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send size={14} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-[11px] text-center text-[#aaa] mt-3">
                      By submitting, you agree to our Privacy Policy. We&apos;ll never
                      share your information.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}