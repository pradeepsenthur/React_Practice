import React, { useState, useEffect, useMemo } from "react";
import records from "./data/records";
export function CompanySearch() {
  const [query, setQuery] = useState("");

  const aggregated = useMemo(() => {
    const company = new Map();
    records.map((item) => {
      company.set(
        item.companyName,
        (company.get(item.companyName) || 0) + item.amount_spent
      );
    });
    return Array.from(company, ([companyName, amount_spent]) => ({
      companyName,
      amount_spent,
    }));
  }, [records]);

  const filtered = useMemo(() => {
    return aggregated.filter((record) =>
      record.companyName.toLowerCase().includes(query.toLowerCase())
    );
  }, [aggregated, query]);

  const maxAmount = Math.max(...aggregated.map((r) => Number(r.amount_spent)));

  console.log(filtered);
  return (
    <div className="company-seach">
      <input
        data-testid="search-input"
        placeholder="seach Companies"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <div>{query}</div>
      <ul className="company-list">
        {filtered.map((item) => (
          <li
            className={
              maxAmount === item.amount_spent
                ? "company-list_item-max"
                : "company-list_item"
            }
          >
            {item.companyName} - {item.amount_spent}
          </li>
        ))}
      </ul>
    </div>
  );
}
