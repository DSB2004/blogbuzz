"use client";
import React from "react";
import SettingsBar from "@/app/_components/settings/settingBar";
import Input_2 from "@/app/_components/input/input_2";
import IconInput from "@/app/_components/input/iconInput";

export default function AccountEditForm() {
  return (
    <form className="flex justify-center align-middle flex-col">
      <SettingsBar>
        <h1 className="font-semibold uppercase duration-300 text-left  py-4 text-xl md:text-2xl">
          Manage Account
        </h1>
      </SettingsBar>

      <SettingsBar key="user-name-setting">
        User Name
        <Input_2
          key="user-name-input"
          defaultValue="John Doe"
          className="my-0"
        ></Input_2>
      </SettingsBar>
      <SettingsBar key="user-email-setting">
        User Email
        <Input_2
          key="user-email-input"
          className="my-0"
          defaultValue="johndoe@exm.com"
        ></Input_2>
      </SettingsBar>
      <SettingsBar key="user-work-setting">
        Work Type
        <Input_2
          key="user-work-input"
          className="my-0"
          defaultValue="Software Engineer"
        ></Input_2>
      </SettingsBar>
      <SettingsBar key="user-link-setting">
        Social Links
        <IconInput
          className="my-0"
          key="user-link-input"
          defaultValue={[
            "www.google.com",
            "www.medium.com",
            "www.instagram.com",
            "www.linkedin.com",
            "www.github.com",
          ]}
        ></IconInput>
      </SettingsBar>
    </form>
  );
}
