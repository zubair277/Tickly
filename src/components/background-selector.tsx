import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

const DESKTOP_BACKGROUNDS = [
  { id: "desktop-1", name: "Desktop 1", path: "/background/desktop/bg-1.jpg" },
  { id: "desktop-2", name: "Desktop 2", path: "/background/desktop/bg-2.jpg" },
  { id: "desktop-3", name: "Desktop 3", path: "/background/desktop/bg-3.jpg" },
  { id: "desktop-4", name: "Desktop 4", path: "/background/desktop/bg-4.jpg" },
  { id: "desktop-5", name: "Desktop 5", path: "/background/desktop/bg-5.jpg" },
];

const MOBILE_BACKGROUNDS = [
  { id: "mobile-1", name: "Mobile 1", path: "/background/mobile/bg-1.jpg" },
  { id: "mobile-2", name: "Mobile 2", path: "/background/mobile/bg-2.jpg" },
  { id: "mobile-3", name: "Mobile 3", path: "/background/mobile/bg-3.jpg" },
  { id: "mobile-4", name: "Mobile 4", path: "/background/mobile/bg-4.jpg" },
  { id: "mobile-5", name: "Mobile 5", path: "/background/mobile/bg-5.jpg" },
];

export function BackgroundSelector() {
  const [selectedDesktop, setSelectedDesktop] = useState<string>(
    DESKTOP_BACKGROUNDS[0].id
  );
  const [selectedMobile, setSelectedMobile] = useState<string>(
    MOBILE_BACKGROUNDS[0].id
  );

  useEffect(() => {
    // Load saved preferences
    const savedDesktop = localStorage.getItem("desktop-background");
    const savedMobile = localStorage.getItem("mobile-background");
    
    if (savedDesktop) setSelectedDesktop(savedDesktop);
    if (savedMobile) setSelectedMobile(savedMobile);
  }, []);

  const applyBackground = (
    type: "desktop" | "mobile",
    backgroundId: string
  ) => {
    const backgrounds = type === "desktop" ? DESKTOP_BACKGROUNDS : MOBILE_BACKGROUNDS;
    const background = backgrounds.find((bg) => bg.id === backgroundId);
    
    if (!background) return;

    if (type === "desktop") {
      setSelectedDesktop(backgroundId);
      localStorage.setItem("desktop-background", backgroundId);
      document.body.style.setProperty("--desktop-bg", `url('${background.path}')`);
    } else {
      setSelectedMobile(backgroundId);
      localStorage.setItem("mobile-background", backgroundId);
      document.body.style.setProperty("--mobile-bg", `url('${background.path}')`);
    }
  };

  useEffect(() => {
    // Apply saved backgrounds on mount
    const desktopBg = DESKTOP_BACKGROUNDS.find((bg) => bg.id === selectedDesktop);
    const mobileBg = MOBILE_BACKGROUNDS.find((bg) => bg.id === selectedMobile);
    
    if (desktopBg) {
      document.body.style.setProperty("--desktop-bg", `url('${desktopBg.path}')`);
    }
    if (mobileBg) {
      document.body.style.setProperty("--mobile-bg", `url('${mobileBg.path}')`);
    }
  }, [selectedDesktop, selectedMobile]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 border border-border/50"
          title="Change Background"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Background</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Desktop Backgrounds */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Desktop Background</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DESKTOP_BACKGROUNDS.map((bg) => (
                <div key={bg.id} className="relative group">
                  <button
                    onClick={() => applyBackground("desktop", bg.id)}
                    className={cn(
                      "relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 w-full",
                      selectedDesktop === bg.id
                        ? "border-primary ring-2 ring-primary"
                        : "border-muted"
                    )}
                  >
                    <img
                      src={bg.path}
                      alt={bg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.backgroundColor = '#1f2937';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{bg.name}</span>
                    </div>
                    {selectedDesktop !== bg.id && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-semibold text-sm px-4 py-2 bg-primary rounded-md">Select</span>
                      </div>
                    )}
                    {selectedDesktop === bg.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
                        Selected
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Backgrounds */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Mobile Background</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {MOBILE_BACKGROUNDS.map((bg) => (
                <div key={bg.id} className="relative group">
                  <button
                    onClick={() => applyBackground("mobile", bg.id)}
                    className={cn(
                      "relative aspect-[9/16] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 w-full",
                      selectedMobile === bg.id
                        ? "border-primary ring-2 ring-primary"
                        : "border-muted"
                    )}
                  >
                    <img
                      src={bg.path}
                      alt={bg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.backgroundColor = '#1f2937';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{bg.name}</span>
                    </div>
                    {selectedMobile !== bg.id && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-semibold text-xs px-3 py-1 bg-primary rounded-md">Select</span>
                      </div>
                    )}
                    {selectedMobile === bg.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
                        ✓
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
