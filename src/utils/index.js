import { navLinks } from "./navlinks";
import { setAuthToken } from "./setAuthToken";
import { checkRole } from "./checkRole";

export { navLinks, setAuthToken, checkRole };

export async function checkStorage() {
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;

        console.log(`quota: ${JSON.stringify(quota)}`);
        console.log(`Storage used: ${percentageUsed}`);

        const remaining = (quota.quota - quota.usage) / Math.pow(2, 30);

        console.log(`Remaining storage: ${remaining} GB`);
    }
}
