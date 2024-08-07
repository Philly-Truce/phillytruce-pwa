import { MenuOption } from "@/components/ui/menu-option";


export default function SettingsPage() {
  
  return (
    <div className="bg-white text-black">
        <MenuOption option="Notifications" />
        <MenuOption option="Language" />
        <MenuOption option="Location" />
      </div>   
  );
}
