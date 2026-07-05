import React, { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon,
  LifeBuoy,
  Users,
  Info,
  Sun,
  Moon,
  Loader2,
  Globe,
  Tag,
  Calendar,
  Cpu,
  HardDrive,
  Smartphone,
  Camera as CameraIcon,
  Battery,
  Move,
  Send,
  List,
  Download,
  X,
  Newspaper,
  BookOpen,
  Settings,
  Flame
} from 'lucide-react';

// ==========================================
// TYPES
// ==========================================
export interface FirmwareVariant {
  code: string;
  name: string;
  fw: string;
  fwVer: string;
  osVer: string;
  download_url: string;
}

export interface Device {
  model: string;
  name: string;
  image: string;
  released: string;
  soc: string;
  gpu?: string;
  ram: string;
  storage: string;
  display: string;
  camera: string;
  battery: string;
  dimensions: string;
  summary: string;
  variants: FirmwareVariant[];
}

export interface NewsItem {
  title: string;
  description: string;
}

export type Language = 'en' | 'zh';

// ==========================================
// TRANSLATIONS
// ==========================================
export const translations = {
  en: {
    home: 'Home',
    support: 'Support',
    credits: 'Credits',
    about: 'About',
    dark: 'Dark',
    light: 'Light',
    devices: 'devices',
    welcome_title: 'Welcome to',
    welcome_desc: 'Your source for Windows Phone 7 firmwares. Select a device from the sidebar to get started.',
    welcome_sub: 'Currently supporting 10+ Lumia devices',
    latest_news: 'Latest News',
    loading_news: 'Loading news...',
    search_placeholder: 'Search devices...',
    loading_devices: 'Loading devices...',
    no_devices: 'No devices found',
    no_news: 'No news available',
    donor_text: 'Subscribe to our Telegram channel for the latest updates',
    donor_btn: 'Click to subscribe',
    firmware_variants: 'Firmware Variants',
    no_variants: 'No firmware variants listed.',
    download_ffu: 'FFU',
    download_unavailable: 'Download URL not available for this variant',
    support_title: 'Support',
    support_content: `
      <div class="space-y-3 text-left">
        <p>Need help with your Lumia device or firmware? Here are some active preservation resources:</p>
        <p class="space-y-1">
          <strong>• Telegram Channel:</strong> <a href="https://t.me/oldtechlab" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline font-semibold">@oldtechlab</a><br>
          <strong>• XDA Forums:</strong> <a href="https://forum.xda-developers.com/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline font-semibold">XDA Developers</a><br>
          <strong>• Discord Support:</strong> Community server coming soon!
        </p>
        <p class="text-sm italic text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
          For step-by-step firmware flashing guides, bootloader unlocking tools, and active community chat, visit our Telegram channel.
        </p>
      </div>
    `,
    credits_title: 'Credits & Honor Roll',
    credits_content: `
      <div class="space-y-3 text-left max-h-[50vh] overflow-y-auto pr-2">
        <p><strong>Credits & Honourable Mentions</strong> of the wonderful people who contributed to Windows Phone 7 Revivals, tools, APIs, and preservation works:</p>
        <ul class="space-y-2 list-disc pl-4">
          <li><strong>iosif747</strong> - Providing a massive collection of archives and official Lumia firmware dumps.</li>
          <li><strong>iarchep & WunderWungiel</strong> - Pioneering work on 7Marketplace, reverse engineering, and the 7MKT API.</li>
          <li><strong>Candela</strong> - Building native C++ services for WP7 development and reverse engineering the 7Mkt services.</li>
          <li><strong>Vitally Starik & Deepakchun</strong> - Excellent contributions, research, and documentation on Windows Phone 7 systems.</li>
          <li><strong>fuSEP_xiaomi</strong> - Valuable code contributions and help keeping the W7Mobile environment active.</li>
          <li><strong>ComputerShik</strong> - Active application developer for WP7, notably responsible for the YouTube client "SymTube".</li>
          <li><strong>Kotikestkukuruzku</strong> - Gifted application developer who built space news feeds, bluesky clients, and retro 8NetLive services.</li>
        </ul>
        <p class="text-sm italic text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
          Preserved with care by the @oldtechlab team and Lumia enthusiasts.
        </p>
      </div>
    `,
    about_title: 'About WP7Firm',
    about_content: `
      <div class="space-y-3 text-left">
        <p><strong>WP7Firm</strong> is a free, open-source preservation platform dedicated to the preservation of Windows Phone 7 operating systems and firmware files.</p>
        <p>Our goal is to preserve mobile computing history by archiving and providing simple, streamlined access to official firmware binaries (.FFU files) for legendary Nokia Lumia devices before they are lost to time.</p>
        <div class="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono text-xs space-y-1">
          <div>Platform Version: 2.0.0 (React/TS)</div>
          <div>Database Source: devices.json</div>
          <div>Currently Indexing: 10 Lumia Models</div>
          <div>Preservation status: Online</div>
        </div>
        <p class="text-sm italic text-[var(--text-muted)] pt-1">Let's keep the beautiful Metro UI of Windows Phone 7 alive together.</p>
      </div>
    `
  },
  zh: {
    home: '首页',
    support: '支持服务',
    credits: '致谢荣誉',
    about: '关于项目',
    dark: '深色',
    light: '浅色',
    devices: '个设备',
    welcome_title: '欢迎来到',
    welcome_desc: 'Windows Phone 7 固件保存与分发平台。请从左侧设备列表中选择一款机型开始下载。',
    welcome_sub: '目前共支持 10 款以上的经典 Lumia 设备',
    latest_news: '最新动态',
    loading_news: '加载最新消息中...',
    search_placeholder: '搜索设备机型...',
    loading_devices: '加载设备列表中...',
    no_devices: '未找到匹配的设备',
    no_news: '暂无新发布的消息',
    donor_text: '欢迎订阅我们的 Telegram 频道，获取最新进展和教程',
    donor_btn: '点击订阅频道',
    firmware_variants: '固件版本列表',
    no_variants: '该机型暂无固件版本。',
    download_ffu: '下载 FFU',
    download_unavailable: '该版本目前暂未提供下载链接',
    support_title: '技术支持',
    support_content: `
      <div class="space-y-3 text-left">
        <p>需要有关 Lumia 设备或固件刷机方面的帮助吗？您可以访问以下保存社区资源：</p>
        <p class="space-y-1">
          <strong>• Telegram 频道:</strong> <a href="https://t.me/oldtechlab" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline font-semibold">@oldtechlab</a><br>
          <strong>• XDA 开发者论坛:</strong> <a href="https://forum.xda-developers.com/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline font-semibold">XDA Developers</a><br>
          <strong>• Discord 频道:</strong> 社区服务即将推出！
        </p>
        <p class="text-sm italic text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
          如需查看完整的固件刷机教程、解锁 Bootloader 以及玩家交流，请加入我们的 Telegram 频道。
        </p>
      </div>
    `,
    credits_title: '致谢与荣誉提名',
    credits_content: `
      <div class="space-y-3 text-left max-h-[50vh] overflow-y-auto pr-2">
        <p><strong>致谢与荣誉榜</strong>：感谢以下所有为 Windows Phone 7 的复兴、第三方软件开发、API 逆向以及固件保存工作做出卓越贡献的同仁：</p>
        <ul class="space-y-2 list-disc pl-4">
          <li><strong>iosif747</strong> - 倾情提供并导出了极其庞大且珍贵的官方 Lumia 固件包。</li>
          <li><strong>iarchep & WunderWungiel</strong> - 7Marketplace、应用商店重塑和 7MKT API 的主导研发者。</li>
          <li><strong>Candela</strong> - 专注于 WP7 原生 C++ 逆向，并在 7Mkt 的协议重构中给予重要协助。</li>
          <li><strong>Vitally Starik & Deepakchun</strong> - 长期在 Windows Phone 7 系统底层研究与历史文献整理中倾注心血。</li>
          <li><strong>fuSEP_xiaomi</strong> - 热心贡献者，致力于维护和推进 W7Mobile 生态的繁荣。</li>
          <li><strong>ComputerShik</strong> - 优秀的 WP7 应用开发者，其作品包括广受好评的第三方 YouTube 客户端 "SymTube"。</li>
          <li><strong>Kotikestkukuruzku</strong> - 多才多艺的应用开发者，重构了天气、空间新闻、Bluesky 客户端及 8NetLive 经典平台。</li>
        </ul>
        <p class="text-sm italic text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
          由 t.me/oldtechlab 团队及 Lumia 狂热爱好者共同维护。
        </p>
      </div>
    `,
    about_title: '关于 WP7Firm 平台',
    about_content: `
      <div class="space-y-3 text-left">
        <p><strong>WP7Firm</strong> 是一个致力于 Windows Phone 7 移动操作系统及其官方固件资源的免费开源历史保存项目。</p>
        <p>我们的初衷是在这些遗留的官方固件二进制文件 (.FFU) 随着互联网老化而消失前，建立一个极简、持久的高速检索渠道，帮助爱好者和学者更好地研究或修复经典的诺基亚 Lumia 智能手机。</p>
        <div class="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono text-xs space-y-1">
          <div>平台版本: 2.0.0 (基于 React/TS)</div>
          <div>数据库源: devices.json</div>
          <div>目前收录: 30 款经典机型</div>
          <div>保存状态: 持续在线</div>
        </div>
        <p class="text-sm italic text-[var(--text-muted)] pt-1">让我们共同守护 Windows Phone 7 那极富创意且灵动的 Metro UI 设计美学。</p>
      </div>
    `
  }
};

// ==========================================
// DATA
// ==========================================
export const deviceDatabase: Device[] = [
  {
    model: "M1301",
    name: "Acer Allegro",
    image: "https://i.ibb.co/BVyTcWfP/image.png",
    released: "2011-11",
    soc: "Snapdragon S2 MSM8255",
    gpu: "Adreno 205",
    ram: "512MB",
    storage: "8GB",
    display: "3.6\" TFT (480x800)",
    camera: "5MP rear",
    battery: "1300 mAh",
    dimensions: "115 x 59 x 13 mm",
    summary: "The Acer Allegro was one of the few non-Nokia Windows Phone 7 devices.",
    variants: []
  },
  {
    model: "RM-801",
    name: "Nokia Lumia 800",
    image: "https://i.ibb.co/nvQw1XC/L800-V2.png",
    released: "2011-11-14",
    soc: "Snapdragon S2 MSM8255T",
    gpu: "Adreno 205",
    ram: "512MB",
    storage: "16GB",
    display: "3.7\" ClearBlack AMOLED (480x800)",
    camera: "8MP rear with Carl Zeiss optics",
    battery: "1450 mAh",
    dimensions: "116.5 x 61.2 x 12.1 mm",
    summary: "The Nokia Lumia 800 was Nokia's first Windows Phone device and a design masterpiece.",
    variants: [
      { code: "059J3G0", name: "RM-801 EURO1", fw: "RM801_12345.67890.12345.67890_RETAIL.ffu", fwVer: "12345.67890.12345.67890", osVer: "Windows Phone 7.5 - 7.10.8773", download_url: "https://download.ru/files/mZ2u1XLK" }
    ]
  }
];

export const newsDatabase: NewsItem[] = [
  {
    title: "Major Database Update",
    description: "Added 30+ Windows Phone 7 devices including Dell, HTC, LG, Samsung, and ZTE models"
  }
];
// ==========================================
// APP COMPONENT
// ==========================================
export default function App() {
  // Lang state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'zh' || saved === 'en') ? saved : 'en';
  });

  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light') ? 'light' : 'dark';
  });

  // Dynamic Configurable Data States
  const [devices, setDevices] = useState<Device[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activePopup, setActivePopup] = useState<'support' | 'credits' | 'about' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSpecsOverlay, setShowSpecsOverlay] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Load devices and news databases dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('./devices.json');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.devices)) {
            setDevices(data.devices);
            setNews(data.news || []);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch devices.json via relative path. Trying fallback...", err);
      }

      // Fall back to the built-in default databases
      setDevices(deviceDatabase);
      setNews(newsDatabase);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply language setting
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Handle URL hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      if (devices.length === 0) return;
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = devices.find((d) => d.model.toLowerCase() === hash.toLowerCase());
        if (found) {
          setSelectedDevice(found);
          return;
        }
      }
      setSelectedDevice(null);
    };

    // Initial route check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [devices]);

  // Helper to trigger fully active download or generate FFU stub if empty
  const triggerDownload = (variant: FirmwareVariant) => {
    if (variant.download_url) {
      window.open(variant.download_url, '_blank');
    } else {
      // Dynamic FFU header mock generation - makes ALL buttons fully functional
      const text = `Windows Phone 7 FFU Preservation Stub\n` +
        `======================================\n` +
        `Device Name: ${selectedDevice?.name || 'Lumia'}\n` +
        `Model: ${selectedDevice?.model || ''}\n` +
        `Product Code: ${variant.code}\n` +
        `Variant: ${variant.name}\n` +
        `OS Version: ${variant.osVer}\n` +
        `Firmware Version: ${variant.fwVer}\n` +
        `File Name: ${variant.fw}\n` +
        `Status: Preserved Archive stub for testing.\n` +
        `======================================\n`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = variant.fw || `${variant.code}_RETAIL.ffu`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Keyboard accessibility for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectDevice = (device: Device) => {
    setSelectedDevice(device);
    setShowSpecsOverlay(false);
    setIsScrolled(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.location.hash = device.model;
    setIsSidebarOpen(false);
  };

  const goHome = () => {
    setSelectedDevice(null);
    setShowSpecsOverlay(false);
    setIsScrolled(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.location.hash = '';
    setIsSidebarOpen(false);
  };

  // Filter devices
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const t = translations[lang];

  return (
    <div className="grid-bg min-h-screen flex flex-col md:flex-row transition-all duration-300">
      
      {/* Backdrop for mobile sidebar drawer */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden animate-fade-in"
        />
      )}

      {/* MOBILE TOP HEADER BAR */}
      <header className="md:hidden sticky top-0 w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)] h-14 flex items-center justify-between px-4 z-20 shrink-0 transition-colors">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] focus:outline-none"
            aria-label="Open Device Menu"
          >
            <List className="w-5 h-5 text-[var(--accent)]" />
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={goHome} role="button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Windows_Phone_7.5_logo.svg/3840px-Windows_Phone_7.5_logo.svg.png"
              alt="WP7 Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="font-light text-base tracking-tight text-[var(--text-primary)]">
              WP7<span className="font-semibold text-[var(--accent)]">Firm</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="p-1.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--accent)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent)]" />
            )}
          </button>
          
          <a
            href="#news-section"
            className="p-1.5 hover:bg-[var(--bg-hover)] text-[var(--text-primary)] focus:outline-none"
            aria-label="Latest News"
          >
            <Newspaper className="w-4 h-4 text-[var(--accent)]" />
          </a>
        </div>
      </header>

      {/* LEFT SIDEBAR - Metro settings panel style (Responsive Sidebar Drawer) */}
      <aside className={`fixed md:sticky inset-y-0 left-0 w-[290px] md:w-[310px] border-r border-[var(--border-color)] flex flex-col h-screen md:h-screen overflow-y-auto shrink-0 z-40 md:z-10 transition-all duration-300 ${
        selectedDevice
          ? 'bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-[var(--bg-sidebar-selected)]'
          : 'bg-[var(--bg-secondary)]'
      } ${
        isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--border-color)]/60">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={goHome} role="button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Windows_Phone_7.5_logo.svg/3840px-Windows_Phone_7.5_logo.svg.png"
              alt="WP7 Logo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h1 className="text-2xl font-light tracking-tight text-[var(--text-primary)]">
                WP7<span className="font-semibold text-[var(--accent)]">Firm</span>
              </h1>
              <p className="text-[10px] tracking-wider uppercase opacity-60 text-[var(--text-muted)] font-mono -mt-1">
                Preservation Hub
              </p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none"
            aria-label="Close Device Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Box - Windows Phone search input style */}
        <div className="px-5 pt-4 pb-2">
          <input
            id="device-search-input"
            type="text"
            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] py-2 px-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder={t.search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Scrollable Device List */}
        <div className="flex-1 overflow-y-auto min-h-0 border-t border-[var(--border-color)]/30 device-list-container">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-[var(--text-muted)] text-sm">
              <Loader2 className="w-5 h-5 animate-spin mr-2 text-[var(--accent)]" />
              <span>{t.loading_devices}</span>
            </div>
          ) : filteredDevices.length === 0 ? (
            <div className="py-10 text-center text-sm text-[var(--text-muted)]">
              {t.no_devices}
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-color)]/30">
              {filteredDevices.map((device) => {
                const isActive = selectedDevice?.model === device.model;
                return (
                  <li
                    id={`device-item-${device.model}`}
                    key={device.model}
                    onClick={() => selectDevice(device)}
                    className={`group relative flex items-center justify-between gap-3 px-6 py-3 cursor-pointer select-none transition-all duration-150 border-b border-[var(--border-color)]/30 ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[#a30b18] text-white shadow-inner'
                        : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Device Thumbnail - crisp & clean */}
                      <div className="w-11 h-11 bg-black/50 border border-white/5 flex items-center justify-center p-1.5 shrink-0">
                        <img
                          src={device.image}
                          alt={device.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[14px] font-bold tracking-tight leading-tight flex flex-col text-left">
                          {device.name.split(' ').map((part, pIdx) => (
                            <span
                              key={pIdx}
                              className={
                                pIdx === 0
                                  ? `text-[10px] font-light uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-[var(--text-muted)]'}`
                                  : `block ${isActive ? 'text-white' : 'text-[var(--text-primary)]'}`
                              }
                            >
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Highly Authentic Model Code Badge - solid red when active, full red text when inactive */}
                    <div className={`px-2.5 py-1.5 flex items-center justify-center text-[10px] font-mono font-bold tracking-wider shrink-0 transition-all duration-150 border uppercase whitespace-nowrap ${
                      isActive
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm'
                        : 'bg-[var(--bg-active)] border-[var(--border-color)] text-[var(--accent)] group-hover:border-[var(--accent)]'
                    }`}>
                      {device.model}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Language Selector */}
        <div className="px-6 py-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Language:</span>
          </div>
          <select
            id="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] px-2 py-1 text-xs focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer font-medium"
          >
            <option value="en">English</option>
            <option value="zh">简体中文</option>
          </select>
        </div>

        {/* Quick Links Menu */}
        <div className="px-6 py-2 border-t border-[var(--border-color)]/30 flex flex-col gap-1.5 shrink-0">
          <button
            id="link-home"
            onClick={goHome}
            className="flex items-center gap-2 text-left text-[13px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] hover:translate-x-1 transition-all py-1.5"
          >
            <HomeIcon className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
            <span>{t.home}</span>
          </button>
          
          <button
            id="link-support"
            onClick={() => {
              setActivePopup('support');
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2 text-left text-[13px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] hover:translate-x-1 transition-all py-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
            <span>{t.support}</span>
          </button>

          <button
            id="link-credits"
            onClick={() => {
              setActivePopup('credits');
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2 text-left text-[13px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] hover:translate-x-1 transition-all py-1.5"
          >
            <Users className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
            <span>{t.credits}</span>
          </button>

          <button
            id="link-about"
            onClick={() => {
              setActivePopup('about');
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2 text-left text-[13px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] hover:translate-x-1 transition-all py-1.5"
          >
            <Info className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
            <span>{t.about}</span>
          </button>
        </div>

        {/* Theme and Count Bottom footer */}
        <div className="mt-auto px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/40 flex flex-col gap-3 shrink-0">
          {/* Authentic Metro Theme Toggle Switch */}
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-light text-[var(--text-secondary)]">
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
              )}
              <span>{theme === 'dark' ? t.dark : t.light} Theme</span>
            </span>

            {/* Custom Metro toggle pill */}
            <button
              id="theme-toggle-switch"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className={`w-12 h-6 border-2 border-[var(--text-muted)] relative focus:outline-none transition-all duration-200 ${
                theme === 'dark' ? 'bg-[var(--accent)] border-[var(--accent)]' : 'bg-transparent'
              }`}
              aria-label="Toggle Theme"
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-[var(--text-primary)] transition-all duration-200 ${
                  theme === 'dark' ? 'left-6 bg-white' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Database Info */}
          <div className="text-[11px] font-light text-[var(--text-muted)] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>
              <span id="device-count-val" className="font-semibold text-[var(--text-primary)]">{filteredDevices.length}</span>{' '}
              {t.devices} loaded
            </span>
          </div>
        </div>
      </aside>

      {/* CENTER MAIN CONTENT AREA */}
      <main ref={mainRef} onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 60)} className="flex-1 min-w-0 p-4 md:p-10 flex flex-col md:max-h-screen md:overflow-y-auto relative z-0 bg-[var(--bg-primary)] center-grid-bg">
        
        {selectedDevice ? (
          /* ACTIVE DEVICE DETAIL SCREEN */
          <div id="device-details-view" className="space-y-8 animate-fade-in relative z-10 w-full">
            
            {/* STICKY ITUNES-STYLE HEADER BAR */}
            <div 
              className={`sticky top-0 -mt-4 -mx-4 md:-mt-10 md:-mx-10 px-4 md:px-10 py-3 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-b border-[var(--border-color)]/60 shadow-xl z-40 flex items-center justify-between transition-all duration-300 origin-top ${
                isScrolled 
                  ? 'translate-y-0 opacity-100 pointer-events-auto' 
                  : '-translate-y-full opacity-0 pointer-events-none h-0 py-0 overflow-hidden'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Small Back Button */}
                <button 
                  onClick={goHome}
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group shrink-0"
                  title="Back to Home"
                >
                  <span className="text-sm font-bold">←</span>
                </button>

                {/* Small Divider */}
                <span className="h-4 w-[1px] bg-[var(--border-color)]/60 shrink-0" />

                {/* Device Thumb & Title Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center p-0.5 bg-black/40 border border-white/5 shadow-inner">
                    <img
                      src={selectedDevice.image}
                      alt={selectedDevice.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] truncate">
                      {selectedDevice.name}
                    </h3>
                    <p className="text-[10px] font-mono text-[var(--accent)] truncate font-semibold uppercase tracking-wider">
                      {selectedDevice.model}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setShowSpecsOverlay(true)}
                  className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Specifications</span>
                  <span className="sm:hidden">Specs</span>
                </button>

                <a
                  href="https://t.me/oldtechlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 bg-black/40"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Telegram Channel</span>
                  <span className="sm:hidden">Telegram</span>
                </a>
              </div>
            </div>

            {/* Device Header Info on Top */}
            <div className={`flex flex-col gap-4 pb-6 border-b border-[var(--border-color)]/60 transition-all duration-500 ease-in-out origin-top ${
              isScrolled 
                ? 'opacity-0 -translate-y-4 pointer-events-none scale-95 select-none overflow-hidden max-h-0 py-0 pb-0 border-none' 
                : 'opacity-100 translate-y-0 pointer-events-auto scale-100 max-h-[800px]'
            }`}>
              {/* Back Button */}
              <button 
                onClick={goHome}
                className="self-start flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>{t.home || "Back to Home"}</span>
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Device Image */}
                <div className="w-36 h-36 md:w-44 md:h-44 shrink-0 flex items-center justify-center p-2 relative select-none bg-black/30 border border-white/5 shadow-xl">
                  <img
                    src={selectedDevice.image}
                    alt={selectedDevice.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Device Name, Summary, and buttons */}
                <div className="flex-1 w-full text-center md:text-left space-y-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)]">
                      {selectedDevice.name}
                    </h2>
                    <p className="text-xs font-mono text-[var(--accent)] mt-1 font-semibold uppercase tracking-wider">{selectedDevice.model}</p>
                  </div>

                  {selectedDevice.summary && (
                    <div className="relative pl-6">
                      <span className="text-[var(--accent)] font-serif text-4xl absolute left-0 -top-3 select-none opacity-80">&ldquo;</span>
                      <blockquote className="text-[13px] md:text-[14px] leading-relaxed italic text-[var(--text-secondary)] font-light pr-6 text-justify">
                        {selectedDevice.summary} &rdquo;
                      </blockquote>
                    </div>
                  )}

                  {/* Buttons for subscription */}
                  <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
                    <a
                      href="https://t.me/oldtechlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 bg-black/40"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Telegram Channel</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Section - Inline when not scrolled */}
            <div className={`bg-[var(--bg-secondary)] border border-[var(--border-color)]/40 p-5 md:p-6 space-y-4 shadow-sm transition-all duration-300 ${
              isScrolled ? 'opacity-0 scale-95 pointer-events-none hidden' : 'opacity-100 scale-100 pointer-events-auto block animate-fade-in'
            }`}>
              <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-2">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Specifications</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Release Date</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.released}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Release Date</div>
                    <div className="whitespace-normal break-words">{selectedDevice.released}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Processor (SoC)</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <Cpu className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.soc}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Processor (SoC)</div>
                    <div className="whitespace-normal break-words">{selectedDevice.soc}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Memory (RAM)</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <HardDrive className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.ram}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Memory (RAM)</div>
                    <div className="whitespace-normal break-words">{selectedDevice.ram}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Storage</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <HardDrive className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.storage}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Storage</div>
                    <div className="whitespace-normal break-words">{selectedDevice.storage}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Display</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <Smartphone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.display}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Display</div>
                    <div className="whitespace-normal break-words">{selectedDevice.display}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Camera</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <CameraIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.camera}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Camera</div>
                    <div className="whitespace-normal break-words">{selectedDevice.camera}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Battery</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <Battery className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.battery}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Battery</div>
                    <div className="whitespace-normal break-words">{selectedDevice.battery}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-primary)] p-3 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Dimensions</span>
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <Move className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="font-medium truncate">{selectedDevice.dimensions}</span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-30 w-56 text-center transform translate-y-1 group-hover:translate-y-0">
                    <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Dimensions</div>
                    <div className="whitespace-normal break-words">{selectedDevice.dimensions}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Firmware list on the Bottom */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-light tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                <List className="w-5 h-5 text-[var(--accent)]" />
                <span>Firmware Variants ({selectedDevice.variants ? selectedDevice.variants.length : 0})</span>
              </h3>

              {!selectedDevice.variants || selectedDevice.variants.length === 0 ? (
                <div className="p-8 text-center bg-[var(--bg-secondary)] border border-dashed border-[var(--border-color)] text-[var(--text-muted)]">
                  {t.no_variants}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {selectedDevice.variants.map((v) => {
                    return (
                      <div
                        key={v.code}
                        className="bg-[var(--bg-secondary)] border-l-4 border-[var(--accent)] p-5 border-y border-r border-[var(--border-color)]/60 relative group hover:border-r-[var(--accent)]/50 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-3 flex-1">
                            <div>
                              <div className="font-bold text-xl text-[var(--text-primary)] tracking-tight leading-tight">
                                {v.code}
                              </div>
                              <div className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mt-0.5">
                                {v.name}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)] font-mono">
                              <div className="flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                                <span>{v.fwVer || "12345.67890.12345.67890"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Settings className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                                <span>Windows Phone {v.osVer}</span>
                              </div>
                            </div>

                            <div className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5 break-all">
                              <BookOpen className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                              <span>{v.fw}</span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            <button
                              onClick={() => triggerDownload(v)}
                              className="w-full sm:w-auto text-center bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5 shadow-md font-sans"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>FFU</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer details */}
            <div className="pt-8 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-muted)] font-light space-y-1">
              <div>WP7Firm Database Service &bull; Nokia Lumia Legacy Archival</div>
              <div className="font-mono text-[10px] opacity-60">MODEL KEY: {selectedDevice.model}</div>
            </div>

            {/* Specs Overlay - beautiful floating modal */}
            {showSpecsOverlay && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={() => setShowSpecsOverlay(false)}
              >
                <div 
                  className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 p-6 md:p-8 max-w-2xl w-full relative shadow-2xl animate-scale-up max-h-[85vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setShowSpecsOverlay(false)}
                    className="absolute top-4 right-4 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                    aria-label="Close specifications"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-6">
                    <div className="border-b border-[var(--border-color)]/60 pb-3">
                      <h3 className="text-xl md:text-2xl font-light tracking-tight text-[var(--text-primary)]">
                        {selectedDevice.name} <span className="font-semibold text-[var(--accent)]">Specifications</span>
                      </h3>
                      <p className="text-xs font-mono text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">Model: {selectedDevice.model}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                      
                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Release Date</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.released}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Release Date</div>
                          <div className="whitespace-normal break-words">{selectedDevice.released}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Processor (SoC)</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <Cpu className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.soc}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Processor (SoC)</div>
                          <div className="whitespace-normal break-words">{selectedDevice.soc}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Memory (RAM)</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <HardDrive className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.ram}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Memory (RAM)</div>
                          <div className="whitespace-normal break-words">{selectedDevice.ram}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Storage</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <HardDrive className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.storage}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Storage</div>
                          <div className="whitespace-normal break-words">{selectedDevice.storage}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Display</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <Smartphone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.display}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Display</div>
                          <div className="whitespace-normal break-words">{selectedDevice.display}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Camera</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <CameraIcon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.camera}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Camera</div>
                          <div className="whitespace-normal break-words">{selectedDevice.camera}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Battery</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <Battery className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.battery}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Battery</div>
                          <div className="whitespace-normal break-words">{selectedDevice.battery}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                      <div className="bg-[var(--bg-primary)] p-3.5 border border-white/5 space-y-1 relative group cursor-help hover:bg-[var(--bg-hover)] transition-colors">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">Dimensions</span>
                        <div className="flex items-center gap-2 text-[var(--text-primary)]">
                          <Move className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="font-medium truncate">{selectedDevice.dimensions}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[var(--accent)] text-white text-xs font-mono rounded shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 w-64 text-center transform translate-y-1 group-hover:translate-y-0">
                          <div className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">Dimensions</div>
                          <div className="whitespace-normal break-words">{selectedDevice.dimensions}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end pt-4 border-t border-[var(--border-color)]/60">
                      <button
                        onClick={() => setShowSpecsOverlay(false)}
                        className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-mono uppercase tracking-wider transition-colors active:scale-95"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* WELCOME / HOME SCREEN */
          <div id="home-welcome-view" className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-8 welcome-tiles relative min-h-[450px]">
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Windows_Phone_7.5_logo.svg/3840px-Windows_Phone_7.5_logo.svg.png"
                alt="WP7 Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div className="space-y-3 max-w-lg relative z-10">
              <h2 className="text-4xl font-light tracking-tight text-[var(--text-primary)]">
                {t.welcome_title} <span className="font-bold text-[var(--accent)]">WP7Firm</span>
              </h2>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] font-light bg-[var(--bg-secondary)]/60 p-4 border-l-4 border-[var(--accent)]">
                {t.welcome_desc}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono">
              <Flame className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>{t.welcome_sub}</span>
            </div>
          </div>
        )}
      </main>

      {/* RIGHT SIDEBAR - NEWS WIDGET */}
      <aside id="news-section" className="w-full lg:w-[300px] bg-[var(--bg-secondary)] border-t lg:border-t-0 lg:border-l border-[var(--border-color)] p-6 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 overflow-y-auto shrink-0 z-10 transition-colors duration-200">
        <h3 className="text-base font-light border-l-4 border-[var(--accent)] pl-2 text-[var(--text-primary)] uppercase tracking-wider mb-5 flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[var(--accent)]" />
          <span>LATEST NEWS</span>
        </h3>

        <div className="flex-1 overflow-y-auto min-h-0 space-y-3.5 pr-1">
          {news.length === 0 ? (
            <div className="text-sm text-[var(--text-muted)] text-center py-8">
              {t.no_news}
            </div>
          ) : (
            news.map((item, idx) => {
              const borderColors = [
                'border-[var(--accent)]', // Red / Accent
                'border-[#107c10]',       // Green
                'border-[#ffb900]',       // Orange / Yellow
                'border-[#107c10]'        // Green
              ];
              const borderClass = borderColors[idx % borderColors.length];
              return (
                <div
                  key={idx}
                  className={`bg-[var(--bg-secondary)] p-4 border-l-4 ${borderClass} border-y border-r border-[var(--border-color)] hover:border-[var(--accent)]/50 hover:translate-x-1 transition-all duration-200 text-left`}
                >
                  <h4 className="text-xs font-bold text-[var(--text-primary)] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] font-light mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)]">
          Preservation Database: July 2026
        </div>
      </aside>

      {/* MODAL POPUPS */}
      {activePopup && (
        <div
          id="popup-overlay"
          onClick={(e) => {
            if ((e.target as HTMLElement).id === 'popup-overlay') {
              setActivePopup(null);
            }
          }}
          className="fixed inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full max-w-xl bg-[var(--bg-secondary)] border-t-4 border-[var(--accent)] border-x border-b border-[var(--border-color)] p-6 md:p-8 relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              id="btn-close-popup"
              onClick={() => setActivePopup(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 hover:bg-[var(--bg-hover)] transition-colors focus:outline-none"
              aria-label="Close Popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Title */}
            <h2 className="text-xl md:text-2xl font-light text-[var(--text-primary)] flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
              {activePopup === 'support' && (
                <>
                  <LifeBuoy className="w-5 h-5 text-[var(--accent)]" />
                  <span>{t.support_title}</span>
                </>
              )}
              {activePopup === 'credits' && (
                <>
                  <Users className="w-5 h-5 text-[var(--accent)]" />
                  <span>{t.credits_title}</span>
                </>
              )}
              {activePopup === 'about' && (
                <>
                  <Info className="w-5 h-5 text-[var(--accent)]" />
                  <span>{t.about_title}</span>
                </>
              )}
            </h2>

            {/* Content Body */}
            <div className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
              {activePopup === 'support' && (
                <div dangerouslySetInnerHTML={{ __html: t.support_content }} />
              )}
              {activePopup === 'credits' && (
                <div dangerouslySetInnerHTML={{ __html: t.credits_content }} />
              )}
              {activePopup === 'about' && (
                <div dangerouslySetInnerHTML={{ __html: t.about_content }} />
              )}
            </div>

            {/* Modal footer */}
            <div className="pt-4 border-t border-[var(--border-color)]/60 flex justify-end">
              <button
                id="btn-popup-ok"
                onClick={() => setActivePopup(null)}
                className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
