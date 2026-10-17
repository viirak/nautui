export interface PatternProps {
  color?: string;
  deg?: number;
  gap?: number;
  size?: number;
  style: "dots" | "dots-x" | "grid" | "stripes" | "diamond-grid";
}

export function getGradientPattern(props?: PatternProps) {
  const color = props?.color || "var(--naut-color-base-200)";
  const size = props?.size || 1;

  switch (props?.style) {
    case "dots": {
      const gap = props.gap || 15;
      return `radial-gradient(circle, ${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px`;
    }
    case "dots-x": {
      const gap = props.gap || 24;
      return `radial-gradient(${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px, radial-gradient(${color} ${size}px, transparent ${size}px) ${gap / 2}px ${gap / 2}px / ${gap}px ${gap}px`;
    }
    case "grid": {
      const deg = props.deg || 90;
      const gap = props.gap || 24;
      return `linear-gradient(${deg}deg, ${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px repeat, linear-gradient(${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px repeat`;
    }
    case "stripes": {
      const stripeDeg = props.deg || 130;
      const stripeGap = props.gap || 10;
      const stripeSize = props.size || 5;
      const stripeColor = props.color || "var(--naut-color-base-100)";
      return `repeating-linear-gradient(${stripeDeg}deg, ${stripeColor} 0, ${stripeColor} ${stripeSize}px,transparent ${stripeSize}px,transparent ${stripeGap}px)`;
    }
    case "diamond-grid": {
      const diamondDeg = props.deg || 45;
      const diamondGap = props.gap || 50;
      const diamondSize = props.size || 1;
      const diamondColor = props.color || "var(--naut-color-base-100)";
      return `repeating-linear-gradient(${diamondDeg}deg, ${diamondColor} 0px, ${diamondColor} ${diamondSize}px, transparent ${diamondSize}px, transparent ${diamondGap}px), repeating-linear-gradient(135deg, ${diamondColor} 0px, ${diamondColor} ${diamondSize}px, transparent ${diamondSize}px, transparent ${diamondGap}px)`;
    }
    default:
      return "none";
  }
}
