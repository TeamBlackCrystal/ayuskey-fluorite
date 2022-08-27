import { proxy } from "valtio";
import { getLocalStorage } from "./auth";

interface ISettings {
	codeHighlight: {
		showCodeLineNumber: boolean;
	};
}

export const useSettings = proxy<ISettings>({
	codeHighlight: {
    showCodeLineNumber: getLocalStorage("_settings/showCodeLineNumber", false),
  }
});
