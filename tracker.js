// ─────────────────────────────────────────
// DAILY-TRACKER_ — Core Logic
// importierbar auf jeder Seite/Unterseite
// ─────────────────────────────────────────

export const STORAGE_KEY = "daily-tracker-data";

// Gibt "YYYY-MM-DD" für heute zurück
export function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

// Aktuelle Stunde (0–23)
function currentHour() {
    return new Date().getHours();
}

// Alle gespeicherten Daten laden
export async function getData() {
    try {
        const result = await window.storage.get(STORAGE_KEY);
        return result ? JSON.parse(result.value) : {};
    } catch {
        return {};
    }
}

// Besuch aufzeichnen — schreibt den aktuellen Stunden-Slot
export async function recordVisit() {
    const data = await getData();
    const today = todayKey();
    const hour = currentHour();

    // Slot-Array für heute: 24 Einträge (0 oder 1)
    if (!data[today]) {
        data[today] = new Array(24).fill(0);
    }

    data[today][hour] = 1;

    try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("[daily-tracker] Storage error:", e);
    }

    return data;
}

// Score (0–4) für einen Tag berechnen — bestimmt die Intensität
export function dayScore(slots) {
    if (!slots || !Array.isArray(slots)) return 0;
    const active = slots.reduce((a, b) => a + b, 0);
    if (active === 0) return 0;
    if (active <= 2) return 1;
    if (active <= 4) return 2;
    if (active <= 6) return 3;
    return 4;
}

// Alle Tage eines Monats zurückgeben (YYYY-MM)
export function daysInMonth(yearMonth) {
    const [y, m] = yearMonth.split("-").map(Number);
    const count = new Date(y, m, 0).getDate();
    return Array.from({ length: count }, (_, i) => {
        const d = String(i + 1).padStart(2, "0");
        return `${y}-${String(m).padStart(2, "0")}-${d}`;
    });
}

// Alle Tage eines Jahres zurückgeben (YYYY)
export function daysInYear(year) {
    const days = [];
    for (let m = 1; m <= 12; m++) {
        const count = new Date(year, m, 0).getDate();
        for (let d = 1; d <= count; d++) {
            days.push(
                `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
            );
        }
    }
    return days;
}

// Streak berechnen (aufeinanderfolgende Tage bis heute)
export function calcStreak(data) {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        if (data[key] && dayScore(data[key]) > 0) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

// Längsten Streak berechnen
export function calcLongestStreak(data) {
    const keys = Object.keys(data).sort();
    let longest = 0;
    let current = 0;
    let prev = null;

    for (const key of keys) {
        if (dayScore(data[key]) === 0) { current = 0; prev = null; continue; }
        if (!prev) { current = 1; }
        else {
            const diff = (new Date(key) - new Date(prev)) / 86400000;
            current = diff === 1 ? current + 1 : 1;
        }
        longest = Math.max(longest, current);
        prev = key;
    }
    return longest;
}

// Gesamtzahl aktiver Tage
export function calcTotalDays(data) {
    return Object.values(data).filter(s => dayScore(s) > 0).length;
}

// Reset aller Daten
export async function resetData() {
    try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({}));
    } catch (e) {
        console.error("[daily-tracker] Reset error:", e);
    }
}
