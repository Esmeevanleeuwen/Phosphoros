"use client";

import { useMemo, useState } from "react";

import type { PhosphorosCase } from "@/lib/phosphoros/cases";
import { getCaseLocation } from "@/lib/phosphoros/format";

import RecordList from "./RecordList";
import styles from "./CaseBrowser.module.css";

type CaseBrowserProps = {
  items: PhosphorosCase[];
};

const ALL = "all";

function unique(values: Array<string | null>) {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())).map((value) => value.trim()))].sort(
    (a, b) => a.localeCompare(b, "nl-NL"),
  );
}

function getPublicYear(item: PhosphorosCase) {
  return item.public_date?.slice(0, 4) || "";
}

function getDateValue(item: PhosphorosCase) {
  const date = item.public_date || item.incident_date;
  return date ? new Date(`${date}T12:00:00`).getTime() : null;
}

export default function CaseBrowser({ items }: CaseBrowserProps) {
  const [city, setCity] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [crimeType, setCrimeType] = useState(ALL);
  const [legalOutcome, setLegalOutcome] = useState(ALL);
  const [order, setOrder] = useState("oldest");

  const options = useMemo(
    () => ({
      cities: unique(items.map((item) => getCaseLocation(item))),
      years: unique(items.map(getPublicYear)).sort((a, b) => Number(b) - Number(a)),
      crimeTypes: unique(items.map((item) => item.crime_type)),
      legalOutcomes: unique(items.map((item) => item.legal_outcome)),
    }),
    [items],
  );

  const visibleItems = useMemo(() => {
    return items
      .filter((item) => city === ALL || getCaseLocation(item) === city)
      .filter((item) => year === ALL || getPublicYear(item) === year)
      .filter((item) => crimeType === ALL || item.crime_type === crimeType)
      .filter((item) => legalOutcome === ALL || item.legal_outcome === legalOutcome)
      .sort((a, b) => {
        const aDate = getDateValue(a);
        const bDate = getDateValue(b);

        if (aDate === null && bDate === null) return 0;
        if (aDate === null) return 1;
        if (bDate === null) return -1;

        const difference = bDate - aDate;
        return order === "newest" ? difference : -difference;
      });
  }, [city, crimeType, items, legalOutcome, order, year]);

  const activeFilters = [city, year, crimeType, legalOutcome].filter((value) => value !== ALL).length;

  function resetFilters() {
    setCity(ALL);
    setYear(ALL);
    setCrimeType(ALL);
    setLegalOutcome(ALL);
    setOrder("oldest");
  }

  return (
    <div className={styles.browser}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Filter the public record</p>
          <h2>Find a case</h2>
        </div>
        <button type="button" onClick={resetFilters} disabled={activeFilters === 0 && order === "oldest"}>
          Clear filters{activeFilters > 0 ? ` (${activeFilters})` : ""}
        </button>
      </div>

      <div className={styles.filters}>
        <label>
          <span>City</span>
          <select value={city} onChange={(event) => setCity(event.target.value)}>
            <option value={ALL}>All cities</option>
            {options.cities.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Date</span>
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value={ALL}>All years</option>
            {options.years.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Crime type</span>
          <select value={crimeType} onChange={(event) => setCrimeType(event.target.value)}>
            <option value={ALL}>All crime types</option>
            {options.crimeTypes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Legal outcome</span>
          <select value={legalOutcome} onChange={(event) => setLegalOutcome(event.target.value)}>
            <option value={ALL}>All outcomes</option>
            {options.legalOutcomes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Order by date</span>
          <select value={order} onChange={(event) => setOrder(event.target.value)}>
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>

      <p className={styles.resultCount} aria-live="polite">
        Showing <strong>{visibleItems.length}</strong> of {items.length} cases
      </p>

      <RecordList items={visibleItems} emptyMessage="No cases match these filters." />
    </div>
  );
}
