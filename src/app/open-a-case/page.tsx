"use client";

import { useState, type FormEvent } from "react";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

import styles from "./page.module.css";

type SubmissionState = "idle" | "submitting" | "success" | "error";

function readField(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export default function OpenCasePage() {
  const [state, setState] = useState<SubmissionState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Quietly accept bot-filled forms without storing them.
    if (readField(data, "website")) {
      form.reset();
      setState("success");
      return;
    }

    const consent = data.get("consent") === "on";
    const sourceUrl = readField(data, "source_url");

    if (!consent || !/^https?:\/\//i.test(sourceUrl)) {
      setState("error");
      return;
    }

    const optional = (name: string) => readField(data, name) || null;
    const { error } = await supabase.from("phosphoros_case_submissions").insert({
      title: readField(data, "title"),
      city: readField(data, "city"),
      incident_date: optional("incident_date"),
      public_date: readField(data, "public_date"),
      crime_type: readField(data, "crime_type"),
      legal_outcome: readField(data, "legal_outcome"),
      perpetrator_status: readField(data, "perpetrator_status"),
      summary: readField(data, "summary"),
      source_url: sourceUrl,
      source_title: optional("source_title"),
      source_level: readField(data, "source_level"),
      ecli: optional("ecli"),
      evidence_notes: optional("evidence_notes"),
      unknowns: optional("unknowns"),
      submitter_email: optional("submitter_email"),
      consent_public_sources_only: consent,
    });

    if (error) {
      console.error("Case submission failed:", error);
      setState("error");
      return;
    }

    form.reset();
    setState("success");
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.copy}>
            <p>Phosphoros / Submit a case</p>
            <h1>Add a case to the public record.</h1>
            <span>
              Submit a documented case for review. A submission is never published
              automatically and does not establish that an accusation is true.
            </span>
          </div>

          <aside>
            <span>Before you begin</span>
            <ol>
              <li>Use public, verifiable sources.</li>
              <li>Do not add private names, addresses or contact details.</li>
              <li>Separate known facts from information that is still missing.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.formSection}>
        <form
          onSubmit={submit}
          className={styles.form}
          onChange={() => state !== "submitting" && setState("idle")}
        >
          <header>
            <span>New case submission</span>
            <span>Review required before publication</span>
          </header>

          <div className={styles.sectionTitle}>
            <span>01</span>
            <div>
              <h2>Case details</h2>
              <p>Information used to identify and filter the case.</p>
            </div>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.wide}>
              <span>Descriptive title *</span>
              <input
                name="title"
                maxLength={180}
                placeholder="Briefly describe what happened"
                required
              />
            </label>

            <label>
              <span>City *</span>
              <input name="city" maxLength={120} placeholder="For example Amsterdam" required />
            </label>

            <label>
              <span>Crime type *</span>
              <input
                name="crime_type"
                maxLength={120}
                placeholder="For example sexual assault"
                required
              />
            </label>

            <label>
              <span>Incident date</span>
              <input name="incident_date" type="date" />
            </label>

            <label>
              <span>Source publication date *</span>
              <input name="public_date" type="date" required />
            </label>

            <label>
              <span>Legal outcome *</span>
              <select name="legal_outcome" defaultValue="Nog geen uitspraak" required>
                <option value="Onderzoek loopt">Investigation ongoing</option>
                <option value="Vervolging loopt">Prosecution ongoing</option>
                <option value="Nog geen uitspraak">No judgment yet</option>
                <option value="Veroordeeld">Convicted</option>
                <option value="Gedeeltelijk veroordeeld">Partly convicted</option>
                <option value="Vrijgesproken">Acquitted</option>
                <option value="Schuldig zonder straf">Guilty without punishment</option>
                <option value="Sepot / niet vervolgd">Dismissed / not prosecuted</option>
                <option value="Onbekend">Unknown</option>
              </select>
            </label>

            <label>
              <span>Current status of the accused *</span>
              <select name="perpetrator_status" defaultValue="unknown" required>
                <option value="investigated">Suspect, investigation ongoing</option>
                <option value="charged">Charged</option>
                <option value="detained">In pre-trial detention</option>
                <option value="convicted">Convicted</option>
                <option value="acquitted">Acquitted</option>
                <option value="unknown">Not publicly established</option>
              </select>
            </label>
          </div>

          <div className={styles.sectionTitle}>
            <span>02</span>
            <div>
              <h2>Public information</h2>
              <p>Describe only what can be supported by a public source.</p>
            </div>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.wide}>
              <span>Short summary *</span>
              <textarea
                name="summary"
                rows={5}
                minLength={40}
                maxLength={2500}
                placeholder="What happened, what is established and what is the current legal stage?"
                required
              />
            </label>

            <label className={styles.wide}>
              <span>Evidence mentioned in public sources</span>
              <textarea
                name="evidence_notes"
                rows={4}
                maxLength={3000}
                placeholder="For example an ECLI judgment, witness statements or forensic evidence"
              />
            </label>

            <label className={styles.wide}>
              <span>What is still unknown?</span>
              <textarea
                name="unknowns"
                rows={3}
                maxLength={2000}
                placeholder="State clearly which information is not public or not yet established"
              />
            </label>
          </div>

          <div className={styles.sectionTitle}>
            <span>03</span>
            <div>
              <h2>Source and contact</h2>
              <p>Primary legal and official sources are reviewed first.</p>
            </div>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.wide}>
              <span>Public source URL *</span>
              <input
                name="source_url"
                type="url"
                maxLength={2000}
                placeholder="https://..."
                required
              />
            </label>

            <label>
              <span>Source title</span>
              <input name="source_title" maxLength={240} placeholder="Title of the judgment or article" />
            </label>

            <label>
              <span>Source type *</span>
              <select name="source_level" defaultValue="Rechtspraak" required>
                <option value="Rechtspraak">Court judgment / ECLI</option>
                <option value="Openbaar Ministerie / politie">Public prosecutor / police</option>
                <option value="Kwaliteitsmedia">Established journalism</option>
                <option value="Andere openbare bron">Other public source</option>
              </select>
            </label>

            <label>
              <span>ECLI</span>
              <input name="ecli" maxLength={120} placeholder="ECLI:NL:..." />
            </label>

            <label>
              <span>Your email (optional)</span>
              <input
                name="submitter_email"
                type="email"
                maxLength={320}
                placeholder="Only used for questions"
              />
            </label>
          </div>

          <label className={styles.consent}>
            <input name="consent" type="checkbox" required />
            <span>
              I confirm that this submission contains only public information and no private
              addresses, phone numbers, medical details or identifying victim information.
            </span>
          </label>

          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <div className={styles.formFooter}>
            <p>
              The editorial team checks the source, legal wording and privacy before a case
              can appear in the public database.
            </p>
            <button type="submit" disabled={state === "submitting"}>
              {state === "submitting" ? "Submitting…" : "Submit case for review"}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {state === "success" && (
            <div className={styles.success} role="status">
              <strong>Case received.</strong>
              <span>It is now waiting for editorial and legal review.</span>
            </div>
          )}

          {state === "error" && (
            <p className={styles.error} role="alert">
              The case could not be submitted. Check the required fields and try again.
            </p>
          )}
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
