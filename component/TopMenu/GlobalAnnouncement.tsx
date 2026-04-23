"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Announcement {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    shop?: {
        _id: string;
        name: string;
        picture: string;
    };
}

export default function GlobalAnnouncement() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/all`);
                const result = await res.json();
                if (result.success && result.data) {
                    setAnnouncements(result.data);
                }
            } catch (err) {
                console.error("Failed to fetch announcements", err);
            }
        };
        fetchAnnouncements();
    }, []);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    if (announcements.length === 0) return null;

    return (
        <div ref={dropdownRef} className="relative">
            {/* Bell button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="relative p-2 text-text-sub hover:text-accent transition-colors flex items-center justify-center"
                title="Global Announcements"
            >
                <span className="text-xl">📢</span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-lg">
                    {announcements.length}
                </span>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-[420px] max-h-[70vh] overflow-y-auto bg-card border border-card-border rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="sticky top-0 bg-card/95 backdrop-blur-md px-5 py-4 border-b border-card-border flex justify-between items-center">
                        <h2 className="text-sm font-serif text-accent uppercase tracking-widest">Announcements</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-text-sub hover:text-red-500 transition-colors text-xl leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {announcements.map((ann) => (
                            <div key={ann._id} className="border border-card-border rounded-xl p-4 bg-background/50 hover:border-accent/30 transition-colors">
                                {ann.imageUrl && (
                                    <div className="w-full h-32 relative mb-3 rounded-lg overflow-hidden">
                                        <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {ann.shop && (
                                    <Link href={`/shop/${ann.shop._id}`} onClick={() => setIsOpen(false)}>
                                        <div className="flex items-center gap-2 mb-2 group cursor-pointer w-fit">
                                            {ann.shop.picture && (
                                                <img src={ann.shop.picture} alt={ann.shop.name} className="w-5 h-5 rounded-full object-cover border border-card-border group-hover:border-accent transition-colors" />
                                            )}
                                            <span className="text-[9px] uppercase tracking-widest text-accent group-hover:text-accent/70 transition-colors font-bold">
                                                {ann.shop.name}
                                            </span>
                                        </div>
                                    </Link>
                                )}
                                <h3 className="text-sm font-bold text-text-main mb-1">{ann.title}</h3>
                                <p className="text-xs text-text-sub leading-relaxed line-clamp-3">{ann.content}</p>
                                <p className="text-[9px] text-text-sub/40 mt-2 uppercase tracking-widest">
                                    {new Date(ann.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
