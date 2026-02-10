'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth';

const NAV_ITEMS = [
    { label: 'Products', href: '/admin', icon: Package },
];

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className=\"min-h-screen bg-[#F1F5F9] flex items-center justify-center\">
                <div className=\"animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A59B]\" />
            </div>
        );
    }

    if (!isAuthenticated) {
        router.push('/admin/login');
        return null;
    }

    return (
        <div className=\"h-screen bg-[#F1F5F9] flex overflow-hidden\">
            <aside className=\"w-64 min-w-[16rem] bg-[#0F172A] text-white flex flex-col h-full z-20\">
                <div className=\"px-6 py-5 border-b border-white/10\">
                    <Link href=\"/admin\" className=\"flex items-center gap-2\">
                        <div className=\"w-8 h-8 bg-[#00A59B] rounded-lg flex items-center justify-center font-bold text-sm\">H</div>
                        <span className=\"text-lg font-semibold tracking-tight\" style={{ fontFamily: 'Raleway, sans-serif' }}>
                            Healthi Admin
                        </span>
                    </Link>
                </div>

                <nav className=\"flex-1 px-3 py-4 space-y-1 overflow-y-auto\">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
                        const isExactAdmin = item.href === '/admin' && (pathname === '/admin' || pathname.startsWith('/admin/products'));
                        const active = isActive || isExactAdmin;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                    ? 'bg-[#00A59B] text-white'
                                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`}
                            >\n                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className=\"px-3 py-4 border-t border-white/10 space-y-1\">
                    {user && (
                        <div className=\"px-3 py-2 mb-1\">
                            <p className=\"text-sm font-medium text-white truncate\">{user.name}</p>\n                            <p className=\"text-xs text-slate-400 truncate\">{user.email}</p>
                        </div>
                    )}
                    <button\n                        onClick={logout}\n                        className=\"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors\"\n                    >\n                        <LogOut size={18} />\n                        Sign Out\n                    </button>\n                    <Link\n                        href=\"/\"\n                        className=\"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors\"\n                    >\n                        ← Back to Storefront\n                    </Link>\n                </div>\n            </aside>\n\n            <div className=\"flex-1 flex flex-col h-full overflow-hidden\">\n                <header className=\"h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10\">\n                    <div className=\"flex items-center gap-2\">\n                        <span className=\"text-sm text-slate-500 font-medium\">Admin Panel</span>\n                    </div>\n                    <div className=\"flex items-center gap-3\">\n                        <div className=\"w-8 h-8 bg-[#00A59B] rounded-full flex items-center justify-center text-white text-xs font-bold\">\n                            {user?.name?.charAt(0).toUpperCase() || 'A'}\n                        </div>\n                        <span className=\"text-sm font-medium text-slate-700\">{user?.name || 'Admin'}</span>\n                    </div>\n                </header>\n\n                <main className=\"flex-1 overflow-y-auto p-8\">\n                    {children}\n                </main>\n            </div>\n        </div>\n    );\n}\n\nexport default function AdminLayout({ children }: { children: React.ReactNode }) {\n    return (\n        <AuthProvider>\n            <AdminAuthGuard>{children}</AdminAuthGuard>\n        </AuthProvider>\n    );\n}\n