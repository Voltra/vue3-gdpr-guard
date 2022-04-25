import { GdprManager, GdprManagerFactory, GdprSavior } from "gdpr-guard";
import { computed, reactive, watchEffect } from "vue";
import { GdprManagerEventHub } from "gdpr-guard/dist/GdprManagerEventHub";

export type GdprEventsHook = (eventsHub: GdprManagerEventHub) => void;

export interface CreateGdprComposablesOptions {
	autoClose?: boolean;
}

interface Internals {
	manager: GdprManager,
	eventsAttachCallback: GdprEventsHook,
}

/**
 * Create the composables for the provided GDPR savior and manager
 * @param savior - The {@link GdprSavior} to use to restore and save the GDPR manager's state
 * @param managerFactory
 * @param autoClose
 */
export const createGdprComposables = (savior: GdprSavior, managerFactory: GdprManagerFactory, {
	autoClose = true,
}: CreateGdprComposablesOptions = {}) => {
	const internals = reactive<Internals>({
		manager: GdprManager.create([]),
		eventsAttachCallback: () => {},
	});

	const gdprManager = computed(() => internals.manager);

	const doAutoClose = () => {
		if (autoClose && gdprManager.value.bannerWasShown) {
			gdprManager.value.closeBanner();
		}
	};

	watchEffect(() => {
		internals.eventsAttachCallback(gdprManager.value.events as GdprManagerEventHub);

		// Vue 3 makes the autoClose feature trivial :D
		doAutoClose();
	});

	const attachGdprEvents = (eventsHook: GdprEventsHook) => {
		internals.eventsAttachCallback = eventsHook;
	};

	const rawManager = computed(() => gdprManager.value.raw());

	const gdprBannerWasShown = computed(() => gdprManager.value.bannerWasShown);

	const closeGdprBanner = () => gdprManager.value.closeBanner();

	const resetAndShowGdprBanner = () => gdprManager.value.resetAndShowBanner();

	const persistManager = () => {
		return savior.store(rawManager.value);
	};

	const allowAll = () => {
		gdprManager.value.enable();
		return persistManager();
	};

	const rejectAll = () => {
		gdprManager.value.disable();
		return persistManager();
	};

	(async () => {
		internals.manager = await savior.restoreOrCreate(managerFactory);
	})();

	return {
		gdprManager,
		attachGdprEvents,
		rawManager,
		gdprBannerWasShown,
		closeGdprBanner,
		resetAndShowGdprBanner,

		// Utils
		persistManager,
		allowAll,
		rejectAll,
	};
};
