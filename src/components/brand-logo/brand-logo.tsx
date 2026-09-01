import Image from "next/image";
import clsx from "clsx";

import styles from "./brand-logo.module.css";

type BrandLogoProps = {
  className?: string | undefined;
  preload?: boolean;
};

export function BrandLogo({ className, preload = false }: BrandLogoProps) {
  return (
    <Image
      alt="Trends logo"
      className={clsx(styles.logo, className)}
      fetchPriority={preload ? "high" : "auto"}
      height={500}
      loading={preload ? "eager" : "lazy"}
      sizes="(max-width: 48rem) 38vw, 18rem"
      src="/brand/trends-logo.svg"
      width={295}
    />
  );
}
