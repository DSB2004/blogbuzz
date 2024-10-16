import React from "react";
import SettingsBar from "@/app/_components/settings/settingBar";
import ThemeController from "@/app/_components/settings/themeController";
import DeleteAccount from "@/app/_components/settings/deleteAccount";
import AccountEditForm from "./form";
export default function page() {
  return (
    <>
      <AccountEditForm></AccountEditForm>

      <div className="my-5">
        <SettingsBar>
          <h1 className="font-semibold uppercase duration-300 text-left  py-4 text-xl md:text-2xl">
            Settings
          </h1>
        </SettingsBar>
        <SettingsBar>
          <h1>Theme</h1>
          <ThemeController />
        </SettingsBar>

        <SettingsBar>
          <h1 className="text-red-500">Delete Account</h1>
          <DeleteAccount />
        </SettingsBar>
      </div>
    </>
  );
}
