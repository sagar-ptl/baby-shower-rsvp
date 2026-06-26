"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  function handleLogin() {
    if (
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EE] text-[#4F6F52]">
        <div className="p-6 rounded-xl shadow-md">
          <h1 className="text-xl font-bold mb-4">
            Admin Login
          </h1>

          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "YES" | "NO">("ALL");

  const totalGuests = responses.length;

  const yesCount = responses.filter(
    (r) => r.response === "Yes"
  ).length;

  const noCount = responses.filter(
    (r) => r.response === "No"
  ).length;

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?action=getAdminSummary`
      );
      setSummary(await res.json());

      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?action=getAdminResponses`
      );
      setResponses(await r.json());
    }

    load();
  }, []);

  const filtered = responses.filter((r) => {
    const matchesSearch =
      r.household.toLowerCase().includes(search.toLowerCase()) ||
      r.attendee.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "YES"
          ? r.response === "Yes"
          : r.response === "No";

    return matchesSearch && matchesFilter;
  });

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto bg-[#F7F5EE] text-[#4F6F52]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-500">Total Guests</div>
          <div className="text-2xl font-bold">{totalGuests}</div>
        </div>

        <div className="bg-green-50 p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Attending</div>
          <div className="text-2xl font-bold text-green-700">
            {yesCount}
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Declined</div>
          <div className="text-2xl font-bold text-red-700">
            {noCount}
          </div>
        </div>

      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">

        <button
          onClick={() => setFilter("ALL")}
          className={`whitespace-nowrap px-4 py-2 rounded-full border ${filter === "ALL"
              ? "bg-black text-white"
              : "bg-white"
            }`}
        >
          All ({totalGuests})
        </button>

        <button
          onClick={() => setFilter("YES")}
          className={`whitespace-nowrap px-4 py-2 rounded-full border ${filter === "YES"
              ? "bg-green-600 text-white"
              : "bg-white"
            }`}
        >
          Attending ({yesCount})
        </button>

        <button
          onClick={() => setFilter("NO")}
          className={`whitespace-nowrap px-4 py-2 rounded-full border ${filter === "NO"
              ? "bg-red-600 text-white"
              : "bg-white"
            }`}
        >
          Not Attending ({noCount})
        </button>

      </div>

      {/* Search */}
      <input
        placeholder="Search household..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Responses */}
      <div className="space-y-3">

        {filtered.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-4"
          >

            {/* Top row */}
            <div className="flex justify-between items-start">

              <div>
                <p className="font-bold text-base">
                  {r.attendee}
                </p>

                <p className="text-xs text-gray-500">
                  {r.household}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${r.response === "Yes"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {r.response}
              </span>

            </div>

            {/* Message */}
            {r.message && (
              <div className="mt-3 text-sm italic text-gray-600">
                “{r.message}”
              </div>
            )}

            {/* Timestamp */}
            <div className="mt-2 text-xs text-gray-400">
              {new Date(r.timestamp).toLocaleString()}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}