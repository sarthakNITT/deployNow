import { tabs } from "@/lib/utils";
import { useUploadStore } from "@/store/upload";

export default function SettingsNavbar () {

  const {
    activeTab, 
    setActiveTab
  } = useUploadStore();

    return (
        <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-surface/50'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
        </div>
    )
}