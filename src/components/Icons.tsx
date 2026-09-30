import type { ReactElement, SVGProps } from "react";
import type { ServiceItem } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };
}

export function IconFamily(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="16" cy="8" r="2" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.5 19" />
      <path d="M14 14.8c1.4-.6 2.8-.5 4.2.2 1.5.8 2.3 2.2 2.5 4" />
    </svg>
  );
}

export function IconCheckup(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 3h6v3a3 3 0 0 1-6 0V3Z" />
      <path d="M12 9v9" />
      <path d="M8 21h8" />
      <path d="M9.5 13h5" />
    </svg>
  );
}

export function IconSick(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

export function IconChronic(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 14h3l2-5 3 10 2-5h6" />
    </svg>
  );
}

export function IconAccess(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="5" r="2" />
      <path d="M10 7v5h6l2 6" />
      <circle cx="9" cy="17" r="4" />
      <path d="M13 13.5A4.5 4.5 0 0 1 17.2 18" />
    </svg>
  );
}

export function IconPay(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3A2 2 0 0 1 17.5 18 14.5 14.5 0 0 1 3.5 4a2 2 0 0 1 3-0.5Z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...base({ ...props, width: 18, height: 18 })}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base({ ...props, width: 18, height: 18 })}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

const serviceIcons: Record<
  ServiceItem["icon"],
  (p: IconProps) => ReactElement
> = {
  family: IconFamily,
  checkup: IconCheckup,
  sick: IconSick,
  chronic: IconChronic,
  access: IconAccess,
  pay: IconPay,
};

export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: ServiceItem["icon"] }) {
  const Comp = serviceIcons[name];
  return <Comp {...props} />;
}
