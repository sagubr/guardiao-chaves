export function compareById(o1: any, o2: any): boolean {
	if (Array.isArray(o2)) {
		return o2.some(item => item.id === o1.id);
	}
	return o1?.id === o2?.id;
}
