/** Coerce a datetime field value (ISO string, Date, or null) to a Date. */
export function toDate(value: unknown): Date | null {
	if (!value) return null;
	if (value instanceof Date) {
		return isNaN(value.getTime()) ? null : value;
	}
	const d = new Date(String(value));
	return isNaN(d.getTime()) ? null : d;
}
