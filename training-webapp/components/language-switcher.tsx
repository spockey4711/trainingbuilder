"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';

    // Remove current locale prefix if exists
    const pathnameWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/';

    // Add new locale prefix only if not default (de)
    const newPath = newLocale === 'de' ? pathnameWithoutLocale : `/${newLocale}${pathnameWithoutLocale}`;

    router.push(newPath);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="gap-2"
      title={locale === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium uppercase">{locale === 'de' ? 'EN' : 'DE'}</span>
    </Button>
  );
}
